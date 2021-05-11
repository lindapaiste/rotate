import {PlayLevelProps, TransitionProps} from "../../universalGame/components/types-components";
import {useTileSizing} from "../../layout";
import {newLevelState} from "../../state/generic/initialState";
import React, {useEffect, useReducer, useState} from "react";
import {reducer} from "../../state/generic/reducer";
import {completeLevel, loadLevel, resize, startTimer} from "../../state/generic/actions";
import {findHint, isWin} from "../../state/quilt/selectors";
import {getVictory} from "../../state/generic/selectors";
import RenderLayout from "../../grid/RenderLayout";
import {QuiltTile} from "../tile/QuiltTile";
import {BottomMenu} from "../../bottomMenu/BottomMenu";
import {View} from "react-native";
import {SlideUp} from "../../effects/SlideUp";
import {useLoadTimers} from "../../effects/useLoadTimers";
import {QuiltLevelProps} from "../generate/types";


export const RenderQuiltLevel = (props: PlayLevelProps<QuiltLevelProps> & TransitionProps) => {

    const {width, height, tiles, loadingIn, endTransition, loadingOut, onWin} = props;

    /**
     * hook useTileSizing computes the tileSize based on the desired
     * width of grid in tiles and constant aspect ratio
     *
     * prefer the values of width and height from props over those from useTileSizing
     */
    const {tileSize} = useTileSizing(width);

    /**
     * subscribe to changes in window size and update tileSize when needed
     */
    useEffect(
        () => dispatch(resize(tileSize)),
        [tileSize]
    );

    /**
     * create level reducer with an initial state from the level props
     */
    const [state, dispatch] = useReducer(
        reducer,
        newLevelState({width, height, tileSize}, tiles)
    );

    /**
     * update the state on each new level
     * using prop loadingIn as trigger should call reload on replay,
     * whereas looking at tiles alone would not
     */
    useEffect(
        () => {
            if (loadingIn) {
                dispatch(loadLevel({width, height, tileSize, tiles}))
            }
        },
        [loadingIn, width, height, tiles]
    )

    /**
     * must callback to the game when the level has been won, but
     * want to run a local animation before beginning the actual load out
     * so use a state preLoadingOut to trigger the animation start and then
     * call onWin() after the local animation is already done
     * still use slide load out if pressing back ie. exiting without win
     */
    const isVictory = isWin(state);

    const [preLoadingOut, setPreLoadingOut] = useState(false);

    useEffect(() => {
            if (isVictory && !state.didComplete) {
                /**
                 * it's ok to dispatch completion to the local state to stop the timer
                 */
                dispatch(completeLevel());
                setPreLoadingOut(true);
            }
        },
        [isVictory]
    )

    const timers = useLoadTimers({
        loadingIn: !!loadingIn,
        loadingOut: preLoadingOut,
        duration: {
            in: 2000,
            out: 2000,
        },
        onEnd: {
            in: () => {
                /**
                 * end the transition when done loading in
                 * and don't start timer until the effect completes
                 */
                endTransition();
                dispatch(startTimer());
            },
            out: () => {
                /**
                 * callback to the game state which will initiate win screen loading in
                 * must also reset the value of preLoadingOut
                 */
                setPreLoadingOut(false);
                onWin(getVictory(state));
            }
        }
    })


    return (
        <View style={{flex: 1}}>
            <RenderLayout
                {...props}
                {...timers}
                state={state}
                dispatch={dispatch}
                RenderTile={QuiltTile}
            />
            <SlideUp
                {...props}
                height={50}
                duration={500}
                delay={1000}
            >
                <BottomMenu
                    state={state}
                    dispatch={dispatch}
                    height={50}
                    getHint={findHint}
                />
            </SlideUp>
        </View>
    )
}

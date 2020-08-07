import {I_PlayLevelProps, TransitionProps} from "../../universalGame/components/types-components";
import {QuiltLevelProps} from "../../data/quilt-defined-packs";
import {useTileSizing} from "../../layout";
import {newLevelState} from "../../state/generic/emptyState";
import React, {useEffect, useReducer} from "react";
import {QuiltLevelReducer} from "./types";
import {reducer} from "../../state/generic/reducer";
import {completeLevel, loadLevel, resize} from "../../state/generic/actions";
import {isWin} from "../../state/quilt/selectors";
import {getVictory} from "../../state/generic/selectors";
import RenderLayout from "../../grid/RenderLayout";
import {QuiltTile} from "../square/QuiltTile";
import {BottomMenu} from "../../layout/BottomMenu";
import {View} from "react-native";

export const RenderQuiltLevel = (props: I_PlayLevelProps<QuiltLevelProps> & TransitionProps) => {

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
    const [state, dispatch] = useReducer<QuiltLevelReducer>(
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
                dispatch(loadLevel({width, height, tileSize}, tiles))
            }
        },
        [loadingIn, width, height, tiles]
    )

    //must callback to the game when the level has been won

    const isVictory = isWin(state);

    useEffect(() => {
            if (isVictory && !state.didComplete) {
                dispatch(completeLevel());
                //TODO: first animation completes and THEN onWin
                onWin(getVictory(state));
            }
        },
        [isVictory]
    )

    /**
     * pass loadingIn, loadingOut, and endTransition down to the RenderLayout component
     * so that it can dispatch endTransition after it is done with the complicated effect
     */
    return (
        <View style={{flex: 1}}>
        <RenderLayout
            {...props}
            state={state}
            dispatch={dispatch}
            RenderTile={QuiltTile}
        />
        <BottomMenu
            state={state}
            dispatch={dispatch}
        />
        </View>
    )
}

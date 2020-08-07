import React, {ComponentType, useEffect, useRef} from "react";
import TilesArea from "./TilesArea";
import {LevelConnected, RenderTileProps} from "./types";
import {rotate, startTimer} from "../state/generic/actions";
import {Animated, TouchableHighlight} from "react-native";
import {RotationHandler} from "./RotationHandler";
import {getLayout} from "../state/generic/selectors";
import {TransitionProps} from "../universalGame/components/types-components";

export type Props<T> = LevelConnected<T> & {
    RenderTile: ComponentType<RenderTileProps<T>>;
}

/**
 * use a generic state and dispatch
 * not using PositionedTile because would need to forward setNativeProps
 */

export const RenderLayout = <T extends any = any>({state, dispatch, RenderTile, loadingIn, loadingOut, endTransition}: Props<T> & TransitionProps) => {

    const layout = getLayout(state);
    const {tileSize, rotationIncrement = 90} = layout;

    const loadInAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (loadingIn) {
            Animated.timing(loadInAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => {
                endTransition();
                dispatch(startTimer());
            })
        }
        //need to reset
    }, [loadingIn])

    const center = {
        x: .5 * layout.width * tileSize,
        y: .5 * layout.height * tileSize,
    }

    return (
        <Animated.View
            style={{
                transform: [
                    //{scale: loadInAnim},
                ],
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TilesArea
                {...layout}
            >
                {state.tiles.map((tile, id) => (
                    <TouchableHighlight
                        key={id}
                        onPress={() => dispatch(rotate(id))}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                left: tile.position.x * tileSize,
                                top: tile.position.y * tileSize,
                            }}
                        >
                            <Animated.View
                                style={{
                                    transform: [
                                        {
                                            scale: loadInAnim.interpolate({
                                                inputRange: [0, .5, .75, 1],
                                                outputRange: [1, 1, .5, 1],
                                            })
                                        },
                                        {
                                            rotate: loadInAnim.interpolate({
                                                inputRange: [.5, 1],
                                                outputRange: [-1 * rotationIncrement * state.rotations[id] + "deg", "0deg"],
                                                extrapolate: "clamp",
                                            })
                                        }
                                    ]
                                }}
                            >
                                <RotationHandler
                                    rotations={state.rotations[id]}
                                    increment={rotationIncrement}
                                >
                                    <RenderTile
                                        {...tile.position}
                                        tileSize={tileSize}
                                        key={id}
                                        id={id}
                                        data={tile.data}
                                    />
                                </RotationHandler>
                            </Animated.View>
                        </Animated.View>
                    </TouchableHighlight>
                ))}
            </TilesArea>
        </Animated.View>
    )
};

export default RenderLayout;


/**
 * animating position is not useNativeDriver compatible
 *
 *     const center = {
        x: .5 * layout.width * tileSize,
        y: .5 * layout.height * tileSize,
    }
 *                             left: loadInAnim.interpolate({
                                    inputRange: [0,1],
                                    outputRange: [center.x, tile.position.x * tileSize]
                                }),
 */

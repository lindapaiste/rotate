import React, {ComponentType} from "react";
import TilesArea from "./TilesArea";
import {LevelConnected, RenderTileProps} from "./types";
import {rotate} from "../state/generic/actions";
import {Animated, TouchableHighlight, TouchableWithoutFeedback} from "react-native";
import {RotationHandler} from "../effects/RotationHandler";
import {getLayout} from "../state/generic/selectors";
import {TileLoadIn} from "../effects/TileLoadIn";
import {TileLoadOut} from "../effects/TileLoadOut";
import {PropTimers} from "../effects/types";

export type Props<T> = LevelConnected<T> & {
    RenderTile: ComponentType<RenderTileProps<T>>;
}

/**
 * receives the animation timers from QuiltLevel -- moving state up
 *
 * use a generic state and dispatch
 * not using PositionedTile because would need to forward setNativeProps
 */

export const RenderLayout = <T extends any = any>({state, dispatch, RenderTile, loadInTimer, loadOutTimer}: Props<T> & PropTimers) => {

    const layout = getLayout(state);
    const {width, height, tileSize, rotationIncrement = 90} = layout;

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
                    <TouchableWithoutFeedback
                        // using TouchableWithoutFeedback instead of highlight because of "sticking" issue in testing
                        key={id}
                        onPressIn={() => dispatch(rotate(id))}
                    >
                        <Animated.View
                            style={{
                                position: "absolute",
                                left: tile.position.x * tileSize,
                                top: tile.position.y * tileSize,
                            }}
                        >
                            <RotationHandler
                                rotations={state.rotations[id]}
                                increment={rotationIncrement}
                            >
                                <TileLoadIn
                                    timing={loadInTimer}
                                    rotation={rotationIncrement * state.rotations[id]}
                                >
                                    <TileLoadOut
                                        timing={loadOutTimer}
                                        xRel={tile.position.x / width}
                                        yRel={tile.position.y / height}
                                    >
                                        <RenderTile
                                            {...tile.position}
                                            tileSize={tileSize}
                                            key={id}
                                            id={id}
                                            data={tile.data}
                                        />
                                    </TileLoadOut>
                                </TileLoadIn>
                            </RotationHandler>
                        </Animated.View>
                    </TouchableWithoutFeedback>
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

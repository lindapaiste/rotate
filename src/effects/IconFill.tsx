import {Animated, View} from "react-native";
import React, {ReactElement} from "react";
import {scaleInEffect} from "./scaleInEffect";
import {centerContents} from "@lindapaiste/layout";

/**
 * rather than passing in the icon props, pass in the entire JSX element for the outline and the fill
 * this component will animate the fill
 *
 * designed for use with transition timers, need something else to respond to press, etc.
 */

export type Props = Settings & IconPair;

export interface Settings {
    /**
     * whether it gets filled at all
     */
    filled: boolean;
    /**
     * timing for the animation
     */
    timer: Animated.Value;
    /**
     * start and end for the fill effects,
     * relative to the range of the timer ( probably 0 to 1 )
     */
    start?: number;
    end?: number;
}

export interface IconPair {
    /**
     * icon elements
     * set size & color in the element itself
     */
    OutlineIcon: ReactElement;
    FillIcon: ReactElement;
}

/**
 * can use an outline on the outer and a filled version over it
 * rather than having both use absolute positioning, which leads to the container having no size, position the outer
 *
 * if not filling at all, can animate but with scale 0, or just not render the filled at all
 */
export default ({filled = true, timer, start = 0, end = 1, OutlineIcon, FillIcon}: Props) => {
    return (
        <View style={[
            centerContents,
            {position: 'relative'}
        ]}>
            {OutlineIcon}
            {filled &&
            <Animated.View
                style={[
                    {position: 'absolute'},
                    {
                        transform: [
                            {scale: scaleInEffect({timer, start, end})},
                        ]
                    },
                ]}>
                {FillIcon}
            </Animated.View>
            }
        </View>
    );
};

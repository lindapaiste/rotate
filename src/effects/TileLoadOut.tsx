import {Animated} from "react-native";
import React, {PropsWithChildren} from "react";

export interface Props {
    timing: Animated.Value;
    //relative x and y from 0 to 1
    xRel: number;
    yRel: number;
}

export const TileLoadOut = ({timing, xRel, yRel, children}: PropsWithChildren<Props>) => {

    const relDelay = (xRel + yRel) / 2

    /**
     * need enough time for all to complete
     * if the animation itself takes a portion of the time t, where 0 < t < 1
     * then the last must start before 1 - t
    */
    const t = .4;
    const spin = 0;
    const start = (1 - t - spin) * relDelay;
    const inputRange = [start, start + t];

    return (
        <Animated.View
            style={{
                opacity: timing.interpolate({
                    inputRange,
                    outputRange: [1, 0],
                    extrapolate: "extend",
                }),
                transform: [
                    {
                        scale: timing.interpolate({
                            inputRange,
                            outputRange: [1, 0],
                            extrapolate: "clamp",
                        })
                    },
                    {
                        rotate: timing.interpolate({
                            inputRange,
                            outputRange: ["0deg", "180deg"],
                            extrapolate: "clamp",
                        })
                    }
                ]
            }}
        >
            {children}
        </Animated.View>
    )
}

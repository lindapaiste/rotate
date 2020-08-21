import {Animated} from "react-native";
import React, {PropsWithChildren} from "react";

export interface Props {
    timing: Animated.Value;
    rotation: number; //in degrees
}

export const TileLoadIn = ({timing, rotation, children}: PropsWithChildren<Props>) => {
    return (
        <Animated.View
            style={{
                transform: [
                    {
                        scale: timing.interpolate({
                            inputRange: [0, .5, .75, 1],
                            outputRange: [1, 1, .5, 1],
                        })
                    },
                    {
                        rotate: timing.interpolate({
                            inputRange: [.5, 1],
                            outputRange: [-1 * rotation + "deg", "0deg"],
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

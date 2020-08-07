import React, {PropsWithChildren, useEffect, useRef} from "react";
import {Animated} from "react-native";

export interface Props {
    rotations: number;
    increment?: number;
}

export const RotationHandler = ({rotations, increment = 90, children}: PropsWithChildren<Props>) => {
    /**
     * useRef keeps the same Animated.Value
     */
    const animation = useRef(new Animated.Value(rotations)).current;

    /**
     * when rotations prop updates, begin an animation based on the next value and the previous value
     */
    useEffect(() => {
        console.log("in effect");
        //ignore on mount
        Animated.timing(animation, {
            duration: 250,
            toValue: rotations,
            useNativeDriver: true,
        }).start();
    }, [rotations]);

    /**
     * interpolation is required because rotate prop is a string with either "deg" or "rad"
     */
    return (
        <Animated.View
            style={{
                transform: [
                    {rotate: animation.interpolate({
                            inputRange: [0, 3],
                            outputRange: ["0deg", 3 * increment + "deg"],
                            extrapolate: "extend",
                        })}
                ]
            }}
        >
            {children}
        </Animated.View>
    )
}

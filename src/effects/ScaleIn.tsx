import {Props as ScaleProps, scaleInEffect} from "./scaleInEffect";
import React, {PropsWithChildren} from "react";
import {Animated, ViewProps} from "react-native";

export type Props = ScaleProps & PropsWithChildren<Animated.AnimatedProps<ViewProps>>

/**
 * applies the logic from scaleInEffect to an Animated.View wrapper
 */
export default (props: Props) => {
    return (
        <Animated.View
            {...props}
            style={[
                props.style,
                {
                    transform: [{scale: scaleInEffect(props)}]
                }
            ]}

        />
    )
}

import React, {PropsWithChildren, useEffect, useRef} from "react";
import {Animated} from "react-native";
import {TransitionProps} from "../universalGame/components/types-components";

/**
 * rather than an HOC, can do as a Component with children
 * requires height from the inner component and TransitionProps
 *
 * separate values for delay/duration in vs out?
 */
export type Props = {
    height: number;
    duration: number;
    delay: number;
} & TransitionProps;

export const SlideUp = ({height, duration, delay, loadingIn, loadingOut, children}: PropsWithChildren<Props>) => {

    const translateY = useRef(new Animated.Value(-1 * height)).current;

    useEffect(() => {
        /**
         * load up from -1 height to 0 translation
         */
        if (loadingIn) {
            translateY.setValue(height);
            Animated.timing(translateY, {
                toValue: 0,
                duration,
                delay,
                useNativeDriver: true,
            }).start();
        }
        /**
         * load out from 0 translation to -1 height
         */
        else if (loadingOut) {
            translateY.setValue(0);
            Animated.timing(translateY, {
                toValue: height,
                duration,
                delay,
                useNativeDriver: true,
            }).start();
        }
    }, [loadingOut, loadingIn]);

    return (
        <Animated.View
            style={{
                transform: [{translateY}]
            }}
        >
            {children}
        </Animated.View>
    )
}

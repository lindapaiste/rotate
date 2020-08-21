import React, {ComponentType, PropsWithChildren, useEffect, useRef} from "react";
import {Animated} from "react-native";
import {TransitionProps} from "../universalGame/components/types-components";

export const withSlideUp = <P extends { height: number }>(Component: ComponentType<P>, duration: number = 1000, delay: number = 0) =>
    (props: PropsWithChildren<P & TransitionProps>) => {

        const translateY = useRef(new Animated.Value(-1 * props.height)).current;

        useEffect(() => {
            /**
             * load up from height to 0 translation
             */
            if (props.loadingIn) {
                translateY.setValue(props.height);
                Animated.timing(translateY, {
                    toValue: 0,
                    duration,
                    delay,
                    useNativeDriver: true,
                }).start();
            }
            /**
             * load out from 0 translation to height
             */
            else if (props.loadingOut) {
                translateY.setValue(0);
                Animated.timing(translateY, {
                    toValue: props.height,
                    duration,
                    delay,
                    useNativeDriver: true,
                }).start();
                //only the loading in component should be responsible for ending the transition
                //want to next iteration to come in from the right, so set value to 1 after -1 is reached
            }
        }, [props.loadingOut, props.loadingIn]);

        return (
            <Animated.View
                style={{
                    transform: [{translateY}]
                }}
            >
                <Component
                    {...props}
                />
            </Animated.View>
        )
    }

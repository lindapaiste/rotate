import React, {ComponentType, PropsWithChildren, useEffect, useRef} from "react";
import {Animated} from "react-native";
import {TransitionProps} from "../../universalGame/components/types-components";

/**
 * could either wrap in an animated view, or expect the component to accept animated view props and pass down the prop
 *
 * could use percentages with transform instead of window width, but could create problems if the component isn't full width
 */

export const withSlide = <P extends TransitionProps>(Component: ComponentType<P>, duration: number = 2000) =>
    (props: PropsWithChildren<P>) => {

        //have the value go from -1 to 1 where 0 is centered, -1 if left, and 1 is right
        const animation = useRef(new Animated.Value(1)).current;

        useEffect(() => {
            /**
             * load in goes to 0
             * initial value depends on whether it is a forward or backward transition
             */
            if (props.loadingIn) {
                animation.setValue( props.isGoingBack ? -1 : 1 );
                Animated.timing(animation, {
                    toValue: 0,
                    duration,
                    useNativeDriver: true,
                }).start(props.endTransition)
            }
            /**
             * load out goes from 0 to off screen
             */
            else if (props.loadingOut) {
                animation.setValue(0);
                Animated.timing(animation, {
                    toValue: props.isGoingBack ? 1 : -1,
                    duration,
                    useNativeDriver: true,
                }).start();
                //only the loading in component should be responsible for ending the transition
                //want to next iteration to come in from the right, so set value to 1 after -1 is reached
            } else {
                //temporary hack to make sure that things aren't off screen
                animation.setValue(0);
            }
        }, [props.loadingOut, props.loadingIn]);


        return (
            <Animated.View
                style={{
                    transform: [
                        {
                            translateX:
                                animation.interpolate({
                                    inputRange: [-1, 0, 1],
                                    outputRange: ["-100%", "0%", "100%"]
                                })
                        }
                    ],
                    flex: 1,
                }}
            >
                <Component
                    {...props}
                />
            </Animated.View>
        )
    }

import React, {ComponentType, FunctionComponent, PropsWithChildren, useEffect} from "react";
import {Animated, Dimensions, useWindowDimensions} from "react-native";
import {TransitionProps} from "../universalGame/components/types-components";
import {useLoadTimers} from "./useLoadTimers";
import {PairedTimerSettings} from "./types";

/**
 * notes:
 *
 * could either wrap in an animated view, or expect the component to accept animated view props and pass down the prop
 *
 * could use percentages with transform instead of window width, but this will create problems if the component isn't
 * full width
 *
 * making this an HOC so that it can access the loadingOut and loadingIn props from the component,
 * but it doesn't have to be if those props are passed directly
 */

/**
 * HOC takes two arguments:
 * the first, required, argument is the Component to slide
 * the second is an optional set of args for the transition: duration, delay, and end callback
 * makes use of the useLoadTimers hook and interpolates timers to transition amounts
 */
export const withSlide = <P extends TransitionProps>(Component: ComponentType<P>, settings: Partial<PairedTimerSettings> = {}): FunctionComponent<P> =>
    (props: PropsWithChildren<P>) => {

        const {loadingIn, loadingOut, isGoingBack} = props;

        /**
         * default behavior is to call endTransition() when the slide in is done
         * but do nothing on slide out, as the replacement component handles it
         */
        const withDefault: PairedTimerSettings = {
            duration: 1000,
            onEnd: {
                in: () => props.endTransition(),
                out: () => undefined,
            },
            ...settings,
        }


        const {loadInTimer, loadOutTimer} = useLoadTimers({...withDefault, loadingIn, loadingOut});

        //const {width} = useWindowDimensions(); //causes typeerror object(...) is not a function
        const width = Dimensions.get("window").width;

        /**
         * previous version without useLoadTimers hook had only one animation for load in and out
         * but now need to switch between
         */
        const translateX =
            /**
             * load IN goes from off-screen to 0 translation
             * initial value and direction of slide depends on whether it is a forward or backward transition
             * default behavior is to call endTransition() when the slide is done
             */
            loadingIn ? loadInTimer.interpolate({
                    inputRange: [0, 1],
                    outputRange: [width * (isGoingBack ? -1 : 1), 0]
                })
                : loadingOut ? loadOutTimer.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width * (isGoingBack ? 1 : -1)]
                })
                : 0;

        return (
            <Animated.View
                style={{
                    transform: [
                        {translateX}
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

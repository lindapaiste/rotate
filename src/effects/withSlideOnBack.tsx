import React, {ComponentType, FunctionComponent, PropsWithChildren} from "react";
import {Animated, Dimensions} from "react-native";
import {TransitionProps} from "../universalGame/components/types-components";
import {useReactiveAnimation} from "./useReactiveAnimation";


export const withSlideOnBack = <P extends TransitionProps>(Component: ComponentType<P>): FunctionComponent<P> =>
    (props: PropsWithChildren<P>) => {

        const {loadingIn, loadingOut, isGoingBack, endTransition} = props;

        const width = Dimensions.get("window").width;

        const toTranslateX = isGoingBack && loadingOut ? width :
            isGoingBack && loadingIn ? -1 * width
                : 0;

        const translateX = useReactiveAnimation(toTranslateX, {
            useNativeDriver: true,
            onEnd(value: number, result: Animated.EndResult): void {
                //end transition from the loaded in
                if (value === 0) {
                    endTransition();
                }
            }
        }, -1 * width);

        return (
            <Animated.View
                style={{
                    flex: 1,
                    transform: [{translateX}]
                }}

            >
                <Component
                    {...props}
                />
            </Animated.View>
        )
    }

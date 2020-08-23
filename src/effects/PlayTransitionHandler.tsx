import React, {PropsWithChildren} from "react";
import {TransitionProps} from "../universalGame/components/types-components";
import { Animated } from "react-native";
import {useReactiveAnimation} from "./useReactiveAnimation";


/**
 * loading out can be forward to WinScreen or back to select levels/select pack
 *
 * loading in can be from continue button on win screen, select levels screen, or select pack screen if infinite
 */

export default ({children, loadingIn, loadingOut, isGoingBack, endTransition}: PropsWithChildren<TransitionProps>) => {

    const toTranslateX = loadingOut && isGoingBack ? -1 : 0;

    const translateX = useReactiveAnimation(toTranslateX, {useNativeDriver: true}); //this is a load out, so it doesn't need to end transition


    return (
        <Animated.View
            style={{
                transform: [{translateX}]
            }}

        >
            {children}
        </Animated.View>
    )


}

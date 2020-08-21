import {TransitionProps} from "../universalGame/components/types-components";
import {TimerSettings} from "./types";
import {useTriggeredTimer} from "./useTriggeredTimer";
import React, {PropsWithChildren} from "react";
import { Animated } from "react-native";

export const ScreenSlideIn = ({loadingIn, isGoingBack, children, ...settings}: PropsWithChildren<TransitionProps & TimerSettings>) => {

    const timer = useTriggeredTimer(!!loadingIn, settings);

    return (
        <Animated.View
            />
    )

}

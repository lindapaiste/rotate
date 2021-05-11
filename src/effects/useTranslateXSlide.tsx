import React from "react";
import {Animated, Dimensions} from "react-native";
import {TransitionProps} from "../universalGame/components/types-components";
import {Settings, useReactiveAnimation} from "./useReactiveAnimation";

/**
 * return a raw number from -1 to +1 that will then get multiplied by width
 */
type Returns = {
    toValue: number;
    initialValue: number;
}

type Mapper = (props: TransitionProps) => Returns;

type Hook = (props: TransitionProps, settings: Settings) => Animated.Value;

type EndCallback = (props: TransitionProps, value: number) => void;

/**
 * slide animation depends on:
 * initial value ( -1 * width )
 * current value to animate to
 * animation settings: duration, onEnd, etc.
 */
export const makeUseTranslateXSlide = (mapper: Mapper = defaultMapStateToTranslate, endCallback: EndCallback = defaultEndCallback): Hook => {

    return (props: TransitionProps, settings: Settings) => {
        /**
         * every change will return an initialValue, but only the first one actually gets used
         */
        const {toValue, initialValue} = mapper(props);

        const width = Dimensions.get("window").width;

        const onEnd = (value: number) => endCallback(props, value);

        return useReactiveAnimation(toValue * width, {
            useNativeDriver: true,
            onEnd,
            ...settings,
        }, initialValue * width);
    }
}

/**
 * define a default behavior and return a hook created from it
 * export the defaults so that they can be extended rather than just overwritten
 */
export const defaultMapStateToTranslate: Mapper = ({loadingIn, loadingOut, isGoingBack}: TransitionProps): Returns => {
    if (loadingIn) {
        return {
            toValue: 0,
            initialValue: isGoingBack ? -1 : 1,
        }
    }
    if (loadingOut) {
        return {
            toValue: isGoingBack ? 1 : -1,
            initialValue: 0,
        };
    } else {
        return {
            toValue: 0,
            initialValue: 0,
        }
    }
}
export const defaultEndCallback: EndCallback = ({loadingIn, endTransition}) => {
    if ( loadingIn ) {
        endTransition();
    }
}
export const useTranslateXSlide: Hook = makeUseTranslateXSlide(defaultMapStateToTranslate, defaultEndCallback);

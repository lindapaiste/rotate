import {Animated} from "react-native";
import {useEffect, useRef} from "react";
import {ifDefined} from "../lib";

export interface Settings {
    useNativeDriver?: boolean;
    isInteraction?: boolean;
    duration?: number;
    delay?: number;
    easing?: (value: number) => number;

    /**
     * want to pass the value that was just animated to as an extra param to the callback
     * since this is more likely to be useful, put it first
     */
    onEnd?(value: number, result: Animated.EndResult): void;
}

/**
 * Returns an Animated.Value that responds to changes in the passed-in value prop by animating to the new value.
 * Can either start at the first value it receives, or animate to that value from a start value if a third prop
 * initialValue is provided.  This is useful for Component mount effects.
 */
export const useReactiveAnimation = (value: number, settings: Settings, initialValue?: number): Animated.Value => {

    const anim = useRef(new Animated.Value(ifDefined(initialValue, value))).current;

    const animateTo = (toValue: number) => {
        Animated.timing(anim, {
            useNativeDriver: true,
            ...settings,
            toValue,
        }).start((res) => {
            if (settings.onEnd !== undefined) {
                settings.onEnd(toValue, res)
            }
        });
    }

    useEffect(() => {

        animateTo(value);

        return () => {
            anim.stopAnimation();
            anim.removeAllListeners();
        }
    }, [value]);

    return anim;
}

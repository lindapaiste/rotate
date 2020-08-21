import {TimerSettings} from "./types";
import {Animated} from "react-native";
import {useEffect, useRef} from "react";

export interface Returns {
    timer: Animated.Value;
    reset(): void;
    stop( callback?: (value: number) => void): void;
}

/**
 * a single Animated.Value timer that starts animating when the value of boolean switches to true
 *
 * when is the proper time to reset -- at end of timing, at start of next timing, or call by users?
 */
export const useTriggeredTimer = (boolean: boolean, settings: TimerSettings): Animated.Value => {

    const timer = useRef(new Animated.Value(0)).current;

    useEffect( () => {
        if ( boolean) {
            Animated.timing(timer, {
                ...settings,
                toValue: 1,
                useNativeDriver: true,
            });
        } else {
            timer.stopAnimation();
        }

        return () => timer.removeAllListeners();

    }, [boolean]);

    return timer;
}

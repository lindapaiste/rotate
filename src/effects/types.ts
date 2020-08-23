import {Animated} from "react-native";

export interface PropTimers {
    loadInTimer: Animated.Value;
    loadOutTimer: Animated.Value;
}

export interface StartEnd {
    start: number;
    end: number;
}

/**
 * animated settings can take one value which applies to both in and out
 * or an object with keys "in" and "out"
 */
export interface InOutPair<T> {
    in: T;
    out: T;
}

export type MaybeInOutPair<T> = T | InOutPair<T>;

export type PairValue<T> = T extends MaybeInOutPair<infer V> ? V : never;

export type PairParser = <T>(input: MaybeInOutPair<T>) => T;

export interface PairedTimerSettings {
    duration?: MaybeInOutPair<number>;
    delay?: MaybeInOutPair<number>;
    onEnd?: MaybeInOutPair<(result: Animated.EndResult) => void>;
}

export interface TimerSettings {
    duration?: number;
    delay?: number;
    onEnd?(result: Animated.EndResult): void;
    useNativeValue?: boolean;
}

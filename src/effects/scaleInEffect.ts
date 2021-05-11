import {Animated} from "react-native";

/**
 * utility function for creating an interpolation that can scale a value
 */
export interface Props {
    timer: Animated.Value;
    start?: number; //within the range of timer, defaults to 0
    end?: number; //within the range of timer, default to 1
    startValue?: number; //defaults to 0
    endValue?: number; //defaults to 1
    maximumValue?: number; //defaults to 1.15 times end
    extrapolate?: Animated.ExtrapolateType; //defaults to clamp
}

export const scaleInEffect = ({timer, start = 0, end = 1, startValue = 0, endValue = 1, maximumValue, extrapolate = "clamp"}: Props) => {
    return timer.interpolate({
        inputRange: mapRange([0, .4, .6, .8, 1], start, end),
        outputRange: [startValue, endValue, maximumValue || endValue * 1.15, .9 * endValue, endValue],
        extrapolate,
    });
}

/**
 * maps a standardized range to new start and end
 * used to compress a timing to a small subset of the timing range
 */
export const mapRange = (initial: number[], start: number, end: number): number[] => {
    return initial.map(
        value => start + value * ( end - start )
    )
}

/**
* for reference, bounce scale used by react-native-animatable is:
 *
 * [0, 0.2, 0.4, 0.6, 0.8, 1] =>
 * [0.3, 1.1, 0.9, 1.03, 0.97, 1]
 */

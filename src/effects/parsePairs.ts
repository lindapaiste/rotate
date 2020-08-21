import {InOutPair, MaybeInOutPair, PairedTimerSettings, PairParser, TimerSettings} from "./types";

export const isPair = <T>( value: MaybeInOutPair<T> ): value is InOutPair<T> => {
    return typeof value === "object" && 'in' in value && 'out' in value;
}

export const toIn: PairParser = <T>( value: MaybeInOutPair<T> ): T => {
    return isPair( value ) ? value.in : value;
}

export const toOut: PairParser = <T>( value: MaybeInOutPair<T> ): T => {
    return isPair( value ) ? value.out : value;
}

/**
 * applies parser (toIn/toOut) ta all settings, but keeps undefined settings as undefined
 */
export const getIndividualSettings = (settings: PairedTimerSettings, parser: PairParser): TimerSettings => {
    const maybeParse = <T>(value: MaybeInOutPair<T> | undefined): T | undefined => {
        return value === undefined ? undefined : parser(value);
    }
    return {
        duration: maybeParse(settings.duration),
        delay: maybeParse(settings.delay),
        onEnd: maybeParse(settings.onEnd)
    }
}

export const inSettings = (settings: PairedTimerSettings): TimerSettings => getIndividualSettings(settings, toIn);

export const outSettings = (settings: PairedTimerSettings): TimerSettings => getIndividualSettings(settings, toOut);

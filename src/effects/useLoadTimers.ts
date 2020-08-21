import {useEffect, useRef} from "react";
import {Animated} from "react-native";
import {PairedTimerSettings, PropTimers} from "./types";
import {inSettings, outSettings, toIn, toOut} from "./parsePairs";
import {TransitionProps} from "../universalGame/components/types-components";
import {useTriggeredTimer} from "./useTriggeredTimer";

/**
 * transforms boolean props loadingIn and loading out into Animated values
 * which begin their timing when the value of loadingIn/Out becomes true
 * and call an option callback function upon completion of the timer
 * allow loadingIn & loadingOut to be boolean or a transition so that it can work directly with game component props
 */

export type Props = {
    loadingIn: boolean | TransitionProps['loadingIn'];
    loadingOut: boolean | TransitionProps['loadingOut'];
} & PairedTimerSettings


/**
 * note: setting default values for optional delay and onTimerEnd means that toIn/toOut won't have errors
 */
export const useLoadTimers = ({loadingIn, loadingOut, duration, delay = 0, onEnd = () => undefined}: Props): PropTimers => {

    const loadInTimer = useRef(new Animated.Value(0)).current;
    const loadOutTimer = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        console.log("loading in changed");
        if (loadingIn) {

            console.log({
                toValue: 1,
                duration: toIn(duration),
                delay: toIn(delay),
                useNativeDriver: true,
            })

            loadInTimer.setValue(0);

            Animated.timing(loadInTimer, {
                toValue: 1,
                duration: toIn(duration),
                delay: toIn(delay),
                useNativeDriver: true,
            }).start(toIn(onEnd))
        }

        return () => {
            loadInTimer.removeAllListeners();
            loadOutTimer.removeAllListeners();
        }

    }, [loadingIn])

    useEffect(() => {
        console.log("loading out changed");
        if (loadingOut) {

            loadOutTimer.setValue(0);

            Animated.timing(loadOutTimer, {
                toValue: 1,
                duration: toOut(duration),
                delay: toOut(delay),
                useNativeDriver: true,
            }).start(toOut(onEnd))
        }
        //need to reset
    }, [loadingOut])

    //loadOutTimer.addListener(({value}) => console.log(value));

    return {
        loadInTimer,
        loadOutTimer
    }
}

/**
 * useTriggeredTimer doesn't have a reset -- yet
 */
export const useLoadInTimer = (props: Omit<Props, 'loadingOut'>): Animated.Value => {

    return useTriggeredTimer( !!props.loadingIn, inSettings(props) );

}

export const useLoadOutTimer = (props: Omit<Props, 'loadingIn'>): Animated.Value => {

    return useTriggeredTimer( !!props.loadingOut, outSettings(props) );

}

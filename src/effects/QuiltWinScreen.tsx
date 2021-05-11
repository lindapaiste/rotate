import {TransitionProps, WinScreenProps} from "../universalGame/components/types-components";
import {OuterWinScreen} from "./AnimatedWinScreen";
import React from "react";
import {useLoadTimers} from "./useLoadTimers";
import {BasicBody} from "../gameComponentsLibrary/winScreen/WinScreen";
import {defaultMapStateToTranslate, makeUseTranslateXSlide} from "./useTranslateXSlide";
import {Animated} from "react-native";
import {SLIDE_DURATION} from "../quilt/play/QuiltGame";

export const QuiltWinScreen = (props: TransitionProps & WinScreenProps) => {
    return (
        <OuterWinScreen
            {...props}
            {...useLoadTimers({
                loadingIn: !!props.loadingIn,
                loadingOut: !!props.loadingOut,
                duration: {
                    in: 2000,
                    out: 500,
                },
                onEnd: {
                    in: () => props.endTransition(),
                    out: () => undefined,
                }
            })}
        >
            <BasicBody
                {...props}
            />
        </OuterWinScreen>
    )
}


/**
 * use slide on all load outs, but not on load in -- which is always from play level
 */
const useTranslateX = makeUseTranslateXSlide(
    (props) => {
        if (props.loadingIn) {
            return {
                toValue: 0,
                initialValue: 0,
            }
        } else return defaultMapStateToTranslate(props);
    }
);

export default (props: TransitionProps & WinScreenProps) => {
    return (
        <Animated.View
            style={{
                flex: 1,
                transform: [{translateX: useTranslateX(props, {duration: SLIDE_DURATION})}]
            }}>
            <QuiltWinScreen {...props}/>
        </Animated.View>
    )
};

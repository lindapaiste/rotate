import React, {PropsWithChildren} from "react";
import {TransitionProps} from "../universalGame/components/types-components";
import {Animated} from "react-native";
import {defaultMapStateToTranslate, makeUseTranslateXSlide} from "./useTranslateXSlide";
import {PageType} from "../universalGame/state/pages";
import {SLIDE_DURATION} from "../quilt/play/QuiltGame";

/**
 * use slide everywhere except when loading out into win screen
 */
const useTranslateX = makeUseTranslateXSlide(
    (props) => {
        if (props.loadingOut && props.loadingOut.to.type === PageType.WIN_LEVEL) {
            return {
                toValue: 0,
                initialValue: 0,
            }
        } else return defaultMapStateToTranslate(props);
    }
);


/**
 * loading out can be forward to WinScreen or back to select levels/select pack
 *
 * loading in can be from continue button on win screen, select levels screen, or select pack screen if infinite
 */

export default ({children, ...props}: PropsWithChildren<TransitionProps>) => {

    const translateX = useTranslateX(props, {duration: SLIDE_DURATION});

    return (
        <Animated.View
            style={{
                flex: 1,
                transform: [{translateX}]
            }}
        >
            {children}
        </Animated.View>
    )


}

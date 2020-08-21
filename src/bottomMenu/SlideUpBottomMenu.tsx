import {TransitionProps} from "../universalGame/components/types-components";
import {BottomMenu, Props as MenuProps} from "./BottomMenu";
import React from "react";
import { Animated } from "react-native";
import {AnimatedTranslate} from "@lindapaiste/layout-animated";

type Props = {
    height: number
} & TransitionProps;

export const SlideUpBottomMenu = ({loadingOut, loadingIn, ...props}: MenuProps & Props ) => {

    /**
     * my AnimatedTranslate Component can handle repeated in/out switching, but what about an initial value?
     */


    return (
        <AnimatedTranslate
            translateY={loadingOut ? -1 * props.height : 0}
        >
        <BottomMenu {...props} />
        </AnimatedTranslate>
    )
}

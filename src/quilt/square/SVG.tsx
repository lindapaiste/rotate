import React from "react";
import {I_SquareProps} from "./types";
import Svg, {Path, SvgProps} from "react-native-svg";

/**
 * svg paths are relative to the viewBox, so can define the svg itself just from the colors
 *
 * position, width, className, etc. get applied to the outer svg
 *
 * web version uses  xmlns="http://www.w3.org/2000/svg" in svg tag
 */
export const SquareSvg = ({colors, ...props}: Pick<I_SquareProps, 'colors'> & SvgProps) => (
    <Svg {...props} viewBox="0 0 2 2">
        <Path fill={colors.left} d="M0 0 v2 L1 1 z"/>
        <Path fill={colors.top} d="M0 0 h2 L1 1 z"/>
        <Path fill={colors.right} d="M2 0 v2 L1 1 z"/>
        <Path fill={colors.bottom} d="M0 2 h2 L1 1 z"/>
    </Svg>
);

export default SquareSvg;

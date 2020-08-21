import {AntDesign} from "@expo/vector-icons";
import React from "react";
import IconFill, {Settings} from "./IconFill";


export interface IconStyle {
    size: number;
    color: string;
}

export type Props = IconStyle & Settings;

/**
 * applies the IconFill Component to a star icon
 */
export const AnimatedStar = ({size, color, ...props}: Props) => {
    return (
        <IconFill
            {...props}
            FillIcon={
                <AntDesign
                    size={size}
                    color={color}
                    name="star"
                />
            }
            OutlineIcon={
                <AntDesign
                    size={size}
                    color={color}
                    name="staro"
                />
            }
        />
    );
};

import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {ThumbProps} from "./types";

export interface Settings {
    wonColor: string | ((props: ThumbProps) => string);
    unWonColor: string | ((props: ThumbProps) => string);
    margin?: number;
}

export const makeColorThumb = ({wonColor, unWonColor, margin}: Settings) => (props: ThumbProps) => {
    const colorProp = props.best ? wonColor : unWonColor;
    const color = typeof colorProp === "function" ? colorProp(props) : colorProp;
    return (
        <ColorThumb
            color={color}
            number={props.levelId + 1}
            size={props.size}
            onPress={props.onPress}
            margin={margin}
        />
    )
}


/**
 * the most basic thumb is just a colored square with a number on it
 * instead of switching isWon here, expect it to be provided the right color based on whether it's won or not
 */

export interface Props {
    number: number;
    color: string;
    size: number;
    margin?: number; //percentage
    onPress(): void;
}

/**
 * want it to maintain a square shape
 * can use padding 100% hack with CSS
 * or can declare the size
 */
export const ColorThumb = ({size, number, color, onPress, margin = .08}: Props) => {
    //margin as percent leads to inconsistent amounts, so use Math.round
    const marginActual = Math.round( margin * size);
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color,
                width: size - 2 * marginActual,
                height: size - 2 * marginActual,
                borderRadius: size * .1,
                //elevation: 5,
                margin: marginActual,
            }}
        >
            <Text
                style={{
                    color: "white",
                    fontSize: size * .4,
                    fontWeight: "300",
                }}
            >
                {number}
            </Text>
        </TouchableOpacity>
    );
};

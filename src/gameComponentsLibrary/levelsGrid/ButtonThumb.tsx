import {ThumbProps} from "./types";
import {Button} from "react-native-paper";
import {centerContents, flexFill} from "../styles";
import React, {ReactNode} from "react";
import {TextStyle, ViewStyle} from "react-native";

/**
 * optional override props control styles while
 * children allows for custom button content
 */
export interface CustomProps {
    style?: ViewStyle;
    labelStyle?: TextStyle;
    contentStyle?: ViewStyle;
    children?: ReactNode;
}

/**
 * basic square thumbnail using Paper Button component
 */
export const ButtonThumb = ({best, size, levelId, onPress, style, labelStyle, contentStyle, children}: CustomProps & ThumbProps) => (
    <Button
        onPress={onPress}
        //default contents is the level number
        children={!!children ? children : levelId + 1}
        //use colored button for won levels only
        mode={!!best ? "contained" : "outlined"}
        style={[{
            margin: "10%",
            minWidth: 0, //overrides button default
        },
            flexFill,
            centerContents,
            style
        ]}
        labelStyle={[{
            fontSize: .3 * size,
            fontWeight: "200",
        },
            labelStyle
        ]}
        contentStyle={contentStyle}
    />
)

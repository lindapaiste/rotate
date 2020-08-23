import {ThumbProps} from "./types";
import {Button} from "react-native-paper";
import {centerContents, flexFill} from "../styles";
import React, {ReactNode} from "react";
import {TextStyle, View, ViewStyle} from "react-native";

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
 *
 * need some styling edits to prevent Paper from truncating the text to 1... on small screens
 * react native Text controls overflow with props "ellipsizeMode" and "numberOfLines" which are props of the main component, not style properties
 * on web this appears as .css-textOneLine
 *
 * want the area which gets color when pressed to be the whole button
 * uses Surface and TouchableRipple
 * TouchableRipple fills a large area but is somehow contained -- by which?
 *
 * BUG: seems like highlight color overflows the sides no matter what
 * only way I got it right was to set labelStyle to a very small, seemingly arbitrary width like 10%
 * seems like it is based on the width of labelStyle but with an added margin
 * such that I can't make labelStyle small enough to get the right highlight while still having it wide enough for the text
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
            // borderColor: "red",
            // borderWidth: 1,
            fontSize: Math.round( .3 * size ),
            fontWeight: "200",
            alignSelf: "center",
            // setting width to 100% and removing flex: 1 is the key to fixing the ellipses overflow
            width: "100%",
        },
            labelStyle
        ]}
        contentStyle={[{
            /**
             * flex: 1 gets highlight to the right height
             *
             * width is bizarre
             *
             * somehow content does inherit the vertical margin from button, but does not get the horizontal margin
             * but when pressed, pressed highlight extends horizontally and not vertically
             */
            // marginHorizontal: "30%",  //this breaks things on react-native-web
            // borderColor: "orange",
            // borderWidth: 1,
            flex: 1,
        },
            contentStyle
        ]}
    />
)

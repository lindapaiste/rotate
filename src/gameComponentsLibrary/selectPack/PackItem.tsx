import React from "react";
import {TouchableHighlight, View} from "react-native";
import {PackItemProps} from "./types";
import {MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import {Text, Card, Avatar, IconButton, Paragraph} from "react-native-paper";

/**
 * the list item for each individual pack
 *
 * use components from Paper so that the theme will be applied
 */

/**
 * Paper card takes a render prop for content to display on the right and left sides of the title
 * it is usually an icon, but can be any ReactNode
 *
 * I am separating this callback because it involves scenario switching
 *
 * IDEA: maybe show something different if the whole back is complete
 *      show stars won in pack
 */
export const Right = ({size, unlocked, victoryCount = 0, levelCount = 0, infinite}: PackItemProps<any> & {size: number}) => {
    if ( ! unlocked ) {
        return ( <IconButton size={size} icon="lock-outline" /> )
    } if ( infinite ) {
        return ( <IconButton size={size} icon="infinity" /> )
    } else {
        return ( <Paragraph>{victoryCount} / {levelCount}</Paragraph>)
    }
}

export const PackItem = <P extends {}>(props: PackItemProps<P>) => {
    const {title, onClick, style} = props;
    return (
        <Card
            elevation={3}
            onPress={onClick}
            style={[{
                borderRadius: 10,
                width: "90%",
                padding: 10,
            }, style]}
        >
            <Card.Title
                title={title}
                right={p => <Right {...p} {...props} />}
            />
        </Card>
    )
}

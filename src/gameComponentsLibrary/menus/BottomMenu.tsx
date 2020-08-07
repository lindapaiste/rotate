import React, {PropsWithChildren, ReactNode, useState} from "react";
import {BottomNavigation, IconButton, Surface, Text, TouchableRipple} from "react-native-paper";
import {View, ViewStyle} from "react-native";
import {centerContents} from "../styles";
import {IconSource} from "react-native-paper/lib/typescript/src/components/Icon";
import {PropsType} from "../../lib";

type IconButtonProps = PropsType<typeof IconButton>

export interface Props {
    items: Item[];
    style?: ViewStyle;
    showLabels?: boolean;
    iconSize?: number;
}

export interface Item {
    key: string;
    icon: IconSource;
    disabled?: boolean;
    title: ReactNode;

    onPress(): void;
}

export const BottomMenuChildren = ({style, children}: PropsWithChildren<{style?: ViewStyle}>) => {
    return (
        <Surface style={[{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
        },style]}>
            {children}
        </Surface>
    )
}


export const BottomMenu = ({items, style}: Props) => {
    return (
        <Surface style={[{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
        },style]}>
            {items.map(item => (
                <BottomMenuItem
                    {...item}
                />
            ))}
        </Surface>
    )
}

const BottomMenuItem = ({icon, title, onPress, disabled = false}: Item) => {
    return (
        <TouchableRipple onPress={onPress} style={{flex: 1}}>
            <View style={centerContents}>
                <IconButton icon={icon} color={"white"}/>
                <Text>{title}</Text>
            </View>
        </TouchableRipple>
    )
}

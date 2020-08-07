import {IconProps} from "react-native-paper/src/components/MaterialCommunityIcon";
import React, {ComponentType, ReactNode} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";

/**
 * define certain icons which are expected to be present
 */

export type RequiredIcons = "settings" | "hint" | "share" | "undo" | "restart"

/**
 * define the schema for an object containing icon overrides
 */
export type IconLibrary = Record<string, CustomIcon<any>> & Record<RequiredIcons, CustomIcon<any>>;

interface I_CustomIcon<T> {
    name: string;
    Component: ComponentType<T>;

    mapProps?(props: IconProps): T;
}

type CustomIcon<T> = T extends IconProps ? I_CustomIcon<T> : Required<I_CustomIcon<T>>


/**
 * can special-case any icon names to something other than MaterialCommunityIcons
 * without changing the entire library
 */
export const makeIconSetting = (library: IconLibrary) =>
    (props: IconProps): ReactNode => {
        /**
         * if the library has a key matching the property name, use that icon
         */
        const custom = library[props.name];
        if (custom) {
            const {name, Component} = custom;
            return <Component {...props} name={name}/>;
        }
        /**
         * otherwise use the default
         */
        else {
            return <MaterialCommunityIcons {...props}/>
        }
    }

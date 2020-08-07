import React, {PropsWithChildren} from "react";
import {View} from "react-native";
import {I_Size, PropTileSize} from "./types";

export type Props = PropsWithChildren<I_Size & PropTileSize>;

/**
 * uses position="relative" so that children can use absolute position
 */

export default ({height, width, tileSize, children}: Props) => (
    <View
        style={{
            position: "relative",
            width: width * tileSize,
            height: height * tileSize
        }}
    >
        {children}
    </View>
)

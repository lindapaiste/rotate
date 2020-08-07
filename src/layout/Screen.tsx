import React, {ComponentType} from "react";
import {I_TileSizing, useTileSizing} from "./index";
import {View} from "react-native";

export interface Props {
    RenderLevel: ComponentType<I_TileSizing>
}

export const Screen = ({RenderLevel}: Props) => {
    const tileSizing = useTileSizing();
    return (
        <View style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
        }}>
            <RenderLevel {...tileSizing}/>
        </View>
    )
}

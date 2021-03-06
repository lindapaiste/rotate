import React from "react";
import {ScrollView} from "react-native";
import {PacksListProps} from "./types";

export const PacksList = <P extends {}>({packs, onPressPack, style, itemStyle, RenderItem}: PacksListProps<P>) => {
    return (
        <ScrollView
            style={{
                flex: 1,
            }}
            contentContainerStyle={[{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center"
            }, style
            ]}
        >
            {packs.map((pack) => (
                <RenderItem
                    key={pack.packId}
                    {...pack}
                    style={itemStyle}
                    onClick={() => onPressPack(pack.packId)}
                />
            ))}
        </ScrollView>
    )
}

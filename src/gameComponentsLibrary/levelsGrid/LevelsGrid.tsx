import React from "react";
import {View} from "react-native";
import {GridProps} from "./types";
import * as styles from "../styles";

/**
 * lays out thumbnails in a grid and centers each thumbnail within its square
 * the thumbnail itself is determined by the RenderThumb prop
 */
export const LevelsGrid = <T extends any>({levels, size, RenderThumb, onPressLevel, aspectRatio, style}: GridProps<T>) => {
    return (
        <View
            style={[{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: "5%",
            }, style]}
        >
            {levels.map((best, levelId) => (
                <View
                    key={levelId}
                    style={[
                        {
                            width: size,
                            height: size / (aspectRatio || 1)
                        },
                        styles.centerContents
                    ]}
                >
                    <RenderThumb
                        key={levelId}
                        best={best}
                        levelId={levelId}
                        size={size}
                        aspectRatio={aspectRatio}
                        onPress={() => onPressLevel(levelId)}
                    />
                </View>
            ))}
        </View>
    )
};

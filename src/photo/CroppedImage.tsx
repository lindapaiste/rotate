import React from "react";
import {I_Rectangle, I_Size} from "./types";
import {Image, ImageSourcePropType, View} from "react-native";

export interface Props {
    originalSize: I_Size;
    scale: number;
    sourceArea: I_Rectangle;
    source: ImageSourcePropType;
    tileSize?: number;
}

/**
 * tileSize is not really needed, but could be cleaner than multiplying by scale to get tileSize
 * as this could have rounding errors, whereas tileSize should be a clean whole number
 *
 * could pass only tileSize instead of scale and calculate scale internally as tileSize / sourceArea.width
 */

export const CroppedImage = ({source, originalSize, scale, sourceArea, tileSize}: Props) => {
    return (
        <View
            style={{
                width: tileSize || scale * sourceArea.width,
                height: tileSize || scale * sourceArea.height,
                overflow: 'hidden',
            }}>
            <Image
                source={source}
                resizeMode="cover"
                style={{
                    width: scale * originalSize.width,
                    height: scale * originalSize.width,
                    transform: [
                        {translateX: -1 * scale * sourceArea.x},
                        {translateY: -1 * scale * sourceArea.y},
                    ]
                }}
            />
        </View>
    );
};

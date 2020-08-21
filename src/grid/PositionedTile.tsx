import React, {ReactNode, useRef} from "react";
import {I_Point} from "../quilt/tile/types";
import {PropTileSize} from "./types";
import {View} from "react-native";

export type Props = I_Point & PropTileSize & {
    rotations?: number;
    children: ReactNode;
}

/**
 * wrapper handles positioning of a tile within the grid
 *
 * currently handles rotation, but may want to move this further down
 */
export default ({x, y, tileSize, rotations = 0, children}: Props) => {
    const ref = useRef<View | null>(null);

    const setNativeProps = (nativeProps: Object) => {
        ref.current?.setNativeProps(nativeProps);
    }

    return (
        <View
            key={"tile_" + x + "_" + y}
            style={{
                position: "absolute",
                left: x * tileSize,
                top: y * tileSize,
                transform: [{rotate: 90 * rotations + "deg"}]
            }}
            ref={ref}
        >
            {children}
        </View>
    )
}

import {SideColors} from "./types";
import SquareSvg from "./SVG";
import React from "react";

/**
 * props are a subset of RenderTileProps<SideColors>
 */
export interface Props {
    tileSize: number;
    id: number;
    data: SideColors;
}

/**
 * maps RenderTileProps to the SquareSvg props, making the size required
 */
export const QuiltTile = ({data, tileSize, id}: Props) => (
    <SquareSvg
        key={id}
        colors={data}
        height={tileSize}
        width={tileSize}
    />
)

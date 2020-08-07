import {RenderTileProps} from "../../grid/types";
import {SideColors} from "./types";
import SquareSvg from "./SVG";
import React from "react";

/**
 * maps RenderTileProps to the SquareSvg props
 */
export const QuiltTile = ({data, tileSize, id}: RenderTileProps<SideColors>) => (
    <SquareSvg
        key={id}
        colors={data}
        height={tileSize}
        width={tileSize}
    />
)

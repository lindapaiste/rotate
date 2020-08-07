import {SmartSizeProps} from "./types";
import {calcSize} from "./calcSizing";
import React from "react";
import {LevelsGrid} from "./LevelsGrid";

/**
 * renders a grid of thumbnails where the sizing is determined by props
 * basePerRow, maxThumbSize, minThumbSize, and optional aspectRatio for rectangles
 * the pixel width of the entire grid must be passed in
 */
export const SmartSizeGrid = <T extends any>(props: SmartSizeProps<T>) => {
    return (
        <LevelsGrid
            {...props}
            size={calcSize(props)}
        />
    )
}

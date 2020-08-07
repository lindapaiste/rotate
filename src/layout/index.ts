/**
 * grid area should probably be a consistent aspect ratio always, and the excess can be padded with with black
 *
 * use screen dimensions and subtract height for menu
 */
import {I_Size, PropTileSize} from "../grid/types";
import {useDimensions} from "../lib/useDimensions";

const MENU_HEIGHT_PERCENT = 0.07;

const MIN_PAD_PERCENT = 0.04;

/**
 * height/width
 *
 * may change this after more research
 *
 * based on iPhone 16:9, can allot 1 to menu and use 15:9 -> 5:3
 * but this is not particular divisible for multiple difficulties
 */
const ASPECT_RATIO = 5/3;

/**
 * will eventually have multiple difficulties, so this won't be a single constant
 */
const COLUMNS = 6;

/**
 * subtracts menu height and padding from window size
 */
const maxGridArea = ({width, height}: I_Size): I_Size => {
    return {
        width: width * ( 1 - 2 * MIN_PAD_PERCENT),
        height: height * ( 1 - 2 * MIN_PAD_PERCENT - MENU_HEIGHT_PERCENT)
    }
}

export const scale = ({width, height}: I_Size, scale: number): I_Size => ({
    width: width * scale,
    height: height * scale,
})

const rowsForColumns = (columns: number): number => {
    return Math.floor( ASPECT_RATIO * columns );
}

const actualAspectRatio = (columns: number): number => {
    return rowsForColumns(columns)/columns;
}

export type I_TileSizing = I_Size & PropTileSize;

export const useTileSizing = (width: number = COLUMNS): I_TileSizing => {
    const window = useDimensions();
    const height = rowsForColumns(width);
    const maxGrid = maxGridArea(window);
    const tileSize = Math.floor( Math.min(
        maxGrid.height / height,
        maxGrid.width /width
    ));

    return {
        width,
        height,
        tileSize
    }
}

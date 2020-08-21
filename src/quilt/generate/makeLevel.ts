import {generateTiles} from "./generateGrid";
import {random} from "../../lib";
import {MakeLevelProps, QuiltLevelProps} from "./types";

export const makeLevel = ({width, height, colorCount}: MakeLevelProps): QuiltLevelProps => ({
    width,
    height,
    tiles: generateTiles({
        width,
        height,
        colorCount: random(colorCount.min, colorCount.max)
    })
})

import {PackStatic} from "../universalGame/state/types-state";
import {makeArray, random} from "../lib";
import {InitialTile} from "../state/generic/types";
import {SideColors} from "../quilt/square/types";
import {generateTiles} from "../quilt/grid/generateGrid";

export interface QuiltLevelProps {
    width: number;
    height: number;
    tiles: InitialTile<SideColors>[];
}

interface MakeLevelProps {
    width: number;
    height: number;
    colorCount: {
        min: number;
        max: number;
    }
}

const makeLevel = ({width, height, colorCount}: MakeLevelProps): QuiltLevelProps => ({
    width,
    height,
    tiles: generateTiles({
        width,
        height,
        colorCount: random(colorCount.min, colorCount.max)
    })
})

const packs: PackStatic<QuiltLevelProps>[] = [
    {
        title: "Easy",
        packId: 0,
        initialUnlocked: true,
        infinite: false,
        levels: makeArray(100, () => makeLevel({
            colorCount: {min: 2, max: 5},
            width: 3,
            height: 4,
        }))
    },
    {
        title: "Medium",
        packId: 1,
        initialUnlocked: true,
        infinite: true,
        levels: makeArray(100, () => makeLevel({
            colorCount: {min: 3, max: 6},
            width: 6,
            height: 8,
        })),
        getLevel: () => makeLevel({
            colorCount: {min: 3, max: 6},
            width: 6,
            height: 8,
        })
    },
    {
        title: "Hard",
        packId: 2,
        initialUnlocked: false,
        infinite: false,
        levels: makeArray(100, () => makeLevel({
            colorCount: {min: 3, max: 10},
            width: 10,
            height: 13,
        }))
    }
]

export default packs;

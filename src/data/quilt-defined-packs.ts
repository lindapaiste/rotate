import {makeArray} from "../lib";
import {makeLevel} from "../quilt/generate/makeLevel";
import {QuiltLevelProps} from "../quilt/generate/types";
import {PackStatic} from "../universalGame/components/types-pack";

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

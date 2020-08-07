import {PackStatic} from "../universalGame/state/types-state";
import {random} from "../lib";


/**
 * could use same props for everything
 * could increase size based on level number
 * could randomize props -- if random with no input, could just as well pass nothing
 */

type LevelProps = {
    colorCount: number;
    width: number;
    height: number;
}

const packs: PackStatic<LevelProps>[] = [
    {
        title: "Easy",
        packId: 0,
        initialUnlocked: true,
        infinite: true,
        getLevel: () => ({
            colorCount: random(2, 5),
            width: 3,
            height: 4,
        })
    },
    {
        title: "Medium",
        packId: 1,
        initialUnlocked: true,
        infinite: true,
        getLevel: () => ({
            colorCount: random(3, 6),
            width: 6,
            height: 8,
        })
    },
    {
        title: "Hard",
        packId: 2,
        initialUnlocked: true,
        infinite: true,
        getLevel: () => ({
            colorCount: random(3, 6),
            width: 10,
            height: 13,
        })
    }
]

export default packs;

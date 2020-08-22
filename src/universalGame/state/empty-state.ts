import {PackState} from "./types-state";
import {PackStatic} from "../components/types-pack";

/**
 * need to make sure that anywhere which is creating an initial or empty state is using the right value for unlocked
 */
export const emptyPackState = (packId: number, unlocked: boolean = false): PackState => ({
    packId,
    unlocked,
    victoryCount: 0,
    levelVictories: [],
    lastPlayed: [],
})

export const initialPackState = ({packId, initialUnlocked, levels}: PackStatic<any>): PackState => ({
    packId,
    unlocked: initialUnlocked,
    victoryCount: 0,
    levelVictories: levels ? levels.map( () => [] ) : [],
    lastPlayed: levels ? levels.map( () => undefined ) : [],
})

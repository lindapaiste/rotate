import {LevelIdentifier, Victory} from "./types-state";
import * as A from "./actionNames";
import {ActionType} from "./types-actions";
import {Page} from "./pages";

/**
 * there should be at least one action creator for every action type
 * creator takes the required input values
 * and returns an action that fits the defined action type
 *
 * see the ActionType definition for more extensive documentation
 */

export const unlockPack = (packId: number): ActionType<any> => ({
    type: A.UNLOCK_PACK,
    payload: {
        packId
    }
})

export const browseLevels = (packId: number): ActionType<any> => ({
    type: A.BROWSE_PACK_LEVELS,
    payload: {
        packId
    }
})

export const browsePacks = (): ActionType<any> => ({
    type: A.BROWSE_PACKS,
})

export const updateSettings = <S extends {}>(changes: Partial<S>): ActionType<S> => ({
    type:  A.UPDATE_SETTINGS,
    payload: changes,
})

export const endTransition = (): ActionType<any> => ({
    type: A.END_TRANSITION
})

export const playLevel = (level: LevelIdentifier, isReplay: boolean = false): ActionType<any> => ({
    type: A.PLAY_LEVEL,
    payload: {
        ...level,
        isReplay,
    },
    meta: {
        timestamp: Date.now(),
    }
})

/**
 * stars? levelId? packId?
 * right now passing level props and victory props as one object, but could change
 */
export const completeLevel = ({time, moves, stars, levelId, packId}: Victory & LevelIdentifier): ActionType<any> => ({
    type: A.COMPLETE_LEVEL,
    payload: {
        victory: {time, moves, stars},
        level: {levelId, packId},
    },
    meta: {
        timestamp: Date.now(),
    }
});

export const goBack = (page?: Page): ActionType<any> => ({
    type: A.PRESS_BACK,
    payload: {
        page
    },
})

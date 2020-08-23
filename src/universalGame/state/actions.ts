import {ActionsObject, ActionType} from "./types-actions";
import * as A from "./actionNames";
import {Victory} from "./types-state";
import {AppPage} from "./pages";
import {AppModal} from "./modals";
import {LevelIdentifier, PackStatic} from "../components/types-pack";
import {initialPackState} from "./empty-state";

/**
 * rather than passing around individual functions,
 * provide the dispatch function and use it to create an actions object
 * where the actions know how to dispatch themselves
 *
 * would be trivial to include state as an argument here as well,
 * in case action creators want to access the current state
 */

export const makeActions = <T>(dispatch: (action: ActionType<T>) => void): ActionsObject<T> => {

    return {

        initializePack: (pack: PackStatic<any>) => dispatch({
            type: A.INITIALIZE_PACK,
            payload: initialPackState(pack),
        }),

        unlockPack: (packId: number) => dispatch({
            type: A.UNLOCK_PACK,
            payload: {
                packId
            }
        }),

        unlockAll: () => dispatch({
            type: A.UNLOCK_ALL,
        }),

        browseLevels: (packId: number) => dispatch({
            type: A.BROWSE_PACK_LEVELS,
            payload: {
                packId
            }
        }),

        browsePacks: () => dispatch({
            type: A.BROWSE_PACKS,
        }),

        updateSettings: (changes: Partial<T>) => dispatch({
            type: A.UPDATE_SETTINGS,
            payload: changes,
        }),

        endTransition: () => dispatch({
            type: A.END_TRANSITION
        }),

        /**
         * isReplay determines whether the screen transition is backwards or forwards
         */
        playLevel: (level: LevelIdentifier, isReplay: boolean = false) => dispatch({
            type: A.PLAY_LEVEL,
            payload: {
                ...level,
                isReplay,
            },
            meta: {
                timestamp: Date.now(),
            }
        }),

        /**
         * right now passing level props and victory props as one object, but could change
         */
        completeLevel: ({time, moves, stars, levelId, packId}: Victory & LevelIdentifier) => dispatch({
            type: A.COMPLETE_LEVEL,
            payload: {
                victory: {time, moves, stars},
                level: {levelId, packId},
            },
            meta: {
                timestamp: Date.now(),
            }
        }),

        /**
         * can provide a page to go back to, otherwise assumes the parent page
         */
        goBack: (page: AppPage) => dispatch({
            type: A.PRESS_BACK,
            payload: {
                page
            },
        }),

        openModal: (modal: AppModal) => dispatch({
            type: A.OPEN_MODAL,
            payload: modal,
        }),

        closeModal: () => dispatch({
            type: A.CLOSE_MODAL,
        })
    }
}

import {PackState, ScreenState, State} from "./types-state";
import {PackStatic} from "../components/types-pack";
import {InitialStateProps} from "../components/types-game";
import {PageType} from "./pages";

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

export const initialScreenState: ScreenState = {
    current: {
        type: PageType.SELECT_PACK
    },
    previous: {
        type: PageType.APP_LOADING
    },
    isTransitioning: false,
    modal: null,
    isGoingBack: false,
}

/**
 * create an initial state from an array of packs and an object of initial/default settings
 */
export const createInitialState = <S extends State<any>>({initialSettings, packs}: InitialStateProps<S>): S => {
    return {
        settings: initialSettings,
        screen: initialScreenState,
        progress: packs.map(initialPackState),
    } as S;
}
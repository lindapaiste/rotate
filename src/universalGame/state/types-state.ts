import {AppPage} from "./pages";
import {AppModal} from "./modals";

/**
 * Use state only for things which are variable.  Do not store packStatic in state.
 *
 * State stores the current screen (not persisted), user settings, and the user's progress through packs and levels.
 *
 * could add other sections like preferences, purchases, etc.
 */
export interface State<S> {
    settings: S;
    screen: ScreenState;
    progress: PackState[];
}

export interface ScreenState {
    current: AppPage;
    previous: AppPage;
    isTransitioning: boolean;
    isGoingBack: boolean;
    modal: AppModal | null;
    //store modal transition here?
}

/**
 * the changeable state associated with a given pack
 */
export interface PackState {
    /**
     * unique numeric identifier
     */
    packId: number;
    /**
     * whether the pack is unlocked
     */
    unlocked: boolean;
    /**
     * the number of levels which have been won
     */
    victoryCount: number;
    /**
     * raw data for each levels victories. It is a double array ( level, victories) because a level may have been won
     * multiple times.  A level should have an empty array if never won.
     */
    levelVictories: StoredVictory[][];
    /**
     * an array of timestamps for each level.  includes times the level was played but not won
     */
    lastPlayed: (number | undefined)[];
}

export interface Victory {
    moves: number;
    time: number;
    stars: number;
}

export interface StoredVictory extends Victory {
    timestamp: number;
}

/**
 * get settings from State
 */
export type StateSettings<S extends State<any>> = S extends State<infer T> ? T : never;

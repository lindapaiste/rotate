import {PackState, ScreenState, State, StoredVictory, Victory} from "../state/types-state";
import {emptyPackState} from "../state/empty-state";
import {getParentPage, levelBest, packLastPlayed} from "./helpers";
import {ifNotNull} from "../../lib";
import {LevelIdentifier} from "../components/types-pack";

/**
 * selector returns an empty state rather than undefined
 */
export const getPackState = (packId: number) => (state: State<any>): PackState => {
    return state.progress[packId] || emptyPackState(packId);
}

export const getIsUnlocked = (packId: number) => (state: State<any>): boolean => {
    return getPackState(packId)(state).unlocked;
}

/**
 * return the array of all victories for a level, which might be empty
 */
const getRawLevelVictories = ({levelId, packId}: LevelIdentifier) => (state: State<any>): StoredVictory[] => {
    return getPackState(packId)(state).levelVictories[levelId] || [];
};

/**
 * get the best time, moves, and stars for a level from all the wins,
 * or null if the level has never been won
 */
export const getLevelBest = (level: LevelIdentifier) => (state: State<any>): Victory | null => {
    return levelBest(getRawLevelVictories(level)(state));
};

/**
 * not every level will be completed, so can return a sparse array, or infill with null
 * can I expect every level to have a key?? depends on how the state was initialized
 * might be sparse array with some undefined and shorter than the expected length
 * returning undefined instead of null for levels never won makes array length not an issue
 * could pass in the levelCount, or find somewhere in the state, to use with makeArray
 */
export const getPackBests = (packId: number) => (state: State<any>): (Victory | undefined)[] => {
    const rawVictories = getPackState(packId)(state).levelVictories;
    return rawVictories.map(data => ifNotNull(levelBest(data), undefined));
}


/**
 * return all current settings
 */
export const getAllSettings = <S>(state: State<S>): S => {
    return state.settings;
};

/**
 * look up the value of a specific setting
 */
export const getSetting = <S extends object>(setting: keyof S) => (state: State<S>): S[typeof setting] => {
    return state.settings[setting];
};

/**
 * return the timestamp that the level was last played
 * or null if it has never been played
 */
export const getLevelLastPlayed = ({packId, levelId}: LevelIdentifier) => (state: State<any>): number | null => {
    return getPackState(packId)(state).lastPlayed[levelId] || null;
}

/**
 * get the timestamp of the most recent play of any level in the pack
 */
export const getPackLastPlayed = (packId: number) => (state: State<any>): number | null => {
    return packLastPlayed(getPackState(packId)(state));
}


/**
 * returns the current page and the one transitioning from
 */
export const getScreen = (state: State<any>): ScreenState => {
    return state.screen;
}

/**
 * whether or not to show a back button based on the value of the current screen
 */
export const hasBack = (state: State<any>): boolean => {
    return getParentPage(state.screen.current) !== null;
}


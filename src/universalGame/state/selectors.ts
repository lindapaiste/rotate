import {
    LevelIdentifier,
    PackState,
    PackStatic,
    ScreenState,
    State,
    StateLevel,
    StatePack,
    StoredVictory,
    Titles,
    Victory
} from "./types-state";
import {emptyPackState} from "./empty-state";
import {getParentPage, levelBest, minimumMoves, packLastPlayed, packToProps} from "./helpers";
import {ifNotNull} from "../../lib";
import {I_PackProps} from "../components/types-components";
import {Page, PageType} from "./pages";

/**
 * selector returns an empty state rather than undefined
 */
const getPackState = (packId: number) => (state: State<any, any>): PackState => {
    return state.progress[packId] || emptyPackState(packId, state.packs[packId].initialUnlocked);
}

export const getIsUnlocked = (packId: number) => (state: State<any, any>): boolean => {
    return getPackState(packId)(state).unlocked;
}

/**
 * return the array of all victories for a level, which might be empty
 */
const getRawLevelVictories = ({levelId, packId}: LevelIdentifier) => (state: State<any, any>): StoredVictory[] => {
    return getPackState(packId)(state).levelVictories[levelId] || [];
};

/**
 * get the best time, moves, and stars for a level from all the wins,
 * or null if the level has never been won
 */
export const getLevelBest = (level: LevelIdentifier) => (state: State<any, any>): Victory | null => {
    return levelBest(getRawLevelVictories(level)(state));
};

/**
 * could use props first and last to do lazy loading
 *
 * what additional info is needed here?
 */
export const getLevelGridData = () => (state: State<any, any>) => {
};

/**
 * not every level will be completed, so can return a sparse array, or infill with null
 * can I expect every level to have a key?? depends on how the state was initialized
 * might be sparse array with some undefined and shorter than the expected length
 * returning undefined instead of null for levels never won makes array length not an issue
 * could pass in the levelCount, or find somewhere in the state, to use with makeArray
 */
export const getPackBests = (packId: number) => (state: State<any, any>): (Victory | undefined)[] => {
    const rawVictories = getPackState(packId)(state).levelVictories;
    return rawVictories.map(data => ifNotNull(levelBest(data), undefined));
}


/**
 * return all current settings
 */
export const getAllSettings = <S>(state: State<S, any>): S => {
    return state.settings;
};

/**
 * look up the value of a specific setting
 */
export const getSetting = <S extends object>(setting: keyof S) => (state: State<S, any>): S[typeof setting] => {
    return state.settings[setting];
};

/**
 * return the timestamp that the level was last played
 * or null if it has never been played
 */
export const getLevelLastPlayed = ({packId, levelId}: LevelIdentifier) => (state: State<any, any>): number | null => {
    return getPackState(packId)(state).lastPlayed[levelId] || null;
}

/**
 * get the timestamp of the most recent play of any level in the pack
 */
export const getPackLastPlayed = (packId: number) => (state: State<any, any>): number | null => {
    return packLastPlayed(getPackState(packId)(state));
}


/**
 * returns the current page and the one transitioning from
 */
export const getPage = (state: State<any, any>): ScreenState => {
    return state.screen;
}


export const getPackStatic = (packId: number) => <S extends State<any, any>>(state: S): StatePack<S> => {
    return state.packs[packId];
}


export const getPackProps = (packId: number) => <S extends State<any, any>>(state: S): I_PackProps<StatePack<S>> => {
    return packToProps(
        state.packs[packId],
        getPackState(packId)(state),
    );
}

export const getAllPackProps = (state: State<any, any>) => {
    return state.packs.map(pack => packToProps(pack, getPackState(pack.packId)(state)))
}

/**
 * has a next level if the pack is infinite or if levelId + 1 is a defined level
 */
export const getHasNextLevel = (level: LevelIdentifier) => (state: State<any, any>): boolean => {
    const pack = state.packs[level.packId];
    return pack.infinite ? true : pack.levels.length > level.levelId + 1;
}

export const getLevelProps = (level: LevelIdentifier) => <S extends State<any, any>>(state: S): StateLevel<S> => {
    const pack: PackStatic<StateLevel<S>> = state.packs[level.packId];
    return pack.infinite ? pack.getLevel(level.levelId) : pack.levels[level.levelId];
}

export const getMinimumMoves = (level: LevelIdentifier) => <L>(state: State<any, PackStatic<L>>): number | null => {
    const props = getLevelProps(level)(state);
    return minimumMoves(props);
}

export const hasBack = (state: State<any, any>): boolean => {
    return getParentPage(state.screen.current) !== null;
}

export const getTitles = (page: Page) => <L extends Partial<Titles>>(state: State<any, PackStatic<L>>): Partial<Titles> => {
    switch (page.type) {
        case PageType.SELECT_LEVEL:
            const pack = getPackStatic(page.packId)(state);
            return {
                title: pack.title,
                subtitle: pack.subtitle,
            };
        case PageType.WIN_LEVEL:
        case PageType.PLAY_LEVEL:
            const level = getLevelProps(page)(state);
            return {
                title: level.title || `Level ${page.levelId + 1}`,
                subtitle: level.subtitle,
            }
        case PageType.SELECT_PACK:
            return {
                title: "Level Packs",
            }
        default:
            return  {};
    }
}


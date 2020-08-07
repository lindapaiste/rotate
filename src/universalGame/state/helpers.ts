import {LevelIdentifier, PackState, PackStatic, StoredVictory, Victory} from "./types-state";
import {emptyPackState} from "./empty-state";
import {I_PackProps} from "../components/types-components";
import {ifDefined} from "../../lib";
import {Page, PageType} from "./pages";

export const getLevelKey = ({levelId, packId}: LevelIdentifier): string => {
    return packId + "_" + levelId;
    //you can actually have a number type with _ as a numeric separator
}

export const getKeyLevel = (key: string): LevelIdentifier => {
    const [packId, levelId] = key.split("_").map(v => parseInt(v));
    return {
        packId,
        levelId
    }
}

/**
 * replaces undefined with an empty pack state
 * needs the packId to create the empty state
 */
export const definitelyPack = (pack: PackState | undefined, packId: number, unlocked?: boolean): PackState => {
    return pack === undefined ? emptyPackState(packId, unlocked) : pack;
}

/** ----------------------------------LEVEL BESTS------------------------------------------- **/

const isCompleted = (data: StoredVictory[] | undefined): data is StoredVictory[] & { 0: StoredVictory } => data !== undefined && data.length > 0;

const bestMoves = (data: StoredVictory[]): number => Math.min(...data.map(v => v.moves));

const bestTime = (data: StoredVictory[]): number => Math.min(...data.map(v => v.time));

const bestStars = (data: StoredVictory[]): number => Math.max(...data.map(v => v.stars));

export const levelBest = (data: StoredVictory[] | undefined): Victory | null => {
    if (isCompleted(data)) {
        return ({
            moves: bestMoves(data),
            time: bestTime(data),
            stars: bestStars(data),
        })
    } else {
        return null;
    }
};

/** ----------------------------------PACK TO PROPS----------------------------------------- **/

/**
 * get the timestamp of the most recent play of any level in the pack
 */
export const packLastPlayed = (packState: PackState): number | null => {
    //do I need to filter out anything?  like undefined?  or is 0 the default?
    const times = packState.lastPlayed.filter(v => !!v) as number[];
    return times.length > 0 ? Math.max(...times) : null;
}

/**
 * returns the level count of a defined pack or null for an infinite pack
 */
export const packLevelCount = (packStatic: PackStatic<any>): number | null => {
    return packStatic.infinite ? null : packStatic.levels.length;
}

/**
 * maps static properties of the pack and current pack state into standardized pack props interface
 */
export const packToProps = <P extends PackStatic<any>>(packStatic: P, packState: PackState): I_PackProps<P> => {
    return {
        ...packStatic,
        ...packState,
        levelCount: packLevelCount(packStatic),
        lastPlayed: packLastPlayed(packState),
    }
}

/** ----------------------------------PACK LEVELS----------------------------------------- **/

export const hasNextLevel = (pack: PackStatic<any>, levelId: number): boolean => {
    return pack.infinite ? true : pack.levels.length > levelId + 1;
}

export const levelProps = <L>(pack: PackStatic<L>, levelId: number): L => {
    return pack.infinite ? pack.getLevel(levelId) : pack.levels[levelId];
}

export const minimumMoves = <L>(props: L & { minimumMoves?: number }): number | null => { // L extends {minimumMoves: number} ? number : null
    return ifDefined(props.minimumMoves, null);
}


/** ----------------------------------BACK----------------------------------------- **/

/**
 * define what page to go back to from any screen
 */
export const getParentPage = (current: Page): Page | null => {
    switch (current.type) {
        case PageType.SELECT_LEVEL:
            return {
                type: PageType.SELECT_PACK
            }
        case PageType.WIN_LEVEL:
        case PageType.PLAY_LEVEL:
            return {
                type: PageType.SELECT_LEVEL,
                packId: current.packId,
            }
        case PageType.APP_LOADING:
        case PageType.HOME:
        case PageType.SELECT_PACK:
            return null;
    }
}

/** ----------------------------------TITLES----------------------------------------- **/


import {LevelIdentifier, PackStatic, Titles} from "../components/types-pack";
import {AppPage, PageType} from "../state/pages";
import {PropPacks} from "../components/types-game";

/**
 * helper functions which require an array of pack/level data
 */

/**
 * shorthand for when the specific info in the packs doesn't matter
 */
type Packs = PackStatic<any>[];

/** ----------------------------------LEVELS----------------------------------------- **/

/**
 * has a next level if the pack is infinite or if levelId + 1 is a defined level
 */
export const getHasNextLevel = (level: LevelIdentifier, packs: Packs): boolean => {
    const pack = packs[level.packId];
    return pack.infinite ? true : pack.levels.length > level.levelId + 1;
}

/**
 * either get the stored array of props, or call upon the pack "getLevel" method for infinite packs
 */
export const getLevelProps = <L>(level: LevelIdentifier, packs: PackStatic<L>[] ): L => {
    const pack = packs[level.packId];
    if (pack.infinite) {
        return pack.getLevel(level.levelId);
    }
    return pack.levels[level.levelId];
}

export const isInfinite = (packId: number, packs: Packs): boolean => {
    return packs[packId].infinite;
}

/** ----------------------------------TITLES----------------------------------------- **/

/**
 * title depends on the value of the current page
 */
export const getTitles = ( page: AppPage, packs: Packs ): Partial<Titles> => {
    switch (page.type) {
        case PageType.SELECT_LEVEL:
            const pack = packs[page.packId];
            return {
                title: pack.title,
                subtitle: pack.subtitle,
            };
        case PageType.WIN_LEVEL:
        case PageType.PLAY_LEVEL:
            try {
                const level = getLevelProps(page, packs);
                return {
                    title: level.title || `Level ${page.levelId + 1}`,
                    subtitle: level.subtitle,
                }
            } catch (e) { //hacky fix for infinite
                return {
                    title: `Level ${page.levelId + 1}`,
                }
            }
        case PageType.SELECT_PACK:
            return {
                title: "Level Packs",
            }
        default:
            return {};
    }
}


/** ----------------------------------BACK----------------------------------------- **/

/**
 * define what page to go back to from any screen
 * this mostly just depends on the current page, but the value for play and win depends on whether the current pack is
 * infinite or not
 */
export const getParentPage = (current: AppPage, packs: PackStatic<any>[]): AppPage | null => {
    switch (current.type) {
        case PageType.SELECT_LEVEL:
            /**
             * go from select level to select pack
             */
            return {
                type: PageType.SELECT_PACK
            }
        case PageType.WIN_LEVEL:
        case PageType.PLAY_LEVEL:
            /**
             * from win screen and play screen, go to select level for a defined pack,
             * or to browse packs for an infinite pack
             */
            if ( isInfinite(current.packId, packs ) ) {
                return {
                    type: PageType.SELECT_PACK
                }
            }
            else return {
                type: PageType.SELECT_LEVEL,
                packId: current.packId,
            }
        case PageType.APP_LOADING:
        case PageType.HOME:
        case PageType.SELECT_PACK:
            /**
             * if I define a home screen which is separate than select pack, then there would be a back
             */
            return null;
    }
}

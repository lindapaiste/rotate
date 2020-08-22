import {LevelIdentifier, Titles} from "../components/types-pack";
import {AppPage, PageType} from "../state/pages";
import {PropPacks} from "../components/types-game";

/**
 * helper functions which require an array of pack/level data
 */


/**
 * has a next level if the pack is infinite or if levelId + 1 is a defined level
 */
export const getHasNextLevel = ({level, packs}: PropPacks<any> & { level: LevelIdentifier }): boolean => {
    const pack = packs[level.packId];
    return pack.infinite ? true : pack.levels.length > level.levelId + 1;
}

/**
 * either get the stored array of props, or call upon the pack "getLevel" method for infinite packs
 */
export const getLevelProps = <L>({level, packs}: PropPacks<L> & { level: LevelIdentifier }): L => {
    const pack = packs[level.packId];
    if (pack.infinite) {
        return pack.getLevel(level.levelId);
    }
    return pack.levels[level.levelId];
}

/**
 * title depends on the value of the current page
 */
export const getTitles = ({page, packs}: PropPacks<any> & { page: AppPage }): Partial<Titles> => {
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
                const level = getLevelProps({level: page, packs});
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

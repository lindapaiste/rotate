import {Victory} from "./types-state";

export enum PageType {
    APP_LOADING,
    HOME,
    SELECT_PACK,
    SELECT_LEVEL,
    PLAY_LEVEL,
    WIN_LEVEL,
}

/**
 * make Page a union of SpecificPage and this GenericPage
 * which has all of the possible properties but optional
 * so that TS knows these properties may be present
 */
type GenericPage = {
    type: PageType;
    packId?: number;
    levelId?: number;
    extra?: object;
}

/**
 * previously just had type and ids, but now including "extra"
 * as a way to ensure that rendering has all the necessary props
 */
type SpecificPage = {
    type: typeof PageType.APP_LOADING;
} | {
    type: typeof PageType.HOME;
} | {
    type: typeof PageType.SELECT_PACK;
} | {
    type: typeof PageType.SELECT_LEVEL;
    packId: number;
} | {
    type: typeof PageType.PLAY_LEVEL;
    packId: number;
    levelId: number;
} | {
    type: typeof PageType.WIN_LEVEL;
    packId: number;
    levelId: number;
    extra: {
        victory: Victory,
        best: Victory | null,
    }
}

export type Page = GenericPage & SpecificPage;

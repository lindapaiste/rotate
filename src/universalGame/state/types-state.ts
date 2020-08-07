import {Page} from "./pages";
import {Modal} from "./modals";

export interface PropPackId {
    packId: number;
}

export interface PropLevelId {
    levelId: number;
}

export interface PropIsBack {
    isGoingBack: boolean;
}

export interface LevelIdentifier {
    packId: number;
    levelId: number;
}

export interface ScreenState {
    current: Page;
    previous: Page;
    isTransitioning: boolean;
    isGoingBack: boolean;
    modal: Modal | null;
    //store modal transition here?
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
 * progress can either by nested by pack,
 * or flat and keyed by a key representing the pack and level ids
 * nested is a triple array: packs, levels, victories, because a level may have been won multiple times
 */
export type ProgressState = StoredVictory[][][];

export interface Titles {
    title: string;
    subtitle: string;
}

export interface PackShared<L> {
    title: string;
    subtitle?: string;
    image?: any;
    packId: number;
    initialUnlocked: boolean;
    infinite: boolean;
    levels?: L[];
    getLevel?( levelId: number ): L;
}

export interface DefinedPack<L> extends PackShared<L> {
    infinite: false;
    levels: L[];
}

export interface InfinitePack<L> extends PackShared<L> {
    infinite: true;
    getLevel( levelId: number ): L;
}

/**
 * called PackStatic because these are the immutable properties of a pack
 * extend this interface to include other custom props
 * union declares that if infinite is true then getLevel must exist
 * and if it's false then levels array must exist
 */
export type PackStatic<L> = PackShared<L> & (DefinedPack<L> | InfinitePack<L>)

/**
 * get the level type from the Pack type
 */
export type LevelType<P extends PackStatic<any>> = P extends PackStatic<infer L> ? L : never;

/**
 * the changeable state associated with a given pack
 */
export interface PackState {
    unlocked: boolean;
    packId: number;
    victoryCount: number;
    levelVictories: StoredVictory[][];
    lastPlayed: (number | undefined)[]; //an array of timestamps for each level
}



/**
 * can have other sections like preferences, purchases, etc.
 * store level json here, or elsewhere?
 */


/**
 * instead of applying a bunch of generics to State, use any or unknowns
 * and use conditional inferred types to get pieces of a specific instance of state
 *
 * things which are variable:
 * level props
 * extra props in pack
 * settings object
 */
export interface State<S, P> {
    settings: S;
    screen: ScreenState;
    progress: PackState[];
    packs: P[];
}

/*
from react useReducer type defs:

    type Reducer<S, A> = (prevState: S, action: A) => S;
    type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
    type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
 */

/**
 * get settings from State
 */
export type StateSettings<S extends State<any, any>> = S extends State<infer T, any> ? T : never;

export type StatePack<S extends State<any, any>> = S extends State<any, infer P> ? P : never;

export type StateLevel<S extends State<any, any>> = StatePack<S> extends PackStatic<infer L> ? L : never;

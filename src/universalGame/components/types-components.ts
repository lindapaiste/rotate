import {Page} from "../state/pages";
import {ComponentType, ReactNode} from "react";
import {LevelType, PackStatic, Victory} from "../state/types-state";
import {MaybeGenerate} from "../../lib";

/**
 * generics:
 * P represents Pack props/data
 * L represent Level props/data
 */


/**
 * each page render component can have callbacks (class methods?)
 * for onTransitionIn and and onTransitionOut
 * can pass the other component in the transition as an optional parameter
 * could pass the transition as a raw data prop that the component can respond to
 * could pass an animated value from 0 to 1 for the transition timing
 */
export interface TransitionProps {
    loadingIn: false | { from: Page };
    loadingOut: false | { to: Page };
    isGoingBack: boolean;
    endTransition(): void;
}

export type WithTransition<T> = T & TransitionProps;

export interface ModalProps {
    isOpen: boolean;

    onPressClose(): void;
}

/**
 * anything receiving packs gets this or some subset of it
 */
export type I_PackProps<P> = Omit<P & PackStatic<any>, 'levels'> & {
    unlocked: boolean;
    victoryCount: number;
    levelCount: number | null; //null if infinite
    lastPlayed: number | null; //just one timestamp, not the per-level array
}


/**
 * each page may get certain props from the state
 */


/**
 * needs to know all of the available packs and whether each one is unlocked
 * include static info of the pack along with variable progress props unlocked and victoryCount
 * could sort by recency with a lastPlayed prop
 */
export interface I_SelectPackProps<P> {
    packs: I_PackProps<P>[];

    onPressPack(packId: number): void;
}

/**
 * needs an array of level data
 * might want some info about the pack, like name etc.
 */
export type I_RenderPackProps<P> = I_PackProps<P> & {
    packId: number;
    unlocked: boolean;
    victoryCount: number;
    //what about other level props?
    levels: Array<Victory | undefined>; //want just the bests for each level, not every victory
    onPressLevel(levelId: number): void;
}

/**
 * minimum props for rendering a thumbnail on the render pack page
 * a custom render pack can add extra props
 */
export type I_LevelThumbProps<L> = L & {
    levelId: number;
    best?: Victory | null | undefined;
    onPress(): void;
}

/**
 * needs whatever specific props exist for this level
 * needs a callback to execute when the level has been won
 * generic L provides all of the specific props
 */
export type I_PlayLevelProps<L> = L & {
    previousBest: null | Victory;
    packId: number;
    levelId: number;
    onWin(victory: Victory): void;
}


/**
 * needs the outcome of the current level as well as the previous best outcome
 * in order to render continue button, need to know if there is a next level
 * and what to do when the continue button is clicked
 */
export interface I_WinScreenProps {
    current: Victory,
    previousBest: null | Victory;
    booleans: VictoryBooleans;
    minimumMoves: number | null;
    packId: number;
    levelId: number;
    hasNextLevel: boolean;

    onPressReplay(): void;
    onPressNext(): void;
}

export interface VictoryBooleans {
    isPerfect: boolean | undefined;
    isBestMoves: boolean;
    isBestTime: boolean;
    isBestStars: boolean;
}

export type I_UnlockPackProps<P> = I_PackProps<P> & {
    packId: number;
    onUnlock(): void;
    onUnlockAll(): void;
    onVisitStore(): void;
}

export interface I_StoreProps<P> {
    packs: I_PackProps<P>[];

    onUnlockPack( packId: number ): void;
    onUnlockAll(): void;
}

export interface I_TopMenuProps {
    hasBack: boolean;
    //allow these to be generators in the case that they are overwritten
    title?: MaybeGenerate<ReactNode, Page>;
    subtitle?: MaybeGenerate<ReactNode, Page>;
    current: Page; //needed for conditionals
    onPressBack(): void;
    onPressSettings?(): void;
}

export interface I_BackBarProps {
    //hasBack: boolean; not rendering at all if there is no page, so don't need this
    backPage?: Page;
    onPressBack(): void;
}

export interface I_EditSettingsProps<S> {
    settings: S;
    onUpdateSettings(changes: Partial<S>): void;
}

/**
 * is pack complete screen something separate from win screen?
 */

export interface PageComponents<S extends {}, P extends PackStatic<any>> {
    /**
     * screens
     */
    RenderSelectPack: ComponentType<TransitionProps & I_SelectPackProps<P>>;
    RenderSelectLevel: ComponentType<TransitionProps & I_RenderPackProps<P>>;
    //assume that PlayLevel includes the menu??
    RenderPlayLevel: ComponentType<TransitionProps & I_PlayLevelProps<LevelType<P>>>;
    RenderWinLevel: ComponentType<TransitionProps & I_WinScreenProps>;
    /**
     * modals
     */
    RenderUnlockPackModal: ComponentType<ModalProps & I_UnlockPackProps<P>>;
    RenderStoreModal: ComponentType<ModalProps & I_StoreProps<P>>;
    RenderSettingsModal: ComponentType<ModalProps & I_EditSettingsProps<S>>;
    /**
     * pieces
     */
    RenderTopMenu: ComponentType<I_TopMenuProps>;
}




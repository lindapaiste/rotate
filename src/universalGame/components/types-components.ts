import {AppPage} from "../state/pages";
import {ComponentType, ReactNode} from "react";
import {Victory} from "../state/types-state";
import {MaybeGenerate} from "../../lib";
import {LevelType, PackStatic} from "./types-pack";

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
    loadingIn: false | { from: AppPage };
    loadingOut: false | { to: AppPage };
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
export type PackProps<P> = Omit<P & PackStatic<any>, 'levels'> & {
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
export interface SelectPackProps<P> {
    packs: PackProps<P>[];

    onPressPack(packId: number): void;
}

/**
 * needs an array of level data
 * might want some info about the pack, like name etc.
 */
export type RenderPackProps<P> = PackProps<P> & {
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
export type LevelThumbProps<L> = L & {
    levelId: number;
    best?: Victory | null | undefined;
    onPress(): void;
}

/**
 * needs whatever specific props exist for this level
 * needs a callback to execute when the level has been won
 * generic L provides all of the specific props
 */
export type PlayLevelProps<L> = L & {
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
export interface WinScreenProps {
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

export type UnlockPackProps<P> = PackProps<P> & {
    packId: number;
    onUnlock(): void;
    onUnlockAll(): void;
    onVisitStore(): void;
}

export interface StoreProps<P> {
    packs: PackProps<P>[];

    onUnlockPack( packId: number ): void;
    onUnlockAll(): void;
}

export interface TopMenuProps {
    hasBack: boolean;
    //allow these to be generators in the case that they are overwritten
    title?: MaybeGenerate<ReactNode, AppPage>;
    subtitle?: MaybeGenerate<ReactNode, AppPage>;
    current: AppPage; //needed for conditionals
    onPressBack(): void;
    onPressSettings?(): void;
}

export interface BackBarProps {
    //hasBack: boolean; not rendering at all if there is no page, so don't need this
    backPage?: AppPage;
    onPressBack(): void;
}

export interface EditSettingsProps<S> {
    settings: S;
    onUpdateSettings(changes: Partial<S>): void;
}

/**
 * is pack complete screen something separate from win screen?
 */

/**
 * helpers apply universal props to screen and modal
 */
export type Screen<T> = ComponentType<TransitionProps & T>
export type Modal<T> = ComponentType<ModalProps & T>

/**
 * define an object of components with everything needed to render a game
 */
export interface PageComponents<S extends {}, P extends PackStatic<any>> {
    /**
     * screens
     */
    RenderAppLoading: ComponentType;
    RenderSelectPack: Screen<SelectPackProps<P>>;
    RenderSelectLevel: Screen<RenderPackProps<P>>;
    //assume that PlayLevel includes the menu??
    RenderPlayLevel: Screen<PlayLevelProps<LevelType<P>>>;
    RenderWinLevel: Screen<WinScreenProps>;
    /**
     * modals
     */
    RenderUnlockPackModal: Modal<UnlockPackProps<P>>;
    RenderStoreModal: Modal<StoreProps<P>>;
    RenderSettingsModal: Modal<EditSettingsProps<S>>;
    /**
     * pieces
     */
    RenderTopMenu: ComponentType<TopMenuProps>;
}

/**
 * inferred types
 */
export type CompPack<C> = C extends PageComponents<any, infer P> ? P : never;

export type CompSettings<C> = C extends PageComponents<infer S, any> ? S : never;

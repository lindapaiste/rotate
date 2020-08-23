import * as A from "./actionNames";
import {PackState, State, StateSettings, Victory} from "./types-state";
import {AppPage} from "./pages";
import {AppModal} from "./modals";
import {LevelIdentifier, PackStatic} from "../components/types-pack";

export type StateActions<S extends State<any>> = ActionType<StateSettings<S>>;

export type ActionType<Settings> = {
    /**
     * when clicking the back button, can pass an optional back page to go to
     * but likely this is predetermined based on the value of current
     * and does not need to be passed
     */
    type: typeof A.PRESS_BACK;
    payload: { page: AppPage };
} | {
    /**
     * no payload needed to browse packs
     * this is probably the home screen of the app
     */
    type: typeof A.BROWSE_PACKS;
} | {
    /**
     * go to the select levels screen for a pack by passing the pack id
     */
    type: typeof A.BROWSE_PACK_LEVELS;
    payload: { packId: number };
} | {
    /**
     * begins the loading in of a level
     * expect an end transition action when the load in is done
     * but if the game doesn't use isTransition at all then it won't matter
     * isReplay controls whether it is a "back" transition or not
     */
    type: typeof A.PLAY_LEVEL;
    payload: LevelIdentifier & { isReplay: boolean };
    meta: PropTimestamp;
} | {
    /**
     * could not pass the level ids and instead look at current page,
     * but this will create problems if somehow the current page is not Play Level
     * passing the level ids ensures that they are always known
     */
    type: typeof A.COMPLETE_LEVEL;
    payload: {
        victory: Victory;
        level: LevelIdentifier;
    };
    meta: PropTimestamp;
} | {
    /**
     * end transition doesn't require any other info
     */
    type: typeof A.END_TRANSITION;
} | {
    /**
     * need a pack id to unlock it
     */
    type: typeof A.UNLOCK_PACK;
    payload: { packId: number };
} | {
    /**
     * adding a new empty pack state requires the pack id as well as whether it is unlocked
     * rely on the action creator to make a whole pack state, though could do this in the reducer as well
     */
    type: typeof A.INITIALIZE_PACK;
    payload: PackState;
} | {
    /**
     * no payload to unlock all packs
     */
    type: typeof A.UNLOCK_ALL;
} | {
    /**
     * rather than a singular update settings with key and value, pass a subset of the settings state
     * it is easier to type this way and allows for changing multiple settings at once
     */
    type: typeof A.UPDATE_SETTINGS;
    payload: Partial<Settings>;
} | {
    /**
     * need to know the modal type and any other defining props
     */
    type: typeof A.OPEN_MODAL;
    payload: AppModal;
} | {
    /**
     * closing a modal doesn't require any data
     */
    type: typeof A.CLOSE_MODAL;
}


/**
 * define an object with timestamp property because multiple actions use this
 */
export interface PropTimestamp {
    timestamp: number;
}

/**
 * define an object with a function which creates and dispatches an action for each action type
 */
export interface ActionsObject<Settings> {

    initializePack(pack: PackStatic<any>): void;

    unlockPack(packId: number): void;

    unlockAll(): void;

    browseLevels(packId: number): void;

    browsePacks(): void;

    updateSettings(changes: Partial<Settings>): void;

    playLevel(level: LevelIdentifier, isReplay?: boolean): void;

    completeLevel(props: Victory & LevelIdentifier): void;

    goBack(page: AppPage): void;

    endTransition(): void;

    openModal( modal: AppModal): void;

    closeModal(): void;
}


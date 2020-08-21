import {ActionType, StateActions} from "./types-actions";
import * as A from "./actionNames";
import {PackState, ScreenState, State, StateSettings} from "./types-state";
import {replaceIndex} from "../../lib";
import {Page, PageType} from "./pages";
import {definitelyPack, getParentPage} from "./helpers";
import {Reducer} from "redux";
import {getLevelBest} from "./selectors";

export const screen = (state: ScreenState, action: ActionType<any>, wholeState: State<any, any>): ScreenState => {
    /**
     * helper function for creating a transition state
     */
    const transitionTo = (page: Page, isGoingBack: boolean = false, previous = state.current): ScreenState => {
        console.log("transitioning to");
        console.log( page );
        return ({
            previous,
            current: page,
            isTransitioning: true,
            isGoingBack,
            modal: null, //close modals on transition
        });
    }
    /**
     * switch between navigation actions
     */
    switch (action.type) {
        case A.END_TRANSITION:
            return {
                ...state,
                isTransitioning: false,
            }
        case A.PRESS_BACK: {
            const target = action.payload.page || getParentPage(state.current);
            if (target === null) {
                return state;
            } else {
                return transitionTo(target, true);
            }
        }
        case A.BROWSE_PACK_LEVELS:
            //could be coming from the home screen or clicking back on an individual level
            return transitionTo({
                type: PageType.SELECT_LEVEL,
                packId: action.payload.packId,
            });
        case A.COMPLETE_LEVEL:
            //can assign state.current to previous, or create Play Level with passed level props
            //in practice these should always be the same
            return transitionTo({
                ...action.payload.level,
                type: PageType.WIN_LEVEL,
                extra: {
                    victory: action.payload.victory,
                    best: getLevelBest(action.payload.level)(wholeState),
                }
            });
        case A.PLAY_LEVEL:
            //can be coming from the win screen of the previous level or from the pack levels grid
            return transitionTo({
                ...action.payload,
                type: PageType.PLAY_LEVEL,
            }, action.payload.isReplay);
        case A.BROWSE_PACKS: {
            //is either the home screen or returning from a specific pack
            return transitionTo({
                type: PageType.SELECT_PACK,
            })
        }
        case A.OPEN_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        case A.CLOSE_MODAL:
            return {
                ...state,
                modal: null,
            }
        default:
            return state;
    }
}

export const settings = <Settings>(state: Settings, action: ActionType<Settings>, wholeState: State<Settings, any>): Settings => {
    switch (action.type) {
        case A.UPDATE_SETTINGS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export const progress = (state: PackState[], action: ActionType<any>, wholeState: State<any, any>): PackState[] => {
    /**
     * use a helper here in part because cannot use const/let with the same variables
     * such as pack and packId across multiple branches of the switch
     *
     * helper takes the packId and a function which maps the existing to the updated
     * can return a partial PackState from the updater and join this with the existing
     * it handles getting the existing pack data and replacing just this pack in the array
     */
    const updatePack = (packId: number, update: (pack: PackState) => Partial<PackState>): PackState[] => {
        const current = definitelyPack(state[packId], packId, wholeState.packs[packId].initialUnlocked);
        return replaceIndex(state, packId, {
            ...current,
            ...update(current),
        });
    }
    /**
     * switch between specific actions
     */
    switch (action.type) {
        case A.UNLOCK_PACK:
            return updatePack(
                action.payload.packId, () => ({
                    unlocked: true
                })
            );
        case A.UNLOCK_ALL:
            //TODO: how to unlock future packs
            return state.map(pack => ({
                ...pack,
                unlocked: true,
            }))
        case A.COMPLETE_LEVEL:
            return updatePack(
                action.payload.level.packId, (pack) => {
                    const {level} = action.payload;
                    const victories = pack.levelVictories[level.levelId] || [];
                    const isNewVictory = victories.length === 0;
                    return {
                        levelVictories: replaceIndex(pack.levelVictories, level.levelId, [...victories, {
                            ...action.payload.victory,
                            timestamp: action.meta.timestamp,
                        }]),
                        victoryCount: isNewVictory ? pack.victoryCount + 1 : pack.victoryCount,
                    }
                }
            );
        case A.PLAY_LEVEL:
            //save last played date when starting level because want to know this even if the user leaves without winning
            return updatePack(
                action.payload.packId, (pack) => ({
                    lastPlayed: replaceIndex(pack.lastPlayed, action.payload.levelId, action.meta.timestamp)
                })
            );
        default:
            return state;
    }
};

/**
 * custom combine reducers includes full state as third argument
 */
export const reducer = <S extends State<any, any>>(state: S, action: StateActions<S>): S => ({
    screen: screen(state.screen, action, state),
    settings: settings<StateSettings<S>>(state.settings, action, state),
    progress: progress(state.progress, action, state),
    packs: state.packs, //never actually update this
}) as S;

/**
 * the redux definition of a reducer requires that the state might be undefined
 * in order to customize the default state, have to pass it in
 *
 * react useReducer hook does not have this problem
 */
//export const createReducer = <S, P>(initialState: State<S, P>): Reducer<State<S, P>, ActionType<S>> =>
export const createReducer = <S extends State<any, any>>(initialState: S): Reducer<S, StateActions<S>> =>
    (state, action) => reducer(state || initialState, action);

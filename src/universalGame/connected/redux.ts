import {createStore, Reducer} from 'redux';
import {createReducer} from "../state/reducer";
import {State} from "../state/types-state";
import {InitialStateProps} from "../components/types-game";
import {createInitialState} from "./initialState";
//import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import storage from "./storage";
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {ActionType, StateActions} from "../state/types-actions";

const persistConfig = {
    key: "root",
    storage,
    /**
     * don't persist current screen, just persist progress and settings
     */
    blacklist: [
        'screen'
    ],
    /**
     * need to make sure that any new packs are added to the state. Can do this with a manual check, or by using a
     * level 2 merge such that progress for existing packs is preserved, but empty pack progress remains in state.
     * At some point I need to handle the situation of an "unlock all" purchase which unlocks future packs.
     */
    stateReconciler: autoMergeLevel2,
};

/**
 * takes the same props as createInitialState ( packs and initialSettings ) but returns a redux store instance
 */
export default <S extends State<any>>({initialSettings, packs}: InitialStateProps<S>) => {

    const initialState = createInitialState({initialSettings, packs});

    const reducer = createReducer(initialState);

    const persistedReducer = persistReducer<S, ActionType<StateActions<S>>>(persistConfig, reducer);

    // don't need to pass preloaded state here because already applied to to reducer
    // may want to revisit this design pattern and move some properties from passed-in initialState to reducer defaults
    const store = createStore(persistedReducer);

    const persistor = persistStore(store);

    return {store, persistor};
};

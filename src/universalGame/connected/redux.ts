import { createStore } from 'redux';
import {createReducer} from "../state/reducer";
import {State} from "../state/types-state";
import {StateProps} from "../components/types-game";
import {createInitialState} from "./initialState";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: "root",
    storage: ExpoFileSystemStorage,
    // don't persist current screen, just persist progress and settings
    blacklist: [
        'screen'
    ]
};

/**
 * takes the same props as createInitialState ( packs and initialSettings ) but returns a redux store instance
 */
export default <S extends State<any, any>>({initialSettings, packs}: StateProps<S>) => {

    const initialState = createInitialState({initialSettings, packs});

    const reducer = createReducer(initialState);

    const persisted = persistReducer(persistConfig, reducer);

    // don't need to pass preloaded state here because already applied to to reducer
    // may want to revisit this design pattern and move some properties from passed-in initialState to reducer defaults
    return createStore(persisted);
};

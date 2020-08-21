import React from "react";
import {State} from "../../state/types-state";
import {Screen} from "./Screen";
import {DisplayProps, StateProps} from "../types-game";
import {PersistGate} from "redux-persist/integration/react";
import {Provider as ReduxProvider} from "react-redux";
import {createInitialState} from "../../connected/initialState";
import createStore from "../../connected/redux";
import {persistStore} from "redux-persist";
import {makeActions} from "../../state/actions";

/**
 * want to have some sort of universal dispatch so that you can do things like unlock a pack based on progress of the
 * previous pack, etc.
 */


/**
 * wrap the screen component in the redux store
 * put PaperProvider out here so that the AppLoading screen has access to it - maybe?  what about expo app loading?
 */
export const Game = <S extends State<any, any>>({initialSettings, packs, ...props}: StateProps<S> & DisplayProps<S>) => {

    const store = createStore({initialSettings, packs});

    const persisted = persistStore(store);

    const {RenderAppLoading} = props.Components;

    return (
        <ReduxProvider store={store}>
            <PersistGate
                persistor={persisted}
                loading={<RenderAppLoading/>}
                onBeforeLift={() => undefined}
            >
                <Screen
                    {...props}
                    state={store.getState()}
                    dispatch={store.dispatch}
                    actions={makeActions(store.dispatch)}
                />
            </PersistGate>
        </ReduxProvider>
    )
}

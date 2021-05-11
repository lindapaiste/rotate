import React, {createContext, useContext} from "react";
import {Screen} from "./Screen";
import {GameProps} from "../types-game";
import {PersistGate} from "redux-persist/integration/react";
import {Provider as ReduxProvider} from "react-redux";
import createStore from "../../connected/redux";
import {makeActions} from "../../state/actions";
import {PackStatic} from "../types-pack";
import {Provider as PaperProvider} from "react-native-paper";
import {makeIconSetting} from "./Icons";


/**
 * Game component establishes state and wraps the screen in various Providers
 * PaperProvider goes outside of everything so that the AppLoading screen has access to it - maybe?  what about expo app loading?
 * ReduxProvider and PersistGate handle the loading of state, delaying the app from showing until ready.
 *
 * note: ReduxProvider is never actually used within this pack, as all props are passed down rather than accessed with
 * connect() HOC or redux hook. However it is a good practice to wrap in the Provider anyways so that individual games
 * using this package have the ability to access state if they need any additional information beyond the standard
 * props for each component.
 *
 * what about a packs provider?
 *
 * want to have some sort of universal dispatch so that you can do things like unlock a pack based on progress of the
 * previous pack, etc.
 */
export const Game = <S extends {}, P extends PackStatic<any>>({initialSettings, packs, theme, icons, ...props}: GameProps<S, P>) => {

    const {store, persistor} = createStore({initialSettings, packs});

    console.log(store);

    const {RenderAppLoading} = props.Components;

    return (
        <PaperProvider
            theme={theme}
            settings={!!icons ? {icon: makeIconSetting(icons)} : undefined}
        >
            <ReduxProvider store={store}>
                <PersistGate
                    persistor={persistor}
                    loading={<RenderAppLoading/>}
                    onBeforeLift={() => undefined}
                >
                    <ActionsContext.Provider
                        value={makeActions(store.dispatch)}
                    >
                    <Screen
                        {...props}
                        packs={packs}
                        state={store.getState()}
                        dispatch={store.dispatch}
                        actions={makeActions(store.dispatch)}
                    />
                    </ActionsContext.Provider>
                </PersistGate>
            </ReduxProvider>
        </PaperProvider>
    )
}

/**
 * don't need state in a GameContext because use ReduxProvider for that to avoid getting stale state
 * packs and actions don't change, so that's not an issue
 * could share a provider, but using separate ones
 */

const ActionsContext = createContext(makeActions((action) => console.error("attempting to call action outside of a context provider", action)));

export const useActions = () => useContext(ActionsContext);

const PacksContext = createContext([]);

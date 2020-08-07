import React from "react";
import {State} from "../../state/types-state";
import {getPage, getTitles, hasBack} from "../../state/selectors";
import {View} from "react-native";
import {Portal, Provider as PaperProvider} from "react-native-paper";
import {ModalType} from "../../state/modals";
import {RenderModal} from "./Modal";
import {RenderPage} from "./Page";
import {DisplayProps, GameConnected} from "../types-game";
import {makeIconSetting} from "./Icons";

/**
 * setting up the state is tricky,
 * so here I am assuming that the state and dispatch have already been set up and are being passed in
 */


export const Screen = <S extends State<any, any>>(props: DisplayProps<S> & GameConnected<S>) => {

    const {state, actions, Components, theme, icons} = props;

    const {current, previous, isTransitioning, isGoingBack, modal} = getPage(state);

    return (
        <PaperProvider
            theme={theme}
            settings={!!icons ? {icon: makeIconSetting(icons)} : undefined}
        >
            <View style={{
                flex: 1,
                backgroundColor: theme.colors.background,
            }}>
                <Components.RenderTopMenu
                    hasBack={hasBack(state)}
                    onPressBack={() => actions.goBack()}  //don't want to pass event e as the prop page
                    onPressSettings={() => actions.openModal({type: ModalType.SETTINGS})}
                    current={current}
                    {...getTitles(current)(state)}
                />
                {isTransitioning && //only do anything while transitioning, don't render at all otherwise
                <Portal>
                    <RenderPage
                        {...props}
                        page={previous}
                        transition={{
                            loadingIn: false,
                            loadingOut: {to: current},
                            isGoingBack,
                            endTransition: actions.endTransition,
                        }}
                    />
                </Portal>
                }
                <RenderPage
                    {...props}
                    page={current}
                    transition={{
                        loadingIn: isTransitioning ? {from: previous} : false,
                        loadingOut: false,
                        isGoingBack,
                        endTransition: actions.endTransition,
                    }}
                />
                <Portal>
                    <RenderModal
                        {...props}
                        modal={modal}
                    />
                </Portal>
            </View>
        </PaperProvider>
    )
}

/**
 * only putting in PaperProvider here in order to use Modals/Portals
 */

/**
 * need styling around back bar
 * is there a config icon in here?
 *
 * it seems like back bar and bottom menu need to be part of the page they are on in order to transition properly
 *
 * where do menu and update settings come into play?
 */

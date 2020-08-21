import React, {useState} from "react";
import {State} from "../../state/types-state";
import {getPage, getTitles, hasBack} from "../../state/selectors";
import {Dimensions, LayoutRectangle, View} from "react-native";
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

/**
 * based on this current implementation, the TopMenu is always present
 * want for the page which is transitioning off to not have height larger than the screen
 * fixes bug where content gets stretched out when transitioning to a page which is scrollable
 */

export const Screen = <S extends State<any, any>>(props: DisplayProps<S> & GameConnected<S>) => {

    const {state, actions, Components, theme, icons} = props;

    const {current, previous, isTransitioning, isGoingBack, modal} = getPage(state);

    const [menuHeight, setMenuHeight] = useState(0);

    return (
        <PaperProvider
            theme={theme}
            settings={!!icons ? {icon: makeIconSetting(icons)} : undefined}
        >
            {isTransitioning && //only do anything while transitioning, don't render at all otherwise
            <Portal
            >
                <View style={{
                    marginTop: menuHeight,
                    width: "100%",
                    height: Dimensions.get('window').height - menuHeight,
                    overflow: "hidden",
                }}
                >
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
                </View>
            </Portal>
            }

            <View style={{
                flex: 1,
                backgroundColor: theme.colors.background,
            }}>
                <View
                    // need to wrap in a view to access onLayout
                    onLayout={e => setMenuHeight(e.nativeEvent.layout.height)}
                >
                    <Components.RenderTopMenu
                        hasBack={hasBack(state)}
                        onPressBack={() => actions.goBack()}  //don't want to pass event e as the prop page
                        onPressSettings={() => actions.openModal({type: ModalType.SETTINGS})}
                        current={current}
                        {...getTitles(current)(state)}
                    />
                </View>
                <View
                    style={{flex: 1}}
                >
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
                </View>
            </View>
            <Portal>
                <RenderModal
                    {...props}
                    modal={modal}
                />
            </Portal>
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

import React, {useState} from "react";
import {State} from "../../state/types-state";
import {getScreen} from "../../mapping/selectors";
import {Dimensions, View} from "react-native";
import {Portal, useTheme} from "react-native-paper";
import {RenderModal} from "./Modal";
import {RenderPage} from "./Page";
import {ScreenProps} from "../types-game";
import {PackStatic} from "../types-pack";
import {useSelector} from "react-redux";
import {ModalEffect} from "./ModalEffect";
import {getTopMenuProps} from "../../mapping/selectProps";

/**
 * Screen assumes that state has already been set up and is passed in
 *
 * handles displaying current screen, loading out screen, and modal
 *
 *
 * based on this current implementation, the TopMenu is always present
 * want for the page which is transitioning off to not have height larger than the screen
 * fixes bug where content gets stretched out when transitioning to a page which is scrollable
 */
export const Screen = <S extends State<any>, P extends PackStatic<any>>(rProps: ScreenProps<S, P>) => {

    const {actions, Components, packs} = rProps;

    /**
     * TODO: state which is passed by store.getState() will never refresh.  Need to get with a hook or HOC
     */
    const state = useSelector<S, S>(s => s);

    const props = {...rProps, state};

    console.log(state);

    const {current, previous, isTransitioning, isGoingBack, modal} = getScreen(state);

    const [menuHeight, setMenuHeight] = useState(0);

    return (
        <>
            {isTransitioning && //only do anything while transitioning, don't render at all otherwise
            <Portal>
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
                backgroundColor: useTheme().colors.background,
            }}>
                <View
                    // need to wrap in a view to access onLayout
                    onLayout={e => setMenuHeight(e.nativeEvent.layout.height)}
                >
                    <Components.RenderTopMenu
                        {...getTopMenuProps({...current, ...props})}
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
            {
                <ModalEffect modal={modal} closeModal={actions.closeModal}>
                    {(definiteModal) => (
                        <RenderModal
                            {...props}
                            modal={definiteModal}
                        />
                    )}
                </ModalEffect>
            }
        </>
    )
}
/**
 * need styling around back bar
 * is there a config icon in here?
 *
 * it seems like back bar and bottom menu need to be part of the page they are on in order to transition properly
 *
 * where do menu and update settings come into play?
 */

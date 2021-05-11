import React, {useState} from "react";
import {State, StateSettings} from "../../state/types-state";
import {getScreen} from "../../mapping/selectors";
import {Dimensions, View, ViewStyle} from "react-native";
import {useTheme} from "react-native-paper";
import {RenderModal} from "./Modal";
import {Props as RenderPageProps, RenderPage} from "./Page";
import {ScreenProps} from "../types-game";
import {PackStatic} from "../types-pack";
import {useSelector} from "react-redux";
import {ModalEffect} from "./ModalEffect";
import {getTopMenuProps} from "../../mapping/selectProps";
import {PageType} from "../../state/pages";


/**
 * Screen assumes that state has already been set up and is passed in
 *
 * handles displaying current screen, loading out screen, and modal
 *
 *
 * based on this current implementation, the TopMenu is always present
 * want for the page which is transitioning off to not have height larger than the screen
 * fixes bug where content gets stretched out when transitioning to a page which is scrollable
 *
 * Rather than separately inserting the current screen and the loading off screen, rewrote it to loop through all
 * screens so that the component that is transitioning away will be the same instance of the component, rather than a
 * new component with the same props.  This makes a difference when pressing back on play level, because the loading
 * out screen should show the level in it's current state of progress.
 *
 * Do not implement any ScrollViews here, expect for Render components to handle that.
 */
export const Screen = <S extends State<any>, P extends PackStatic<any>>(rProps: ScreenProps<S, P>) => {

    const {actions, Components, packs} = rProps;

    /**
     * state which is passed by store.getState() will never refresh.  Need to get with a hook or HOC
     */
    const state = useSelector<S, S>(s => s);

    const props = {...rProps, state};

    console.log(state);

    const {current, previous, isTransitioning, isGoingBack, modal} = getScreen(state);

    const [menuHeight, setMenuHeight] = useState(0);

    /**
     * get props for an individual screen type, or null if that screen should not be rendered
     *
     * note: this implementation would not work if current and previous could be the same type, ie. going from level to
     * level without win screen in between.
     */
    const getProps = (type: PageType): RenderPageProps<StateSettings<S>, P> | null => {
        /**
         * get props for the current page, which will get mapped later on
         */
        if (current.type === type) {
            return {
                ...props,
                page: current,
                transition: {
                    loadingIn: isTransitioning ? {from: previous} : false,
                    loadingOut: false,
                    isGoingBack,
                    endTransition: actions.endTransition,
                }
            }
        }
        /**
         * only render the previous while transitioning, otherwise return null here to render nothing
         */
        else if (previous.type === type && isTransitioning) {
            return {
                ...props,
                page: previous,
                transition: {
                    loadingIn: false,
                    loadingOut: {to: current},
                    isGoingBack,
                    endTransition: actions.endTransition,
                }
            }
        }
        /**
         * don't render anything except the current screen and the loading out screen
         */
        else return null;
    }

    /**
     * use absolute positioning to place both the loading out and the current pages on the screen
     */
    const screenStyle: ViewStyle = {
        position: "absolute",
        top: menuHeight,
        flex: 1,
        width: "100%",
        height: Dimensions.get('window').height - menuHeight,
        overflow: "scroll",
    };

    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: useTheme().colors.background,
                position: "relative"
            }}>
                <View
                    // need to wrap in a view to access onLayout
                    onLayout={e => setMenuHeight(e.nativeEvent.layout.height)}
                >
                    <Components.RenderTopMenu
                        {...getTopMenuProps({...current, ...props})}
                    />
                </View>
                {[PageType.SELECT_PACK, PageType.SELECT_LEVEL, PageType.PLAY_LEVEL, PageType.WIN_LEVEL].map(type => {
                    const pageProps = getProps(type);
                    if (pageProps) {
                        return (
                            <View style={screenStyle} key={type}>
                                <RenderPage {...pageProps}/>
                            </View>
                        )
                    } else return null;
                })}
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

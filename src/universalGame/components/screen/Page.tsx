import {State} from "../../state/types-state";
import {AppPage, PageType} from "../../state/pages";
import React from "react";
import {PageComponents, TransitionProps} from "../types-components";
import {ActionsObject} from "../../state/types-actions";
import {PackStatic} from "../types-pack";
import {getPlayLevelProps, getSelectLevelProps, getSelectPackProps, getWinScreenProps} from "../../mapping/selectProps";


export interface Props<S, P extends PackStatic<any>> {
    page: AppPage;
    transition: TransitionProps;
    state: State<S>;
    actions: ActionsObject<S>;
    Components: PageComponents<S, P>;
    packs: P[];
}

/**
 * assigns the various page types to their render components and gives them all of the necessary props
 *
 * renders a single screen, which can be loading in, loading out, or active
 */
export const RenderPage = <S extends {}, P extends PackStatic<any>>({transition, Components, ...props}: Props<S, P>) => {
    /**
     * pass down {page, state, actions, packs} as ...props
     */
    const {page} = props;

    switch (page.type) {

        case PageType.SELECT_LEVEL:
            return (
                <Components.RenderSelectLevel
                    {...transition}
                    {...getSelectLevelProps({...props, ...page})}
                />
            );

        case PageType.WIN_LEVEL:
            return (
                <Components.RenderWinLevel
                    {...transition}
                    {...getWinScreenProps({...props, ...page})}
                />
            );

        case PageType.PLAY_LEVEL:
            return (
                <Components.RenderPlayLevel
                    {...transition}
                    {...getPlayLevelProps({...props, ...page})}
                />
            );

        case PageType.SELECT_PACK:
            return (
                <Components.RenderSelectPack
                    {...transition}
                    {...getSelectPackProps(props)}
                />
            );

        default:
            return null;
    }
}

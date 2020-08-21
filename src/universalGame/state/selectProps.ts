import {PackStatic, State} from "./types-state";
import {Page, PageType} from "./pages";
import {ActionsObject} from "./types-actions";
import {SelectPackProps} from "../components/types-components";
import {getAllPackProps, getIsUnlocked} from "./selectors";
import {ModalType} from "./modals";
import React from "react";

/**
 * alternative version of how to map props from state to components
 */

export interface Props<S, P extends PackStatic<any>> {
    page: Page;
    state: State<S, P>;
    actions: ActionsObject<S>;
}

export interface Typed<T extends PageType> {
    page: Page & {
        type: T;
    }
}

export const getSelectPackProps = <P extends PackStatic<any>>({page, state, actions}: Props<any, P> & Typed<PageType.SELECT_PACK>): SelectPackProps<P> => {
    return {
        packs: getAllPackProps(state),
        onPressPack: (packId: number) => {
        if (getIsUnlocked(packId)(state)) {
            actions.browseLevels(packId)
        } else {
            actions.openModal({
                type: ModalType.UNLOCK_PACK,
                packId
            })
        }
    }}
};


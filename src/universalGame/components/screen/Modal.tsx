import React from "react";
import {getAllPackProps, getPackProps} from "../../state/selectors";
import {PackStatic, State} from "../../state/types-state";
import {PageComponents} from "../types-components";
import {ActionsObject} from "../../state/types-actions";
import {Modal, ModalType} from "../../state/modals";

export interface Props<S, P extends PackStatic<any>> {
    modal: Modal | null;
    state: State<S, P>;
    actions: ActionsObject<S>;
    Components: PageComponents<S, P>;
}

/**
 * modals are used for unlocking packs and editing settings
 *
 * is this just the content of the modal, or is the Component expected to wrap in a Modal tag itself?
 */
export const RenderModal = <S extends {}, P extends PackStatic<any>>({modal, state, actions, Components}: Props<S, P>) => {

    if (modal === null) {
        return null;
    }

    switch (modal.type) {
        case ModalType.UNLOCK_PACK:
            return (
                <Components.RenderUnlockPackModal
                    {...getPackProps(modal.packId)(state)}
                    isOpen={true}
                    onPressClose={actions.closeModal}
                    onUnlock={() => actions.unlockPack(modal.packId)}
                    onVisitStore={() => actions.openModal({type: ModalType.STORE})}
                    onUnlockAll={actions.unlockAll}
                />
            );
        case ModalType.STORE:
            return (
                <Components.RenderStoreModal
                    isOpen={true}
                    onPressClose={actions.closeModal}
                    onUnlockPack={actions.unlockPack}
                    onUnlockAll={actions.unlockAll}
                    packs={getAllPackProps(state)}
                />
            );
        case ModalType.SETTINGS:
            return (
                <Components.RenderSettingsModal
                    isOpen={true}
                    onPressClose={actions.closeModal}
                    settings={state.settings}
                    onUpdateSettings={actions.updateSettings}
                />
            )
        default:
            return null;
    }

}

import React, {ReactNode, useEffect, useState} from "react";
import {AppModal} from "../../state/modals";
import {Modal, Portal} from "react-native-paper";
import {useReactiveAnimation} from "../../../effects/useReactiveAnimation";

export interface Props {
    modal: AppModal | null;

    children(modal: AppModal): ReactNode;

    closeModal(): void;
}

/**
 * persist the previous modal locally so that a load out effect can be used even after the modal stored in state
 * reverts to null
 */

/**
 * does loading in need to be passed, or is that a componentDidMount?
 */
export type EffectReturns = {
    loadingOut: boolean;
    unmount(): void;
    modal: AppModal | null;
}

export const useModalLoadEffects = (modal: AppModal | null): EffectReturns => {

    const [loadingOut, setLoadingOut] = useState(false);

    const [persisted, setPersisted] = useState<AppModal | null>(null);

    useEffect(() => {
        if (modal !== null) {
            // if a new modal is seen, save it
            setPersisted(modal);
            setLoadingOut(false);
        } else {
            // if modal changed to null, begin load out
            // but do nothing on first mount
            if (persisted !== null) {
                setLoadingOut(true);
            }
        }
    }, [modal]);

    const unmount = () => {
        console.log("did unmount");
        setPersisted(null);
    }

    return {
        modal: persisted,
        loadingOut,
        unmount,
    }

}

export const ModalEffect = (props: Props) => {

    const {modal, loadingOut, unmount} = useModalLoadEffects(props.modal);

    /**
     * only want to call unmount when animation ends the load out, NOT when it ends the load in
     */
    const onAnimationEnd = (value: number) => {
        console.log("onAnimationEnd", value)
        if (value === 0) {
            unmount();
        }
    }

    const toScale = modal ? loadingOut ? 0 : 1 : 0;

    const scale = useReactiveAnimation(toScale, {
        onEnd: onAnimationEnd,
        duration: 3000,
    }, 0);

    console.log(modal, {visible: modal !== null});

    return (
        <Portal>
            <Modal
                visible={modal !== null}
                dismissable={true}
                onDismiss={() => props.closeModal()}
                // @ts-ignore docs say style can't be animated but it can
                contentContainerStyle={{transform: [{scale}]}}
            >
                {modal ? props.children(modal) : null}
            </Modal>
        </Portal>
    )
}

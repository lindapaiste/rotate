export enum ModalType {
    UNLOCK_PACK,
    STORE,
    SETTINGS,
}

interface GenericModal {
    type: ModalType;
    packId?: number;
}

type SpecificModal =  {
    type: ModalType.STORE;
} | {
    type: ModalType.SETTINGS;
} | {
    type: ModalType.UNLOCK_PACK;
    packId: number;
}

export type Modal = GenericModal & SpecificModal;

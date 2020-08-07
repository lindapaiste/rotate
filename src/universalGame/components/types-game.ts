import {State, StatePack, StateSettings} from "../state/types-state";
import {PageComponents} from "./types-components";
import {Dispatch} from "react";
import {ActionsObject, ActionType} from "../state/types-actions";
import {IconLibrary} from "./screen/Icons";

export interface StateProps<S extends State<any, any>> {
    initialSettings: StateSettings<S>;
    packs: StatePack<S>[];
}

export interface DisplayProps<S extends State<any, any>> {
    Components: PageComponents<StateSettings<S>, StatePack<S>>;
    theme: ReactNativePaper.Theme;
    icons?: IconLibrary;
}



export interface GameConnected<S extends State<any, any>> {
    state: S
    dispatch?: Dispatch<ActionType<StateSettings<S>>>;
    actions: ActionsObject<StateSettings<S>>;
}


/**
 note: theme colors contains:

 colors: {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    onSurface: string;
    onBackground: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
  };

 **/

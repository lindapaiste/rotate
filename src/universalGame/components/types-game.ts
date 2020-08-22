import {State, StateSettings} from "../state/types-state";
import {PageComponents} from "./types-components";
import {Dispatch} from "react";
import {ActionsObject, ActionType} from "../state/types-actions";
import {IconLibrary} from "./screen/Icons";
import {PackStatic} from "./types-pack";

/**
 * props which are needed to initialize the state
 * pack static data is not stored in state, but is needed to map to an initial pack state (specifically the value of
 * initialUnlocked)
 */
export interface InitialStateProps<S extends State<any>, P extends PackStatic<any> = PackStatic<any>> {
    initialSettings: StateSettings<S>;
    packs: P[];
}


export interface PropPacks<L> {
    packs: PackStatic<L>[];
}

/**
 * information about how to render a game
 */
export interface DisplayProps<S extends State<any>, P extends PackStatic<any>> {
    Components: PageComponents<StateSettings<S>, P>;
    theme: ReactNativePaper.Theme;
    icons?: IconLibrary;
}

export type GameProps<Settings, P extends PackStatic<any>> = InitialStateProps<State<Settings>, P> & DisplayProps<State<Settings>, P>


export interface GameConnected<S extends State<any>, P extends PackStatic<any>> {
    state: S
    dispatch?: Dispatch<ActionType<StateSettings<S>>>;
    actions: ActionsObject<StateSettings<S>>;
    packs: P[];
}

export type ScreenProps<S extends State<any>, P extends PackStatic<any>> = GameConnected<S, P> & {
    Components: PageComponents<StateSettings<S>, P>;
    // doesn't need theme or icons because Paper Provider already established
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

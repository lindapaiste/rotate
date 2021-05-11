import {State, StateSettings} from "../state/types-state";
import {GameConnected, InitialStateProps} from "../components/types-game";
import {withLogging} from "../components/screen/withLogging";
import {Reducer, useReducer} from "react";
import {ActionType} from "../state/types-actions";
import {reducer} from "../state/reducer";
import {makeActions} from "../state/actions";
import {PackStatic} from "../components/types-pack";
import {createInitialState} from "../state/initialState";

/**
 * get state and dispatch from react useReducer
 */
export const useGameState = <S extends State<any>, P extends PackStatic<any>>({initialSettings, packs}: InitialStateProps<S, P>): Required<GameConnected<S,P>> => {
    const initialState = createInitialState({initialSettings, packs});

    const [state, dispatch] = withLogging(useReducer<Reducer<S, ActionType<StateSettings<S>>>>(reducer, initialState));

    const actions = makeActions(dispatch);

    return {
        state,
        dispatch,
        actions,
        packs,
    }
}

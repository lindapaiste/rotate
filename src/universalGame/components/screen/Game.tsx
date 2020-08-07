import React, {Reducer, useReducer} from "react";
import {State, StateSettings} from "../../state/types-state";
import {PageType} from "../../state/pages";
import {reducer} from "../../state/reducer";
import {Screen} from "./Screen";
import {ActionType} from "../../state/types-actions";
import {withLogging} from "./withLogging";
import {initialPackState} from "../../state/empty-state";
import {makeActions} from "../../state/actions";
import {DisplayProps, GameConnected, StateProps} from "../types-game";

/**
 * want to have some sort of universal dispatch so that you can do things like unlock a pack based on progress of the previous pack, etc.
 */

/**
 * initial creation of the game state
 */
export const useGameState = <S extends State<any, any>>({initialSettings, packs}: StateProps<S>): Required<GameConnected<S>> => {
    const initialState = {
        packs,
        settings: initialSettings,
        screen: {
            current: {
                type: PageType.SELECT_PACK
            },
            previous: {
                type: PageType.APP_LOADING
            },
            isTransitioning: false,
            modal: null,
        },
        progress: packs.map(initialPackState),
    } as S;

    const [state, dispatch] = withLogging(useReducer<Reducer<S, ActionType<StateSettings<S>>>>(reducer, initialState));

    const actions = makeActions(dispatch);

    return {
        state,
        dispatch,
        actions,
    }
}

export const Game = <S extends State<any, any>>({initialSettings, packs, ...props}: StateProps<S> & DisplayProps<S>) => {

    const gameState = useGameState({initialSettings, packs});

    return (
        <Screen
            {...props}
            {...gameState}
        />
    )
}

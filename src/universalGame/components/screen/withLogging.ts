import {Dispatch, Reducer, ReducerAction, ReducerState} from "react";

type UseReducerTuple<R extends Reducer<any, any>> = [ReducerState<R>, Dispatch<ReducerAction<R>>];

export const withLogging = <R extends Reducer<any, any>>([state, dispatch]: UseReducerTuple<R>): UseReducerTuple<R> => {
    const enhancedDispatch = (action: ReducerAction<R>): void => {
        console.log( "Prior State" );
        console.log( state );
        console.log( "Action" );
        console.log( action );
        dispatch(action);
        console.log("State After");
        console.log(state);
    }
    return [state, enhancedDispatch];
}

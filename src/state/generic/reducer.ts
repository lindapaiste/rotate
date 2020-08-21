import {LevelState} from "./types";
import {ActionTypes} from "./actions";
import * as A from "./actionNames";
import {replaceIndex, last} from "../../lib";

export const reducer = <T>(state: LevelState<T>, action: ActionTypes<T>): LevelState<T> => {
    switch (action.type) {
        case A.ROTATE:
            const {id} = action.payload;
            // don't rotate frozen tiles
            if ( state.frozen.includes(id) ) {
                return state;
            }
            console.log("rotating tile # " + id);
            return {
                ...state,
                rotations: replaceIndex(state.rotations, id, state.rotations[id] + 1),
                moveCount: state.moveCount + 1,
                history: [...state.history, id],
            }
        case A.UNDO:
            const lastId = last(state.history);
            if ( lastId !== undefined ) {
                return {
                    ...state,
                    rotations: replaceIndex(state.rotations, lastId, state.rotations[lastId] - 1),
                    moveCount: state.moveCount - 1,
                    history: state.history.slice(0, -1),
                }
            } else return state;
        case A.RESTART:
            //could store the initial rotations, but can also loop through history
            return {
                ...state,
                rotations: state.history.reduce(
                    (rotations, id) => replaceIndex(rotations, id, rotations[id] - 1),
                    state.rotations
                ),
                moveCount: 0,
                history: [],
                startTime: action.payload.time
            }
        case A.LOAD_LEVEL:
            //replaces the entire state
            return action.payload;
        case A.RESIZE:
            const {tileSize} = action.payload;
            return {
                ...state,
                layout: {
                    ...state.layout,
                    tileSize,
                }
            }
        case A.COMPLETE_LEVEL:
            return {
                ...state,
                didComplete: true,
            }
        case A.START_TIME:
            return {
                ...state,
                startTime: action.payload.time,
            }
        case A.APPLY_HINT:
            //need to make sure that applying a hint doesn't cause any issues with history.  undo shouldn't rotate it.  if restarting, keep the hint
            //can achieve this by removing all instances of this tile id from history array
            const hintId = action.payload.id;
            return {
                ...state,
                frozen: [...state.frozen, hintId],
                history: state.history.filter( id => id !== hintId ),
                //moveCount penalty +5
                moveCount: state.moveCount + 5,
                //rotate clockwise to next increment
                rotations: replaceIndex(state.rotations, hintId, state.rotations[hintId] + action.payload.rotations ),
            }
        default:
            return state;
    }
}

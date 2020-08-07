import * as A from "./actionNames";
import {I_State, InitialTile, LevelLayout} from "./types";
import {newLevelState} from "./emptyState";

export type ActionTypes<T> = {
    type: typeof A.ROTATE,
    payload: {id: number},
} | {
    type: typeof A.LOAD_LEVEL,
    payload: I_State<T>,
} | {
    type: typeof A.RESIZE,
    payload: {tileSize: number},
} | {
    type: typeof A.START_TIME,
    payload: {time: number},
} | {
    type: typeof A.RESTART,
    payload: {time: number},
} | {
    type: typeof A.UNDO,
} | {
    type: typeof A.COMPLETE_LEVEL,
}

export const rotate = (id: number): ActionTypes<any> => ({
    type: A.ROTATE,
    payload: {id},
})

export const resize = (tileSize: number): ActionTypes<any> => ({
    type: A.RESIZE,
    payload: {tileSize},
})


/**
 * do I need a load level action, or should I do this by creating a new useReducer each time?
 */

export const loadLevel = <T>(layout: LevelLayout, tiles: InitialTile<T>[]): ActionTypes<T> => ({
    type: A.LOAD_LEVEL,
    payload: newLevelState(layout, tiles),
})


export const completeLevel = (): ActionTypes<any> => ({
    type: A.COMPLETE_LEVEL,
})

export const startTimer = (): ActionTypes<any> => ({
    type: A.START_TIME,
    payload: {time: Date.now()}
})

export const undo = (): ActionTypes<any> => ({
    type: A.UNDO,
})

export const restart = (): ActionTypes<any> => ({
    type: A.RESTART,
    payload: {time: Date.now()}
})

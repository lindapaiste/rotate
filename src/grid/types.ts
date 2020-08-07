import {I_State} from "../state/generic/types";
import {ComponentType, Dispatch} from "react";
import {ActionTypes} from "../state/generic/actions";
import {I_Point} from "../quilt/square/types";

export interface I_Size {
    width: number;
    height: number;
}

export interface PropTileSize {
    tileSize: number;
}

export interface LevelConnected<T> {
    state: I_State<T>;
    dispatch: Dispatch<ActionTypes<T>>;
}

/**
 * RenderTile gets: x, y, id, tileSize, and tile props from state
 * rotation is handled elsewhere
 */
export interface RenderTileProps<T> extends I_Point, PropTileSize {
    id: number;
    data: T;
}

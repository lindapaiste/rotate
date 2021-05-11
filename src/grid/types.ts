import {LevelState} from "../state/generic/types";
import {Dispatch} from "react";
import {ActionType} from "../state/generic/actions";
import {I_Point} from "../quilt/tile/types";

export interface I_Size {
    width: number;
    height: number;
}

export interface PropTileSize {
    tileSize: number;
}

export interface LevelConnected<T> {
    state: LevelState<T>;
    dispatch: Dispatch<ActionType>;
}

/**
 * RenderTile gets: x, y, id, tileSize, and tile props from state
 * rotation is handled elsewhere
 */
export interface RenderTileProps<T> extends I_Point, PropTileSize {
    id: number;
    data: T;
}

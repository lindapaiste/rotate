import {I_Point} from "../../quilt/tile/types";
import {I_Size} from "../../grid/types";

/**
 * tileSize could change on window resize, but height and width never change
 * height and width are number or columns and rows
 * width * tileSize = actual pixel width
 * also storing rotationIncrement here because it fits with the concept of level constants
 */
export interface LevelLayout {
    tileSize: number;
    height: number;
    width: number;
    rotationIncrement?: number;
}

/**
 * the level state, which gets flushed on every new level
 * arrays tiles and rotations are expected to be in the same order, where the index is the tile id
 */
export interface LevelState<T> {
    /**
     * properties of the grid
     */
    layout: LevelLayout;
    /**
     * rotation for each id, in multiples of 90 (or custom increment)
     */
    rotations: number[];
    /**
     * store the positions for each tile along with custom data as determined by generic T
     */
    tiles: Tile<T>[];
    /**
     * number of rotation moves thus far
     */
    moveCount: number;
    /**
     * not yet supporting pause, so just looking at time elapsed since this stored start
     */
    startTime: number;
    /**
     * not sure the best way to handle completing, flushing, replay, etc. but store boolean "didComplete" to help with
     * this
     */
    didComplete: boolean;
    /**
     * a stack of ids in the order that they were rotated, for use with undo
     * and also used to get back the initial level state, though that could potentially be stored
     */
    history: number[];
    /**
     * when applying hints, need to know that that tile can no longer be rotated
     * so store an array of frozen ids
     */
    frozen: number[];
}

/**
 * infer the type of tile data from the state
 */
export type TileData<S extends LevelState<any>> = S extends LevelState<infer T> ? T : never;

/**
 * all of these values will not change during the duration of the level
 * only rotations changes
 *
 * optionally include size multiples, but default to 1x1 tileSize
 */
export interface Tile<T> {
    position: I_Point,
    size?: I_Size,
    data: T,
}


/**
 * rather than having three separate arrays for layout, rotations, and tile data,
 * can start out with an array of tile objects which have all three together
 * then map this into I_State
 */
export interface InitialTile<T> extends Tile<T> {
    rotations: number,
}

/**
 * can return the moves and time for a victory from the state
 * mapping of these values to stars needs to be handled by the individual level component
 */
export interface MovesTime {
    moves: number;
    time: number;
}

/**
 * pass the number of needed rotations in the hint along with the id because this depends on the rotationIncrement
 */
export interface Hint {
    id: number;
    rotations: number;
}

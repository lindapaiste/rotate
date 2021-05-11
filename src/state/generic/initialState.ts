import {LevelState, InitialTile, LevelLayout} from "./types";
import {omit} from "../../lib";

/**
 * takes tiles which include the initial rotation and map to separate arrays
 */
export const mapLevelTiles = <T>(tiles: InitialTile<T>[]): Pick<LevelState<T>, 'tiles' | 'rotations'> => ({
    rotations: tiles.map(t => t.rotations),
    tiles: tiles.map(t => omit(t, 'rotations')), //could drop rotations, but technically don't need to
});

export const newLevelState = <T>(layout: LevelLayout, tiles: InitialTile<T>[]): LevelState<T> => {
    return {
        ...mapLevelTiles(tiles),
        layout,
        moveCount: 0,
        startTime: Date.now(),
        didComplete: false,
        history: [],
        frozen: []
    }
}

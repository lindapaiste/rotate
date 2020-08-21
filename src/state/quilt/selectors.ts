import {SideColors} from "../../quilt/tile/types";
import WinChecker from "./WinChecker";
import {QuiltState} from "./types";
import {Hint} from "../generic/types";

export const getSquareId = (x: number, y: number) => (state: QuiltState): number => {
    return state.tiles.findIndex(tile => tile.position.x === x && tile.position.y === y);
}

export const getSquareColors = (id: number) => (state: QuiltState): SideColors => {
    return state.tiles[id].data;
}

export const getSquareRotation = (id: number) => (state: QuiltState): number => {
    return state.rotations[id];
}

export const isWin = (state: QuiltState): boolean => {
    const checker = new WinChecker(state);
    return !checker.hasError;
}

export const findHint = (state: QuiltState): Hint | undefined => {
    const checker = new WinChecker(state);
    return checker.findHintTile();
}

import {SideColors} from "../../quilt/square/types";
import WinChecker from "./WinChecker";
import {QuiltState} from "./types";

export const getSquareId = (x: number, y: number) => (state: QuiltState): number => {
    return state.layout.findIndex(point => point.x === x && point.y === y);
}

export const getSquareColors = (id: number) => (state: QuiltState): SideColors => {
    return state.tiles[id];
}

export const getSquareRotation = (id: number) => (state: QuiltState): number => {
    return state.rotations[id];
}

export const isWin = (state: QuiltState): boolean => {
    const checker = new WinChecker(state);
    return !checker.hasError;
}

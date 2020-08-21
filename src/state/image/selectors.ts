import {LevelState} from "../generic/types";

/**
 * is a win when everything points in the right direction
 */
export const isWin = (state: Pick<LevelState<any>, 'rotations'>): boolean => {
    return state.rotations.every(n => n % 4 === 0);
}

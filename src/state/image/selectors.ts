import {I_State} from "../generic/types";

/**
 * is a win when everything points in the right direction
 */
export const isWin = (state: Pick<I_State<any>, 'rotations'>): boolean => {
    return state.rotations.every(n => n % 4 === 0);
}

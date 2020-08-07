import {I_State, LevelLayout, MovesTime} from "./types";
import {Victory} from "../../universalGame/state/types-state";

export const getLayout = (state: I_State<any>): Required<LevelLayout> => {
    return {
        rotationIncrement: 90,
        ...state.layout,
    }
}

export const getMovesTime = (state: I_State<any>): MovesTime => {
    return {
        moves: state.moveCount,
        time: Date.now() - state.startTime,
    }
}

export const getVictory = (state: I_State<any>, getStars?: (data: MovesTime) => number ): Victory => {
    const movesTime = getMovesTime(state);
    const stars = getStars ? getStars(movesTime) : -1;
    return {
        ...movesTime,
        stars
    }
}

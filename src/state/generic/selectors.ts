import {LevelState, LevelLayout, MovesTime} from "./types";
import {Victory} from "../../universalGame/state/types-state";

export const getLayout = (state: LevelState): Required<LevelLayout> => {
    return {
        rotationIncrement: 90,
        ...state.layout,
    }
}

export const getMovesTime = (state: LevelState): MovesTime => {
    return {
        moves: state.moveCount,
        time: Date.now() - state.startTime,
    }
}

export const getVictory = (state: LevelState, getStars?: (data: MovesTime) => number ): Victory => {
    const movesTime = getMovesTime(state);
    const stars = getStars ? getStars(movesTime) : -1;
    return {
        ...movesTime,
        stars
    }
}

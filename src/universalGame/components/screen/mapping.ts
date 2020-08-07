import {VictoryBooleans} from "../types-components";
import {Victory} from "../../state/types-state";

/**
 * fewest moves would be something stored in the level props, if it exists
 */
export const mapVictoryBooleans = (current: Victory, previousBest: Victory | null, minimumMoves: number | null): VictoryBooleans => {
    const isPerfect = minimumMoves ? current.moves <= minimumMoves : undefined;
    return previousBest === null ? {
        isPerfect,
        isBestMoves: true,
        isBestTime: true,
        isBestStars: true,
    } : {
        isPerfect,
        isBestMoves: current.moves <= previousBest.moves,
        isBestTime: current.time <= previousBest.time,
        isBestStars: current.stars >= previousBest.stars,
    }
}

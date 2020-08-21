import {SideName} from "../../quilt/tile/types";
import {rotatedSide, sideNames} from "../../quilt/tile/rotatedSide";
import {QuiltState} from "./types";
import {sample} from "../../lib";
import {Hint} from "../generic/types";

/**
 * making this a class because it makes internal referencing easier
 * rather than passing props around to a bunch of functions
 *
 * can use this class for verifying if the board is a win and for finding a hint
 *
 * note: relies on the assumption that the indexes go in order from left to right across each row and onto the next
 * could avoid this assumption by using .findIndex() based on x and y rather than arithmetic based on width and height
 * but it would be slower to execute
 */
export class WinChecker {
    /**
     * store the entire current state
     */
    private state: QuiltState;

    /**
     * store indexes for easy iteration and filtering
     */
    private readonly indexes: number[];

    private _hasError: boolean | undefined;

    /**
     * construct from the current level state
     */
    constructor(state: QuiltState) {
        this.state = state;
        this.indexes = [...state.tiles.keys()];
    }

    /**
     * lazily load hasError
     */
    public get hasError(): boolean {
        if (this._hasError === undefined) {
            /**
             * don't need to check every direction of every tile because just need to check each border once
             * don't want to check more than is needed -- stop upon error found
             */
            this._hasError = !(this.indexes.every(
                i => this.isDirectionMatch(i, 'right') && this.isDirectionMatch(i, 'bottom')
            ));
        }
        return this._hasError;
    }

    /**
     * start by looking at tiles which don't match the expected rotation
     * then ignore ones which have the expected sides (note: do this rather than check for matches because that leads
     * to unhelpful hints like rotating a four-sides same square because the neighbor was wrong) and return a random
     * index corresponding to a "bad" tile don't need to explicitly ignore past hints since they won't be incorrect
     */
    public findHintTile = (): Hint | undefined => {
        let possibilities = this.indexes.filter(
            i => this.state.rotations[i] % 4 !== 0
        ).filter(
            i => !this.isExpectedColors(i)
        );
        const id = sample(possibilities);
        if (id) {
            return {
                id,
                rotations: 4 - (this.state.rotations[id] % 4)
            }
        }
    }

    /**
     * find whether tile i matches the color of it's neighbor on the provided side
     * returning true if off the edge
     */
    private isDirectionMatch = (i: number, side: SideName): boolean => {
        const next = this.nextIndex(i, side);
        if (next === null) {
            return true;
        }
        const opposite = rotatedSide(side, 2);
        return this.rotatedSideColor(i, side) === this.rotatedSideColor(next, opposite);
    }


    /**
     * check all four directions of a tile for match
     */
    private isTileMatched = (i: number): boolean => {
        return sideNames.every(side => this.isDirectionMatch(i, side));
    }

    /**
     * make sure that a tile's current rotated sides match the expected colors for that side, ignoring edges
     */
    private isExpectedColors = (i: number): boolean => {
        const colors = this.state.tiles[i].data;
        const rotations = this.state.rotations[i];
        return sideNames.every(
            side => this.isIgnoredSide(i, side) || colors[rotatedSide(side, rotations)] === colors[side]
        );
    }

    /**
     * need to look at the color which is CURRENTLY in the given position
     * after the number of rotations
     */
    private rotatedSideColor = (i: number, side: SideName): string => {
        const colors = this.state.tiles[i].data;
        const rotations = this.state.rotations[i];
        return colors[rotatedSide(side, rotations)];
    }

    /**
     * get the index of the tile which shares the given side with the tile at index i
     * returning null if off the edge
     */
    private nextIndex = (i: number, side: SideName): number | null => {
        if (this.isIgnoredSide(i, side)) {
            return null;
        }
        switch (side) {
            case "top":
                return i - this.state.layout.width;
            case "bottom":
                return i + this.state.layout.width;
            case "left":
                return i - 1;
            case "right":
                return i + 1;
        }
    }

    /**
     * whether a side is irrelevant for a given tile id based on position
     * because it abuts the edge of the grid rather than another tile
     */
    private isIgnoredSide = (i: number, side: SideName): boolean => {
        const pos = this.state.tiles[i].position;
        switch (side) {
            case "top":
                return pos.y === 0;
            case "bottom":
                return pos.y === this.state.layout.height - 1;
            case "left":
                return pos.x === 0;
            case "right":
                return pos.x === this.state.layout.width - 1;
        }
    }
}

export default WinChecker;

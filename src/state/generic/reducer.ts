import {Hint, InitialTile, LevelLayout} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {newLevelState} from "./initialState";

// Note: moveCount is not always the same as history.length due to removal of frozen tiles.

/**
 * Useless dummy state.
 * It is expected that loadLevel will be called before any other actions.
 */
const initialState = newLevelState<any>({width: 0, height: 0, tileSize: 0}, []);

const rotationLevelSlice = createSlice({
    name: 'rotationLevel',
    initialState,
    reducers: {
        /**
         * Rotate a given tile based on the id in the action payload.
         */
        rotate: (state, {payload: id}: PayloadAction<number>) => {
            // don't rotate frozen tiles
            if (state.frozen.includes(id)) return;
            console.log("rotating tile # " + id);
            // apply rotation
            state.rotations[id]++;
            // increment move count
            state.moveCount++;
            // add to history
            state.history.push(id);
        },
        /**
         * Undo the last rotation.
         */
        undo: (state) => {
            // remove the id from the history array
            const lastId = state.history.pop();
            // exit if nothing to undo
            if (!lastId) return;
            // decrement move count
            state.moveCount--;
            // undo rotation
            state.rotations[lastId]--;
        },
        /**
         * Restart the level.
         * Could store the initial rotations, but can also loop through history.
         * Note: does not change frozen tiles.
         */
        restart: {
            reducer: (state, {payload: time}: PayloadAction<number>) => {
                // undo all rotations, unless frozen
                state.history.forEach(id => {
                    if (!state.frozen.includes(id)) { // not actually necessary right now because the hint removes it
                        state.rotations[id]--;
                    }
                });
                // reset move count
                state.moveCount = 0;
                // reset history
                state.history = [];
                // reset startTime
                state.startTime = time;
            },
            prepare: () => ({ payload: Date.now() })
        },
        /**
         * Replace the entire state.
         * Provide the layout and the tiles, newLevelState helper function does the rest.
         */
        loadLevel: (_, {payload}: PayloadAction<LevelLayout & {tiles: InitialTile<any>[]}>) => {
            const {tiles, ...layout} = payload;
            return newLevelState(layout, tiles);
        },
        /**
         * Respond to window resizes by adjusting the tile size.
         * TODO: might want to move calculation logic to redux instead of in a hook.
         */
        resize: (state, {payload: tileSize}: PayloadAction<number>) => {
            state.layout.tileSize = tileSize;
        },
        /**
         * Mark the level as completed.
         */
        completeLevel: (state) => {
            state.didComplete = true;
        },
        /**
         * Starting the timer is a separate action from loading the level
         * because the timer doesn't start until the animation ends.
         */
        startTimer: {
            reducer: (state, {payload: time}: PayloadAction<number>) => {
                state.startTime = time;
            },
            prepare: () => ({ payload: Date.now() })
        },
        /**
         * Move a tile to its correct rotations and freeze it to prevent future rotation.
         * Adds a penalty to the move count (default 5).
         *
         * Note: need to make sure that applying a hint doesn't cause any issues with history. Undo shouldn't rotate it.
         * If restarting, keep the hint. Can achieve this by removing all instances of this tile id from history array.
         *
         * Note: would ideally like to get rotations from state instead of payload,
         * but quilt and image need to handle it differently.
         */
        applyHint: (state, {payload}: PayloadAction<Hint>) => {
            const {id, penalty = 5, rotations} = payload;
            // freeze
            state.frozen.push(id);
            // remove from history
            state.history = state.history.filter(moved => moved !== id);
            // add penalty
            state.moveCount += penalty;
            // rotate clockwise to next increment
            state.rotations[id] += rotations;
        }
    }
});

export const {reducer, actions} = rotationLevelSlice;
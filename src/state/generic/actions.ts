import {actions} from "./reducer";

export const {undo, resize, applyHint, completeLevel, loadLevel, restart, startTimer, rotate} = actions;

export type ActionType = ReturnType<typeof actions[keyof typeof actions]>;
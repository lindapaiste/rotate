import {LevelConnected} from "../grid/types";
import {BottomMenuChildren} from "../gameComponentsLibrary/menus/BottomMenu";
import React, {useState} from "react";
import {IconButton} from "react-native-paper";
import {hint, restart, undo} from "../state/generic/actions";
import {Hint, LevelState} from "../state/generic/types";

/**
 * fade out effect involves menu going off the bottom,
 * which depends on the height
 *
 * Menu component uses Surface which has no fixed height
 * height is determined by the size of the icons
 * can calculate height or get from the rendered component
 */

/**
 * need to pass in getHint function because the implementation varies between quilt and image
 */
export type Props<T> = {
    height?: number;
    iconSize?: number;
    getHint(state: LevelState<T>): Hint | undefined;
} & LevelConnected<T>;


export interface OnPressActions {
    onPressUndo(): void;
    onPressRestart(): void;
    onPressHint(): void;
    onPressShare(): void;
}

/**
 * state and dispatch are for the level state, not the game state
 * when loading a modal, could connect to game state modal loader, but don't need to
 * can have own modal
 */
export const BottomMenu = <T extends any>({state, dispatch, getHint, height = 50, iconSize = 20}: Props<T>) => {
    return (
        <BottomMenuChildren
            style={{
                height
            }}
        >
            <IconButton
                icon="undo"
                onPress={() => dispatch(undo())}
                disabled={state.history.length < 1}
                size={iconSize}
            />
            <IconButton
                icon="restart"
                onPress={() => dispatch(restart())}
                disabled={state.history.length < 1}
                size={iconSize}
            />
            <IconButton
                icon="hint"
                onPress={() => {
                    const found = getHint(state);
                    if ( found ) {
                        dispatch(hint(found));
                    } else {
                        console.warn("no hint found");
                    }
                }}
                size={iconSize}
            />
        </BottomMenuChildren>
    )
}

/*
 <IconButton
 icon="share"
 onPress={() => console.log("share")}
 //TODO: implement share
 size={iconSize}
 />*/

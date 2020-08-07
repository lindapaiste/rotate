import {LevelConnected} from "../grid/types";
import {BottomMenuChildren} from "../gameComponentsLibrary/menus/BottomMenu";
import React from "react";
import {IconButton} from "react-native-paper";
import {restart, undo} from "../state/generic/actions";

/**
 * fade out effect involves menu going off the bottom,
 * which depends on the height
 *
 * Menu component uses Surface which has no fixed height
 * height is determined by the size of the icons
 * can calculate height or get from the rendered component
 */

export interface Props {
    height?: number;
    iconSize?: number;
}

export const BottomMenu = ({state, dispatch, height = 50, iconSize = 20}: LevelConnected<any> & Props) => {
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
                onPress={() => console.log("hint")}
                //TODO: implement hint
                size={iconSize}
            />
            <IconButton
                icon="share"
                onPress={() => console.log("share")}
                //TODO: implement share
                size={iconSize}
            />
        </BottomMenuChildren>
    )
}

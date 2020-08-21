import {PlayLevelProps, TransitionProps} from "../../universalGame/components/types-components";
import {RenderQuiltLevel} from "./QuiltLevel";
import React from "react";
import {makeLevel} from "../generate/makeLevel";
import {MakeLevelProps} from "../generate/types";

/**
 * infinite level doesn't get tiles,
 * just gets packId and levelId
 *
 * can increase size based on levelId
 * can switch between multiple infinite packs based on packId
 *
 * for now just hard-coding something:
 */
const settings: MakeLevelProps = {
    colorCount: {min: 3, max: 6},
    width: 6,
    height: 8,
}

export const RenderInfiniteQuiltLevel = (props: TransitionProps & PlayLevelProps<{}>) => {

    const level = makeLevel(settings);

    return (
        <RenderQuiltLevel
            {...props}
            {...level}
        />
    );
}

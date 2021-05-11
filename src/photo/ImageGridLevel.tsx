import React, {useCallback, useMemo, useReducer} from "react";
import {reducer} from "../state/generic/reducer";
import {Text, View} from "react-native";
import {isWin} from "../state/image/selectors";
import {I_Size, MakeGridProps} from "./types";
import {random} from "../lib";
import {InitialTile} from "../state/generic/types";
import SourceAreaCalc from "./SourceAreaCalc";
import {CroppedImage} from "./CroppedImage";
import RenderLayout from "../grid/RenderLayout";
import {newLevelState} from "../state/generic/initialState";

/**
 * what data, if any, do I actually need to store to tiles state?
 */
const generateStateTiles = ({width, height}: I_Size): InitialTile<{}>[] => {
    const tiles: InitialTile<{}>[] = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            tiles.push({
                position: {x, y},
                rotations: random(1, 3),
                data: {},
            });
        }
    }
    return tiles;
}

const generateInitialState = (props: MakeGridProps) => {
    return newLevelState(props, generateStateTiles(props));
}

export const ImageGridLevel = (props: MakeGridProps) => {

    const calc = useMemo(
        () => new SourceAreaCalc(props),
        [props.sourceSelection, props.tileSize, props.width, props.height] //some of these are objects -- watch out for recreation
    );

    const [state, dispatch] = useReducer(reducer, props, generateInitialState);

    const RenderTile = useCallback(
        ({x, y}) => (
            <CroppedImage
                source={{uri: props.src}}
                sourceArea={calc.getTileSelection(x, y)}
                originalSize={props.sourceSize}
                scale={calc.scale}
                tileSize={props.tileSize}
            />
        ),
        [props.src, props.sourceSize, calc]
    )

    return (
        <View>
            <RenderLayout
                {...props}
                state={state}
                dispatch={dispatch}
                RenderTile={RenderTile}
            />
            {isWin(state) &&
            <Text style={{fontSize: 75}}>YOU WIN!</Text>}
        </View>
    )
}

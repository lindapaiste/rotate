import React, {useReducer} from "react";
import {LevelConnected, PropTileSize} from "../../grid/types";
import {generateInitialState} from "./generateGrid";
import {Text, View} from "react-native";
import {reducer} from "../../state/generic/reducer";
import {isWin} from "../../state/quilt/selectors";
import {CreationProps, QuiltLevelReducer} from "./types";
import {SideColors} from "../square/types";
import RenderLayout from "../../grid/RenderLayout";
import {QuiltTile} from "../square/QuiltTile";

export const QuiltGrid = (props: CreationProps & PropTileSize) => {
    const [state, dispatch] = useReducer<QuiltLevelReducer, CreationProps & PropTileSize>(reducer, props, generateInitialState);
    return (
        <RenderQuiltGrid state={state} dispatch={dispatch}/>
    )
}

export const RenderQuiltGrid = ({state, dispatch}: LevelConnected<SideColors>) => {
    return (
        <View>
            <RenderLayout
                loadingIn={false}
                loadingOut={false}
                endTransition={() => {}}
                state={state}
                dispatch={dispatch}
                RenderTile={QuiltTile}
            />
            {isWin(state) &&
            <Text style={{fontSize: 75}}>YOU WIN!</Text>}
        </View>
    )
}


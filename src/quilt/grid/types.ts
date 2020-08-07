import {I_Size, PropTileSize} from "../../grid/types";
import {Reducer} from "react";
import {QuiltState} from "../../state/quilt/types";
import {ActionTypes} from "../../state/generic/actions";
import {SideColors} from "../square/types";

export type GridColors = string[][];

export interface CreationProps extends I_Size {
    colorCount: number;
    width: number; //# of squares
    height: number;
}

export type QuiltLevelReducer = Reducer<QuiltState, ActionTypes<SideColors>>

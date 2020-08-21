import {Reducer} from "react";
import {QuiltState} from "../../state/quilt/types";
import {ActionTypes} from "../../state/generic/actions";
import {SideColors} from "../tile/types";

export type QuiltLevelReducer = Reducer<QuiltState, ActionTypes<SideColors>>

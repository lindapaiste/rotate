import {I_Size} from "../../grid/types";
import {InitialTile} from "../../state/generic/types";
import {SideColors} from "../tile/types";

export type GridColors = string[][];

export interface CreationProps extends I_Size {
    colorCount: number;
    width: number; //# of squares
    height: number;
}

export interface QuiltLevelProps {
    width: number;
    height: number;
    tiles: InitialTile<SideColors>[];
}

export interface MakeLevelProps {
    width: number;
    height: number;
    colorCount: {
        min: number;
        max: number;
    }
}

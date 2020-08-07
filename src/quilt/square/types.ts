export interface I_Sides<T> {
    left: T;
    right: T;
    top: T;
    bottom: T;
}

export type SideName = keyof I_Sides<any>;

export type SideColors = I_Sides<string>;

export interface I_SquareProps {
    colors: SideColors;
    size: number;
    x?: number;
    y?: number;
}

export interface I_Point {
    x: number;
    y: number;
}

export type PointTuple = [number, number];

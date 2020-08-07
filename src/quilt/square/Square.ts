import {I_Sides, I_SquareProps, PointTuple, SideName} from "./types";

/**
 * turns props x, y and size into coordinates for the four side triangles
 */
export class Square implements Required<I_SquareProps> {
    public readonly colors: I_Sides<string>;
    public readonly size: number;
    public readonly x: number;
    public readonly y: number;
    public readonly center: PointTuple;

    constructor(props: I_SquareProps) {
        this.colors = props.colors;
        this.size = props.size;
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.center = [this.x + .5 * this.size, this.y + .5 * this.size];
    }

    /**
     * returns the two corners on a side
     */
    public getSideCorners = (side: SideName): PointTuple[] => {
        switch (side) {
            case "top":
                return [
                    [this.x, this.y],
                    [this.x + this.size, this.y]
                ];
            case "bottom":
                return [
                    [this.x, this.y + this.size],
                    [this.x + this.size, this.y + this.size]
                ];
            case "left":
                return [
                    [this.x, this.y],
                    [this.x, this.y + this.size]
                ];
            case "right":
                return [
                    [this.x + this.size, this.y],
                    [this.x + this.size, this.y + this.size]
                ]
        }
    }

    /**
     * returns the three points that make up a triangle from a side to the center
     */
    public getSideTriangle = (side: SideName): PointTuple[] => {
        return [...this.getSideCorners(side), this.center];
    }
}

export default Square;

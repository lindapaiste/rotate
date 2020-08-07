import {I_Rectangle, MakeGridProps} from "./types";

/**
 * class handles calculation of tile sizes based on a selected area of an image
 */

export class SourceAreaCalc {

    public readonly sourceSelection: I_Rectangle;

    public readonly sourceTileSize: number;

    public readonly scale: number;

    public readonly width: number;

    public readonly height: number;

    public readonly tileSize: number;

    constructor({sourceSelection, tileSize, width, height}: MakeGridProps) {
        /**
         * calculate tile selection size from the source
         */
        this.sourceTileSize = Math.min(
            sourceSelection.width / width,
            sourceSelection.height / height,
        );
        /**
         * apply this scale to the sourceTileSize to get the desired tileSize
         */
        this.scale = tileSize / this.sourceTileSize;

        /**
         * save the x and y of the source selection
         */
        this.sourceSelection = sourceSelection;

        /**
         * save other props for later
         */
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
    }

    /**
     * returns the sourceArea for the tile at (x,y) in the grid
     */
    getTileSelection = (x: number, y: number): I_Rectangle => {
        return {
            width: this.sourceTileSize,
            height: this.sourceTileSize,
            x: this.sourceSelection.x + x * this.sourceTileSize,
            y: this.sourceSelection.y + y * this.sourceTileSize
        }
    };
}

export default SourceAreaCalc;

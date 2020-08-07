import {DrawImageProps, I_Rectangle, I_Size, I_TopLeft, MakeGridProps} from "./types";

/**
 * class handles calculation of tile sizes based on a selected area of an image
 */

export class ImageGrid {
    public image: CanvasImageSource;

    private sourceSelection: I_Rectangle;

    private readonly sSize: I_Size;

    private readonly dSize: I_Size;

    //just store it all
    private props: MakeGridProps;

    constructor(props: MakeGridProps) {
        this.props = props;
        const {
            src,
            sourceSize,
            sourceSelection,
            tileSize,
            width,
            height
        } = props;
        /**
         * create and store html image element from the src
         * does passed width need to be passed, or can I use image.naturalWidth?
         */
        this.image = new Image(sourceSize.width, sourceSize.height);
        this.image.src = src;

        console.log(this.image);
        /**
         * calculate square sizes for destination and source
         */
        this.sSize = {
            width: sourceSelection.width / width,
            height: sourceSelection.height / height
        };
        this.dSize = {
            width: tileSize,
            height: tileSize
        };

        /**
         * save the x and y of the source selection
         */
        this.sourceSelection = sourceSelection;
    }

    getTileProps = (x: number, y: number): DrawImageProps => {
        return {
            image: this.image,
            sourceArea: {
                ...this.sSize,
                x: this.sourceSelection.x + x * this.sSize.width,
                y: this.sourceSelection.y + y * this.sSize.height
            },
            destinationArea: {
                ...this.dSize,
                x: 0,
                y: 0
            }
        };
    };

    getAllTiles = (): Array<I_TopLeft & DrawImageProps> => {
        const squares: Array<I_TopLeft & DrawImageProps> = [];
        for (let x = 0; x < this.props.width; x++) {
            for (let y = 0; y < this.props.height; y++) {
                squares.push({
                    left: x * this.dSize.width,
                    top: y * this.dSize.height,
                    ...this.getTileProps(x, y)
                });
            }
        }
        return squares;
    };
}

export default ImageGrid;

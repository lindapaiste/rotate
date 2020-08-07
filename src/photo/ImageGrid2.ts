import {I_Rectangle, I_Size, I_TopLeft, MakeGridProps} from "./types";
import {Props as CroppedImageProps} from "./CroppedImage";

/**
 * class handles calculation of tile sizes based on a selected area of an image
 */

export class ImageGrid2 {

    private sourceSelection: I_Rectangle;

    private readonly sSize: I_Size;

    private readonly scale: number;

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
         * calculate tile selection size from the source
         */
        this.sSize = {
            width: sourceSelection.width / width,
            height: sourceSelection.height / height
        };
        this.scale = tileSize / this.sSize.width;

        /**
         * save the x and y of the source selection
         */
        this.sourceSelection = sourceSelection;
    }

    getTileProps = (x: number, y: number): CroppedImageProps => {
        return {
            source: {
                uri: this.props.src
            },
            sourceArea: {
                ...this.sSize,
                x: this.sourceSelection.x + x * this.sSize.width,
                y: this.sourceSelection.y + y * this.sSize.height
            },
            scale: this.scale,
            originalSize: this.props.sourceSize
        };
    };

    getAllTiles = (): Array<I_TopLeft & CroppedImageProps> => {
        const squares: Array<I_TopLeft & CroppedImageProps> = [];
        for (let x = 0; x < this.props.width; x++) {
            for (let y = 0; y < this.props.height; y++) {
                squares.push({
                    left: x * this.props.tileSize,
                    top: y * this.props.tileSize,
                    ...this.getTileProps(x, y)
                });
            }
        }
        return squares;
    };
}

export default ImageGrid2;

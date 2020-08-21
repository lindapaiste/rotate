
export interface I_Size {
    width: number;
    height: number;
}

export interface I_TopLeft {
    top: number;
    left: number;
}

export interface I_Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface MakeGridProps {
    width: number;
    height: number;
    tileSize: number;
    sourceSelection: I_Rectangle;
    sourceSize: I_Size;
    src: string;
}

export interface DrawImageProps {
    //context: CanvasRenderingContext2D;
    image: CanvasImageSource; //HTMLImageElement;
    sourceArea: I_Rectangle;
    destinationArea: I_Rectangle;
}

/**
 * expect the file to already be cropped to the desired area
 *
 * should I store things like artist and year then map to title and subtitle?  or pass through raw?
 */
export interface ImageLevelProps {

}

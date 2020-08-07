import React from "react";
import {DrawImageProps, MakeGridProps} from "./types";
import {GLView} from 'expo';
import Expo2DContext from 'expo-2d-context';
import {ImageGrid} from "./ImageGrid";

//const src = "/public/images/DP243354.jpg";

export const ImageSquare = ({image, sourceArea, destinationArea}: DrawImageProps) => {
    /*const ref = useRef<HTMLCanvasElement>(null);

    console.log(ref);

    const ctx = useMemo( () => ref.current?.getContext("2d"), [ref] );
*/
    const onContextCreate = (gl) => {
        const ctx = new Expo2DContext(gl)
    }

    const doDraw = (ctx) => {
        if (ctx !== undefined && ctx !== null) {
            ctx.drawImage(
                image,
                sourceArea.x,
                sourceArea.y,
                sourceArea.width,
                sourceArea.height,
                destinationArea.x,
                destinationArea.y,
                destinationArea.width,
                destinationArea.height
            );
            ctx.flush();
            //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            console.log("did drawImage")
        }
    }
/*
    useEffect(() => {
       if (ctx !== undefined && ctx !== null) {
                ctx.drawImage(
                    image,
                    sourceArea.x,
                    sourceArea.y,
                    sourceArea.width,
                    sourceArea.height,
                    destinationArea.x,
                    destinationArea.y,
                    destinationArea.width,
                    destinationArea.height
                );
                //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
           console.log("did drawImage")
        }
    }, [ctx, sourceArea, destinationArea, image]);
    */

    return (
        <GLView
            width={destinationArea.width}
            height={destinationArea.height}
            onContextCreate={gl => doDraw(new Expo2DContext(gl))}
        />
    );
};

export const Grid = (props: MakeGridProps) => {
    const gridClass = new ImageGrid(props);

    return (
        <>
            <div style={{ position: "relative" }}>
                {gridClass.getAllTiles().map(({ top, left, ...props }, i) => (
                    <div key={i} style={{ position: "absolute", top, left }} className="tile">
                        <ImageSquare {...props} />
                    </div>
                ))}
            </div>
        </>
    );
};

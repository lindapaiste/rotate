import React from "react";
import {MakeGridProps} from "./types";
import {ImageGridLevel} from "./ImageGridLevel";
import {Asset} from "expo-asset";
import {I_TileSizing, useTileSizing} from "../layout";

const imageURI = Asset.fromModule(require('../../assets/DP243354.jpg')).uri;

export const myProps: MakeGridProps = {
    src: imageURI,
    width: 5,
    height: 8,
    tileSize: 100,
    sourceSelection: {
        x: 50,
        y: 50,
        width: 700,
        height: 1000
    },
    sourceSize: {
        width: 2876,
        height: 3877
    }
};
export default (props: I_TileSizing) => (
    <ImageGridLevel {...myProps} {...props}/>
)

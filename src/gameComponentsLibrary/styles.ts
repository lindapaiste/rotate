import {StyleSheet} from "react-native";

/**
 * only want utility styles for sizing and positioning
 * colors should be dealt with through Paper theme
 */

export const square = (size: number) => ({
    width: size,
    height: size,
});

const stylesheet = StyleSheet.create({
    centerContents: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    flexFill: {
        flex: 1,
        alignSelf: "stretch",
    },
    fill: {
        width: "100%",
        height: "100%",
    }
});

export const {centerContents, fill, flexFill} = stylesheet;

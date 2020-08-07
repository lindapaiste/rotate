import {GridSizingProps} from "./types";

/**
 * do around 6 per row, but clamp to a minimum and maximum size
 * if clamped, need to adjust to fill the space
 */

export const calcPerRow = ({width, maxThumbSize, minThumbSize, basePerRow}: GridSizingProps): number => {
    if ( width < basePerRow * minThumbSize ) {
        return Math.floor( width / minThumbSize );
    } else if ( width > basePerRow * maxThumbSize ) {
        return Math.ceil( width / maxThumbSize );
    } else return basePerRow;
};

export const calcSize = (props: GridSizingProps): number => {
    const perRow = calcPerRow(props);
    return  Math.floor( props.width / perRow );
};

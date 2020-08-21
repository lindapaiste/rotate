import {SideName} from "./types";

/**
 * listed in counter-clockwise order for use in rotatedSide function
 */
export const sideNames: SideName[] = ['top', 'left', 'bottom', 'right'];

/**
 * returns the side name for the side which is in the position of the passed-in side after the given number of rotations
 * as the square moves clockwise, the side which fills the space is the next one in the counterclockwise direction
 * add the number of rotations to the index and use %4 to cycle back through
 */
export const rotatedSide = (side: SideName, rotations: number): SideName => {
    const i = sideNames.indexOf(side);
    return sideNames[ ( i + rotations ) % 4 ];
}

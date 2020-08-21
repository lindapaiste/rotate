import {StartEnd} from "./types";
import {makeArray} from "../lib";

/**
 * utility which breaks a start and end into n even intervals
 */
export const toSequence = (timing: StartEnd, count: number): StartEnd[] => {
    const eachDuration = ( timing.end - timing.start ) / count;
    return makeArray(count, i => {
        const start = timing.start + i * eachDuration;
        return {
            start,
            end: start + eachDuration
        }
    })
}

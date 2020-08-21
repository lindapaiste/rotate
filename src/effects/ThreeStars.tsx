import {AnimatedStar, IconStyle} from "./AnimatedStar";
import {Animated} from "react-native";
import {FlexRow} from "@lindapaiste/layout";
import React from "react";
import {toSequence} from "./util";

export interface Props extends IconStyle {
    /**
     * count of stars to fill -- assumes 3 total stars
     */
    stars: number;
    /**
     * start and end for the whole group
     */
    start: number;
    end: number;
    timer: Animated.Value;
}

/**
 * assumes that color and size are the same for all three stars
 * determines which to fill based on the passed in prop of the number of stars
 *
 * maps an overall start and end to a start and end for each star,
 * such that they go one at a time in a sequence
 */
export const Stars = ({stars, start, end, ...props}: Props) => {
    const timings = toSequence({start, end}, 3);
    return (
        <FlexRow>
            {[0, 1, 2].map(i => (
                <AnimatedStar
                    {...props}
                    key={i}
                    {...timings[i]} //start and end
                    filled={stars > i}
                />
            ))}
        </FlexRow>
    )
}

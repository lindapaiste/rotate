import {Animated, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {FlexColumn, useVw} from "@lindapaiste/layout";
import {Text} from "react-native-paper";
import {QuiltTile} from "../quilt/tile/QuiltTile";
import {MaybeGenerate, randomHex, range} from "../lib";
import {SideColors} from "../quilt/tile/types";

export interface Props {
    done?: boolean;
}

/**
 * want a four-color tile that appears, gets small and rotates, appears again...
 * important that it stops long enough to be seen, not just a continuous spin
 * want to colors to reset when it is at the smallest point
 */
export default ({done = false}: Props) => {

    const anim = useRef(new Animated.Value(0)).current;

    const [colors, setColors] = useState( randomSideColors() );

    useEffect(() => {
        iterate();

        return () => anim.stopAnimation();
    }, []);

    /**
     * if rotating 90deg each time instead of 360 then the animation is not seamless
     * so should stitch at the in point rather than the out point
     * need to initiate the loop myself rather than using Animated.loop in order to call a callback on each loop
     */

    const timing = Animated.timing(anim, {
        isInteraction: false,
        useNativeDriver: true,
        toValue: 1,
        duration: 2500,
    });

    const iterate = () => {
        timing.start(
            result => {
                /**
                 * don't call callback if stopped in order to properly unmount
                 */
                if ( result.finished ) {
                    anim.setValue(0);
                    setColors(randomSideColors());
                    iterate();
                } else {
                    console.log("stopped");
                }
            }
        )
    }

    /**
     * use the same breakpoints for all properties
     */
    const inputRange = [0, .2, .8, 1];

    return (
        <FlexColumn
            style={{backgroundColor: 'black', flex: 1}} //TODO: get from theme
        >
            <View>
                <Animated.View
                    style={{
                        transform: [
                            {
                                scale: anim.interpolate({
                                    inputRange,
                                    outputRange: [0, 1, 1, 0]
                                })
                            },
                            {
                                rotate: anim.interpolate({
                                    inputRange,
                                    outputRange: ["-45deg", "0deg", "0deg", "45deg"]
                                })
                            },
                        ],
                        opacity: anim.interpolate({
                            inputRange,
                            outputRange: [.7, 1, 1, .7]
                        })
                    }}
                >
                    <QuiltTile
                        id={0}
                        data={colors}
                        tileSize={useVw(30)}
                    />
                </Animated.View>
                <Text>Loading</Text>
            </View>
        </FlexColumn>
    )


}

/**
 * get four random colors for the sides of a tile
 */
export const randomSideColors = (): SideColors => ({
    top: randomHex(),
    left: randomHex(),
    bottom: randomHex(),
    right: randomHex(),
})

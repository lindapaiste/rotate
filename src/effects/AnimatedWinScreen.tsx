import React, {PropsWithChildren} from "react";
import {WinScreenProps, TransitionProps} from "../universalGame/components/types-components";
import {SimpleLineIcons as Icon} from "@expo/vector-icons";
import {Button, Divider, Surface, Title} from "react-native-paper";
import {View} from "react-native";
import {PropTimers} from "./types";
import {random} from "../lib";
import {Stars} from "./ThreeStars";


/**
 * use children instead of passing a body prop
 *
 * want each section to come in at a different time, but don't spend too long fading
 */
export const OuterWinScreen = ({levelId, packId, current, previousBest, onPressNext, onPressReplay, loadingIn, loadingOut, hasNextLevel, minimumMoves, booleans, children, loadInTimer}: PropsWithChildren<TransitionProps & WinScreenProps & PropTimers>) => {

    const stars = random(1, 3);
    return (
        <View style={{
            justifyContent: "space-evenly",
            flex: 1,
            width: "100%",
            maxWidth: 500, //keeps buttons from getting too far apart
            paddingVertical: "10%", //note: some visual padding is already included from space-evenly
        }}>
            <Title
                style={{
                    textAlign: "center"
                }}
            >{booleans.isPerfect ? 'Perfect!' : 'You Win!'}</Title>
            <Stars
                color="white"
                size={50} //TODO base on screen
                stars={stars}
                timer={loadInTimer}
                start={0.2}
                end={1}
            />
            <Divider
                style={{
                    marginHorizontal: "10%",
                }}
            />
            <View style={{
                alignSelf: "center",
            }}>
                {children}
            </View>
            <Divider
                style={{
                    marginHorizontal: "10%",
                }}
            />
            <View
                style={{
                    width: "100%",
                    alignSelf: "center",
                    display: "flex",
                    flexDirection: "row",
                    //padding: 20,
                    justifyContent: "space-evenly",
                }}
            >
                <Surface
                >
                    <Button
                        onPress={onPressReplay}
                        mode={"text"}
                    >
                        <Icon name={"reload"}/>
                    </Button>
                </Surface>
                {hasNextLevel &&
                <View
                    style={{
                        //flex: 1,
                        //marginLeft: "10%",
                    }}
                >
                    <Button
                        onPress={onPressNext}
                        mode={"contained"}
                    >
                        Continue <Icon name={"arrow-right"}/>
                    </Button>
                </View>
                }
            </View>
        </View>
    )
};

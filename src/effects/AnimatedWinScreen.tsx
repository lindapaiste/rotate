import React, {PropsWithChildren} from "react";
import {TransitionProps, WinScreenProps} from "../universalGame/components/types-components";
import {SimpleLineIcons as Icon} from "@expo/vector-icons";
import {Button, Divider, Surface, Title} from "react-native-paper";
import {View} from "react-native";
import {PropTimers} from "./types";
import {random} from "../lib";
import {Stars} from "./ThreeStars";
import {useVw} from "@lindapaiste/layout";
import ScaleIn from "./ScaleIn";
import {View as Animatable} from "react-native-animatable";

/**
 * use children instead of passing a body prop
 *
 * want each section to come in at a different time, but don't spend too long fading
 *
 * if using animations from react-native-animatable package, can use property "delay" which doesn't use the timer at
 * all, or can store a state of which components are loaded from a listener on the timer
 */
export const OuterWinScreen = ({levelId, packId, current, previousBest, onPressNext, onPressReplay, loadingIn, loadingOut, hasNextLevel, minimumMoves, booleans, children, loadInTimer}: PropsWithChildren<TransitionProps & WinScreenProps & PropTimers>) => {

    const stars = random(1, 3);
    return (
        <View style={{
            justifyContent: "space-evenly",
            alignItems: "stretch",
            flex: 1,
            width: "100%",
            maxWidth: 500, //keeps buttons from getting too far apart
            paddingVertical: "10%", //note: some visual padding is already included from space-evenly
        }}>
            <ScaleIn
                timer={loadInTimer}
                maximumValue={1.1}
                end={.3}
            >
                <Title
                    style={{
                        textAlign: "center",
                        fontSize: useVw(10),
                    }}
                >{booleans.isPerfect ? 'Perfect!' : 'You Win!'}</Title>
            </ScaleIn>
            <Animatable
                animation={"fadeIn"}
                duration={200}
                delay={100}
            >
            <Stars
                color="white"
                size={50} //TODO base on screen
                stars={stars}
                timer={loadInTimer}
                start={0.2}
                end={1}
            />
            </Animatable>
            <Animatable
                animation={"slideInLeft"}
                delay={800}
            >
                <Divider
                    style={{
                        marginHorizontal: "10%",
                    }}
                />
            </Animatable>
            <Animatable
            animation={"fadeIn"}
            delay={800}
            >
            <View style={{
                alignSelf: "center",
            }}>
                {children}
            </View>
            </Animatable>
            <Animatable
                animation={"slideInRight"}
                delay={800}
            >
            <Divider
                style={{
                    marginHorizontal: "10%",
                }}
            />
            </Animatable>
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
                <Animatable
                    animation={"bounceIn"}
                    delay={1000}
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
                </Animatable>
                {hasNextLevel &&
                <Animatable
                    animation={"flipInY"}
                    delay={1000}
                >
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

                </Animatable>
                }
            </View>
        </View>
    )
};

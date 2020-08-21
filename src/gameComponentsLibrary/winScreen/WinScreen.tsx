import React from "react";
import {View} from "react-native";
import {Text} from "react-native-paper";
import {SimpleLineIcons as Icon} from "@expo/vector-icons";
import {WinScreenProps} from "../../universalGame/components/types-components";
import {createWinScreen} from "./CreateWinScreen";


export const BasicBody = ({current, previousBest, booleans, minimumMoves}: WinScreenProps) => (
    <View>
        <Text>Moves: {current.moves}</Text>
        {!!minimumMoves && <Text>Fewest Possible Moves: {minimumMoves}</Text>}
        {booleans.isBestMoves || <Text>Your Best: {previousBest?.moves} </Text>}
        <Text><Icon name={"hourglass"}/>Time: {seconds(current.time)}s</Text>
        {booleans.isBestTime || (!!previousBest && <Text>Your Best: {seconds(previousBest.time)}s</Text>)}
    </View>
)

/**
 * is this the title component, or just the text?
 */
export const BasicTitle = ({booleans}: WinScreenProps) => (
    <>{booleans.isPerfect ? "Perfect!" : "You Win!"}</>
)

export const seconds = (ms: number): number => Math.round(ms / 1000);

export const BasicWinScreen = createWinScreen({
    body: BasicBody,
    title: BasicTitle,
})

import React, {ComponentType, ReactNode} from "react";
import {WinScreenProps, TransitionProps} from "../../universalGame/components/types-components";
import {SimpleLineIcons as Icon} from "@expo/vector-icons";
import {Button, Divider, Surface, Text, Title} from "react-native-paper";
import {View} from "react-native";

/**
 * rather than having to recreate the entire win screen component to make changes,
 * use a standard win screen with a "body" prop for the custom body
 * other optional props control texts and icons
 */

type WProps = WinScreenProps & TransitionProps;

type Node = ReactNode | ((props: WProps) => ReactNode);

//maybe icon and text are props here rather than children?
//paper takes icon as a prop but it always puts it on the left
type ButtonProp = ComponentType<{ onPress(): void, children: ReactNode }>

export interface Props {
    /**
     * body is required
     * this is where you show moves, best moves, time, etc
     */
    body: Node;
    /**
     * default: "You Win!"
     */
    title?: Node;
    /**
     * default: none
     */
    replayText?: Node;
    /**
     * default: arrow circle icon
     */
    replayIcon?: Node;
    /**
     * default: "Continue"
     */
    continueText?: Node;
    /**
     * default: chevron right icon
     */
    continueIcon?: Node;
    /**
     * in the future I can add some nice standard animation for stars,
     * but not relying on stars yet
     * default: false
     */
    showStars?: boolean;
    /**
     * default is a line
     */
    divider?: Node;
}

const defaultProps: Required<Omit<Props, 'body'>> = {
    title: "You Win!",
    replayText: null,
    replayIcon: <Icon name={"reload"}/>,
    continueText: "Continue",
    continueIcon: <Icon name={"arrow-right"}/>,
    showStars: false,
    divider: <Divider style={{marginHorizontal: "10%"}}/>
}


//TODO: animate in
export const createWinScreen = (_createProps: Props) => {
    const createProps = {
        ...defaultProps,
        ..._createProps,
    };

    const {body, title, continueIcon, continueText, replayIcon, replayText, divider, showStars} = createProps;

    return (props: TransitionProps & WinScreenProps) => {

        const {levelId, packId, current, previousBest, onPressNext, onPressReplay, loadingIn, loadingOut, hasNextLevel, minimumMoves, booleans} = props;

        const toNode = (node: Node): ReactNode => {
            return typeof node === "function" ? node(props) : node;
        }

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
                >{toNode(title)}</Title>
                {toNode(divider)}
                <View style={{
                    alignSelf: "center",
                }}>
                    {toNode(body)}
                </View>
                {toNode(divider)}
                {!hasNextLevel &&
                <>
                    <Text>Pack Completed!</Text>
                    {toNode(divider)}
                </>
                }
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
                            {toNode(replayText)}
                            {toNode(replayIcon)}
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
                            {toNode(continueText)}
                            {toNode(continueIcon)}
                        </Button>
                    </View>
                    }
                </View>
            </View>
        )
    };
};

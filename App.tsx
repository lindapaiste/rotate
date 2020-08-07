import React from 'react';
import Game from "./src/universalGame";
import packs from "./src/data/quilt-defined-packs";
import {BasicWinScreen} from "./src/gameComponentsLibrary/winScreen/WinScreen";
import {useDimensions} from "./src/lib/useDimensions";
import {PacksList} from "./src/gameComponentsLibrary/selectPack/PacksList";
import {PackItem} from "./src/gameComponentsLibrary/selectPack/PackItem";
import {Button, Card, DarkTheme, Modal, Text, Title} from "react-native-paper";
import {withSlide} from "./src/gameComponentsLibrary/transitions/withSlide";
import {RenderQuiltLevel} from "./src/quilt/grid/QuiltLevel";
import {makeTopMenu} from "./src/gameComponentsLibrary/menus/TopMenu";
import {ButtonThumb} from "./src/gameComponentsLibrary/levelsGrid/ButtonThumb";
import {SmartSizeGrid} from "./src/gameComponentsLibrary/levelsGrid/SmartSizeGrid";
import {BottomMenu} from "./src/gameComponentsLibrary/menus/BottomMenu";
import {MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import {IconLibrary} from "./src/universalGame/components/screen/Icons";

export default function App() {
    return (
        <Game
            icons={{
                settings: {
                    name: "cog",
                    Component: MaterialIcons,
                },
                share: {
                    name: "share-alt",
                    Component: SimpleLineIcons,
                },
                hint: {
                    name: "bulb",
                    Component: SimpleLineIcons,
                },
                undo: {
                    name: "action-undo",
                    Component: SimpleLineIcons,
                },
                restart: {
                    name: "refresh",
                    Component: SimpleLineIcons,
                }
            }}
            initialSettings={{}}
            packs={packs}
            theme={DarkTheme}
            Components={{
                RenderWinLevel: withSlide(BasicWinScreen),
                RenderTopMenu: makeTopMenu({
                    titleStyle: {
                        alignSelf: "center",
                        marginLeft: 0,
                    }
                }),
                //@ts-ignore
                RenderPlayLevel: withSlide(RenderQuiltLevel),
                /*(props) => (<><RenderQuiltLevel {...props}/>
                        <BottomMenu items={[
                            {
                                key: "undo",
                                icon: "undo",
                                title: "Undo",
                                onPress(): void {
                                    console.log("did undo");
                                }
                            },
                            {
                                key: "restart",
                                icon: "restart",
                                title: "Restart",
                                onPress(): void {
                                    console.log("did restart");
                                }
                            },
                            {
                                key: "hint",
                                icon: "hint",
                                title: "Hint",
                                onPress(): void {
                                    console.log("hint requested");
                                }
                            },
                            {
                                key: "share",
                                icon: "share",
                                title: "Share",
                                onPress(): void {
                                    console.log("doing share");
                                }
                            }
                        ]}/>
                    </>
                ),*/
                RenderUnlockPackModal: (props) => (
                    <Card>
                        <Card.Content>
                            <Title>{props.title}</Title>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={props.onUnlock}>
                                Buy - $0.99
                            </Button>
                        </Card.Actions>
                    </Card>
                ),
                RenderStoreModal: () => <Modal visible={true} dismissable={true}><Text>Buy Stuff</Text></Modal>,
                RenderSettingsModal: ({isOpen, onPressClose}) => <Modal visible={isOpen} dismissable={true}
                                                                        onDismiss={onPressClose}
                                                                        contentContainerStyle={{
                                                                            backgroundColor: "darkgray",
                                                                            height: 300
                                                                        }}><Text>Edit Settings</Text></Modal>,
                RenderSelectLevel: withSlide(
                    (props) => (
                        <SmartSizeGrid
                            RenderThumb={ButtonThumb}
                            width={.90 * useDimensions().width}
                            basePerRow={5}
                            minThumbSize={40}
                            maxThumbSize={100}
                            {...props}
                        />
                    )),
                RenderSelectPack: withSlide(
                    (props) => (
                        <PacksList
                            {...props}
                            //@ts-ignore
                            RenderItem={(props) => <PackItem {...props} />}
                        />
                    )
                )
            }}
        />
    );
}

//style={{backgroundColor: "#637686"}}

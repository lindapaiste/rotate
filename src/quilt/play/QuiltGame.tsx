import Game from "../../universalGame";
import {MaterialIcons, SimpleLineIcons} from "@expo/vector-icons";
import packs from "../../data/quilt-defined-packs";
import {Button, Card, DarkTheme, Modal, Text, Title} from "react-native-paper";
import {QuiltWinScreen} from "../../effects/QuiltWinScreen";
import {makeTopMenu} from "../../gameComponentsLibrary/menus/TopMenu";
import {withSlide} from "../../effects/withSlide";
import {RenderQuiltLevel} from "./QuiltLevel";
import {RenderInfiniteQuiltLevel} from "./InfiniteQuiltLevel";
import {SmartSizeGrid} from "../../gameComponentsLibrary/levelsGrid/SmartSizeGrid";
import {ButtonThumb} from "../../gameComponentsLibrary/levelsGrid/ButtonThumb";
import {useDimensions} from "../../lib/useDimensions";
import {PacksList} from "../../gameComponentsLibrary/selectPack/PacksList";
import {PackItem} from "../../gameComponentsLibrary/selectPack/PackItem";
import React from "react";


/**
 * put all of the pieces together into the Game package
 */
export default () => (
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
                RenderWinLevel: QuiltWinScreen,//withSlide(BasicWinScreen),
                RenderTopMenu: makeTopMenu({
                    titleStyle: {
                        alignSelf: "center",
                        marginLeft: 0,
                    }
                }),
                //@ts-ignore
                RenderPlayLevel: withSlide(RenderQuiltLevel), //I want a slide if hitting the back button, but not if going to or from win screen withSlide(RenderQuiltLevel),
                RenderPlayInfiniteLevel: withSlide(RenderInfiniteQuiltLevel),
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

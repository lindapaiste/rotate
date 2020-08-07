import React from "react";
import {Appbar} from "react-native-paper";
import {StyleProp, TextStyle, View, ViewStyle} from "react-native";
import {I_TopMenuProps} from "../../universalGame/components/types-components";
import {Page} from "../../universalGame/state/pages";
import {MaybeGenerate, resolveProp} from "../../lib";

/**
 * extra props not provided by the game -- all are optional
 */
export interface ExtraProps {
    style?: StyleProp<ViewStyle>;
    backStyle?: StyleProp<ViewStyle>;
    settingsStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
    showTitle?: boolean | ((page: Page) => boolean);
    //custom right hand side?
    showSettings?: boolean | ((page: Page) => boolean);

    onPressTitle?(): void;
}

export type Props = ExtraProps & I_TopMenuProps;

/**
 * combines multiple components from Paper and allows passing of styles to each element
 */

/**
 * //TODO: figure out how to hide the back action without throwing everything off center
 */

export const TopMenu = ({style, backStyle, settingsStyle, titleStyle, subtitleStyle, hasBack, onPressBack, title, subtitle, onPressTitle, showSettings = true, showTitle = true, onPressSettings, current}: Props) => {

    const resolve = (prop: MaybeGenerate<any, Page>) =>
        resolveProp(prop, current);

    return (
        <Appbar.Header style={style}>
            {//hasBack &&
            <Appbar.BackAction
                style={backStyle}
                onPress={onPressBack}
                disabled={!hasBack}
            />
            }
            {(resolve(showTitle) && !!title) ?
            <Appbar.Content
                title={resolve(title)}
                subtitle={resolve(subtitle)}
                titleStyle={titleStyle}
                subtitleStyle={subtitleStyle}
                onPress={onPressTitle}
                style={{
                    marginLeft: 0
                }}
            />
            :
                <View style={{
                    flex: 1 //empty view with flex 1 enforces that the settings icon is always on the right even when there is no title
                }}/>
            }
            {resolve(showSettings) &&
            <Appbar.Action
                icon="cogs"
                style={settingsStyle}
                onPress={onPressSettings}
            />
            }
        </Appbar.Header>
    )
}

/**
 * HOC to pass in just in the extra props
 */
export const makeTopMenu = (extra: ExtraProps & Partial<I_TopMenuProps>) =>
    (props: Props) => (
        <TopMenu {...props} {...extra}/>
    )

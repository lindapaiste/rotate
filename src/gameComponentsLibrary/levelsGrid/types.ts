import {Victory} from "../../universalGame/state/types-state";
import {I_LevelThumbProps, I_RenderPackProps} from "../../universalGame/components/types-components";
import {ComponentType} from "react";
import {ViewStyle} from "react-native";

export interface GridSizingProps {
    width: number;
    maxThumbSize: number;
    minThumbSize: number;
    basePerRow: number;
    aspectRatio?: number;
}

export interface ThumbProps extends I_LevelThumbProps<{}> {
    size: number;
    aspectRatio?: number;
    levelId: number;
    best?: Victory | undefined;

    onPress(): void;
}

export type GridProps<T> =
    Pick<I_RenderPackProps<T>, 'levels' | 'onPressLevel'> &
    Pick<ThumbProps, 'size' | 'aspectRatio'> & {
    RenderThumb: ComponentType<ThumbProps>
    style?: ViewStyle,
}

export type SmartSizeProps<T> = Omit<GridProps<T>, 'size'> & GridSizingProps;

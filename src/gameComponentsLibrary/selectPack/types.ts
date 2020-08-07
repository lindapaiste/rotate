import {I_PackProps, I_SelectPackProps} from "../../universalGame/components/types-components";
import {ComponentType} from "react";
import {StyleProp, ViewStyle} from "react-native";

export type PackItemProps<P> = I_PackProps<P> & {
    //assume onClick already takes into account whether it's opening the unlock modal or entering the pack
    onClick(): void;
    style?: StyleProp<ViewStyle>;
}

export type PacksListProps<P> = I_SelectPackProps<P> & {
    RenderItem: ComponentType<PackItemProps<P>>;
    style?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
}

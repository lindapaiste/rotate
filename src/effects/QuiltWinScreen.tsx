import {WinScreenProps, TransitionProps} from "../universalGame/components/types-components";
import {OuterWinScreen} from "./AnimatedWinScreen";
import React from "react";
import {useLoadTimers} from "./useLoadTimers";
import {BasicBody} from "../gameComponentsLibrary/winScreen/WinScreen";

export const QuiltWinScreen = (props : TransitionProps & WinScreenProps) => {
    return (
        <OuterWinScreen
            {...props}
            {...useLoadTimers({
                loadingIn: !! props.loadingIn,
                loadingOut: !! props.loadingOut,
                duration: {
                    in: 2000,
                    out: 500,
                },
                onEnd: {
                    in: () => props.endTransition(),
                    out: () => undefined,
                }
            })}
            >
            <BasicBody
                {...props}
            />
        </OuterWinScreen>
    )
}

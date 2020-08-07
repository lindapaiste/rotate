import {PackStatic, State, Victory} from "../../state/types-state";
import {Page, PageType} from "../../state/pages";
import {
    getAllPackProps,
    getHasNextLevel,
    getIsUnlocked,
    getLevelBest,
    getLevelProps,
    getMinimumMoves,
    getPackBests,
    getPackProps
} from "../../state/selectors";
import {mapVictoryBooleans} from "./mapping";
import React from "react";
import {PageComponents, TransitionProps} from "../types-components";
import {ActionsObject} from "../../state/types-actions";
import {ModalType} from "../../state/modals";


export interface Props<S, P extends PackStatic<any>> {
    page: Page;
    transition: TransitionProps;
    state: State<S, P>;
    actions: ActionsObject<S>;
    Components: PageComponents<S, P>;
}

/**
 * assigns the various page type to their render components and gives them all of the necessary props
 *
 * renders a single screen, which can be loading in, loading out, or active
 *
 * can deal with modals in a cleaner way by saving open modal to state,
 * but would want to save props and type rather than a JSX element
 */
export const RenderPage = <S extends {}, P extends PackStatic<any>>({page, transition, state, actions, Components}: Props<S, P>) => {
    switch (page.type) {

        case PageType.SELECT_LEVEL:
            const pack = getPackProps(page.packId)(state);

            return (
                <Components.RenderSelectLevel
                    {...transition}
                    {...pack}
                    levels={getPackBests(page.packId)(state)}
                    onPressLevel={
                        (levelId: number) => actions.playLevel({
                            levelId,
                            packId: page.packId
                        })
                    }
                />
            );

        case PageType.WIN_LEVEL:
            const {best, victory} = page.extra;
            const minimumMoves = getMinimumMoves(page)(state);
            return (
                <Components.RenderWinLevel
                    {...transition}
                    levelId={page.levelId}
                    packId={page.packId}
                    previousBest={best}
                    current={victory}
                    minimumMoves={minimumMoves}
                    booleans={mapVictoryBooleans(victory, best, minimumMoves)}
                    hasNextLevel={getHasNextLevel(page)(state)}
                    onPressNext={
                        () => actions.playLevel({
                            packId: page.packId,
                            levelId: page.levelId + 1,
                        }, false)
                    }
                    onPressReplay={
                        () => actions.playLevel(page, true)
                    }
                />
            );

        case PageType.PLAY_LEVEL:
            return (
                <Components.RenderPlayLevel
                    {...transition}
                    {...getLevelProps(page)(state)}
                    levelId={page.levelId}
                    packId={page.packId}
                    previousBest={getLevelBest(page)(state)}
                    onWin={
                        (victory: Victory) => actions.completeLevel({
                            ...victory,
                            ...page,
                        })
                    }
                />
            );

        case PageType.SELECT_PACK:
            return (
                <Components.RenderSelectPack
                    {...transition}
                    packs={getAllPackProps(state)}
                    onPressPack={(packId: number) => {
                        /**
                         * open pack if unlocked, or pop up unlock pack modal
                         * //TODO: don't browse infinity packs -- can either handle here or in state with an "open pack" action
                         */
                        if (getIsUnlocked(packId)(state)) {
                            actions.browseLevels(packId)
                        } else {
                            actions.openModal({
                                type: ModalType.UNLOCK_PACK,
                                packId
                            })
                        }
                    }}
                />
            );

        default:
            return null;
    }
}

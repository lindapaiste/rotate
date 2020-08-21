import {PackStatic, State, Victory} from "../../state/types-state";
import {Page, PageType} from "../../state/pages";
import {
    getAllPackProps,
    getHasNextLevel, getIsInfinite,
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
 * assigns the various page types to their render components and gives them all of the necessary props
 *
 * renders a single screen, which can be loading in, loading out, or active
 */
export const RenderPage = <S extends {}, P extends PackStatic<any>>({page, transition, state, actions, Components}: Props<S, P>) => {
    switch (page.type) {

        case PageType.SELECT_LEVEL:
            return (
                <Components.RenderSelectLevel
                    {...transition}
                    {...getPackProps(page.packId)(state)}
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
            // TODO: how to deal with minimum moves for infinite packs? will be based on a function rather than a value
            // stored in the pack props object could pass in with the victory
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
            /**
             * need to separate between infinite and regular packs
             * or perhaps handle this lower, where the Game instance just gets the ids and has to get pack props itself
             */
            const pack = state.packs[page.packId];

            const sharedProps = {
                ...transition,
                levelId: page.levelId,
                packId: page.packId,
                onWin: (victory: Victory) => actions.completeLevel({
                    ...victory,
                    ...page,
                })
            };

            if (pack.infinite) {
                return (
                    <Components.RenderPlayInfiniteLevel
                        {...sharedProps}
                        previousBest={null}
                    />
                )
            }

            else return (
                <Components.RenderPlayLevel
                    {...sharedProps}
                    {...getLevelProps(page)(state)}
                    previousBest={getLevelBest(page)(state)}
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
                         * don't browse infinity packs -- can either handle here or in state with an "open
                         * pack" action
                         */
                        if (getIsUnlocked(packId)(state)) {
                            if (getIsInfinite(packId)(state)) {
                                actions.playLevel({
                                    packId,
                                    levelId: 0,
                                });
                            } else {
                                actions.browseLevels(packId);
                            }
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

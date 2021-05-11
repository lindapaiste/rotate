import {State, Victory} from "../state/types-state";
import {ActionsObject} from "../state/types-actions";
import {
    PackProps,
    PlayLevelProps,
    RenderPackProps,
    SelectPackProps,
    TopMenuProps,
    WinScreenProps
} from "../components/types-components";
import {getIsUnlocked, getLevelBest, getPackBests, getPackState} from "./selectors";
import {ModalType} from "../state/modals";
import {LevelIdentifier, PackStatic} from "../components/types-pack";
import {getHasNextLevel, getLevelProps, getParentPage, getTitles} from "./pack-selectors";
import {getMinimumMoves, mapVictoryBooleans, packToProps} from "./helpers";
import {AppPage, PageType} from "../state/pages";

/**
 * Functions in this file extract component props from a combination of state, actions, and packs.
 * They make use of selectors, but these are not pure selectors because they rely on information stored in the packs
 * array which is not part of state.
 */


/**
 * define a standard set of required props to map to component props
 * some components require additional info about the current page
 */
export interface Props<S, P extends PackStatic<any>> {
    packs: P[];
    state: State<S>;
    actions: ActionsObject<S>;
}

/**
 * combines pack static and pack state for ALL packs
 * the array of pack props is used by both the Store and the Select Pack screens, so separate out this function
 */
export const getAllPackProps = <P extends PackStatic<any>>({packs, state}: Omit<Props<any, P>, 'actions'>): PackProps<P>[] => {
    return packs.map(
        pack => packToProps(pack, getPackState(pack.packId)(state))
    );
}

/**
 * get the props for a specific pack based on its packId
 */
export const getPackProps = <P extends PackStatic<any>>({packs, state, packId}: Omit<Props<any, P>, 'actions'> & { packId: number }): PackProps<P> => {
    return packToProps(packs[packId], getPackState(packId)(state));
}



export const getSelectPackProps = <P extends PackStatic<any>>({packs, state, actions}: Props<any, P>): SelectPackProps<P> => {
    return {
        packs: getAllPackProps({packs, state}),
        onPressPack: (packId: number) => {
            /**
             * open pack if unlocked, or pop up unlock pack modal
             * don't browse infinity packs -- can either handle here or in state with an "open
             * pack" action
             */
            if (getIsUnlocked(packId)(state)) {
                if (packs[packId].infinite) {
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
        }
    }
};

export const getPlayLevelProps = <L>({packs, state, actions, ...level}: LevelIdentifier & Props<any, PackStatic<L>>): PlayLevelProps<L> => {

    const props = getLevelProps(level, packs);

    return {
        ...level,
        ...props,
        previousBest: getLevelBest(level)(state),
        onWin: (victory: Victory) => actions.completeLevel({
            ...victory,
            ...level
        }),
    }
};

export const getSelectLevelProps = <P extends PackStatic<any>>({packs, state, actions, packId}: Props<any, P> & { packId: number }): RenderPackProps<P> => {

    return {
        ...packToProps(packs[packId], getPackState(packId)(state)),
        levels: getPackBests(packId)(state),
        onPressLevel: (levelId: number) => actions.playLevel({
            levelId,
            packId
        })
    }
}

export const getWinScreenProps = ({packs, state, actions, extra, ...level}: Props<any, PackStatic<any>> & AppPage & { type: PageType.WIN_LEVEL }): WinScreenProps => {
    const {best: previousBest, victory: current} = extra;

    const levelProps = getLevelProps(level, packs);

    const minimumMoves = getMinimumMoves(levelProps);

    const booleans = mapVictoryBooleans(current, previousBest, minimumMoves);


    return {
        ...level,
        booleans,
        current,
        previousBest,
        minimumMoves,
        onPressNext: () => {
            actions.playLevel({
                packId: level.packId,
                levelId: level.levelId + 1,
            }, false)
        },
        onPressReplay: () => {
            actions.playLevel(level, true)
        },
        hasNextLevel: getHasNextLevel(level, packs),
    }
}

export const getTopMenuProps = ({packs, state, actions, ...page}: Props<any, PackStatic<any>> & AppPage): TopMenuProps => {

    const backPage = getParentPage(page, packs);

    return {
        ...getTitles(page, packs),
        current: page,
        hasBack: backPage !== null,
        onPressBack: () => {
            backPage ? actions.goBack(backPage) : undefined;
        },
        onPressSettings: () => {
            actions.openModal({type: ModalType.SETTINGS} );
        }
    }

}

/**
 * can get props for any screen using switch, but this is not particularly useful without a clearly defined return type
 * would need a complicated TS lookup type to make it useful
 */
export const getScreenProps = <L, P extends PackStatic<L>>(props: Props<any, P> & {page: AppPage}) => {

}

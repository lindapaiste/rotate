import {State} from "../state/types-state";
import {StateProps} from "../components/types-game";
import {PageType} from "../state/pages";
import {initialPackState} from "../state/empty-state";

/**
 * create an initial state from an array of packs and an object of initial/default settings
 */
export const createInitialState = <S extends State<any, any>>({initialSettings, packs}: StateProps<S>): S => {
    return {
        packs,
        settings: initialSettings,
        screen: {
            current: {
                type: PageType.SELECT_PACK
            },
            previous: {
                type: PageType.APP_LOADING
            },
            isTransitioning: false,
            modal: null,
        },
        progress: packs.map(initialPackState),
    } as S;
}

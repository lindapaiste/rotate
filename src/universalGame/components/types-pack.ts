export interface PackShared<L> {
    title: string;
    subtitle?: string;
    image?: any;
    packId: number;
    initialUnlocked: boolean;
    infinite: boolean;
    levels?: L[];
}

/**
 * if a pack is not infinite, then it must contain an array of level props
 */
export interface DefinedPack<L> extends PackShared<L> {
    infinite: false;
    levels: L[];
}

/**
 * infinite packs should not have their getLevel() function stored in state because
 * it is bad practice to store non-serializable objects such as functions
 *
 * instead, leave it up to the game instance to know how to handle an infinite level
 * this means that a separate component is needed for rendering a level without known props
 */
export interface InfinitePack<L> extends PackShared<L> {
    infinite: true;
    getLevel(levelId: number): L;
}

/**
 * called PackStatic because these are the immutable properties of a pack
 * extend this interface to include other custom props
 * union declares that if infinite is true then getLevel must exist
 * and if it's false then levels array must exist
 */
export type PackStatic<L> = PackShared<L> & (DefinedPack<L> | InfinitePack<L>)
/**
 * get the level type from the Pack type
 */
export type LevelType<P extends PackStatic<any>> = P extends PackStatic<infer L> ? L : never;

export interface LevelIdentifier {
    packId: number;
    levelId: number;
}

export interface Titles {
    title: string;
    subtitle: string;
}

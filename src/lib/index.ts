import {isFunction} from "lodash";
import chroma from "chroma-js";
import {ComponentType} from "react";

export {isFunction, random, sample, last, omit, round, range} from "lodash";

export const makeArray = <T>(length: number, value: T | ((i: number) => T)): T[] => {
    return [...new Array(length)].map((_, i) =>
        isFunction(value) ? value(i) : value
    );
};

export const randomHex = (): string => chroma.random().hex();

export const randomHexes = (count: number): string[] => {
    return makeArray(count, randomHex);
}

export type Unpack<T> = T extends Array<infer U> ? U : T;

export const replaceIndex = <T extends any[]>(array: T, i: number, value: Unpack<T>): T => {
    return Object.assign([...array], {[i]: value}) as T;
};

export const ifNotNull = <T, R>(value: T | null, replacement: R): T | R => {
    return value === null ? replacement : value;
}

export const ifDefined = <T, R>(value: T | undefined, replacement: R): T | R => {
    return value === undefined ? replacement : value;
}

export type Generate<T, A> = ((args: A) => T)

export type MaybeGenerate<T, A> = T | ((args: A) => T)

export type GeneratorArgs<T extends MaybeGenerate<any, any>> = T extends MaybeGenerate<any, infer A> ? A : never

export type GeneratorType<T extends MaybeGenerate<any, any>> = T extends MaybeGenerate<infer A, any> ? A : never

export const resolveProp = <T extends MaybeGenerate<any, any>>(prop: T, args: GeneratorArgs<T>): GeneratorType<T> => {
    return typeof prop === "function" ? prop(args) : prop;
}

export type PropsType<T> = T extends ComponentType<infer P> ? P : never;

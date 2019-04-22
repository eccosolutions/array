import {Comparator, compare as defaultCompare, Comparison} from "@softwareventures/ordered";
import {Dictionary} from "dictionary-types";

// tslint:disable-next-line:no-unbound-method
const nativeSlice = Array.prototype.slice;

// tslint:disable-next-line:no-unbound-method
const nativeConcat = Array.prototype.concat;

// tslint:disable-next-line:no-unbound-method
const nativeMap = Array.prototype.map;

// tslint:disable-next-line:no-unbound-method
const nativeFilter = Array.prototype.filter;

// tslint:disable-next-line:no-unbound-method
const nativeReduce = Array.prototype.reduce;

// tslint:disable-next-line:no-unbound-method
const nativeReduceRight = Array.prototype.reduceRight;

// tslint:disable-next-line:no-unbound-method
const nativeIndexOf = Array.prototype.indexOf;

// tslint:disable-next-line:no-unbound-method
const nativeFind = Array.prototype.find;

export const copy: <T>(array: ArrayLike<T>) => T[] =
    Array.from == null
        ? array => nativeSlice.call(array)
        : Array.from; // tslint:disable-line:no-unbound-method

const isArray: (value: any) => value is any[] =
    Array.isArray == null
        ? ((value: any) => value instanceof Array) as any
        : Array.isArray; // tslint:disable-line:no-unbound-method

export function coerce<T>(array: ArrayLike<T>): ReadonlyArray<T> {
    return isArray(array)
        ? array
        : copy(array);
}

export function head<T>(array: ArrayLike<T>): T | null {
    return array.length === 0
        ? null
        : array[0];
}

export function tail<T>(array: ArrayLike<T>): T[] {
    return nativeSlice.call(array, 1);
}

export function initial<T>(array: ArrayLike<T>): T[] {
    return array.length === 0
        ? []
        : nativeSlice.call(array, array.length - 1);
}

export function last<T>(array: ArrayLike<T>): T | null {
    return array.length === 0
        ? null
        : array[array.length - 1];
}

export function empty<T>(array: ArrayLike<T>): boolean {
    return array.length === 0;
}

export function reverse<T>(array: ArrayLike<T>): T[] {
    const result = copy<T>({length: array.length});
    for (let i = 0; i < array.length; ++i) {
        result[i] = array[array.length - i - 1];
    }
    return result;
}

export function slice<T>(array: ArrayLike<T>, start?: number, end?: number): T[] {
    return nativeSlice.call(array, start, end);
}

export function sliceFn<T>(start?: number, end?: number): (array: ArrayLike<T>) => T[] {
    return array => nativeSlice.call(array, start, end);
}

export function take<T>(array: ArrayLike<T>, count: number): T[] {
    return nativeSlice.call(array, 0, count);
}

export function takeFn<T>(count: number): (array: ArrayLike<T>) => T[] {
    return array => nativeSlice.call(array, 0, count);
}

export function drop<T>(array: ArrayLike<T>, count: number): T[] {
    return nativeSlice.call(array, count);
}

export function dropFn<T>(count: number): (array: ArrayLike<T>) => T[] {
    return array => nativeSlice.call(array, count);
}

export const map: <T, U>(array: ArrayLike<T>, f: (element: T, index: number) => U) => U[] =
    Array.from != null
        // tslint:disable-next-line:no-unbound-method
        ? Array.from as any // TypeScript 3.2 incorrectly requires this cast to any.
        : (array, f) => nativeMap.call(array, f);

export function mapFn<T, U>(f: (element: T, index: number) => U): (array: ArrayLike<T>) => U[] {
    return array => map(array, f);
}

export function filter<T, U extends T>(array: ArrayLike<T>,
                                       predicate: (element: T, index: number) => element is U): U[];
export function filter<T>(array: ArrayLike<T>, predicate: (element: T, index: number) => boolean): T[];
export function filter<T>(array: ArrayLike<T>, predicate: (element: T, index: number) => boolean): T[] {
    return nativeFilter.call(array, predicate);
}

export function filterFn<T, U extends T>(predicate: (element: T, index: number) => element is U)
    : (array: ArrayLike<T>) => U[];
export function filterFn<T>(predicate: (element: T, index: number) => boolean): (array: ArrayLike<T>) => T[];
export function filterFn<T>(predicate: (element: T, index: number) => boolean): (array: ArrayLike<T>) => T[] {
    return array => filter(array, predicate);
}

export function fold<T, U>(array: ArrayLike<T>, f: (accumulator: U, element: T, index: number) => U, initial: U): U {
    return (nativeReduce as any).call(array, f, initial);
}

export function foldFn<T, U>(f: (accumulator: U, element: T, index: number) => U,
                             initial: U): (array: ArrayLike<T>) => U {
    return array => (nativeReduce as any).call(array, f, initial);
}

export function foldMonoid<T>(array: ArrayLike<T>, f: (accumulator: T, element: T, index: number) => T): T {
    return (nativeReduce as any).call(array, f);
}

export function foldMonoidFn<T>(f: (accumulator: T, element: T, index: number) => T): (array: ArrayLike<T>) => T {
    return array => (nativeReduce as any).call(array, f);
}

export function foldRight<T, U>(array: ArrayLike<T>,
                                f: (accumulator: U, element: T, index: number) => U,
                                initial: U): U {
    return (nativeReduceRight as any).call(array, f, initial);
}

export function foldRightFn<T, U>(f: (accumulator: U, element: T, index: number) => U,
                                  initial: U): (array: ArrayLike<T>) => U {
    return array => (nativeReduceRight as any).call(array, f, initial);
}

export function foldMonoidRight<T>(array: ArrayLike<T>, f: (accumulator: T, element: T, index: number) => T): T {
    return (nativeReduceRight as any).call(array, f);
}

export function foldMonoidRightFn<T>(f: (accumulator: T, element: T, index: number) => T): (array: ArrayLike<T>) => T {
    return array => (nativeReduceRight as any).call(array, f);
}

export function contains<T>(array: ArrayLike<T>, value: T): boolean {
    return nativeIndexOf.call(array, value) !== -1;
}

export function containsFn<T>(value: T): (array: ArrayLike<T>) => boolean {
    return array => nativeIndexOf.call(array, value) !== -1;
}

export function indexOf<T>(array: ArrayLike<T>, value: T): number | null {
    const index = nativeIndexOf.call(array, value);
    return index === -1 ? null : index;
}

export function indexOfFn<T>(value: T): (array: ArrayLike<T>) => number | null {
    return array => indexOf(array, value);
}

export function find<T>(array: ArrayLike<T>, predicate: (element: T, index: number) => boolean): number | null {
    const index = nativeFind.call(array, predicate);
    return index === -1 ? null : index;
}

export function findFn<T>(predicate: (element: T, index: number) => boolean): (array: ArrayLike<T>) => number | null {
    return array => find(array, predicate);
}

export function maximum<T extends string | number | boolean>(array: ArrayLike<T>): T | null;
export function maximum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null;
export function maximum<T>(array: ArrayLike<T>, compare: Comparator<any> = defaultCompare): T | null {
    return internalMaximum(array, compare);
}

export function maximumFn<T extends string | number | boolean>(): (array: ArrayLike<T>) => T | null;
export function maximumFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T | null;
export function maximumFn<T>(compare: Comparator<any> = defaultCompare): (array: ArrayLike<T>) => T | null {
    return array => internalMaximum(array, compare);
}

function internalMaximum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null {
    if (array.length === 0) {
        return null;
    }

    let result = array[0];

    for (let i = 1; i < array.length; ++i) {
        if (compare(array[i], result) > 0) {
            result = array[i];
        }
    }

    return result;
}

export function minimum<T extends string | number | boolean>(array: ArrayLike<T>): T | null;
export function minimum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null;
export function minimum<T>(array: ArrayLike<T>, compare: Comparator<any> = defaultCompare): T | null {
    return internalMinimum(array, compare);
}

export function minimumFn<T extends string | number | boolean>(): (array: ArrayLike<T>) => T | null;
export function minimumFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T | null;
export function minimumFn<T>(compare: Comparator<any> = defaultCompare): (array: ArrayLike<T>) => T | null {
    return array => internalMinimum(array, compare);
}

function internalMinimum<T>(array: ArrayLike<T>, compare: Comparator<T>): T | null {
    if (array.length === 0) {
        return null;
    }

    let result = array[0];

    for (let i = 1; i < array.length; ++i) {
        if (compare(array[i], result) < 0) {
            result = array[i];
        }
    }

    return result;
}

export function sum(array: ArrayLike<number>): number {
    return fold(array, (a, b) => a + b, 0);
}

export function product(array: ArrayLike<number>): number {
    return fold(array, (a, b) => a * b, 1);
}

export function and(array: ArrayLike<boolean>): boolean {
    return find(array, element => !element) == null;
}

export function or(array: ArrayLike<boolean>): boolean {
    return find(array, element => !!element) != null;
}

export function any<T>(array: ArrayLike<T>, predicate: (element: T, index: number) => boolean): boolean {
    return find(array, predicate) != null;
}

export function anyFn<T>(predicate: (element: T, index: number) => boolean): (array: ArrayLike<T>) => boolean {
    return array => any(array, predicate);
}

export function all<T>(array: ArrayLike<T>, predicate: (element: T, index: number) => boolean): boolean {
    return !any(array, (element, index) => !predicate(element, index));
}

export function allFn<T>(predicate: (element: T, index: number) => boolean): (array: ArrayLike<T>) => boolean {
    return array => all(array, predicate);
}

export function concat<T>(arrays: ArrayLike<ArrayLike<T>>): T[] {
    return nativeConcat.apply([], map(arrays, coerce));
}

export function prepend<T>(a: ArrayLike<T>): (b: ArrayLike<T>) => T[] {
    return b => concat([a, b]);
}

export function append<T>(b: ArrayLike<T>): (a: ArrayLike<T>) => T[] {
    return a => concat([a, b]);
}

export function concatMap<T, U>(array: ArrayLike<T>, f: (element: T) => U[]): U[] {
    return concat(map(array, f));
}

export function concatMapFn<T, U>(f: (element: T) => U[]): (array: ArrayLike<T>) => U[] {
    return array => concatMap(array, f);
}

export function scan<T, U>(array: ArrayLike<T>, f: (accumulator: U, element: T, index: number) => U, initial: U): U[] {
    const result: U[] = copy({length: array.length});
    let accumulator = initial;

    for (let i = 0; i < array.length; ++i) {
        result[i] = accumulator = f(accumulator, array[i], i);
    }

    return result;
}

export function scanFn<T, U>(f: (accumulator: U, element: T, index: number) => U,
                             initial: U): (array: ArrayLike<T>) => U[] {
    return array => scan(array, f, initial);
}

export function scanMonoid<T>(array: ArrayLike<T>, f: (accumulator: T, element: T, index: number) => T): T[] {
    if (array.length === 0) {
        return [];
    }

    const result: T[] = copy({0: array[0], length: array.length});

    for (let i = 1; i < array.length; ++i) {
        result[i] = f(result[i - 1], array[i], i);
    }

    return result;
}

export function scanMonoidFn<T>(f: (accumulator: T, element: T, index: number) => T): (array: ArrayLike<T>) => T[] {
    return array => scanMonoid(array, f);
}

export function scanRight<T, U>(array: ArrayLike<T>,
                                f: (accumulator: U, element: T, index: number) => U,
                                initial: U): U[] {
    const result: U[] = copy({length: array.length});
    let accumulator = initial;

    for (let i = array.length - 1; i >= 0; --i) {
        result[i] = accumulator = f(accumulator, array[i], i);
    }

    return result;
}

export function scanRightFn<T, U>(f: (accumulator: U, element: T, index: number) => U,
                                  initial: U): (array: ArrayLike<T>) => U[] {
    return array => scanRight(array, f, initial);
}

export function scanMonoidRight<T>(array: ArrayLike<T>, f: (accumulator: T, element: T, index: number) => T): T[] {
    if (array.length === 0) {
        return [];
    }

    const result: T[] = copy({0: array[0], length: array.length});

    for (let i = array.length - 2; i >= 0; --i) {
        result[i] = f(result[i + 1], array[i], i);
    }

    return result;
}

export function scanMonoidRightFn<T>(f: (accumulator: T,
                                         element: T,
                                         index: number) => T): (array: ArrayLike<T>) => T[] {
    return array => scanMonoidRight(array, f);
}

export function keyBy<T>(array: ArrayLike<T>,
                         f: (element: T) => string): Dictionary<T[]> {
    const dictionary = Object.create(null) as Dictionary<T[]>;

    for (let i = 0; i < array.length; ++i) {
        const element = array[i];
        const key = f(element);
        const group = dictionary[key] || [];
        group.push(element);
        dictionary[key] = group;
    }

    return dictionary;
}

export function keyByFn<T>(f: (element: T) => string): (array: ArrayLike<T>) => Dictionary<T[]> {
    return array => keyBy(array, f);
}

export function group<T>(array: ArrayLike<T>, compare: Comparator<T>): T[][] {
    const result: T[][] = [];

    outer: for (let i = 0; i < array.length; ++i) {
        for (let j = 0; j < result.length; ++j) {
            if (compare(result[j][0], array[i]) === Comparison.equal) {
                result[j].push(array[i]);
                continue outer;
            }
        }

        result.push([array[i]]);
    }

    return result;
}

export function groupFn<T>(compare: Comparator<T>): (array: ArrayLike<T>) => T[][] {
    return array => group(array, compare);
}
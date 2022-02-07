import {Model} from "../Common/Model";

export function replaceItemAtIndex<T>(arr: Array<T>, index: number, newValue: T): Array<T> {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex<T>(arr: Array<T>, index: number): Array<T> {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function replaceItemAtId<T extends Model>(arr: Array<T>, id: string, newValue: T): Array<T> {
    return replaceItemAtIndex(arr, arr.findIndex(i => i.id === id), newValue);
}

export function removeItemAtId<T extends Model>(arr: Array<T>, id: string): Array<T> {
    return removeItemAtIndex(arr, arr.findIndex(i => i.id === id));
}

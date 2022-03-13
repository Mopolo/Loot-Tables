export type SortingValue = -1 | 0 | 1;

export interface Sorting {
    name: SortingValue;
}

export const switchSorting = (current: SortingValue): SortingValue => {
    if (current === -1) {
        return 0;
    }

    if (current === 1) {
        return -1;
    }

    return 1;
}

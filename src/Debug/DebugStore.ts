import {atom} from "recoil";
import {localStorageEffect} from "../Util/Store";

interface Options {
    enabled: boolean;
}

export const debugStore = atom<Options>({
    key: "debug",
    default: {
        enabled: true,
    },
    effects: [
        localStorageEffect('debug'),
    ]
});

import {atom} from "recoil";
import {localStorageEffect} from "../Util/Store";

export interface GeneratorStore {
    category: string;
    subCategory: string;
    type: string;
    rarity: string;
}

export const generatorStore = atom<GeneratorStore>({
    key: "generator",
    default: {
        category: "",
        subCategory: "",
        type: "",
        rarity: "",
    },
    effects: [
        localStorageEffect('generator'),
    ]
});

import {atom} from "recoil";
import {localStorageEffect} from "../Util/Store";

export interface GeneratorStore {
    category: string;
    subCategory: string;
    type: string;
    rarity: string;
    lootablePage: number;
}

export const generatorStore = atom<GeneratorStore>({
    key: "generator",
    default: {
        category: "",
        subCategory: "",
        type: "",
        rarity: "",
        lootablePage: 1,
    },
    effects: [
        localStorageEffect('generator'),
    ]
});

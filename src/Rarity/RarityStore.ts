import {atom} from "recoil";
import RarityModel from "./RarityModel";
import {localStorageEffect} from "../Util/Store";
import {autoCleaningStore} from "../Item/ItemStore";

const rarityAtom = atom<Array<RarityModel>>({
    key: "rarities",
    default: [],
    effects: [
        localStorageEffect('rarities'),
    ]
});

export const rarityStore = autoCleaningStore(rarityAtom, "rarities", "rarity");

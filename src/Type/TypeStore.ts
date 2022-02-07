import {atom} from "recoil";
import TypeModel from "./TypeModel";
import {localStorageEffect} from "../Util/Store";
import {autoCleaningStore} from "../Item/ItemStore";

const typeAtom = atom<Array<TypeModel>>({
    key: "types",
    default: [],
    effects: [
        localStorageEffect('types'),
    ]
});

export const typeStore = autoCleaningStore(typeAtom, "types", "type");

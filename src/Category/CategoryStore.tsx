import {atom} from "recoil";
import {localStorageEffect} from "../Util/Store";
import CategoryModel from "./CategoryModel";
import {autoCleaningStore} from "../Item/ItemStore";

const categoryAtom = atom<Array<CategoryModel>>({
    key: "categories",
    default: [],
    effects: [
        localStorageEffect('categories'),
    ]
});

export const categoryStore = autoCleaningStore(categoryAtom, "categories", "category");

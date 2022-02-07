import {atom} from "recoil";
import {localStorageEffect} from "../Util/Store";
import SubCategoryModel from "./SubCategoryModel";
import {autoCleaningStore} from "../Item/ItemStore";

const subCategoryAtom = atom<Array<SubCategoryModel>>({
    key: "sub-categories",
    default: [],
    effects: [
        localStorageEffect('sub-categories'),
    ]
});

export const subCategoryStore = autoCleaningStore(subCategoryAtom, "subCategories", "subCategory");

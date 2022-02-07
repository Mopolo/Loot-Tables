/**
 * State management:
 * https://recoiljs.org/docs/guides/atom-effects#local-storage-persistence
 *
 * Compression:
 * https://www.npmjs.com/package/lzutf8
 */
import {AtomEffect} from "recoil";
import LZUTF8 from "lzutf8";
import TypeModel from "../Type/TypeModel";
import RarityModel from "../Rarity/RarityModel";
import SubCategoryModel from "../SubCategory/SubCategoryModel";
import CategoryModel from "../Category/CategoryModel";
import ItemModel from "../Item/ItemModel";

type ReturnsAtomEffect = <T>(key: string) => AtomEffect<T>;

export interface DataSave {
    items: Array<ItemModel>,
    categories: Array<CategoryModel>,
    subCategories: Array<SubCategoryModel>,
    types: Array<TypeModel>,
    rarities: Array<RarityModel>,
}

export const Data = {
    compress: (value: any): Uint8Array => {
        return LZUTF8.compress(JSON.stringify(value));
    },

    decompress: (input: Uint8Array | Buffer | string): any => {
        return JSON.parse(LZUTF8.decompress(input));
    },

    read: (savedValue: any): any => {
        if (savedValue != null) {
            /**
             * The stored value is:
             * - decoded into a bytes string
             * - decompressed into a JSON string
             * - parsed into proper JSON
             */
            return Data.decompress(LZUTF8.decodeStorageBinaryString(savedValue));
        }

        return null;
    },

    write: (value: any): string => {
        /**
         * Before storage:
         * - the JSON is stringyfied
         * - the string is compressed using LZUTF8
         * - the binary bytes are encoded to a string compatible with localStorage
         */
        return LZUTF8.encodeStorageBinaryString(Data.compress(value));
    },

    export: (value: DataSave): string => {
        return LZUTF8.encodeBase64(Data.compress(value));
    },

    import: (input: string): DataSave => {
        return Data.decompress(LZUTF8.decodeBase64(input));
    },

    emptyDataSave: (): DataSave => {
        return {
            items: [],
            categories: [],
            subCategories: [],
            types: [],
            rarities: [],
        };
    }
};

export const localStorageEffect: ReturnsAtomEffect = (key: string) => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
        setSelf(Data.read(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, Data.write(newValue))
    });
};

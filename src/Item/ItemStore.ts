import {atom, DefaultValue, RecoilState, selector} from "recoil";
import {localStorageEffect} from "../Util/Store";
import ItemModel from "./ItemModel";
import {Model, SubType} from "../Common/Model";
import {generatorStore, GeneratorStore} from "../Generator/GeneratorStore";

type ItemCriteriaKey = keyof SubType<ItemModel, Array<string>>;
type GeneratorCriteriaKey = keyof GeneratorStore;

/**
 * This Recoil Selector triggers a cleanup in the ItemStore every time a criteria store is updated.
 * The idea is to remove id references when the referred object is removed.
 */
export const autoCleaningStore = <T extends Model>(store: RecoilState<Array<T>>, itemKey: ItemCriteriaKey, generatorKey: GeneratorCriteriaKey): RecoilState<Array<T>> => selector({
    key: "item-" + itemKey,
    get({get}) {
        return get(store);
    },
    set: ({get, set}, newValue) => {
        // We first update the criteria store
        set(store, newValue);

        if (newValue instanceof DefaultValue) {
            return;
        }

        // And then update the item list
        const itemList = get(itemStore);
        const newCriteriaIds = newValue.map(criteria => criteria.id);

        let newItemList = itemList.map((item: ItemModel) => {
            return {
                ...item,
                // We only keep existing criteria ids
                [itemKey]: item[itemKey].filter((criteriaId) => newCriteriaIds.includes(criteriaId)),
            };
        });

        // Item list update
        set(itemStore, newItemList);

        // Generator update
        const generatorState = get(generatorStore);
        const criteriaId = generatorState[generatorKey];

        const newGeneratorState: GeneratorStore = {
            ...generatorState,
            // If the selected criteria does not exist anymore we remove it
            [generatorKey]: newCriteriaIds.includes(criteriaId) ? criteriaId : "",
        };

        set(generatorStore, newGeneratorState);
    }
});

export const itemStore = atom<Array<ItemModel>>({
    key: "items",
    default: [],
    effects: [
        localStorageEffect('items'),
    ]
});

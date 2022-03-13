import {Model, SubType} from "../Common/Model";

export default interface ItemModel extends Model {
    categories: string[];
    subCategories: string[];
    types: string[];
    // todo refactor en string
    rarities: string[];
    includeHigherRarities: boolean;
}

export type ItemCriteria = keyof SubType<ItemModel, string[]>;

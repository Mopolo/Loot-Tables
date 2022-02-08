import {Model} from "../Common/Model";

export default interface ItemModel extends Model {
    categories: string[];
    subCategories: string[];
    types: string[];
    // todo refactor en string
    rarities: string[];
    includeHigherRarities: boolean;
}

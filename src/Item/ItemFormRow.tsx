import React from "react";
import Form from "react-bootstrap/Form";
import {useRecoilState, useRecoilValue} from "recoil";
import Button from "react-bootstrap/Button";
import {removeItemAtId, replaceItemAtId} from "../Util/Arr";
import ItemModel from "./ItemModel";
import {itemStore} from "./ItemStore";
import {categoryStore} from "../Category/CategoryStore";
import {subCategoryStore} from "../SubCategory/SubCategoryStore";
import {typeStore} from "../Type/TypeStore";
import {rarityStore} from "../Rarity/RarityStore";
import {Model} from "../Common/Model";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CriteriaModal from "./CriteriaModal";

interface Props {
    model: ItemModel;
}

const ItemFormRow: React.FC<Props> = (props) => {
    const [itemList, setItemList] = useRecoilState(itemStore);

    const categoryList = useRecoilValue(categoryStore);
    const subCategoryList = useRecoilValue(subCategoryStore);
    const typeList = useRecoilValue(typeStore);
    const rarityList = useRecoilValue(rarityStore);

    type EditCriteriaList = (newCriteriaIdsList: Array<string>) => void;

    function replaceItem<M extends ItemModel, T>(key: keyof M, newValue: T) {
        const newList = replaceItemAtId(itemList, props.model.id, {
            ...props.model,
            [key]: newValue,
        });

        setItemList(newList);
    }

    const editName = (newValue: string) => replaceItem("name", newValue);
    const editCategoryList = (newValue: Array<string>) => replaceItem("categories", newValue);
    const editSubCategoryList = (newValue: Array<string>) => replaceItem("subCategories", newValue);
    const editTypeList = (newValue: Array<string>) => replaceItem("types", newValue);
    const editRarityList = (newValue: Array<string>) => replaceItem("rarities", newValue);
    const editIncludeHigherRarities = (isChecked: boolean) => replaceItem("includeHigherRarities", isChecked);

    const deleteItem = () => {
        const newList = removeItemAtId(itemList, props.model.id);

        setItemList(newList);
    };

    function selectedCriteria<T extends Model>(ids: Array<String>, criteriaList: Array<T>) {
        return criteriaList.filter(c => ids.includes(c.id)).map(c => c.name);
    }

    function onChangeCriteria<T extends Model>(newCriteriaNamesList: Array<string>, criteriaList: Array<T>, editCriteriaList: EditCriteriaList) {
        editCriteriaList(newCriteriaNamesList);
    }

    return (
        <tr>
            <td>
                <Form.Control type="text" value={props.model.name} onChange={e => editName(e.target.value)}/>
            </td>
            <td>
                <CriteriaModal model={props.model}
                               name="categories"
                               criteriaList={categoryList}
                               selected={props.model.categories}
                               onChange={ids => onChangeCriteria(ids, categoryList, editCategoryList)}/>
            </td>
            <td>
                <CriteriaModal model={props.model}
                               name="sub-categories"
                               criteriaList={subCategoryList}
                               selected={props.model.subCategories}
                               onChange={ids => onChangeCriteria(ids, subCategoryList, editSubCategoryList)}/>
            </td>
            <td>
                <CriteriaModal model={props.model}
                               name="types"
                               criteriaList={typeList}
                               selected={props.model.types}
                               onChange={ids => onChangeCriteria(ids, typeList, editTypeList)}/>
            </td>
            <td>
                <Form.Select value={selectedCriteria(props.model.rarities, rarityList)[0]}
                             onChange={e => onChangeCriteria([e.target.value], rarityList, editRarityList)}>
                    {rarityList.map(rarity => <option value={rarity.name} key={rarity.id}>{rarity.name}</option>)}
                </Form.Select>
            </td>
            <td className="text-center">
                <Form.Switch
                    className="mt-2"
                    checked={props.model.includeHigherRarities}
                    onChange={e => editIncludeHigherRarities(e.target.checked)}
                />
            </td>
            <td>
                <Button variant="danger" onClick={deleteItem}>
                    <FontAwesomeIcon icon={faTimes} fixedWidth/>
                </Button>
            </td>
        </tr>
    );
};

export default ItemFormRow;

import React from "react";
import Form from "react-bootstrap/Form";
import {useRecoilState, useRecoilValue} from "recoil";
import Button from "react-bootstrap/Button";
import {removeItemAtId, replaceItemAtId} from "../Util/Arr";
import ItemModel, {ItemCriteria} from "./ItemModel";
import {itemStore} from "./ItemStore";
import {categoryStore} from "../Category/CategoryStore";
import {subCategoryStore} from "../SubCategory/SubCategoryStore";
import {typeStore} from "../Type/TypeStore";
import {rarityStore} from "../Rarity/RarityStore";
import {Model} from "../Common/Model";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    model: ItemModel;
    onStartItemCriteriaSelection: (item: ItemModel, criteriaKey: ItemCriteria) => void;
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
    const editRarityList = (newValue: Array<string>) => replaceItem("rarities", newValue);
    const editIncludeHigherRarities = (isChecked: boolean) => replaceItem("includeHigherRarities", isChecked);

    const deleteItem = () => {
        const newList = removeItemAtId(itemList, props.model.id);

        setItemList(newList);
    };

    function selectedCriteria<T extends Model>(ids: Array<String>, criteriaList: Array<T>) {
        return criteriaList.filter(c => ids.includes(c.id));
    }

    function onChangeCriteria<T extends Model>(newCriteriaIds: Array<string>, criteriaList: Array<T>, editCriteriaList: EditCriteriaList) {
        editCriteriaList(newCriteriaIds);
    }

    function placeholder<T extends Model>(ids: Array<String>, criteriaList: Array<T>) {
        const selected = selectedCriteria(ids, criteriaList);

        if (selected.length === 0) {
            return 'Aucune sélection';
        }

        return selected.map(c => c.name).join(', ');
    }

    return (
        <tr>
            <td>
                <Form.Control type="text" value={props.model.name} onChange={e => editName(e.target.value)}/>
            </td>
            <td>
                <Button onClick={() => props.onStartItemCriteriaSelection(props.model, "categories")}
                        variant="light"
                        className="text-truncate"
                        style={{width: "180px"}}>
                    {placeholder(props.model.categories, categoryList)}
                </Button>
            </td>
            <td>
                <Button onClick={() => props.onStartItemCriteriaSelection(props.model, "subCategories")}
                        variant="light"
                        className="text-truncate"
                        style={{width: "180px"}}>
                    {placeholder(props.model.subCategories, subCategoryList)}
                </Button>
            </td>
            <td>
                <Button onClick={() => props.onStartItemCriteriaSelection(props.model, "types")}
                        variant="light"
                        className="text-truncate"
                        style={{width: "180px"}}>
                    {placeholder(props.model.types, typeList)}
                </Button>
            </td>
            <td>
                <Form.Select value={selectedCriteria(props.model.rarities, rarityList)[0]?.id}
                             onChange={e => onChangeCriteria([e.target.value], rarityList, editRarityList)}>
                    {rarityList.map(rarity => <option value={rarity.id} key={rarity.id}>{rarity.name}</option>)}
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

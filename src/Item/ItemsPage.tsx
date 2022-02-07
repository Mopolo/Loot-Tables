import React from "react";
import Table from "react-bootstrap/Table";
import {useRecoilState} from "recoil";
import Button from "react-bootstrap/Button";
import {itemStore} from "./ItemStore";
import ItemFormRow from "./ItemFormRow";
import {newModelId} from "../Common/Model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

const ItemsPage: React.FC = () => {
    const [itemList, setItemList] = useRecoilState(itemStore);

    const add = () => {
        setItemList(old => [...old, {
            id: newModelId(),
            name: "",
            categories: [],
            subCategories: [],
            types: [],
            rarities: [],
        }]);
    };

    return (
        <div className="mt-5">
            <Table borderless hover>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Catégories</th>
                    <th>Sous-catégories</th>
                    <th>Types</th>
                    <th>Raretés</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {itemList.map(i => <ItemFormRow model={i} key={i.id}/>)}
                </tbody>
            </Table>

            <div className="mt-2">
                <Button onClick={add}>
                    <FontAwesomeIcon icon={faPlus} fixedWidth/>
                </Button>
            </div>
        </div>
    );
};

export default ItemsPage;

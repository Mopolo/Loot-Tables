import React from "react";
import Table from "react-bootstrap/Table";
import {useRecoilState} from "recoil";
import Button from "react-bootstrap/Button";
import {itemStore} from "./ItemStore";
import ItemFormRow from "./ItemFormRow";
import {newModelId} from "../Common/Model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {ButtonGroup, ButtonToolbar} from "react-bootstrap";

const ItemsPage: React.FC = () => {
    const [itemList, setItemList] = useRecoilState(itemStore);

    const createEmptyItem = () => {
        return {
            id: newModelId(),
            name: "",
            categories: [],
            subCategories: [],
            types: [],
            rarities: [],
        };
    }

    const add = (quantity: number) => {
        const newItems = Array.from(Array(quantity).keys()).map(i => createEmptyItem());

        setItemList(old => [...old, ...newItems]);
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
                <ButtonToolbar>
                    <ButtonGroup className="me-2">
                        <Button onClick={() => add(1)}>
                            <FontAwesomeIcon icon={faPlus} fixedWidth/>
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-2">
                        <Button onClick={() => add(10)}>
                            <FontAwesomeIcon icon={faPlus} fixedWidth/> 10
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        </div>
    );
};

export default ItemsPage;

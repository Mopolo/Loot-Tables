import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import Button from "react-bootstrap/Button";
import {itemsPageStore, itemsSortingStore, itemStore, sortedItemsState} from "./ItemStore";
import ItemFormRow from "./ItemFormRow";
import {newModelId} from "../Common/Model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Pagination from "react-bootstrap/Pagination";
import {rarityStore} from "../Rarity/RarityStore";
import SortIcon from "../Common/Sorting/SortIcon";
import {switchSorting} from "../Common/Sorting";
import CriteriaModal from "./CriteriaModal";
import ItemModel, {ItemCriteria} from "./ItemModel";
import {replaceItemAtId} from "../Util/Arr";

const ItemsPage: React.FC = () => {
    const [showCriteriaModal, setShowCriteriaModal] = useState(false);
    const [criteriaModalItem, setCriteriaModalItem] = useState<ItemModel>();
    const [criteriaModalKey, setCriteriaModalKey] = useState<ItemCriteria>();

    const setItemList = useSetRecoilState(itemStore);
    const itemList = useRecoilValue(sortedItemsState);
    const [page, setPage] = useRecoilState(itemsPageStore);
    const [sorting, setSorting] = useRecoilState(itemsSortingStore);
    const rarityList = useRecoilValue(rarityStore);
    const itemsPerPage = 15;
    const pages = Math.ceil(itemList.length / itemsPerPage);
    const triggerComplexPagination = pages > 10;

    useEffect(() => {
        if (page > pages) {
            setPage(pages);
        }
    });

    const PaginationRange: React.FC<{ from: number, to: number }> = (props) => {
        let numbers = [];

        for (let number = props.from; number <= props.to; number++) {
            if (number <= 0 || number > pages) {
                continue;
            }

            numbers.push(
                <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        return <>
            {numbers}
        </>;
    }

    const Paginator = () => {
        return <Pagination>
            {triggerComplexPagination && <Pagination.First onClick={() => setPage(1)} disabled={page === 1}/>}
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1}/>

            {triggerComplexPagination && page > 4 && <>
                <Pagination.Item onClick={() => setPage(1)}>{1}</Pagination.Item>
                <Pagination.Ellipsis/>
            </>}

            <PaginationRange from={triggerComplexPagination ? page - 2 : 1}
                             to={triggerComplexPagination ? page + 2 : pages}/>

            {triggerComplexPagination && page < pages - 4 && <>
                <Pagination.Ellipsis/>
                <Pagination.Item onClick={() => setPage(pages)}>{pages}</Pagination.Item>
            </>}

            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === pages}/>
            {triggerComplexPagination && <Pagination.Last onClick={() => setPage(pages)} disabled={page === pages}/>}
        </Pagination>;
    }

    // todo bloquer page si une liste de critères est vide

    const createEmptyItem = () => {
        return {
            id: newModelId(),
            name: "",
            categories: [],
            subCategories: [],
            types: [],
            rarities: [rarityList[0].id],
            includeHigherRarities: false
        };
    }

    const add = (quantity: number) => {
        const newItems = Array.from(Array(quantity).keys()).map(i => createEmptyItem());

        setItemList(old => [...old, ...newItems]);
    };

    const sortName = () => {
        setSorting(old => ({...old, name: switchSorting(sorting.name)}));
    };

    function onStartItemCriteriaSelection(item: ItemModel, criteriaKey: ItemCriteria) {
        setCriteriaModalItem(item);
        setCriteriaModalKey(criteriaKey);
        setShowCriteriaModal(true);
    }

    function onSelectItemCriteria(criteriaIds: Array<string>) {
        if (criteriaModalItem === undefined || criteriaModalKey === undefined) {
            return;
        }

        const newList = replaceItemAtId(itemList, criteriaModalItem.id, {
            ...criteriaModalItem,
            [criteriaModalKey]: criteriaIds,
        });

        setItemList(newList);
    }

    function onCloseCriteriaSelectionModal() {
        setShowCriteriaModal(false);
        setCriteriaModalItem(undefined);
        setCriteriaModalKey(undefined);
    }

    return (
        <div className="mt-5">
            <Paginator/>

            <Table borderless hover>
                <thead>
                <tr>
                    <th role="button" onClick={sortName}>
                        Name <SortIcon value={sorting.name}/>
                    </th>
                    <th>Catégories</th>
                    <th>Sous-catégories</th>
                    <th>Types</th>
                    <th>Rareté</th>
                    <th title="Inclure dans les raretés précédentes (ex: un item commun sera lootable avec une rareté épique dans le générateur)">Précédentes</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {itemList.slice((page - 1) * itemsPerPage, ((page - 1) * itemsPerPage) + itemsPerPage).map(i =>
                    <ItemFormRow model={i}
                                 key={i.id}
                                 onStartItemCriteriaSelection={onStartItemCriteriaSelection}
                    />)}
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

            {criteriaModalItem && criteriaModalKey && <CriteriaModal model={criteriaModalItem}
                                                                     criteriaKey={criteriaModalKey}
                                                                     show={showCriteriaModal}
                                                                     onClose={onCloseCriteriaSelectionModal}
                                                                     onChange={onSelectItemCriteria}/>}
        </div>
    );
};

export default ItemsPage;

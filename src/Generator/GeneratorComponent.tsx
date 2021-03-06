import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ListGroup from "react-bootstrap/ListGroup";
import {useRecoilState, useRecoilValue} from "recoil";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {categoryStore} from "../Category/CategoryStore";
import {subCategoryStore} from "../SubCategory/SubCategoryStore";
import {typeStore} from "../Type/TypeStore";
import {rarityStore} from "../Rarity/RarityStore";
import Button from "react-bootstrap/Button";
import {itemStore} from "../Item/ItemStore";
import ItemModel from "../Item/ItemModel";
import {faGem} from "@fortawesome/free-solid-svg-icons/faGem";
import {getRandomInt} from "../Util/Math";
import {generatorStore} from "./GeneratorStore";
import RarityBadge from "../Rarity/RarityBadge";
import Pagination from "react-bootstrap/Pagination";

const GeneratorComponent: React.FC = () => {
    const itemList = useRecoilValue(itemStore);
    const categoryList = useRecoilValue(categoryStore);
    const subCategoryList = useRecoilValue(subCategoryStore);
    const typeList = useRecoilValue(typeStore);
    const rarityList = useRecoilValue(rarityStore);
    const [generatorOptions, setGeneratorOptions] = useRecoilState(generatorStore);

    const [selectedCategory, setSelectedCategory] = useState(generatorOptions.category || categoryList[0]?.id || "");
    const [selectedSubCategory, setSelectedSubCategory] = useState(generatorOptions.subCategory || subCategoryList[0]?.id || "");
    const [selectedType, setSelectedType] = useState(generatorOptions.type || typeList[0]?.id || "");
    const [selectedRarity, setSelectedRarity] = useState(generatorOptions.rarity || rarityList[0]?.id || "");
    const [selectedLootableItemsPage, setSelectedLootableItemsPage] = useState(generatorOptions.lootablePage || 1);
    const [lootableItems, setLootableItems] = useState<Array<ItemModel>>([]);
    const [lootedItems, setLootedItems] = useState<Array<ItemModel>>([]);

    const itemsPerPage = 10;
    const pages = Math.ceil(lootableItems.length / itemsPerPage);

    useEffect(() => {
        setLootableItems(itemList.filter(i => {
            if (i.categories.length === 0
                || i.subCategories.length === 0
                || i.types.length === 0
                || i.rarities.length === 0
            ) {
                return false;
            }

            let rarityOk = false;

            // If this item is included to higher rarities we have to check that here
            if (i.includeHigherRarities) {
                const itemRarityModel = rarityList.find(r => r.id === i.rarities[0]);
                const selectedRarityModel = rarityList.find(r => r.id === selectedRarity);

                if (!itemRarityModel || !selectedRarityModel) {
                    return false;
                }

                const includedRarities = rarityList.filter(r => r.percentage >= selectedRarityModel.percentage).map(r => r.id);

                rarityOk = includedRarities.includes(itemRarityModel.id);
            } else {
                rarityOk = i.rarities.includes(selectedRarity);
            }

            return i.categories.includes(selectedCategory)
                && i.subCategories.includes(selectedSubCategory)
                && i.types.includes(selectedType)
                && rarityOk;
        }).sort((a, b) => a.name.localeCompare(b.name)));

        setGeneratorOptions({
            category: selectedCategory,
            subCategory: selectedSubCategory,
            type: selectedType,
            rarity: selectedRarity,
            lootablePage: selectedLootableItemsPage,
        });
    }, [itemList, rarityList, selectedCategory, selectedSubCategory, selectedType, selectedRarity, selectedLootableItemsPage, setGeneratorOptions]);

    const generateLoot = () => {
        let items = lootableItems.filter(i => {
            // fetch a random number
            let chance = getRandomInt(0, 100);

            // find out the item's rarity percentage
            let rarity = rarityList.find(r => r.id === i.rarities[0])?.percentage || 0;

            return chance < rarity;
        });

        setLootedItems(items);
    };

    const LootableItemsPaginator = () => {
        let numbers = [];

        for (let number = 1; number <= pages; number++) {
            numbers.push(
                <Pagination.Item key={number} active={number === selectedLootableItemsPage} onClick={() => setSelectedLootableItemsPage(number)}>
                    {number}
                </Pagination.Item>
            );
        }

        return <Pagination>{numbers}</Pagination>;
    }

    return (
        <Form>
            <Row className="mb-3">
                <Col>
                    <FloatingLabel controlId="floatingSelect" label="Cat??gorie">
                        <Form.Select aria-label="Cat??gorie"
                                     value={selectedCategory}
                                     onChange={e => setSelectedCategory(e.target.value)}>
                            {categoryList.map(category => <option value={category.id}
                                                                  key={category.id}>{category.name}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingSelect" label="Sous-cat??gorie">
                        <Form.Select aria-label="Sous-cat??gorie"
                                     value={selectedSubCategory}
                                     onChange={e => setSelectedSubCategory(e.target.value)}>
                            {subCategoryList.map(subCategory => <option value={subCategory.id}
                                                                        key={subCategory.id}>{subCategory.name}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingSelect" label="Type">
                        <Form.Select aria-label="Type"
                                     value={selectedType}
                                     onChange={e => setSelectedType(e.target.value)}>
                            {typeList.map(type => <option value={type.id} key={type.id}>{type.name}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingSelect" label="Raret??">
                        <Form.Select aria-label="Raret??"
                                     value={selectedRarity}
                                     onChange={e => setSelectedRarity(e.target.value)}>
                            {rarityList.map(rarity => <option value={rarity.id}
                                                              key={rarity.id}>{rarity.name} &bull; {rarity.percentage}%</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="success" type="button" onClick={generateLoot}>
                        <FontAwesomeIcon icon={faGem} fixedWidth/> G??n??rer un loot
                    </Button>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h2 className="display-6">Items lootables</h2>
                    {
                        lootableItems.length === 0
                            ? <span>Aucun loot</span>
                            : <ListGroup as="ol">
                                {lootableItems.slice((selectedLootableItemsPage - 1) * itemsPerPage, ((selectedLootableItemsPage - 1) * itemsPerPage) + itemsPerPage).map(item => {
                                    return <ListGroup.Item key={item.id}
                                                           as="li"
                                                           className="d-flex justify-content-between align-items-start">
                                        {item.name} <RarityBadge rarity={rarityList.find(r => r.id === item.rarities[0])}/>
                                    </ListGroup.Item>
                                })}
                            </ListGroup>
                    }
                    <div className="mt-3">
                        <LootableItemsPaginator/>
                    </div>
                </Col>
                <Col xs={6}>
                    <h2 className="display-6">Loot</h2>
                    {
                        lootedItems.length === 0
                            ? <span>Aucun loot</span>
                            : <ListGroup>
                                {lootedItems.map(item => <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>)}
                            </ListGroup>
                    }
                </Col>
            </Row>
        </Form>
    );
};

export default GeneratorComponent;

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
    const [lootableItems, setLootableItems] = useState<Array<ItemModel>>([]);
    const [lootedItems, setLootedItems] = useState<Array<ItemModel>>([]);

    useEffect(() => {
        setLootableItems(itemList.filter(i => {
            return i.categories.includes(selectedCategory)
                && i.subCategories.includes(selectedSubCategory)
                && i.types.includes(selectedType)
                && i.rarities.includes(selectedRarity);
        }));

        setGeneratorOptions({
            category: selectedCategory,
            subCategory: selectedSubCategory,
            type: selectedType,
            rarity: selectedRarity,
        });
    }, [itemList, selectedCategory, selectedSubCategory, selectedType, selectedRarity, setGeneratorOptions]);

    const generateLoot = () => {
        let items = lootableItems.filter(i => {
            // fetch a random number
            let chance = getRandomInt(0, 100);

            // find out the selected rarity percentage
            let rarity = rarityList.filter(r => r.id === selectedRarity)[0]?.percentage || 0;

            return chance < rarity;
        });

        setLootedItems(items);
    };

    return (
        <Form>
            <Row className="mb-3">
                <Col>
                    <FloatingLabel controlId="floatingSelect" label="Catégorie">
                        <Form.Select aria-label="Catégorie"
                                     value={selectedCategory}
                                     onChange={e => setSelectedCategory(e.target.value)}>
                            {categoryList.map(category => <option value={category.id}
                                                                  key={category.id}>{category.name}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel controlId="floatingSelect" label="Sous-catégorie">
                        <Form.Select aria-label="Sous-catégorie"
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
                    <FloatingLabel controlId="floatingSelect" label="Rareté">
                        <Form.Select aria-label="Rareté"
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
                        <FontAwesomeIcon icon={faGem} fixedWidth/> Générer un loot
                    </Button>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h2 className="display-6">Items lootables</h2>
                    {
                        lootableItems.length === 0
                            ? <span>Aucun loot</span>
                            : <ListGroup>
                                {lootableItems.map(item => <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>)}
                            </ListGroup>
                    }
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

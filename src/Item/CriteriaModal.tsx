import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useRecoilValue} from "recoil";
import {categoryStore} from "../Category/CategoryStore";
import {subCategoryStore} from "../SubCategory/SubCategoryStore";
import {typeStore} from "../Type/TypeStore";
import {rarityStore} from "../Rarity/RarityStore";
import ItemModel, {ItemCriteria} from "./ItemModel";

interface Props {
    model: ItemModel
    criteriaKey: ItemCriteria
    show: boolean;
    onClose: () => void;
    onChange: (criteriaIds: Array<string>) => void;
}

const CriteriaModal: React.FC<Props> = (props) => {
    const lists = {
        categories: useRecoilValue(categoryStore),
        subCategories: useRecoilValue(subCategoryStore),
        types: useRecoilValue(typeStore),
        rarities: useRecoilValue(rarityStore),
    };

    const [criteriaList, setCriteriaList] = useState(
        lists[props.criteriaKey].map(model => {
            return {
                model,
                selected: props.model[props.criteriaKey].includes(model.id),
            };
        })
    );

    const handleChange = (id: string, add: boolean) => {
        const newList = criteriaList.map(criteria => {
            if (criteria.model.id === id) {
                criteria.selected = add;
            }

            return criteria;
        });

        setCriteriaList(newList);
        props.onChange(newList.filter(c => c.selected).map(c => c.model.id));
    }

    const handleCheckAll = () => {
        const selected = criteriaList.filter(c => c.selected);
        const shouldSelect = selected.length !== lists[props.criteriaKey].length;

        const newList = criteriaList.map(criteria => {
            return {
                ...criteria,
                selected: shouldSelect,
            }
        });

        setCriteriaList(newList);
        props.onChange(newList.filter(c => c.selected).map(c => c.model.id));
    };

    return <Modal show={props.show} onHide={props.onClose} animation={false}>
        <Modal.Header>
            <Container fluid className="p-0">
                <Row>
                    <Col>{props.model.name}</Col>
                    <Col className="text-end">
                        <span role="button" onClick={handleCheckAll}>Tout cocher/décocher</span>
                    </Col>
                </Row>
            </Container>
        </Modal.Header>
        <ListGroup>
            {criteriaList.map((criteria, index) =>
                <ListGroup.Item key={index}>
                    <Form.Switch
                        id={`model-${props.model.id}-criteria-${props.criteriaKey}-${index}`}
                        checked={criteria.selected}
                        onChange={e => handleChange(criteria.model.id, e.target.checked)}
                        label={criteria.model.name}
                    />
                </ListGroup.Item>
            )}
        </ListGroup>
    </Modal>
}

export default CriteriaModal;

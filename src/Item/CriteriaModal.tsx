import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Model} from "../Common/Model";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
    model: Model
    criteriaList: Array<Model>
    name: string
    selected: Array<string> // model id list
    onChange: (ids: Array<string>) => void;
}

const CriteriaModal: React.FC<Props> = (props) => {
    const [show, setShow] = useState(false);
    const [criteriaList, setCriteriaList] = useState<Array<{ model: Model, selected: boolean }>>(props.criteriaList.map(model => {
        return {
            model,
            selected: props.selected.includes(model.id)
        };
    }));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (id: string, add: boolean) => {
        setCriteriaList(old => {
            return old.map(criteria => {
                if (criteria.model.id == id) {
                    criteria.selected = add;
                }

                return criteria;
            });
        });
    }

    const handleCheckAll = () => {
        const selected = criteriaList.filter(c => c.selected);

        const shouldSelect = selected.length != props.criteriaList.length;

        setCriteriaList(old => old.map(c => ({
            ...c,
            selected: shouldSelect,
        })));
    };

    const placeholder = () => {
        const selected = criteriaList.filter(c => c.selected);

        if (selected.length == 0) {
            return 'Aucune sélection';
        }

        return selected.map(c => c.model.name).join(', ');
    };

    useEffect(() => {
        props.onChange(criteriaList.filter(c => c.selected).map(c => c.model.id));
    }, [criteriaList]);

    return <>
        <Button variant="light" onClick={handleShow} className="text-truncate" style={{width: "180px"}}>
            {placeholder()}
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
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
                            id={`model-${props.model.id}-criteria-${props.name}-${index}`}
                            checked={criteria.selected}
                            onChange={e => handleChange(criteria.model.id, e.target.checked)}
                            label={criteria.model.name}
                        />
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Modal>
    </>
}

export default CriteriaModal;

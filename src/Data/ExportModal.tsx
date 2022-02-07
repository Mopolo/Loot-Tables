import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Alert, Form} from "react-bootstrap";
import {useRecoilValue} from "recoil";
import {itemStore} from "../Item/ItemStore";
import {categoryStore} from "../Category/CategoryStore";
import {subCategoryStore} from "../SubCategory/SubCategoryStore";
import {typeStore} from "../Type/TypeStore";
import {rarityStore} from "../Rarity/RarityStore";
import {Data, DataSave} from "../Util/Store";
import DataTable from "./DataTable";

interface Props {
    show: boolean;
    onHide: () => void;
}

const ExportModal: React.FC<Props> = (props) => {
    const itemList = useRecoilValue(itemStore);
    const categoryList = useRecoilValue(categoryStore);
    const subCategoryList = useRecoilValue(subCategoryStore);
    const typeList = useRecoilValue(typeStore);
    const rarityList = useRecoilValue(rarityStore);

    const exports: DataSave = {
        items: itemList,
        categories: categoryList,
        subCategories: subCategoryList,
        types: typeList,
        rarities: rarityList,
    };

    const save = Data.export(exports);

    return (
        <Modal
            show={props.show}
            size="lg"
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Exporter
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DataTable data={exports}/>

                <Alert variant="secondary">Code de sauvegarde. À copier et conserver en sécurité !</Alert>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea"
                                  rows={8}
                                  value={save}
                                  onChange={() => {}}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExportModal;

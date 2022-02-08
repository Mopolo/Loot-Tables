import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import {useRecoilState} from "recoil";
import {itemStore} from "../Item/ItemStore";
import {categoryStore} from "../Category/CategoryStore";
import {subCategoryStore} from "../SubCategory/SubCategoryStore";
import {typeStore} from "../Type/TypeStore";
import {rarityStore} from "../Rarity/RarityStore";
import {Data, DataSave} from "../Util/Store";
import DataTable from "./DataTable";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons/faExclamation";

interface Props {
    show: boolean;
    onHide: () => void;
}

const ImportModal: React.FC<Props> = (props) => {
    const [itemList, setItemList] = useRecoilState(itemStore);
    const [categoryList, setCategoryList] = useRecoilState(categoryStore);
    const [subCategoryList, setSubCategoryList] = useRecoilState(subCategoryStore);
    const [typeList, setTypeList] = useRecoilState(typeStore);
    const [rarityList, setRarityList] = useRecoilState(rarityStore);

    const [importCode, setImportCode] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [imports, setImports] = useState(Data.emptyDataSave());

    const exports: DataSave = {
        items: itemList,
        categories: categoryList,
        subCategories: subCategoryList,
        types: typeList,
        rarities: rarityList,
    };

    function onNewImportCode(newImportCode: string) {
        setImportCode(newImportCode);

        try {
            setImports(Data.import(newImportCode));
            setIsInvalid(false);
        } catch (e) {
            setIsInvalid(true);
            setImports(Data.emptyDataSave());
        }
    }

    function doImport() {
        setRarityList(imports.rarities);
        setTypeList(imports.types);
        setSubCategoryList(imports.subCategories);
        setCategoryList(imports.categories);
        setItemList(imports.items);

        props.onHide();
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Importer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <h5>Données actuelles</h5>
                        <DataTable data={exports}/>
                    </Col>
                    <Col>
                        <h5>Données importées</h5>
                        <DataTable data={imports}/>
                    </Col>
                </Row>

                <h6>Code de sauvegarde</h6>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea"
                                  rows={8}
                                  value={importCode}
                                  isInvalid={isInvalid}
                                  onChange={(e) => onNewImportCode(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Code de sauvegarde invalide
                    </Form.Control.Feedback>
                </Form.Group>

                {(!isInvalid && importCode.length > 0) && <Alert variant="danger">
                    <FontAwesomeIcon icon={faExclamation} fixedWidth/> L'importation va remplacer toutes les données
                    existantes.
                </Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger"
                        className="me-auto"
                        onClick={doImport}
                        disabled={isInvalid || importCode.length === 0}>Importer</Button>
                <Button onClick={props.onHide}>Annuler</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImportModal;

import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ItemsPage from "./Item/ItemsPage";
import GeneratorPage from "./Generator/GeneratorPage";
import RarityPage from "./Rarity/RarityPage";
import {RecoilRoot} from "recoil";
import TypePage from "./Type/TypePage";
import CategoryPage from "./Category/CategoryPage";
import SubCategoryPage from "./SubCategory/SubCategoryPage";
import ExportModal from "./Data/ExportModal";
import ImportModal from "./Data/ImportModal";
import AboutModal from "./AboutModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Duck from "./Duck/Duck";

const App: React.FC = () => {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);

    return (
        <>
            <RecoilRoot>
                <ExportModal show={showExportModal} onHide={() => setShowExportModal(false)}/>
                <ImportModal show={showImportModal} onHide={() => setShowImportModal(false)}/>
                <AboutModal show={showAboutModal} onHide={() => setShowAboutModal(false)}/>

                <Navbar expand="lg" variant="dark" bg="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Loot table</Navbar.Brand>
                        </LinkContainer>
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Générateur</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/items">
                                <Nav.Link>Items</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/categories">
                                <Nav.Link>Catégories</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/sub-categories">
                                <Nav.Link>Sous-Catégories</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/types">
                                <Nav.Link>Types</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/rarity">
                                <Nav.Link>Rareté</Nav.Link>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => setShowImportModal(true)}>Import</Nav.Link>
                            <Nav.Link onClick={() => setShowExportModal(true)}>Export</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>

                <Container>
                    <Routes>
                        <Route path="/" element={<GeneratorPage/>}/>
                        <Route path="/items" element={<ItemsPage/>}/>
                        <Route path="/categories" element={<CategoryPage/>}/>
                        <Route path="/sub-categories" element={<SubCategoryPage/>}/>
                        <Route path="/types" element={<TypePage/>}/>
                        <Route path="/rarity" element={<RarityPage/>}/>
                    </Routes>
                </Container>

                <footer className="footer mt-auto py-3 bg-light"
                        style={{position: "fixed", bottom: "0", width: "100%", zIndex: 4}}>
                    <Container>
                        <Row>
                            <Col>
                                <Duck/>
                            </Col>

                            <Col className="">
                                <div className="text-end">
                                    <span className="link-primary" role="button"
                                          onClick={() => setShowAboutModal(true)}>À propos</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </RecoilRoot>
        </>
    );
};

export default App;

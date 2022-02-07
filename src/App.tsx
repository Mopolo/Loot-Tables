import React, {MouseEvent, useState} from 'react';
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

const App: React.FC = () => {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);

    const openAboutModal = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setShowAboutModal(true);
    };

    return (
        <>
            <RecoilRoot>
                <ExportModal show={showExportModal} onHide={() => setShowExportModal(false)}/>
                <ImportModal show={showImportModal} onHide={() => setShowImportModal(false)}/>
                <AboutModal show={showAboutModal} onHide={() => setShowAboutModal(false)}/>

                <Navbar expand="lg" variant="dark" bg="dark">
                    <Container>
                        <LinkContainer to="/generator">
                            <Navbar.Brand>Loot table</Navbar.Brand>
                        </LinkContainer>
                        <Nav className="me-auto">
                            <LinkContainer to="/generator">
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
                        <Route path="/generator" element={<GeneratorPage/>}/>
                        <Route path="/items" element={<ItemsPage/>}/>
                        <Route path="/categories" element={<CategoryPage/>}/>
                        <Route path="/sub-categories" element={<SubCategoryPage/>}/>
                        <Route path="/types" element={<TypePage/>}/>
                        <Route path="/rarity" element={<RarityPage/>}/>
                    </Routes>
                </Container>

                <footer className="footer mt-auto py-3 bg-light"
                        style={{position: "fixed", bottom: "0", width: "100%"}}>
                    <Container className="text-end">
                        <a href="#" onClick={openAboutModal}>À propos</a>
                    </Container>
                </footer>
            </RecoilRoot>
        </>
    );
};

export default App;

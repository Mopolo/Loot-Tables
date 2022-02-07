import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface Props {
    show: boolean;
    onHide: () => void;
}

const AboutModal: React.FC<Props> = (props) => {
    return (
        <Modal
            show={props.show}
            size="lg"
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    À propos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Développé par <a href="https://mopolo.dev">Nathan Boiron</a>
                <br/>
                Technologies : <a href="https://reactjs.org/">React</a>, <a href="https://recoiljs.org/">Recoil</a>, <a href="https://www.typescriptlang.org/">TypeScript</a> et <a href="https://react-bootstrap.github.io/">Bootstrap</a>
                <br/>
                <br/>
                Source : <a href="https://github.com/Mopolo/Loot-Tables">https://github.com/Mopolo/Loot-Tables</a>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AboutModal;

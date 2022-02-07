import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import RarityFormRow from "./RarityFormRow";
import {useRecoilState} from "recoil";
import {rarityStore} from "./RarityStore";
import {newModelId} from "../Common/Model";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RarityPage: React.FC = () => {
    const [rarityList, setRarities] = useRecoilState(rarityStore);

    const addRarity = () => {
        setRarities(old => [...old, {id: newModelId(), name: "", percentage: 0}]);
    };

    return (
        <div className="mt-5">
            <Table hover borderless>
                <thead>
                <tr>
                    <th>Rareté</th>
                    <th>
                        Pourcentage
                        <small className="text-muted"> (probabilité sur 100)</small>
                    </th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {rarityList.map(rarity =>
                    <RarityFormRow rarity={rarity} key={rarity.id}/>
                )}
                </tbody>
            </Table>

            <div className="mt-2">
                <Button onClick={addRarity}>
                    <FontAwesomeIcon icon={faPlus} fixedWidth/>
                </Button>
            </div>
        </div>
    );
};

export default RarityPage;

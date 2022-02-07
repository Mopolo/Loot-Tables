import React from "react";
import Form from "react-bootstrap/Form";
import SliderWithLabel from "../Common/SliderWithLabel";
import RarityModel from "./RarityModel";
import {useRecoilState} from "recoil";
import {rarityStore} from "./RarityStore";
import Button from "react-bootstrap/Button";
import {removeItemAtIndex, replaceItemAtIndex} from "../Util/Arr";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    rarity: RarityModel;
}

const RarityFormRow: React.FC<Props> = (props) => {
    const [rarityList, setRarityList] = useRecoilState(rarityStore);
    const index = rarityList.findIndex((listItem) => listItem === props.rarity);

    const editName = (newValue: string) => {
        const newList = replaceItemAtIndex(rarityList, index, {
            ...props.rarity,
            name: newValue,
        });

        setRarityList(newList);
    };

    const editPercentage = (newValue: number) => {
        const newList = replaceItemAtIndex(rarityList, index, {
            ...props.rarity,
            percentage: newValue,
        });

        setRarityList(newList);
    };

    const deleteItem = () => {
        const newList = removeItemAtIndex(rarityList, index);

        setRarityList(newList);
    };

    return (
        <tr>
            <td>
                <Form.Control type="text" value={props.rarity.name} onChange={e => editName(e.target.value)}/>
            </td>
            <td>
                <SliderWithLabel value={props.rarity.percentage} onChange={editPercentage}/>
            </td>
            <td>
                <Button variant="danger" onClick={deleteItem}>
                    <FontAwesomeIcon icon={faTimes} fixedWidth/>
                </Button>
            </td>
        </tr>
    );
};

export default RarityFormRow;

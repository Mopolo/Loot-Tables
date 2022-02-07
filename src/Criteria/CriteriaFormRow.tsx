import React, {PropsWithChildren} from "react";
import {RecoilState, useRecoilState} from "recoil";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Model} from "../Common/Model";
import {removeItemAtIndex, replaceItemAtIndex} from "../Util/Arr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";

interface Props<M extends Model> {
    store: RecoilState<Array<M>>;
    model: M;
}

const CriteriaFormRow = <M extends Model, >(props: PropsWithChildren<Props<M>>) => {
    const [criteriaList, setCriteriaList] = useRecoilState(props.store);
    const index = criteriaList.findIndex((listItem) => listItem === props.model);

    const editName = (newValue: string) => {
        const newList = replaceItemAtIndex(criteriaList, index, {
            ...props.model,
            name: newValue,
        });

        setCriteriaList(newList);
    };

    const deleteItem = () => {
        const newList = removeItemAtIndex(criteriaList, index);

        setCriteriaList(newList);
    };

    return (
        <tr>
            <td>
                <Form.Control type="text" value={props.model.name} onChange={e => editName(e.target.value)}/>
            </td>
            <td>
                <Button variant="danger" onClick={deleteItem}>
                    <FontAwesomeIcon icon={faTimes} fixedWidth/>
                </Button>
            </td>
        </tr>
    );
};

export default CriteriaFormRow;

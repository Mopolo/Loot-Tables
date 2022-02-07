import React, {PropsWithChildren} from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {RecoilState, useRecoilState} from "recoil";
import CriteriaFormRow from "./CriteriaFormRow";
import {Model} from "../Common/Model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

interface Props<M extends Model> {
    store: RecoilState<Array<M>>;
    modelFactory: () => M;
}

const CriteriaList = <M extends Model, >(props: PropsWithChildren<Props<M>>) => {
    const [criteriaList, setTypeList] = useRecoilState(props.store);

    const addType = () => {
        setTypeList(old => [...old, props.modelFactory()]);
    };

    return (
        <div className="mt-5">
            <Table borderless hover>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Supprimer</th>
                </tr>
                </thead>
                <tbody>
                {criteriaList.map(criteria => <CriteriaFormRow model={criteria}
                                                               key={criteria.id}
                                                               store={props.store}/>)}
                </tbody>
            </Table>

            <div className="mt-2">
                <Button onClick={addType}>
                    <FontAwesomeIcon icon={faPlus} fixedWidth/>
                </Button>
            </div>
        </div>
    );
};

export default CriteriaList;

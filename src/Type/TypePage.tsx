import React from "react";
import {typeStore} from "./TypeStore";
import {newModelId} from "../Common/Model";
import CriteriaList from "../Criteria/CriteriaList";
import TypeModel from "./TypeModel";

const TypePage: React.FC = () => {
    const factory = (): TypeModel => {
        return {
            id: newModelId(),
            name: ""
        };
    };

    return <CriteriaList<TypeModel> store={typeStore} modelFactory={factory}/>;
};

export default TypePage;

import React from "react";
import CriteriaList from "../Criteria/CriteriaList";
import {newModelId} from "../Common/Model";
import SubCategoryModel from "./SubCategoryModel";
import {subCategoryStore} from "./SubCategoryStore";

const SubCategoryPage: React.FC = () => {
    const factory = (): SubCategoryModel => {
        return {
            id: newModelId(),
            name: ""
        };
    };

    return <CriteriaList<SubCategoryModel> store={subCategoryStore} modelFactory={factory}/>;
};

export default SubCategoryPage;

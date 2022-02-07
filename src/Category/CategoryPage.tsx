import React from "react";
import CriteriaList from "../Criteria/CriteriaList";
import {categoryStore} from "./CategoryStore";
import CategoryModel from "./CategoryModel";
import {newModelId} from "../Common/Model";

const CategoryPage: React.FC = () => {
    const factory = (): CategoryModel => {
        return {
            id: newModelId(),
            name: ""
        };
    };

    return <CriteriaList<CategoryModel> store={categoryStore} modelFactory={factory}/>;
};

export default CategoryPage;

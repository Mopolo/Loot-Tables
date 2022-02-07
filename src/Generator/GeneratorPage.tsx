import React from "react";
import {useRecoilValue} from "recoil";
import {categoryStore} from "../Category/CategoryStore";
import {subCategoryStore} from "../SubCategory/SubCategoryStore";
import {typeStore} from "../Type/TypeStore";
import {rarityStore} from "../Rarity/RarityStore";
import GeneratorComponent from "./GeneratorComponent";
import GeneratorError from "./GeneratorError";

const GeneratorPage: React.FC = () => {
    const categoryList = useRecoilValue(categoryStore);
    const subCategoryList = useRecoilValue(subCategoryStore);
    const typeList = useRecoilValue(typeStore);
    const rarityList = useRecoilValue(rarityStore);

    let errors = [
        {
            list: categoryList,
            label: "catégories"
        },
        {
            list: subCategoryList,
            label: "sous-catégories"
        },
        {
            list: typeList,
            label: "types"
        },
        {
            list: rarityList,
            label: "raretés"
        }
    ].filter(l => l.list.length === 0)
        .map(l => l.label);

    return (
        <div className="mt-5">
            {errors.length === 0 ? <GeneratorComponent/> : <GeneratorError errors={errors}/>}
        </div>
    );
};

export default GeneratorPage;

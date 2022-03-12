import React from "react";
import { faSortDown } from "@fortawesome/free-solid-svg-icons/faSortDown";
import { faSortUp } from "@fortawesome/free-solid-svg-icons/faSortUp";
import { faSort } from "@fortawesome/free-solid-svg-icons/faSort";
import { SortingValue } from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    value: SortingValue
}

const SortIcon: React.FC<Props> = (props) => {
    const renderButton = () => {
        switch (props.value) {
            case -1:
                return <FontAwesomeIcon icon={faSortDown} fixedWidth/>
            case 1:
                return <FontAwesomeIcon icon={faSortUp} fixedWidth/>
            default:
                return <FontAwesomeIcon icon={faSort} fixedWidth/>
        }
    }

    return <>{renderButton()}</>
};

export default SortIcon;

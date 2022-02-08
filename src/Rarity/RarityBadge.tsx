import React from "react";
import Badge from "react-bootstrap/Badge";
import RarityModel from "./RarityModel";

export const badgeBackground = (value: number): string => {
    if (value <= 25) {
        return "danger";
    }

    if (value <= 50) {
        return "warning";
    }

    if (value <= 75) {
        return "primary";
    }

    return "success";
};

export const rarityPercentageLabel = (value: number) => {
    return ('' + value).padStart(3, '0');
};

const RarityBadge: React.FC<{ rarity?: RarityModel }> = (props) => {
    return props.rarity
        ? <Badge bg={badgeBackground(props.rarity.percentage)}>
            {props.rarity.name} &bull; {rarityPercentageLabel(props.rarity.percentage)}%
        </Badge>
        : <></>
}

export default RarityBadge;

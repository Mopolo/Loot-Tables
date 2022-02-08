import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, {useState} from "react";
import Badge from "react-bootstrap/Badge";
import {badgeBackground, rarityPercentageLabel} from "../Rarity/RarityBadge";

interface Props {
    value: number;
    onChange?: (value: number) => void;
}

const SliderWithLabel: React.FC<Props> = (p) => {
    const [value, setValue] = useState(p.value);

    const onChange = (newValue: string) => {
        let newPercentage = parseInt(newValue);

        setValue(newPercentage);
        p.onChange?.(newPercentage);
    };

    return (
        <Form>
            <Form.Group as={Row}>
                <Form.Label column sm="1">
                    <Badge bg={badgeBackground(value)}>{rarityPercentageLabel(value)}</Badge>
                </Form.Label>
                <Col sm="11">
                    <Form.Range
                        value={value}
                        onChange={e => onChange(e.target.value)}
                    />
                </Col>
            </Form.Group>
        </Form>
    );
};

export default SliderWithLabel;

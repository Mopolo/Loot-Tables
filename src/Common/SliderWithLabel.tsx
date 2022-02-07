import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, {useState} from "react";
import Badge from "react-bootstrap/Badge";

interface Props {
    value: number;
    onChange?: (value: number) => void;
}

const SliderWithLabel: React.FC<Props> = (p) => {
    const [value, setValue] = useState(p.value);

    const percentage = () => {
        return ('' + value).padStart(3, '0');
    };

    const onChange = (newValue: string) => {
        let newPercentage = parseInt(newValue);

        setValue(newPercentage);
        p.onChange?.(newPercentage);
    };

    const bg = () => {
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

    return (
        <Form>
            <Form.Group as={Row}>
                <Form.Label column sm="1">
                    <Badge bg={bg()}>{percentage()}</Badge>
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

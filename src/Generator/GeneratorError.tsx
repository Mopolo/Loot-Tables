import React from "react";

interface Props {
    errors: Array<string>;
}

const GeneratorError: React.FC<Props> = (props) => {
    return (
        <div>
            Génération d'un loot impossible car il manque : {props.errors.join(", ")}
        </div>
    );
};

export default GeneratorError;

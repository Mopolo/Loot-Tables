import React, {useState} from "react";
import "./Duck.css";

const Duck: React.FC = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isBeakOpen, setIsBeakOpen] = useState(false);

    const getDuck = (): string => {
        return `  _
${isBeakOpen ? '>' : '-'}(.)__
 (___/`;
    };

    const handleClick = () => {
        if (isAnimating) {
            return;
        }

        setIsAnimating(true);

        setTimeout(() => setIsBeakOpen(true), 200);
        setTimeout(() => setIsBeakOpen(false), 500);
        setTimeout(() => setIsBeakOpen(true), 800);

        setTimeout(() => {
            setIsBeakOpen(false);
            setIsAnimating(false);
        }, 1100);
    };

    return <pre className="mb-0 text-muted" id="duck" onClick={handleClick}><code>{getDuck()}</code></pre>
};

export default Duck;

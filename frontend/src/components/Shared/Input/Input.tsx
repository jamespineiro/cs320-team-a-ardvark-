import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = () => {
    return (
        <div>
            <h1>I am the input</h1>
        </div>
    );
};

export default Input;

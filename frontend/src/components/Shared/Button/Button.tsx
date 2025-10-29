import React from 'react';
import { button } from './Button.css.ts';

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, type = 'button', onClick, className }) => {
    return (
        <button type={type} onClick={onClick} className={`${button} ${className ?? ""}`.trim()}>
            {text}
        </button>
    );
};

export default Button;
import React, { useState } from "react";
import * as styles from "./Input.css";
import EyeOpen from "./icons/EyeOpen";
import EyeClosed from "./icons/EyeClosed";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: React.FC<InputProps> = ({ label, type = "text", ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.inputWrapper}>
                <input type={inputType} className={styles.input} {...props} />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className={styles.iconButton}
                        aria-pressed={showPassword}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeClosed className={styles.iconImage} width={20} height={20} />
                        ) : (
                            <EyeOpen className={styles.iconImage} width={20} height={20} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
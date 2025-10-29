import React, { useState } from "react";
import { Input, Button } from "../../components";
import * as styles from "./LoginForm.css.ts";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>Welcome back to Synchro</h1>
            <p className={styles.subtitle}>
                Build your calendar and <br /> keep track of your assignments effortlessly
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <a href="/forgot-password" className={styles.forgotPassword}>
                    Forgot password?
                </a>

                <div className={styles.buttonWrapper}>
                    <Button type="submit" text="Log in" className={styles.buttonFull} />
                </div>
            </form>

            <p className={styles.signupText}>
                Don’t have an account?{" "}
                <a href="/signup" className={styles.signupLink}>
                    Sign up now
                </a>
            </p>
        </div>
    );
};

export default LoginForm;

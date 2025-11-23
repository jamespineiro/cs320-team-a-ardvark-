import React, { useState } from "react";
import { Input, Button } from "../../components";
import * as styles from "./LoginForm.css.ts";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const BACKEND = "http://localhost:4000/login"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.post(`${BACKEND}`, { email, password })
            .then(result => {
                console.log(result)
                if(result.data === "Success"){
                    localStorage.setItem('synchro_logged_in', 'true')
                    navigate("/home")
                }else{
                    console.log("Wrong email or password")
                }
            })
            .catch(err => console.log(err))
    }

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
    )
}

export default LoginForm;

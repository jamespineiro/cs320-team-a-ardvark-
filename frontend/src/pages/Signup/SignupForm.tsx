import React, { useState } from "react"
import { Input, Button } from "../../components"
import * as styles from "./SignupForm.css.ts"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const SignupForm: React.FC = () => {
    const BACKEND = "http://localhost:4000/signup"
    const navigate =  useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(password !== confirmPassword)  {
            console.log("Passwords do not match.")
        } else {
            axios.post(`${BACKEND}`, { email, password })
                .then((result: any) => {console.log(result)
                    navigate("/login")
                })
                .catch((err: any) => console.log(err))
            console.log({ email, password, confirmPassword });
        }
    }

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>Welcome to Synchro</h1>
            <p className={styles.subtitle}>
                Build your calendar and <br /> keep track of your assignments effortlessly
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="Login"
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

                <Input
                    label="Confirm password"
                    type="password"
                    placeholder="Enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className={styles.buttonWrapper}>
                    <Button type="submit" text="Sign up" className={styles.buttonFull}/>
                </div>

            </form>

            <p className={styles.loginText}>
                Already have an account?{" "}
                <a href="/login" className={styles.loginLink}>
                    Login now
                </a>
            </p>
        </div>
    )
}

export default SignupForm;

import React, { useState } from "react";
import { Input, Button } from "../../components";
import * as styles from "./LoginForm.css.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/Shared/ErrorPopup/ErrorPopup";

const LoginForm: React.FC = () => {
  const BACKEND = "http://localhost:4000/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // NEW
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(BACKEND, { email, password });

      if (res.data?.message === "Login successful") {
        localStorage.setItem("user_id", res.data.user_id);
        navigate("/home");
      } else if (res.data?.error) {
        setError(res.data.error);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Server error");
    }
  };

  return (
    <>
      <ErrorPopup message={error} onClose={() => setError("")} />

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
    </>
  );
};

export default LoginForm;
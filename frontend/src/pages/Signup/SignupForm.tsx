import React, { useState } from "react";
import { Input, Button } from "../../components";
import * as styles from "./SignupForm.css.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/Shared/ErrorPopup/ErrorPopup";

const SignupForm: React.FC = () => {
  const BACKEND = "http://localhost:4000/signup";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");  // Added for error handling

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(BACKEND, { email, password });

      if (res.data?.message === "User created successfully") {
        navigate("/login");
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
            <Button type="submit" text="Sign up" className={styles.buttonFull} />
          </div>
        </form>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <a href="/login" className={styles.loginLink}>
            Login now
          </a>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
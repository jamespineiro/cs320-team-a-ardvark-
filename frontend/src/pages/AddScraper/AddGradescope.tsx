import React, { useState } from "react";
import { Input, Button } from "../../components";
import * as styles from "./AddScraper.css.ts";
import NavigationBar from "./ScraperNavigationBar/ScraperNavigationBar.tsx";

const AddGradescope: React.FC = () => {
    const BACKEND = "http://localhost:4000/fetch-gradescope";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Loading...");

        try {
            const res = await fetch(BACKEND, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: username,
                    password,
                    user_id: localStorage.getItem("user_id")
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("Error: " + (data.detail || "Failed to connect"));
                return;
            }

            setStatus("Success! Gradescope assignments synced.");
        } catch (err) {
            setStatus("Something went wrong.");
        }
    };

    return (
        <>
            <NavigationBar />

            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Connect to Gradescope</h1>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input
                            label="Gradescope Username"
                            type="text"
                            placeholder="your@email.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            label="Gradescope Password"
                            type="password"
                            placeholder="Your Gradescope password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className={styles.buttonWrapper}>
                            <Button
                                type="submit"
                                text="Fetch Assignments"
                                className={styles.buttonFull}
                            />
                        </div>
                    </form>

                    <p>{status}</p>
                </div>
            </div>
        </>
    );
};

export default AddGradescope;

import React, { useState } from "react";
import { Input, Button } from "../../components";
import * as styles from "./AddScraper.css.ts";
import NavigationBar from "./ScraperNavigationBar/ScraperNavigationBar.tsx";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddGradescope: React.FC = () => {
    const BACKEND = "http://localhost:4000/fetch-gradescope";
    const { sessionId } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = localStorage.getItem("user_id");
        if (!userId) {
            setStatus("Error: User not authenticated. Please log in again.");
            return;
        }

        setStatus("Loading...");
        setLoading(true);

        try {
            const res = await fetch(BACKEND, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`
                },
                body: JSON.stringify({
                    email: username,
                    password,
                    user_id: userId
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("Error: " + (data.detail || data.message || "Failed to connect"));
                setLoading(false);
                return;
            }

            setStatus(`Success! ${data.count || 0} Gradescope assignments synced.`);
            setLoading(false);

            // redirect to home after a short delay
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (err) {
            console.error("Gradescope sync error:", err);
            setStatus("Something went wrong. Please try again.");
            setLoading(false);
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
                            required
                        />

                        <Input
                            label="Gradescope Password"
                            type="password"
                            placeholder="Your Gradescope password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className={styles.buttonWrapper}>
                            <Button
                                type="submit"
                                text={loading ? "Syncing..." : "Fetch Assignments"}
                                className={styles.buttonFull}
                            />
                        </div>
                    </form>

                    {status}
                </div>
            </div>
        </>
    );
};

export default AddGradescope;
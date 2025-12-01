import React, { useState } from "react";
import { Input, Button } from "../../components";
import * as styles from "./AddScraper.css.ts";
import NavigationBar from "./ScraperNavigationBar/ScraperNavigationBar.tsx";

const AddCanvas: React.FC = () => {
    const BACKEND = "http://localhost:4000/fetch-canvas";

    const [baseUrl, setBaseUrl] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [courseId, setCourseId] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Loading...");

        try {
            const res = await fetch(BACKEND, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    base_url: baseUrl,
                    access_token: accessToken,
                    course_id: courseId,
                    user_id: localStorage.getItem("user_id")
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("Error: " + data.detail);
                return;
            }

            setStatus("Success! The events have been synched with your calendar.");
        } catch (err) {
            setStatus("Something went wrong.");
        }
    };

    return (
        <>
            <NavigationBar />

            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <h1 className={styles.title}>Connect to Canvas</h1>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input
                            label="Canvas Base URL"
                            type="text"
                            placeholder="myschool.instructure.com"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                        />

                        <Input
                            label="Canvas Access Token"
                            type="password"
                            placeholder="Your Canvas API token"
                            value={accessToken}
                            onChange={(e) => setAccessToken(e.target.value)}
                        />

                        <a
                            href="https://community.canvaslms.com/t5/Canvas-Basics-Guide/How-do-I-manage-API-access-tokens-in-my-user-account/ta-p/615312"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.forgotPassword}
                        >
                            How do I get a Canvas API token?
                        </a>

                        <Input
                            label="Course ID"
                            type="text"
                            placeholder="12345"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
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

export default AddCanvas;

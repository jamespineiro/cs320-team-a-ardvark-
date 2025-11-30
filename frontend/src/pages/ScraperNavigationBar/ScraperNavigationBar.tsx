import CalendarIcon from "./icons/CalendarIcon.tsx";
import { Button } from "../../components";
import React from "react";
import * as styles from "./ScraperNavigationBar.css.ts";
import { useNavigate } from "react-router-dom";

const ScraperNavigationBar: React.FC = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/home");
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftGroup}>
                <CalendarIcon className={styles.logo}/>
                <h1 className={styles.title}>Synchro</h1>
            </div>

            <Button
                className={styles.button}
                text="Return Home"
                onClick={handleHome}
            />
        </div>
    );
};

export default ScraperNavigationBar;

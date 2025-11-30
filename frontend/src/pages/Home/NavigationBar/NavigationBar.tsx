import CalendarIcon from "./icons/CalendarIcon.tsx";
import { Button } from "../../../components";
import React from "react";
import * as styles from "./NavigationBar.css";
import { useNavigate } from "react-router-dom";

const NavigationBar: React.FC = () => {
    const navigate = useNavigate();

    const handleAddCanvas = () => {
        navigate("/addCanvas");
    };

    const handleAddGradescope = () => {
        navigate("/addGradescope");
    };

    const handleHome = () => {
        navigate("/login");
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftGroup}>
                <CalendarIcon className={styles.logo}/>
                <h1 className={styles.title}>Synchro</h1>
            </div>

            <div className={styles.rightGroup}>
                <Button text="Add Canvas" onClick={handleAddCanvas}/>
                <Button text="Add Gradescope" onClick={handleAddGradescope}/>
                <Button text="Logout" onClick={handleHome}/>
            </div>
        </div>
    );
};

export default NavigationBar;

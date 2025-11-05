import CalendarIcon from "./icons/CalendarIcon.tsx"
import { Button } from "../../../components";
import React from "react";
import * as styles from "./NavigationBar.css";


const NavigationBar: React.FC = () => {
    return (
        <div className={styles.container}>
            <CalendarIcon/>
            <h1>Synchro</h1>
            <Button text="Log out"/>
        </div>
    )
}

export default NavigationBar;

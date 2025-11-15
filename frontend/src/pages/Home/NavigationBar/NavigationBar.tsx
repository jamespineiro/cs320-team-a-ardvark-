import CalendarIcon from "./icons/CalendarIcon.tsx"
import { Button } from "../../../components";
import React from "react";
import * as styles from "./NavigationBar.css";


const NavigationBar: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.leftGroup}>
                <CalendarIcon className={styles.logo}/>
                <h1>Synchro</h1>
            </div>

            <Button className={styles.button} text="Log out"/>
        </div>

    )
}

export default NavigationBar;
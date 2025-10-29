import React from "react";
import * as styles from "./Login.css";
import LoginForm from "./LoginForm";
import PencilsAndCalendar from "../../assets/images/PencilsAndCalendar.jpg";

const Login: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img
                    src={PencilsAndCalendar}
                    alt="Pencils and Calendar"
                    className={styles.image}
                />
            </div>

            <div className={styles.formSection}>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
import React from "react";
import * as styles from "./Signup.css";
import SignupForm from "./SignupForm";
import PencilsAndCalendar from "../../assets/images/PencilsAndCalendar.jpg";

const Signup: React.FC = () => {
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
                <SignupForm />
            </div>
        </div>
    );
};

export default Signup;

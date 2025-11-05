import React, { useState, Suspense, lazy } from "react";
import * as styles from "./Signup.css";
import { Loading } from "../../components";
import PencilsAndCalendar from "../../assets/images/PencilsAndCalendar.jpg";

const SignupForm = lazy(() => import("./SignupForm"));

const Signup: React.FC = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const isPageReady = isImageLoaded;

    return (
        <>
            {!isPageReady && (
                <div className={styles.loaderContainer}>
                    <Loading />
                </div>
            )}

            <div
                className={styles.container}
                style={{ visibility: isPageReady ? "visible" : "hidden" }}
            >
                <div className={styles.imageSection}>
                    <img
                        src={PencilsAndCalendar}
                        alt="Pencils and Calendar"
                        className={styles.image}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>

                <div className={styles.formSection}>
                    <Suspense
                        fallback={
                            <div className={styles.loaderContainer}>
                                <Loading />
                            </div>
                        }
                    >
                        <SignupForm />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default Signup;
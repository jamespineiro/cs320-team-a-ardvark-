import React, { useState, Suspense, lazy, useEffect } from "react";
import NavigationBar from "./NavigationBar/NavigationBar";
import * as styles from "./Home.css";
import { Loading } from "../../components";

const Calendar = lazy(() =>
    import("../../components").then((module) => ({ default: module.Calendar }))
);

const Home: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {!isLoaded && (
                <Loading />
            )}

            <div
                className={styles.container}
                style={{ visibility: isLoaded ? "visible" : "hidden" }}
            >
                <NavigationBar />

                <div className={styles.calendarContainer}>
                    <Suspense fallback={<Loading />}>
                        <Calendar />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default Home;

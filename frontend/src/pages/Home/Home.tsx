import NavigationBar from "./NavigationBar/NavigationBar.tsx";
import { Calendar } from "../../components";
import * as styles from "./Home.css";



const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <NavigationBar />
            <div className={styles.calendarContainer}>
                <Calendar/>
            </div>
        </div>
    )
}

export default Home;
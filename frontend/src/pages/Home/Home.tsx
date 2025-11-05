import NavigationBar from "./NavigationBar/NavigationBar.tsx";
import { Calendar } from "../../components";

const Home: React.FC = () => {
    return (
        <div>
            <NavigationBar />
            <Calendar/>
        </div>
    )
}

export default Home;
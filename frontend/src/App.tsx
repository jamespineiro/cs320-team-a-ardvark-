import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup, Login, NoPage } from './pages';
import CanvasCalendar from './pages/CanvasCalendar';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/canvas" element={<CanvasCalendar />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup, Login, NoPage } from './pages';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App;

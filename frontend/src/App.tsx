import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup, Login, Home, NoPage, Launch } from './pages';
import CanvasCalendar from './pages/CanvasCalendar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Launch />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/canvas" element={<ProtectedRoute><CanvasCalendar /></ProtectedRoute>} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Signup, Login, Home, NoPage, Launch, AddCanvas, AddGradescope } from './pages'
import RequireAuth from './routes/RequireAuth'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Launch />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
                <Route path="/addCanvas" element={<RequireAuth><AddCanvas /></RequireAuth>} />
                <Route path="/addGradescope" element={<RequireAuth><AddGradescope /></RequireAuth>} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Signup, Login, Home, NoPage, Launch, AddCanvas, AddGradescope } from './pages'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Launch />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/addCanvas" element={<AddCanvas />} />
                <Route path="/addGradescope" element={<AddGradescope />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App

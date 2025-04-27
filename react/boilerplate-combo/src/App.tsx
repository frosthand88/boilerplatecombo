import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResearcherPage from './pages/ResearcherPage';

function App() {
    return (
        <Router basename="/react">
            <Routes>
                <Route path="/researcher" element={<ResearcherPage />} />
            </Routes>
        </Router>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResearcherPage from './pages/ResearcherPage';

function App() {
    return (
        <Router basename="/react">
            <Routes>
                <Route path="/dotnet/researcher" element={<ResearcherPage framework='dotnet' />} />
                <Route path="/springboot/researcher" element={<ResearcherPage framework='springboot' />} />
            </Routes>
        </Router>
    );
}

export default App;

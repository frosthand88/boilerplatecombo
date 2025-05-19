import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResearcherPage from './pages/ResearcherPage';

function App() {
    return (
        <Router basename="/react">
            <Routes>
                <Route path="/dotnet/researcher" element={<ResearcherPage framework='dotnet' />} />
                <Route path="/fastapi/researcher" element={<ResearcherPage framework='fastapi' />} />
                <Route path="/springboot/researcher" element={<ResearcherPage framework='springboot' />} />
                <Route path="/nodejs/researcher" element={<ResearcherPage framework='nodejs' />} />
                <Route path="/golang/researcher" element={<ResearcherPage framework='golang' />} />
            </Routes>
        </Router>
    );
}

export default App;

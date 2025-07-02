import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { UserManager } from 'oidc-client-ts';
import ResearcherPage from './pages/ResearcherPage';
import { oidcConfig } from './authConfig';

const userManager = new UserManager(oidcConfig);

function CallbackPage() {
    const navigate = useNavigate();

    useEffect(() => {
        userManager.signinRedirectCallback().then(() => {
            navigate('/dotnet/researcher'); // go to landing after login
        });
    }, [navigate]);

    return <div>Signing in...</div>;
}

function LandingPage() {
    const login = () => {
        userManager.signinRedirect();
    };

    return (
        <div>
            <h1>Welcome to Frosthand Researcher Portal</h1>
            <button onClick={login}>Login</button>
        </div>
    );
}

function App() {
    return (
        <Router basename="/react">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/callback" element={<CallbackPage />} />
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

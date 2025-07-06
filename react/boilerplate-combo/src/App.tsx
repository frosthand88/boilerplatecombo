import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { UserManager } from 'oidc-client-ts';
import ResearcherPage from './pages/ResearcherPage';
import { oidcConfig } from './authConfig';
import './LoginPage.css'; // Separate CSS file

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
    const loginWithEmail = () => {
        userManager.signinRedirect();
    };

    const loginWithGoogle = () => {
        userManager.signinRedirect({
            extraQueryParams: {
                kc_idp_hint: 'google',
            },
        });
    };

    const loginWithMicrosoft = () => {
        userManager.signinRedirect({
            extraQueryParams: {
                kc_idp_hint: 'microsoft',
            },
        });
    };

    const loginWithGithub = () => {
        userManager.signinRedirect({
            extraQueryParams: {
                kc_idp_hint: 'github',
            },
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-wrapper">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                        alt="React Logo"
                        className="react-logo"
                    />
                </div>

                <h1 className="login-title">Sign in to Frosthand</h1>

                <button className="btn email-btn" onClick={loginWithEmail}>
                    <img
                        src="https://fonts.gstatic.com/s/i/materialiconsoutlined/mail/v13/24px.svg"
                        alt="Email"
                        className="icon"
                    />
                    Sign in with Email
                </button>

                <div className="divider">or continue with</div>

                <button className="btn social-btn" onClick={loginWithGoogle}>
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google"
                        className="icon"
                    />
                    Sign in with Google
                </button>

                <button className="btn social-btn" onClick={loginWithMicrosoft}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                        alt="Microsoft"
                        className="icon"
                    />
                    Sign in with Microsoft
                </button>

                <button className="btn social-btn" onClick={loginWithGithub}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                        alt="GitHub"
                        className="icon"
                    />
                    Sign in with GitHub
                </button>
            </div>
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

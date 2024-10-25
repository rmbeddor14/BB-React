// src/MainPage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './styles.css';
import './MainPage.css';

function MainPage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleAdminNavigate = () => {
        navigate('/admin');
    };

    return (
        <div className="main-page">
            <header className="header">
                <div className="logo">
                    <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
                    BabyBumps
                </div>
            </header>
            <div className="hero-section">
                <h1>Celebrate Your Fertility Journey</h1>
                <p>Your one-stop platform for finding your perfect surrogate.</p>
                <div className="action-buttons">
                    <Link to="/create-profile" className="btn primary-btn">Create a Profile</Link>
                    <Link to="/view-profiles" className="btn primary-btn">View Profiles</Link>
                </div>
            </div>
            {/* Place the logout and admin buttons at the bottom of the content */}
            <div className="footer-buttons">
                <button onClick={handleLogout} className="btn secondary-btn">Logout</button>
                <button onClick={handleAdminNavigate} className="btn secondary-btn">Admin</button>
            </div>
        </div>
    );
}

export default MainPage;

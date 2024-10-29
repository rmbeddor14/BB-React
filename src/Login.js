// src/Login.js
// src/Login.js

import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();

    // Determine the redirect location after login
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // navigate('/', { replace: true }); //original
                navigate(from, { replace: true }); // Redirect to the previous location after login
            }
        });

        return () => unsubscribe();
    }, [auth, navigate, from]);

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };

    return (
            <div className="login-container">
                <header className="login-header">
                    <div className="logo">
                        <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
                        BabyBumps
                    </div>
                </header>
                <div className="login-content">
                    <button onClick={handleGoogleSignIn} className="login-button">
                        <FcGoogle style={{ marginRight: '10px' }} />
                        Sign in with Google
                    </button>
                </div>
                <div className="login-footer">
                    <p>Continue your journey to parenthood with us.</p>
                </div>
            </div>
    );
}

export default Login;

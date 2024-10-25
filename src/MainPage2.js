



// src/MainPage2.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from './AuthContext'; // Import useAuth for authentication state
import QuestionnaireMain from './QuestionnaireMain';
import './MainPage2.css';

function MainPage2() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser } = useAuth(); // Get the current authentication state

  const handleQuestionnaireComplete = (answers) => {
    console.log('Questionnaire answers:', answers);
    navigate('/create-profile');
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAdminNavigate = () => {
    navigate('/admin');
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.className !== 'menu-icon') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="main-page">
      <header className="header-main">
        <div className="logo">
          <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
          <span>BabyBumps</span>
        </div>
        <div className="menu-icon" onClick={toggleDropdown}>
          ☰
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            {currentUser ? (
              <>
                <button onClick={handleLogout} className="btn dropdown-btn">Logout</button>
                <button onClick={handleAdminNavigate} className="btn dropdown-btn">Admin</button>
              </>
            ) : (
              <button onClick={handleLogin} className="btn dropdown-btn">Login</button>
            )}
          </div>
        )}
      </header>

      <section className="welcome-section">
        <h1>Welcome to BabyBumps</h1>
        <p>Your journey to parenthood starts here.</p>
      </section>
      <div>
        <QuestionnaireMain onComplete={handleQuestionnaireComplete} />
      </div>
    </div>
  );
}

export default MainPage2;

//src/MainPage.js
// refactored by claude 10-29

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from './AuthContext';
import QuestionnaireMain from './QuestionnaireMain';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dropdownRef = useRef(null);
  const { currentUser, userRole } = useAuth();

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

  const toggleDropdown = () => setDropdownOpen((prevOpen) => !prevOpen);

  // Combined event listeners into a single useEffect
  React.useEffect(() => {
    // Handle window resize
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    // Handle clicking outside dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.className !== 'menu-icon') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const dropdownMenu = dropdownOpen && (
  //   <div className="dropdown-menu" ref={dropdownRef}>
  //     {isMobile && (
  //       <button className="dropdown-close-btn" onClick={() => setDropdownOpen(false)}>✕</button>
  //     )}
  //     {currentUser ? (
  //       <>
  //         <button onClick={handleLogout} className="btn dropdown-btn">Logout</button>
  //         <button onClick={handleAdminNavigate} className="btn dropdown-btn">Admin</button>
  //       </>
  //     ) : (
  //       <button onClick={handleLogin} className="btn dropdown-btn">Login</button>
  //     )}
  //   </div>
  // );

  // add auth so only admins see admin button

  const dropdownMenu = dropdownOpen && (
  <div className="dropdown-menu" ref={dropdownRef}>
    {isMobile && (
      <button className="dropdown-close-btn" onClick={() => setDropdownOpen(false)}>✕</button>
    )}
    {currentUser ? (
      <>
        <button onClick={handleLogout} className="btn dropdown-btn">Logout</button>
        {userRole === 'admin' && (
          <button onClick={handleAdminNavigate} className="btn dropdown-btn">Admin</button>
        )}
      </>
    ) : (
      <button onClick={handleLogin} className="btn dropdown-btn">Login</button>
    )}
  </div>
);

  return (
    <div className="main-page slideshow">
      <header className="header-main">
        <div className="logo">
          <img src="img/icon2_white.png" alt="BabyBumps Logo" className="app-icon" />
          <span>BabyBumps</span>
        </div>
        <div className="menu-icon" onClick={toggleDropdown}>
          ☰
        </div>
        {dropdownMenu}
      </header>

      <section className="welcome-section">
        <h1>We Belong Together.</h1>
      </section>
      <div>
        <QuestionnaireMain onComplete={handleQuestionnaireComplete} />
      </div>
    </div>
  );
}

export default MainPage;

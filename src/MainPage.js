
// // src/MainPage.js

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, signOut } from 'firebase/auth';
// import './styles.css'; // Import the centralized styles
// import './MainPage.css'; // Import the MainPage specific styles

// function MainPage() {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     const auth = getAuth();
//     try {
//       await signOut(auth);
//       navigate('/login', { replace: true });
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   //the below can probably just be embedded in the jsx html as a button 
//   //it's for uniformity with the handleLogout function
//   const handleAdminNavigate = () => {
//     navigate('/admin');
//   };

//   return (
//     <div className="container">
//       <div className="top-buttons-container">
//         <button onClick={handleLogout} className="button logout-button">
//           Logout
//         </button>
//         <button onClick={handleAdminNavigate} className="button admin-button">
//           Admin
//         </button>
//       </div>
//       <h1>Welcome to v0 Surrogacy App</h1>
//       <div className="button-container">
//         <Link to="/create-profile" className="button">
//           Create a Profile
//         </Link>
//         <Link to="/view-profiles" className="button">
//           View Profiles
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default MainPage;

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
          <img src="img/icon2.png" alt="App Icon" className="app-icon" /> {/* Icon added here */}
          BabyBumps
        </div>
        <div className="header-buttons">
          <button onClick={handleLogout} className="btn">Logout</button>
          <button onClick={handleAdminNavigate} className="btn">Admin</button>
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
    </div>
  );
}

export default MainPage;

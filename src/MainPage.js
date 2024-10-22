// MainPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the centralized styles

function MainPage() {
  return (
    <div className="container">
      <h1>Welcome to the Static Surrogacy App</h1>
      <div className="button-container">
        <Link to="/create-profile" className="button">
          Create a Profile
        </Link>
        <Link to="/view-profiles" className="button">
          View Profiles
        </Link>
      </div>
    </div>
  );
}

export default MainPage;

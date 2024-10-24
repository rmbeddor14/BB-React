// MainPage.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './styles.css'; // Import the centralized styles

// function MainPage() {
//   return (
//     <div className="container">
//       <h1>Welcome to v0 Surrogacy App</h1>
//       <div className="button-container">
//         <Link to="/create-profile" className="button">
//           Create a Profile
//         </Link>
//         <Link to="/view-profiles" className="button">
//           View Profiles
//         </Link>
//         <Link to="/logout" className="button">
//           Logout
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default MainPage;
// src/MainPage.js
// src/MainPage.js
// src/MainPage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import './styles.css'; // Import the centralized styles
import './MainPage.css'; // Import the MainPage specific styles

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

  //the below can probably just be embedded in the jsx html as a button 
  //it's for uniformity with the handleLogout function
  const handleAdminNavigate = () => {
    navigate('/admin');
  };

  return (
    <div className="container">
      <div className="top-buttons-container">
        <button onClick={handleLogout} className="button logout-button">
          Logout
        </button>
        <button onClick={handleAdminNavigate} className="button admin-button">
          Admin
        </button>
      </div>
      <h1>Welcome to v0 Surrogacy App</h1>
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
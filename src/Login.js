import React from 'react';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css'; // Import the centralized CSS file
import './Login.css'; // Import the Login specific styles

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/', { replace: true }); // Always navigate to root path
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="login-container">
      <button onClick={handleGoogleSignIn} className="login-button">
        <FcGoogle style={{ marginRight: '10px' }} /> {/* Add the icon */}
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
// src/Login.js
//this code sends to previous state
// but i was having issues with back button idk

// import React from 'react';
// import { FcGoogle } from 'react-icons/fc'; // Import Google icon
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './styles.css'; // Import the centralized CSS file
// import './Login.css'; // Import the Login specific styles

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || '/';


//   const handleGoogleSignIn = async () => {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       navigate(from, { replace: true });
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <button onClick={handleGoogleSignIn} className="login-button">
//         <FcGoogle style={{ marginRight: '10px' }} /> {/* Add the icon */}
//         Sign in with Google
//       </button>
//     </div>
//   );
// }

// export default Login;
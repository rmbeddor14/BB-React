// src/Login.js

import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
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
        <div className="login-page"> {/* Add this wrapper */}
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
        </div>
    );
}

export default Login;


// // import React, { useEffect } from 'react';
// // import { FcGoogle } from 'react-icons/fc';
// // import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
// // import { useNavigate } from 'react-router-dom';
// // import './styles.css';
// // import './Login.css';

// // function Login() {
// //     const navigate = useNavigate();
// //     const auth = getAuth();

// //     useEffect(() => {
// //         // Check if the user is already logged in
// //         const unsubscribe = onAuthStateChanged(auth, (user) => {
// //             if (user) {
// //                 // If user is logged in, redirect to home page
// //                 navigate('/', { replace: true });
// //             }
// //         });

// //         // Clean up the subscription
// //         return () => unsubscribe();
// //     }, [auth, navigate]);

// //     const handleGoogleSignIn = async () => {
// //         const provider = new GoogleAuthProvider();
// //         try {
// //             await signInWithPopup(auth, provider);
// //             navigate('/', { replace: true });
// //         } catch (error) {
// //             console.error('Error during sign-in:', error);
// //         }
// //     };

// //     return (
// //         <div className="login-container">
// //             <button onClick={handleGoogleSignIn} className="login-button">
// //                 <FcGoogle style={{ marginRight: '10px' }} />
// //                 Sign in with Google
// //             </button>
// //         </div>
// //     );
// // }

// // export default Login;


// // // import React from 'react';
// // // import { FcGoogle } from 'react-icons/fc'; // Import Google icon
// // // import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// // // import { useNavigate, useLocation } from 'react-router-dom';
// // // import './styles.css'; // Import the centralized CSS file
// // // import './Login.css'; // Import the Login specific styles

// // // function Login() {
// // //   const navigate = useNavigate();
// // //   //const location = useLocation();
// // //   // const from = location.state?.from?.pathname || '/';

// // //   const handleGoogleSignIn = async () => {
// // //     const auth = getAuth();
// // //     const provider = new GoogleAuthProvider();
// // //     try {
// // //       await signInWithPopup(auth, provider);
// // //       navigate('/', { replace: true }); // Always navigate to root path
// // //     } catch (error) {
// // //       console.error('Error during sign-in:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="login-container">
// // //       <button onClick={handleGoogleSignIn} className="login-button">
// // //         <FcGoogle style={{ marginRight: '10px' }} /> 
// // //         Sign in with Google
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // export default Login;
// // // src/Login.js
// // //this code sends to previous state
// // // but i was having issues with back button idk

// // // import React from 'react';
// // // import { FcGoogle } from 'react-icons/fc'; // Import Google icon
// // // import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// // // import { useNavigate, useLocation } from 'react-router-dom';
// // // import './styles.css'; // Import the centralized CSS file
// // // import './Login.css'; // Import the Login specific styles

// // // function Login() {
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
// // //   const from = location.state?.from?.pathname || '/';


// // //   const handleGoogleSignIn = async () => {
// // //     const auth = getAuth();
// // //     const provider = new GoogleAuthProvider();
// // //     try {
// // //       await signInWithPopup(auth, provider);
// // //       navigate(from, { replace: true });
// // //     } catch (error) {
// // //       console.error('Error during sign-in:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="login-container">
// // //       <button onClick={handleGoogleSignIn} className="login-button">
// // //         <FcGoogle style={{ marginRight: '10px' }} /> {/* Add the icon */}
// // //         Sign in with Google
// // //       </button>
// // //     </div>
// // //   );
// // // }

// // // export default Login;

// // src/Login.js

// import React, { useEffect } from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import './styles.css';
// import './Login.css';

// function Login() {
//     const navigate = useNavigate();
//     const auth = getAuth();

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 navigate('/', { replace: true });
//             }
//         });

//         return () => unsubscribe();
//     }, [auth, navigate]);

//     const handleGoogleSignIn = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             await signInWithPopup(auth, provider);
//             navigate('/', { replace: true });
//         } catch (error) {
//             console.error('Error during sign-in:', error);
//         }
//     };

//     return (
//         <div className="login-container">
//             <header className="login-header">
//                 <div className="logo">
//                     <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
//                     BabyBumps
//                 </div>
//             </header>
//             <div className="login-content">
//                 <button onClick={handleGoogleSignIn} className="login-button">
//                     <FcGoogle style={{ marginRight: '10px' }} />
//                     Sign in with Google
//                 </button>
//             </div>
//             <div className="login-footer">
//                 <p>Continue your journey to parenthood with us.</p>
//             </div>
//         </div>
//     );
// }

// export default Login;

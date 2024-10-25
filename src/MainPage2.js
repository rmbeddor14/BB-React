// // src/MainPage2.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAuth, signOut } from 'firebase/auth';
// import Questionnaire_Main from './QuestionnaireMain';
// import './MainPage2.css';  // Keep your existing MainPage2.css for the background and basic layout

// function MainPage2() {
//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);


//   const handleQuestionnaireComplete = (answers) => {
//     console.log('Questionnaire answers:', answers);
//     navigate('/create-profile');
//   };

//   const handleLogout = async () => {
//         const auth = getAuth();
//         try {
//             await signOut(auth);
//             navigate('/login', { replace: true });
//         } catch (error) {
//             console.error('Error during logout:', error);
//         }
//     };

//   const handleAdminNavigate = () => {
//         navigate('/admin');
//     };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="main-page">
//       <header className="header-main">
//         <div className="logo">
//           <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
//           <span>BabyBumps</span>
//         </div>
//       </header>

//       <section className="welcome-section">
//         <h1>Welcome to BabyBumps</h1>
//         <p>Your journey to parenthood starts here.</p>
//       </section>
//       <div>
//         <Questionnaire_Main onComplete={handleQuestionnaireComplete} />
//       </div>
      
//       <div className="footer-buttons">
//         <button onClick={handleLogout} className="btn secondary-btn">Logout</button>
//         <button onClick={handleAdminNavigate} className="btn secondary-btn">Admin</button>
//     </div>
//   </div>
//   );
// }

// export default MainPage2;


// // //src/MainPage2.js
// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Questionnaire_Main from './QuestionnaireMain';
// // import './MainPage2.css';  // Keep your existing MainPage2.css for the background and basic layout

// // function MainPage2() {
// //   const navigate = useNavigate();

// //   const handleQuestionnaireComplete = (answers) => {
// //     console.log('Questionnaire answers:', answers);
// //     navigate('/create-profile');
// //   };

// //   // Changed the layout structure to ensure the questionnaire displays properly
// //   return (
// //      <div className="main-page">
// //       <header className="header-main">
// //         <div className="logo">
// //           <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
// //           <span>BabyBumps</span>
// //         </div>
// //       </header>

// //       {/* Add a new container for the main content */}
// //         <section className="welcome-section">
// //           <h1>Welcome to BabyBumps</h1>
// //           <p>Your journey to parenthood starts here.</p>
// //         </section>

// //         <section>
// //           <Questionnaire_Main onComplete={handleQuestionnaireComplete} />
// //         </section>

// //     </div>
// //   );
// // }

// // export default MainPage2;


 import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import QuestionnaireMain from './QuestionnaireMain';
import './MainPage2.css';

function MainPage2() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleAdminNavigate = () => {
    navigate('/admin');
  };

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  // Close the dropdown when clicking outside, but ignore clicks on the menu icon
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.className !== 'menu-icon'
      ) {
        setDropdownOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
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
            <button onClick={handleLogout} className="btn dropdown-btn">Logout</button>
            <button onClick={handleAdminNavigate} className="btn dropdown-btn">Admin</button>
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

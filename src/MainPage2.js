// src/MainPage2.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Questionnaire_Main from './QuestionnaireMain';
import './MainPage2.css';  // Keep your existing MainPage2.css for the background and basic layout

function MainPage2() {
  const navigate = useNavigate();

  const handleQuestionnaireComplete = (answers) => {
    console.log('Questionnaire answers:', answers);
    navigate('/create-profile');
  };

  return (
    <div className="main-page">
      <header className="header-main">
        <div className="logo">
          <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
          <span>BabyBumps</span>
        </div>
      </header>

      <section className="welcome-section">
        <h1>Welcome to BabyBumps</h1>
        <p>Your journey to parenthood starts here.</p>
      </section>
      <div>
        <Questionnaire_Main onComplete={handleQuestionnaireComplete} />
      </div>
    </div>
  );
}

export default MainPage2;


// //src/MainPage2.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Questionnaire_Main from './QuestionnaireMain';
// import './MainPage2.css';  // Keep your existing MainPage2.css for the background and basic layout

// function MainPage2() {
//   const navigate = useNavigate();

//   const handleQuestionnaireComplete = (answers) => {
//     console.log('Questionnaire answers:', answers);
//     navigate('/create-profile');
//   };

//   // Changed the layout structure to ensure the questionnaire displays properly
//   return (
//      <div className="main-page">
//       <header className="header-main">
//         <div className="logo">
//           <img src="img/icon2.png" alt="BabyBumps Logo" className="app-icon" />
//           <span>BabyBumps</span>
//         </div>
//       </header>

//       {/* Add a new container for the main content */}
//         <section className="welcome-section">
//           <h1>Welcome to BabyBumps</h1>
//           <p>Your journey to parenthood starts here.</p>
//         </section>

//         <section>
//           <Questionnaire_Main onComplete={handleQuestionnaireComplete} />
//         </section>

//     </div>
//   );
// }

// export default MainPage2;
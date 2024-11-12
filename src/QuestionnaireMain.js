import { useState } from 'react';
import './QuestionnaireMain.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';



export default function OnboardingQuestionnaire({ onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const { currentUser } = useAuth(); // Get the authentication state
  const navigate = useNavigate(); // Use navigate for navigation

  const handleSelection = (choice) => {
    setAnswers(prev => ({ ...prev, [`step${step}`]: choice }));
    
    setTimeout(() => {
        if (step < 3) {
          setStep(step + 1);
        } else {
          onComplete?.(answers);
        }
      }, 150); //delay 150ms for ease of viewing
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to the login page
  };

  const renderStep = () => {
    const selectedChoice = answers[`step${step}`]; // Track selected choice for the current step

    switch(step) {
      case 1:
        return (
          <div className="questionnaire-step">
            <h2 className="step-title">Let's Get Started</h2>
            <div className="option-buttons">
              <button 
                onClick={() => handleSelection('seeking')}
                className={`option-button ${selectedChoice === 'seeking' ? 'selected' : ''}`}
              >
                <span className="circle"></span>
                I am seeking a surrogate
              </button>
              <button 
                onClick={() => handleSelection('becoming')}
                className={`option-button ${selectedChoice === 'becoming' ? 'selected' : ''}`}
              >
                <span className="circle"></span>
                I am interested in becoming a surrogate
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="questionnaire-step">
            <h2 className="step-title">Have you worked with surrogacy agencies before?</h2>
            <div className="option-buttons">
              <button 
                onClick={() => handleSelection('new')}
                className={`option-button ${selectedChoice === 'new' ? 'selected' : ''}`}
              >
                <span className="circle"></span>
                I'm new to this
              </button>
              <button 
                onClick={() => handleSelection('some')}
                className={`option-button ${selectedChoice === 'some' ? 'selected' : ''}`}
              >
                <span className="circle"></span>
                I have some experience
              </button>
              <button 
                onClick={() => handleSelection('experienced')}
                className={`option-button ${selectedChoice === 'experienced' ? 'selected' : ''}`}
              >
                <span className="circle"></span>
                I'm experienced with surrogacy
              </button>
            </div>
          </div>
        );

      case 3:
        return (
        <div className="questionnaire-step">
          <h2 className="step-title">Join Us</h2>
          <div className="option-buttons">
            <button
              onClick={handleLoginRedirect}
              className="option-button"
            >
              Login
            </button>
            <button
              onClick={handleLoginRedirect}
              className="option-button"
            >
              Create Account
            </button>
          </div>
        </div>
        );
      
      default:
        return null;
    }
  };

  // the below was if you want it embedded in the flow of the quiz thing 

  //     case 3:
  //       return (
  //         <div className="questionnaire-step">
  //           <h2 className="step-title">Login to Join Us</h2>
  //           <div>
  //             <Login />
  //           </div>
          
  //         </div>
        
  //       );

  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="questionnaire-container">
      {renderStep()}
    </div>
  );
}

// // QuestionnaireMain.js
// import { useState } from 'react';
// import './QuestionnaireMain.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// export default function OnboardingQuestionnaire({ onComplete }) {
//   const [step, setStep] = useState(1);
//   const [answers, setAnswers] = useState({});
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [isSeekingSurrogate, setIsSeekingSurrogate] = useState(false);

//   const handleSelection = (choice) => {
//     setAnswers((prev) => ({ ...prev, [`step${step}`]: choice }));
//     if (step === 1 && choice === 'seeking') {
//       setIsSeekingSurrogate(true); // Track if the user is seeking a surrogate
//     }
//     setTimeout(() => {
//       if (step < 3) {
//         setStep(step + 1);
//       } else {
//         onComplete?.(answers);
//       }
//     }, 150); // Delay for viewing ease
//   };

//   const handleLoginRedirect = () => {
//     // Navigate based on whether they selected "seeking a surrogate"
//     if (isSeekingSurrogate) {
//       navigate('/login', { state: { redirectTo: '/create-surrogate-profile' } });
//     } else {
//       navigate('/login');
//     }
//   };

//   const renderStep = () => {
//     const selectedChoice = answers[`step${step}`];

//     switch (step) {
//       case 1:
//         return (
//           <div className="questionnaire-step">
//             <h2 className="step-title">Let's Get Started</h2>
//             <div className="option-buttons">
//               <button
//                 onClick={() => handleSelection('seeking')}
//                 className={`option-button ${selectedChoice === 'seeking' ? 'selected' : ''}`}
//               >
//                 <span className="circle"></span>
//                 I am seeking a surrogate
//               </button>
//               <button
//                 onClick={() => handleSelection('becoming')}
//                 className={`option-button ${selectedChoice === 'becoming' ? 'selected' : ''}`}
//               >
//                 <span className="circle"></span>
//                 I am interested in becoming a surrogate
//               </button>
//             </div>
//           </div>
//         );

//       case 2:
//         return (
//           <div className="questionnaire-step">
//             <h2 className="step-title">Have you worked with surrogacy agencies before?</h2>
//             <div className="option-buttons">
//               <button
//                 onClick={() => handleSelection('new')}
//                 className={`option-button ${selectedChoice === 'new' ? 'selected' : ''}`}
//               >
//                 <span className="circle"></span>
//                 I'm new to this
//               </button>
//               <button
//                 onClick={() => handleSelection('some')}
//                 className={`option-button ${selectedChoice === 'some' ? 'selected' : ''}`}
//               >
//                 <span className="circle"></span>
//                 I have some experience
//               </button>
//               <button
//                 onClick={() => handleSelection('experienced')}
//                 className={`option-button ${selectedChoice === 'experienced' ? 'selected' : ''}`}
//               >
//                 <span className="circle"></span>
//                 I'm experienced with surrogacy
//               </button>
//             </div>
//           </div>
//         );

//       case 3:
//         return (
//           <div className="questionnaire-step">
//             <h2 className="step-title">Join Us</h2>
//             <p>Please log in or create an account to continue.</p>
//             <div className="option-buttons">
//               <button onClick={handleLoginRedirect} className="option-button">
//                 Login
//               </button>
//               <button onClick={handleLoginRedirect} className="option-button">
//                 Create Account
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return <div className="questionnaire-container">{renderStep()}</div>;
// }


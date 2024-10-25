import { useState } from 'react';
import './QuestionnaireMain.css';
import Login from './Login';

export default function OnboardingQuestionnaire({ onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

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
            <h2 className="step-title">Login to Join Us</h2>
            <div>
              <Login />
            </div>
          
          </div>
        
        );

      default:
        return null;
    }
  };

  return (
    <div className="questionnaire-container">
      {renderStep()}
    </div>
  );
}

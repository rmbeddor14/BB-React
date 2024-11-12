// import React, { useState } from 'react';
// import Profile from './Profile'; // Import Profile component
// import './SwipeableCard.css';

// function SwipeableCard({ profile, onSwipe, isMobile }) {
//   const [showDetails, setShowDetails] = useState(false);
//   const [swipeStart, setSwipeStart] = useState(null);
//   const [swipeDirection, setSwipeDirection] = useState(null); // Add swipe direction state

//   // Toggle details view on card click
//   const handleCardClick = (e) => {
//     if (swipeStart === null) {
//       setShowDetails(!showDetails);
//     }
//   };

//   // Swipe handlers for mobile
//   const handleTouchStart = (e) => {
//     if (isMobile) {
//       setSwipeStart(e.touches[0].clientX);
//     }
//   };

//   const handleTouchEnd = (e) => {
//     if (isMobile && swipeStart !== null) {
//       const swipeEnd = e.changedTouches[0].clientX;
//       const swipeDistance = swipeStart - swipeEnd;
//       setSwipeStart(null); // Reset swipeStart

//       if (swipeDistance > 100) {
//         setSwipeDirection('left');
//         setTimeout(() => onSwipe('left', profile.id), 300); // Delay swipe action
//       } else if (swipeDistance < -100) {
//         setSwipeDirection('right');
//         setTimeout(() => onSwipe('right', profile.id), 300); // Delay swipe action
//       }
//     }
//   };

//   // Button click handlers for desktop
//   const handleDislikeClick = (e) => {
//     e.stopPropagation();
//     setSwipeDirection('left');
//     setTimeout(() => onSwipe('left', profile.id), 300); // Delay swipe action
//   };

//   const handleLikeClick = (e) => {
//     e.stopPropagation();
//     setSwipeDirection('right');
//     setTimeout(() => onSwipe('right', profile.id), 300); // Delay swipe action
//   };

//   return (
//     <div
//       className={`swipeable-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
//       onClick={handleCardClick}
//       onTouchStart={isMobile ? handleTouchStart : null}
//       onTouchEnd={isMobile ? handleTouchEnd : null}
//     >
//       {!showDetails ? (
//         <>
//           <img src={profile.imageURL} alt={profile.name} className="profile-image" />
//           <h3>{profile.name}</h3>
//           <p>{profile.location}</p>
//           <p>{profile.type === "seeker" ? "Seeking Surrogate" : "Surrogate"}</p>
//         </>
//       ) : (
//         <Profile profileData={profile} />
//       )}

//       <div className="swipe-buttons">
//         <button onClick={handleDislikeClick} className="swipe-button dislike"></button>
//         <button onClick={handleLikeClick} className="swipe-button like"></button>
//       </div>
//     </div>
//   );
// }

// export default SwipeableCard;


// // SwipeableCard.js
// import React, { useState } from 'react';
// import Profile from './Profile'; // Import Profile component
// import './SwipeableCard.css';

// function SwipeableCard({ profile, onSwipe, isMobile }) {
//   const [showDetails, setShowDetails] = useState(false);
//   const [swipeStart, setSwipeStart] = useState(null);

//   // Toggle details view on card click
//   const handleCardClick = (e) => {
//     // Ensure swipe gestures don’t trigger the click functionality
//     if (swipeStart === null) {
//       setShowDetails(!showDetails);
//     }
//   };

//   // Swipe handlers for mobile
//   const handleTouchStart = (e) => {
//     if (isMobile) {
//       setSwipeStart(e.touches[0].clientX);
//     }
//   };

//   const handleTouchEnd = (e) => {
//     if (isMobile && swipeStart !== null) {
//       const swipeEnd = e.changedTouches[0].clientX;
//       const swipeDistance = swipeStart - swipeEnd;
//       setSwipeStart(null); // Reset swipeStart

//       if (swipeDistance > 100) {
//         onSwipe('left', profile.id);
//       } else if (swipeDistance < -100) {
//         onSwipe('right', profile.id);
//       }
//     }
//   };

//   // Button click handlers for desktop
//   const handleDislikeClick = (e) => {
//     e.stopPropagation();
//     onSwipe('left', profile.id);
//   };

//   const handleLikeClick = (e) => {
//     e.stopPropagation();
//     onSwipe('right', profile.id);
//   };

//   return (
//     <div
//       className="swipeable-card"
//       onClick={handleCardClick}
//       onTouchStart={isMobile ? handleTouchStart : null}
//       onTouchEnd={isMobile ? handleTouchEnd : null}
//     >
//       {!showDetails ? (
//         // Front of the card (Basic Info)
//         <>
//           <img src={profile.imageURL} alt={profile.name} className="profile-image" />
//           <h3>{profile.name}</h3>
//           <p>{profile.location}</p>
//           <p>{profile.type === "seeker" ? "Seeking Surrogate" : "Surrogate"}</p>
//         </>
//       ) : (
//         // Back of the card (Full Profile Info using Profile component)
//         <Profile profileData={profile} /> // Pass profile data to Profile component
//       )}

//       {/* {!isMobile && (
//         <div className="swipe-buttons">
//           <button onClick={handleDislikeClick} className="swipe-button dislike"></button>
//           <button onClick={handleLikeClick} className="swipe-button like"></button>
//         </div>
//       )} */}
//       <div className="swipe-buttons">
//         <button onClick={handleDislikeClick} className="swipe-button dislike"></button>
//         <button onClick={handleLikeClick} className="swipe-button like"></button>
//         </div>

//     </div>
//   );
// }

// export default SwipeableCard;


import React, { useState } from 'react';
import Profile from './Profile'; // Import Profile component
import './SwipeableCard.css';

function SwipeableCard({ profile, onSwipe, isMobile }) {
  const [showDetails, setShowDetails] = useState(false);
  const [swipeStart, setSwipeStart] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeVisual, setSwipeVisual] = useState(''); // New state to indicate like/dislike

  // Toggle details view on card click
  const handleCardClick = (e) => {
    if (swipeStart === null) {
      setShowDetails(!showDetails);
    }
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    if (isMobile) {
      setSwipeStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (isMobile && swipeStart !== null) {
      const currentX = e.touches[0].clientX;
      const swipeDistance = currentX - swipeStart;

      if (swipeDistance > 50) {
        setSwipeVisual('right'); // Indicate like
      } else if (swipeDistance < -50) {
        setSwipeVisual('left'); // Indicate dislike
      } else {
        setSwipeVisual('');
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isMobile && swipeStart !== null) {
      const swipeEnd = e.changedTouches[0].clientX;
      const swipeDistance = swipeStart - swipeEnd;
      setSwipeStart(null); // Reset swipeStart

      if (swipeDistance > 100) {
        setSwipeDirection('left');
        setSwipeVisual(''); // Reset visual after swipe
        setTimeout(() => onSwipe('left', profile.id), 300); // Delay swipe action
      } else if (swipeDistance < -100) {
        setSwipeDirection('right');
        setSwipeVisual(''); // Reset visual after swipe
        setTimeout(() => onSwipe('right', profile.id), 300); // Delay swipe action
      } else {
        setSwipeVisual(''); // Reset if no swipe
      }
    }
  };

  // Button click handlers for desktop
  const handleDislikeClick = (e) => {
    e.stopPropagation();
    setSwipeDirection('left');
    setSwipeVisual('left');
    setTimeout(() => onSwipe('left', profile.id), 300); // Delay swipe action
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setSwipeDirection('right');
    setSwipeVisual('right');
    setTimeout(() => onSwipe('right', profile.id), 300); // Delay swipe action
  };

  return (
    <div
      className={`swipeable-card ${swipeDirection ? `swipe-${swipeDirection}` : ''} ${swipeVisual ? `swipe-visual-${swipeVisual}` : ''}`}
      onClick={handleCardClick}
      onTouchStart={isMobile ? handleTouchStart : null}
      onTouchMove={isMobile ? handleTouchMove : null} // Listen to touch movement
      onTouchEnd={isMobile ? handleTouchEnd : null}
    >
      {!showDetails ? (
        <>
          <img src={profile.imageURL} alt={profile.name} className="profile-image" />
          <h3>{profile.name}</h3>
          <p>{profile.location}</p>
          <p>{profile.type === "seeker" ? "Seeking Surrogate" : "Surrogate"}</p>
        </>
      ) : (
        <Profile profileData={profile} />
      )}

      <div className="swipe-buttons">
        <button 
          onClick={handleDislikeClick} 
          className={`swipe-button dislike ${swipeVisual === 'left' ? 'active' : ''}`}
        ></button>
        <button 
          onClick={handleLikeClick} 
          className={`swipe-button like ${swipeVisual === 'right' ? 'active' : ''}`}
        ></button>
      </div>
    </div>
  );
}

export default SwipeableCard;

// SwipeableCard.js
import React, { useState } from 'react';
import Profile from './Profile'; // Import Profile component
import './SwipeableCard.css';

function SwipeableCard({ profile, onSwipe, isMobile }) {
  const [showDetails, setShowDetails] = useState(false);
  const [swipeStart, setSwipeStart] = useState(null);

  // Toggle details view on card click
  const handleCardClick = (e) => {
    // Ensure swipe gestures don’t trigger the click functionality
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

  const handleTouchEnd = (e) => {
    if (isMobile && swipeStart !== null) {
      const swipeEnd = e.changedTouches[0].clientX;
      const swipeDistance = swipeStart - swipeEnd;
      setSwipeStart(null); // Reset swipeStart

      if (swipeDistance > 100) {
        onSwipe('left', profile.id);
      } else if (swipeDistance < -100) {
        onSwipe('right', profile.id);
      }
    }
  };

  // Button click handlers for desktop
  const handleDislikeClick = (e) => {
    e.stopPropagation();
    onSwipe('left', profile.id);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onSwipe('right', profile.id);
  };

  return (
    <div
      className="swipeable-card"
      onClick={handleCardClick}
      onTouchStart={isMobile ? handleTouchStart : null}
      onTouchEnd={isMobile ? handleTouchEnd : null}
    >
      {!showDetails ? (
        // Front of the card (Basic Info)
        <>
          <img src={profile.imageURL} alt={profile.name} className="profile-image" />
          <h3>{profile.name}</h3>
          <p>{profile.location}</p>
        </>
      ) : (
        // Back of the card (Full Profile Info using Profile component)
        <Profile profileData={profile} /> // Pass profile data to Profile component
      )}

      {!isMobile && (
        <div className="swipe-buttons">
          <button onClick={handleDislikeClick} className="swipe-button dislike"></button>
          <button onClick={handleLikeClick} className="swipe-button like"></button>
        </div>
      )}
    </div>
  );
}

export default SwipeableCard;

// // SwipeableCard.js
// import React, { useState } from 'react';
// import Profile from './Profile';  // Import Profile component
// import './SwipeableCard.css';

// function SwipeableCard({ profile, onSwipe, isMobile }) {
//   const [showDetails, setShowDetails] = useState(false);

//   const handleCardClick = () => {
//     setShowDetails(!showDetails); // Toggle details view
//   };

//   const handleDislikeClick = (e) => {
//     e.stopPropagation();
//     onSwipe('left', profile.id);
//   };

//   const handleLikeClick = (e) => {
//     e.stopPropagation();
//     onSwipe('right', profile.id);
//   };

//   return (
//     <div className="swipeable-card" onClick={handleCardClick}>
//       {!showDetails ? (
//         // Front of the card (Basic Info)
//         <>
//           <img src={profile.imageURL} alt={profile.name} className="profile-image" />
//           <h3>{profile.name}</h3>
//           <p>{profile.location}</p>
//         </>
//       ) : (
//         // Back of the card (Full Profile Info using Profile component)
//         <Profile profileData={profile} />  // Pass profile data to Profile component
//       )}

//       {!isMobile && (
//         <div className="swipe-buttons">
//           <button onClick={handleDislikeClick} className="swipe-button dislike"></button>
//           <button onClick={handleLikeClick} className="swipe-button like"></button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SwipeableCard;


//takes you to the page 
// // SwipeableCard.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SwipeableCard.css';

// function SwipeableCard({ profile, onSwipe, isMobile }) {
//   const [swipeStart, setSwipeStart] = useState(null);
//   const navigate = useNavigate();

//   const handleTouchStart = (e) => {
//     if (isMobile) setSwipeStart(e.touches[0].clientX);
//   };

//   const handleTouchEnd = (e) => {
//     if (isMobile && swipeStart !== null) {
//       const swipeEnd = e.changedTouches[0].clientX;
//       const swipeDistance = swipeStart - swipeEnd;
//       if (swipeDistance > 100) onSwipe('left', profile.id);
//       else if (swipeDistance < -100) onSwipe('right', profile.id);
//     }
//   };

//   // Function to navigate to the profile page
//   const handleCardClick = () => {
//     navigate(`/profile/${profile.id}`);
//   };

//   // Modified swipe button handlers to stop propagation
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
//       onClick={handleCardClick}  // Attach the card click handler
//       onTouchStart={isMobile ? handleTouchStart : null}
//       onTouchEnd={isMobile ? handleTouchEnd : null}
//     >
//       <img src={profile.imageURL} alt={profile.name} className="profile-image" />
//       <h3>{profile.name}</h3>
//       <p>{profile.location}</p>

//       {!isMobile && (
//         <div className="swipe-buttons">
//           <button onClick={handleDislikeClick} className="swipe-button dislike"></button>
//           <button onClick={handleLikeClick} className="swipe-button like"></button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SwipeableCard;


// // SwipeableCard.js
// // adjusted after doing mobile dimension the previous code didn't work as well for swipe 
// import React, { useState } from 'react';
// import './SwipeableCard.css';

// function SwipeableCard({ profile, onSwipe, isMobile }) {
//   const [swipeStart, setSwipeStart] = useState(null);

//   // Track swipe start and end points for mobile
//   const handleTouchStart = (e) => {
//     if (isMobile) setSwipeStart(e.touches[0].clientX);
//   };

//   const handleTouchEnd = (e) => {
//     if (isMobile && swipeStart !== null) {
//       const swipeEnd = e.changedTouches[0].clientX;
//       const swipeDistance = swipeStart - swipeEnd;
//       if (swipeDistance > 100) onSwipe('left', profile.id);
//       else if (swipeDistance < -100) onSwipe('right', profile.id);
//     }
//   };

//   return (
//     <div
//       className="swipeable-card"
//       onTouchStart={isMobile ? handleTouchStart : null}
//       onTouchEnd={isMobile ? handleTouchEnd : null}
//     >
//       <img src={profile.imageURL} alt={profile.name} className="profile-image" />
//       <h3>{profile.name}</h3>
//       <p>{profile.location}</p>

//       {!isMobile && (
//         <div className="swipe-buttons">
//           <button onClick={() => onSwipe('left', profile.id)} className="swipe-button dislike"></button>
//           <button onClick={() => onSwipe('right', profile.id)} className="swipe-button like"></button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SwipeableCard;


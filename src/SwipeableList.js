// SwipeableList.js (modified)
// src/SwipeableList.js
import React, { useState, useEffect } from 'react';
import SwipeableCard from './SwipeableCard';
import './SwipeableList.css';

function SwipeableList({ profiles, onSwipe }) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSwipe = (direction, id) => {
    onSwipe(direction, id);
    setCurrentProfileIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="swipeable-list">
      {profiles.slice(currentProfileIndex, currentProfileIndex + 1).map((profile) => (
        <SwipeableCard 
          key={profile.id} 
          profile={profile} 
          onSwipe={handleSwipe} 
          isMobile={isMobile} 
        />
      ))}
    </div>
  );
}

export default SwipeableList;

// import React, { useState } from 'react';
// import SwipeableCard from './SwipeableCard';

// function SwipeableList({ profiles, onSwipe }) {
//   const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

//   const handleSwipe = (direction, id) => {
//     onSwipe(direction, id); // Call the handleSwipe function in ProfileTinderList
//     setCurrentProfileIndex((prevIndex) => prevIndex + 1);
//   };

//   return (
//     <div className="swipeable-list">
//       {profiles.slice(currentProfileIndex, currentProfileIndex + 1).map((profile) => (
//         <SwipeableCard key={profile.id} profile={profile} onSwipe={handleSwipe} />
//       ))}
//     </div>
//   );
// }

// export default SwipeableList;

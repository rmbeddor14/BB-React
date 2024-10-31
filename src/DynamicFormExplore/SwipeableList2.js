// SwipeableList2.js
// src/SwipeableList2.js
import React, { useState, useEffect } from 'react';
import SwipeableCard from './SwipeableCard2';
import '../SwipeableList.css';

function SwipeableList2({ profiles, onSwipe }) {
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

export default SwipeableList2;


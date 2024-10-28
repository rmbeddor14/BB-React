// SwipeableCard.js
// adjusted after doing mobile dimension the previous code didn't work as well for swipe 
import React, { useState } from 'react';
import './SwipeableCard.css';

function SwipeableCard({ profile, onSwipe, isMobile }) {
  const [swipeStart, setSwipeStart] = useState(null);

  // Track swipe start and end points for mobile
  const handleTouchStart = (e) => {
    if (isMobile) setSwipeStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (isMobile && swipeStart !== null) {
      const swipeEnd = e.changedTouches[0].clientX;
      const swipeDistance = swipeStart - swipeEnd;
      if (swipeDistance > 100) onSwipe('left', profile.id);
      else if (swipeDistance < -100) onSwipe('right', profile.id);
    }
  };

  return (
    <div
      className="swipeable-card"
      onTouchStart={isMobile ? handleTouchStart : null}
      onTouchEnd={isMobile ? handleTouchEnd : null}
    >
      <img src={profile.imageURL} alt={profile.name} className="profile-image" />
      <h3>{profile.name}</h3>
      <p>{profile.location}</p>

      {!isMobile && (
        <div className="swipe-buttons">
          <button onClick={() => onSwipe('left', profile.id)} className="swipe-button dislike"></button>
          <button onClick={() => onSwipe('right', profile.id)} className="swipe-button like"></button>
        </div>
      )}
    </div>
  );
}

export default SwipeableCard;


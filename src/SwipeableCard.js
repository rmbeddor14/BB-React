import React, { useState, useCallback } from 'react';
import './SwipeableCard.css';

function SwipeableCard({ profile, onSwipe }) {
  const [swipeStart, setSwipeStart] = useState(null);

  // Handle the start of a swipe
  const handleTouchStart = (e) => {
    setSwipeStart(e.touches[0].clientX);
  };

  // Handle the end of a swipe
  const handleTouchEnd = (e) => {
    const swipeEnd = e.changedTouches[0].clientX;
    const swipeDistance = swipeStart - swipeEnd;

    if (swipeDistance > 100) {
      onSwipe('left', profile.id);
    } else if (swipeDistance < -100) {
      onSwipe('right', profile.id);
    }
  };

  return (
    <div
      className="swipeable-card"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={profile.imageURL} alt={profile.name} className="profile-image" />
      <h3>{profile.name}</h3>
      <p>{profile.location}</p>
    </div>
  );
}

export default SwipeableCard;

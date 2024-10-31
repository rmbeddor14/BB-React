

// SwipeableCard2.js
import React, { useState, useEffect } from 'react';
import Profile from './Profile2'; // Import Profile component
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../SwipeableCard.css';

function SwipeableCard2({ profile, onSwipe, isMobile }) {
  const [showDetails, setShowDetails] = useState(false);
  const [swipeStart, setSwipeStart] = useState(null);
  const [sections, setSections] = useState([]);

  // Load form structure from Firestore to dynamically render fields
  useEffect(() => {
    const loadFormStructure = async () => {
      const formRef = doc(db, 'formFields', 'seekerForm', 'latest', 'latest');
      const formSnap = await getDoc(formRef);
      if (formSnap.exists()) {
        setSections(formSnap.data().sections || []);
      } else {
        console.error('Form structure not found in Firestore.');
      }
    };
    loadFormStructure();
  }, []);

  // Toggle details view on card click
  const handleCardClick = () => {
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
      setSwipeStart(null);

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
          <h3>{profile.name || "Name not provided"}</h3>
          <p>{profile.location || "Location not provided"}</p>
        </>
      ) : (
        // Back of the card (Full Profile Info using Profile component)
        <Profile profileData={profile} /> // Pass profile data to Profile component
      )}
      
      {/* Swipe buttons for mobile or desktop */}
      <div className="swipe-buttons">
        <button onClick={handleDislikeClick} className="swipe-button dislike"></button>
        <button onClick={handleLikeClick} className="swipe-button like"></button>
      </div>
    </div>
  );
}

export default SwipeableCard2;

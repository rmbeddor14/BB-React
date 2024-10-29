// ProfileCard.js
// GUI component for displaying a profile card with a name and image


import React from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
  return (
    <div className="profile-card">
      <div className="profile-card-image-wrapper">
        <img src={profile.imageURL} alt={`${profile.name}`} className="profile-card-image" />
      </div>
      <div className="profile-card-name">{profile.name}</div>
    </div>
  );
}

export default ProfileCard;

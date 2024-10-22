// src/ProfileCardContainer.js
import React from 'react';
import ProfileCard from './ProfileCard';
import './ProfileCardContainer.css';

function ProfileCardContainer({ profile, onApprove, onReject }) {
  return (
    <div className="profile-card-container">
      <ProfileCard profile={profile} />
      <div className="profile-actions">
        <button onClick={() => onApprove(profile.id)} className="approve-button">Approve</button>
        <button onClick={() => onReject(profile.id)} className="reject-button">Reject</button>
      </div>
    </div>
  );
}

export default ProfileCardContainer;
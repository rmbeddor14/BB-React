// src/AdminProfileCardContainer.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileCard from '../ProfileCard';
import './AdminProfileCardContainer.css';

function AdminProfileCardContainer({ profile, onApprove, onReject }) {
  return (
    <div className="admin-profile-card-container">
      <Link to={`/admin/profile/${profile.id}`} className="profile-link">
        <ProfileCard profile={profile} />
      </Link>
      <div className="admin-profile-actions">
        <button onClick={() => onApprove(profile.id)} className="approve-button">Approve</button>
        <button onClick={() => onReject(profile.id)} className="reject-button">Reject</button>
      </div>
    </div>
  );
}

export default AdminProfileCardContainer;
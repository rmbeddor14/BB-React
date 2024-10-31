// src/AdminViewProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase-config';
import Profile from '../Profile.js';
import '../Profile.css';
import './AdminViewProfile.css'; // Import the CSS file for AdminViewProfile


function AdminViewProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profileRef = doc(db, 'profiles', id);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setProfile({ id: profileSnap.id, ...profileSnap.data() });
      }
    };

    fetchProfile();
  }, [id]);

  const handleApprove = async () => {
    const profileRef = doc(db, 'profiles', id);
    await updateDoc(profileRef, { status: 'approved' });
    setProfile({ ...profile, status: 'approved' });
  };

  const handleReject = async () => {
    const profileRef = doc(db, 'profiles', id);
    await updateDoc(profileRef, { status: 'rejected' });
    await addDoc(collection(db, 'rejectedProfiles'), profile);
    setProfile({ ...profile, status: 'rejected' });
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="admin-view-profile">
      <Profile profile={profile} />
      <div className="profile-actions">
        <button onClick={handleApprove} className="approve-button">Approve</button>
        <button onClick={handleReject} className="reject-button">Reject</button>
      </div>
    </div>
  );
}

export default AdminViewProfile;
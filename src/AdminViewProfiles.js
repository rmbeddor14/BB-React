// src/AdminViewProfiles.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import db from './firebase-config';
import './styles.css'; // Import the centralized CSS file
import './AdminViewProfiles.css'; // Import the AdminViewProfiles-specific CSS file

function AdminViewProfiles() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollection = collection(db, 'profiles');
      const profileSnapshot = await getDocs(profilesCollection);
      const profileList = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(profileList);
    };

    fetchProfiles();
  }, []);

  const handleApprove = async (id) => {
    const profileRef = doc(db, 'profiles', id);
    await updateDoc(profileRef, { status: 'approved' });
    setProfiles(profiles.map(profile => profile.id === id ? { ...profile, status: 'approved' } : profile));
  };

  const handleReject = async (id) => {
    const profileRef = doc(db, 'profiles', id);
    await updateDoc(profileRef, { status: 'rejected' });
    setProfiles(profiles.map(profile => profile.id === id ? { ...profile, status: 'rejected' } : profile));
  };

  return (
    <div className="admin-view-profiles">
      <h1>Admin View Profiles</h1>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id} className="profile-item">
            <div className="profile-details">
              <p>Name: {profile.name}</p>
              <p>Age: {profile.age}</p>
              <p>Location: {profile.location}</p>
              <p>Status: {profile.status}</p>
            </div>
            <div className="profile-actions">
              <button onClick={() => handleApprove(profile.id)} className="approve-button">Approve</button>
              <button onClick={() => handleReject(profile.id)} className="reject-button">Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminViewProfiles;
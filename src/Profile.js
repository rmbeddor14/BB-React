// Profile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import './Profile.css';

function Profile({ profileData }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(profileData || null);

  useEffect(() => {
    if (!profileData && id) {
      const fetchProfile = async () => {
        const profileRef = doc(db, 'profiles', id);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile({ id: profileSnap.id, ...profileSnap.data() });
        } else {
          setProfile(null);
        }
      };
      fetchProfile();
    }
  }, [id, profileData]);

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className="profile-container">
      <img src={profile.imageURL} alt={profile.name} className="profile-image" />
      <h2>{profile.name || "Name not provided"}</h2>
      <p>Age: {profile.age || "N/A"}</p>
      <p>Location: {profile.location || "N/A"}</p>
      <p>Marital Status: {profile.maritalStatus || "N/A"}</p>
      {/* Add additional profile information as needed */}
    </div>
  );
}

export default Profile;

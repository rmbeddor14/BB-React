// ProfileTinderList2.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import SwipeableList from './SwipeableList2';
import { handleSwipe } from '../services/swipeService';
import { useAuth } from '../AuthContext';

function ProfileTinderList2() {
  const [profiles, setProfiles] = useState([]);
  const { currentUser } = useAuth();
  const swiperId = currentUser ? currentUser.uid : null;
  const displayName = currentUser ? currentUser.displayName : null;

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollection = collection(db, 'profiles2'); // Use the correct collection
      const profileSnapshot = await getDocs(profilesCollection);
      const profileList = profileSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }));
        // .filter((profile) => profile.status === 'approved');
      setProfiles(profileList);
    };

    fetchProfiles();
  }, []);

  const handleSwipeAction = (direction, profileId) => {
    const profile = profiles.find((profile) => profile.id === profileId);
    const profileDisplayName = profile ? profile.name : null;
    handleSwipe(displayName, swiperId, profileDisplayName, profileId, direction);
  };

  return (
    <div className="profile-tinder-list">
      <SwipeableList profiles={profiles} onSwipe={handleSwipeAction} />
    </div>
  );
}

export default ProfileTinderList2;

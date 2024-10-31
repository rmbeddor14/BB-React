// ProfileTinderList.js

import React, { useEffect, useState } from 'react';
import SwipeableList from './SwipeableList';
import { fetchProfilesByType, handleSwipeAction } from './services/profileService';
import MatchNotification from './MatchNotification';
import { useAuth } from './AuthContext';

function ProfileTinderList() {
  const [profiles, setProfiles] = useState([]);
  const [match, setMatch] = useState(null);
  const { currentUser } = useAuth();
  const swiperId = currentUser ? currentUser.uid : null;
  const userType = 'seeker'; // Assume we know the user type; replace as needed

  useEffect(() => {
    const loadProfiles = async () => {
      const fetchedProfiles = await fetchProfilesByType(userType);
      setProfiles(fetchedProfiles);
    };
    loadProfiles();
  }, [userType]);

  const handleSwipe = async (direction, profileId) => {
    const result = await handleSwipeAction(swiperId, profileId, direction);
    if (result.isMatch) {
      setMatch(result.matchedProfile);
    }
  };

  return (
    <div className="profile-tinder-list">
      <SwipeableList profiles={profiles} onSwipe={handleSwipe} />
      {match && (
        <MatchNotification match={match} onClose={() => setMatch(null)} />
      )}
    </div>
  );
}

export default ProfileTinderList;

// // ProfileTinderList.js
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './firebase-config';
// import SwipeableList from './SwipeableList';
// import { handleSwipe } from './services/swipeService';
// import { useAuth } from './AuthContext';

// function ProfileTinderList() {
//   const [profiles, setProfiles] = useState([]);
//   const { currentUser } = useAuth();
//   const swiperId = currentUser ? currentUser.uid : null; // get the UID of the current user
//   const displayName = currentUser ? currentUser.displayName : null; // get the display name of the current user

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       const profilesCollection = collection(db, 'profiles');
//       const profileSnapshot = await getDocs(profilesCollection);
//       const profileList = profileSnapshot.docs
//         .map(doc => ({ id: doc.id, ...doc.data() }))
//         .filter(profile => profile.status === 'approved');
//       setProfiles(profileList);
//     };

//     fetchProfiles();
//   }, []);

//   const handleSwipeAction = (direction, profileId) => {
//     const profile = profiles.find((profile) => profile.id === profileId);
//     const profileDisplayName = profile ? profile.name : null; // Get the display name of the swiped profile
//     handleSwipe(displayName, swiperId, profileDisplayName, profileId, direction); // Call handleSwipe for each swipe
//   };

//   return (
//     <div className="profile-tinder-list">
//       <SwipeableList profiles={profiles} onSwipe={handleSwipeAction} />
//     </div>
//   );
// }

// export default ProfileTinderList;

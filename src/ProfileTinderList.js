// ProfileTinderList.js

//update 01-08 to remove persist swipe data to firestore 
// add memoize for latency 

// this is simple code and records it like this "17U8aXs0vYhaIjpAE82HxEpeybi2" (rachel beddor google id) swipe left bert & erne "HyU7PdBBbhosgODttF7v"
 // that's the document id in gcp 
 // i'm just worried about actually implementing this 
 // need a global impersonation feature for admins where we can impersonate but it can get complicated. 
 // so it should use auth context unless it's an admin and then it uses a profile context but it all needs to be the same
 // lets see if we can get this to be legit for auth context 
import React, { useEffect, useState, useCallback, memo } from 'react';
import { collection, getDocs, query, where} from 'firebase/firestore';
import { db } from './firebase-config';
import SwipeableList from './SwipeableList';
// import { handleSwipe } from './services/swipeService';
//import { useAuth } from './AuthContext';

const MemoizedSwipeableList = memo(SwipeableList);

// function ProfileTinderList() {
//   const [profiles, setProfiles] = useState([]);
//   //const { currentUser } = useAuth();
//   //const swiperId = currentUser ? currentUser.uid : null; // get the UID of the current user
//   // const displayName = currentUser ? currentUser.displayName : null; // get the display name of the current user

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
//    // const profile = profiles.find((profile) => profile.id === profileId);
//    // const profileDisplayName = profile ? profile.name : null; // Get the display name of the swiped profile
//    // handleSwipe(displayName, swiperId, profileDisplayName, profileId, direction); // Call handleSwipe for each swipe
//   };

//   return (
//     <div className="profile-tinder-list">
//       <SwipeableList profiles={profiles} onSwipe={handleSwipeAction} />
//     </div>
//   );
// }

function ProfileTinderList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesQuery = query(collection(db, 'profiles'), where('status', '==', 'approved'));
      const profileSnapshot = await getDocs(profilesQuery);
      const profileList = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(profileList);
    };

    fetchProfiles();
  }, []);

  const handleSwipeAction = useCallback((direction, profileId) => {
    // Optimized callback for swipe actions
    console.log(`Swiped ${direction} on profile with ID: ${profileId}`);
  }, []);

  return (
    <div className="profile-tinder-list">
      <MemoizedSwipeableList profiles={profiles} onSwipe={handleSwipeAction} />
    </div>
  );
}

export default ProfileTinderList;

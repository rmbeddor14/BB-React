// profileService.js
//filter by type and check for match 

import { getDoc, collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase-config';

export const fetchProfilesByType = async (userType) => {
  try {
    const profilesCollection = collection(db, 'profiles');
    const profileSnapshot = await getDocs(profilesCollection);
    return profileSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(profile => profile.type !== userType && profile.status === 'approved'); // seekers see surrogates, surrogates see seekers
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return [];
  }
};

export const handleSwipeAction = async (swiperId, swipedId, direction) => {
  const swiperRef = doc(db, 'profiles', swiperId);
  const swipedRef = doc(db, 'profiles', swipedId);

  try {
    if (direction === 'right') {
      await updateDoc(swiperRef, { likes: arrayUnion(swipedId) });

      const swipedProfile = await getDoc(swipedRef);
      if (swipedProfile.exists() && swipedProfile.data().likes.includes(swiperId)) {
        await updateDoc(swiperRef, { matches: arrayUnion(swipedId) });
        await updateDoc(swipedRef, { matches: arrayUnion(swiperId) });
        return { isMatch: true, matchedProfile: swipedProfile.data() };
      }
    } else if (direction === 'left') {
      await updateDoc(swiperRef, { dislikes: arrayUnion(swipedId) });
    }
    return { isMatch: false };
  } catch (error) {
    console.error("Error handling swipe action:", error);
    return { isMatch: false };
  }
};

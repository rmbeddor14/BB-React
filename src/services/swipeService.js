import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function handleSwipe(swiperDisplayName, swiperId, profileDisplayName, profileId, direction) {
  try {
    await addDoc(collection(db, 'swipes'), {
      swiperDisplayName,
      swiperId,
      profileDisplayName,
      profileId,
      direction,
      timestamp: serverTimestamp()
    });
    console.log(`Swipe recorded: ${direction} on profile ${profileId}`);
  } catch (error) {
    console.error("Error adding swipe: ", error);
  }
}

// SwipeableList.js (modified)
import React, { useState } from 'react';
import SwipeableCard from './SwipeableCard';

function SwipeableList({ profiles, onSwipe }) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  const handleSwipe = (direction, id) => {
    onSwipe(direction, id); // Call the handleSwipe function in ProfileTinderList
    setCurrentProfileIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="swipeable-list">
      {profiles.slice(currentProfileIndex, currentProfileIndex + 1).map((profile) => (
        <SwipeableCard key={profile.id} profile={profile} onSwipe={handleSwipe} />
      ))}
    </div>
  );
}

export default SwipeableList;

// import React, { useState } from 'react';
// import SwipeableCard from './SwipeableCard';

// function SwipeableList({ profiles }) {
//   const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

//   const handleSwipe = (direction, id) => {
//     console.log(`Swiped ${direction} on profile ${id}`);
//     setCurrentProfileIndex((prevIndex) => prevIndex + 1);
//   };

//   return (
//     <div className="swipeable-list">
//       {profiles.slice(currentProfileIndex, currentProfileIndex + 1).map((profile) => (
//         <SwipeableCard key={profile.id} profile={profile} onSwipe={handleSwipe} />
//       ))}
//     </div>
//   );
// }

// export default SwipeableList;

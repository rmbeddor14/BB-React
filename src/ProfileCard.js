// // ProfileCard.js
// // GUI component for displaying a profile card with a name and image


// import React from 'react';
// import './ProfileCard.css';

// function ProfileCard({ profile }) {
//   return (
//     <div className="profile-card">
//       <div className="profile-card-image-wrapper">
//         {/* <img src={profile.imageURL} alt={`${profile.name}`} className="profile-card-image" /> */}
//         <img src={profile.imageURL} alt={`${profile.name}`} className="profile-card-image" loading="lazy" />

//       </div>
//       <div className="profile-card-name">{profile.name}</div>
//     </div>
//   );
// }

// export default ProfileCard;

import React, { useEffect } from 'react';
import './ProfileCard.css';

function ProfileCard({ profile }) {
  useEffect(() => {
    // Preload the image when the component mounts or the URL changes
    const img = new Image();
    img.src = profile.imageURL;
  }, [profile.imageURL]);

  return (
    <div className="profile-card">
      <div className="profile-card-image-wrapper">
        <img 
          src={profile.imageURL} 
          alt={`${profile.name}`} 
          className="profile-card-image" 
          loading="lazy" 
        />
      </div>
      <div className="profile-card-name">{profile.name}</div>
    </div>
  );
}

export default ProfileCard;

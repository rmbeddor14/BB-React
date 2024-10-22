// // ProfileList.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import ProfileCard from './ProfileCard';
// import './styles.css'; // Import the centralized CSS file
// import './ProfileList.css'; // Import the Profile List specific styles

// function ProfileList({ profiles }) {
//   return (
//     <div className="container">
//     <div className="container profile-list">
//       <Link to="/" className="backLink">← Back to Main</Link>
//       <h2>Available Surrogates</h2>
//       <div className="profile-card-container">
//         {profiles.map((profile) => (
//           <Link to={`/profile/${profile.id}`} key={profile.id} className="profile-card-link">
//             <ProfileCard profile={profile} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   </div>
//   );
// }

// export default ProfileList;
// ProfileList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import ProfileCard from './ProfileCard';
import './styles.css'; // Import the centralized CSS file
import './ProfileList.css'; // Import the Profile List specific styles

function ProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollection = collection(db, 'profiles');
      const profileSnapshot = await getDocs(profilesCollection);
      const profileList = profileSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(profile => profile.status === 'approved'); // Filter approved profiles
      setProfiles(profileList);
    };

    fetchProfiles();
  }, []);

  return (
    <div className="container">
      <div className="container profile-list">
        <Link to="/" className="backLink">← Back to Main</Link>
        <h2>Available Surrogates</h2>
        <div className="profile-card-container">
          {profiles.map((profile) => (
            <Link to={`/profile/${profile.id}`} key={profile.id} className="profile-card-link">
              <ProfileCard profile={profile} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileList;
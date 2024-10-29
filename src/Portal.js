// src/Portal.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import { useAuth } from './AuthContext';
import './Portal.css';

function Portal() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        const profilesRef = collection(db, 'profiles');
        
        // limit to one profile, this will need to be changed eventually 
        const q = query(
          profilesRef,
          where('uid', '==', currentUser.uid),
            orderBy('timestamp', 'desc'),
          limit(1)                      
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const profileData = querySnapshot.docs[0].data();
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleCreateProfile = () => {
    navigate('/create-profile');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="portal-container">
      <h1>Welcome{profile && profile.name ? `, ${profile.name}` : ''}!</h1>
      {profile ? (
        <div>
          <p>You have an existing profile. Would you like to view or edit it?</p>
          <button onClick={handleEditProfile} className="portal-button">Edit Profile</button>
        </div>
      ) : (
        <div>
          <p>You don't have a profile yet. Start by creating one now!</p>
          <button onClick={handleCreateProfile} className="portal-button">Create Profile</button>
        </div>
      )}
    </div>
  );
}

export default Portal;


// // src/Portal.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
// import { db } from './firebase-config';
// import { useAuth } from './AuthContext';
// import './Portal.css';

// function Portal() {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (currentUser) {
//         const profilesRef = collection(db, 'profiles');

//         // Query for the latest profile by uid, ordered by timestamp
//         // pull just the latest proifle 
//         const q = query(
//           profilesRef,
//           where('uid', '==', currentUser.uid),
//           orderBy('timestamp', 'desc'), // Order by most recent timestamp
//           limit(1)                      // Limit to the latest profile
//         );

//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const profileData = querySnapshot.docs[0].data();
//           setProfile(profileData);
//         } else {
//           setProfile(null);
//         }
//       }
//       setLoading(false);
//     };

//     fetchUserProfile();
//   }, [currentUser]);

//   const handleEditProfile = () => {
//     navigate('/edit-profile');
//   };

//   const handleCreateProfile = () => {
//     navigate('/create-profile');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//      <div className="portal-container">
//       <h1>Welcome{profile && profile.name ? `, ${profile.name}` : ''}!</h1>
//       {profile ? (
//         <div>
//         <p>You have an existing profile. Would you like to view or edit it?</p>
//           <button onClick={handleEditProfile} className="portal-button">Edit Profile</button>
//         </div>
//       ) : (
//         <div>
//           <p>You don't have a profile yet. Start by creating one now!</p>
//           <button onClick={handleCreateProfile} className="portal-button">Create Profile</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Portal;

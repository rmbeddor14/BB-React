// // Profile.js static
// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import './Profile.css';

// function Profile({ profiles }) {
//   const { id } = useParams();
//   const profile = profiles.find((p) => p.id === id);

//   if (!profile) {
//     return <div>Profile not found.</div>;
//   }

//   return (
//     <div className="profile-container">
//       <Link to="/view-profiles" className="backLink">← Back to Profile List</Link>
//       <div className="profile-header">
//         <img src={profile.imageURL} alt={profile.name} className="profile-image" />
//         <div className="profile-info">
//           <h2>{profile.name}</h2>
//           <p>ID: #{profile.id.substring(0, 6)}</p>
//           <p>Age: {profile.age}</p>
//           <p>Location: {profile.location}</p>
//         </div>
//       </div>

//       <div className="profile-section">
//         <div className="section-header">Family Information</div>
//         <div className="section-item">
//           <span>Number of children:</span>
//           <span>{profile.children}</span>
//         </div>
//         <div className="section-item">
//           <span>Marital Status:</span>
//           <span>{profile.maritalStatus}</span>
//         </div>
//         <div className="section-item">
//           <span>Hobbies:</span>
//           <div>
//             {profile.hobbies.map((hobby, index) => (
//               <span key={index} className="pill">{hobby}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="divider"></div>

//       <div className="profile-section">
//         <div className="section-header">Medical Background</div>
//         <div className="section-item">
//           <span>Lifestyle:</span>
//           <span>{profile.lifestyle.join(', ')}</span>
//         </div>
//       </div>

//       <div className="divider"></div>

//       <div className="profile-section">
//         <div className="section-header">Expected Surrogacy</div>
//         <div className="section-item">
//           <span>Type:</span>
//           <span>{profile.surrogacyType}</span>
//         </div>
//         <div className="section-item">
//           <span>Preferred Lifestyle:</span>
//           <div>
//             {profile.preferredLifestyle.map((lifestyle, index) => (
//               <span key={index} className="pill">{lifestyle}</span>
//             ))}
//           </div>
//         </div>
//         <div className="section-item">
//           <span>Frequency of Contact:</span>
//           <span>{profile.contactFrequency}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

// src/Profile.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from './firebase-config';
import './Profile.css';

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
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
  }, [id]);

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile.imageURL} alt={profile.name} className="profile-image" />
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p>ID: #{profile.id.substring(0, 6)}</p>
          <p>Age: {profile.age}</p>
          <p>Location: {profile.location}</p>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">Family Information</div>
        <div className="section-item">
          <span>Number of children:</span>
          <span>{profile.children}</span>
        </div>
        <div className="section-item">
          <span>Marital Status:</span>
          <span>{profile.maritalStatus}</span>
        </div>
        <div className="section-item">
          <span>Hobbies:</span>
          <div>
            {profile.hobbies.map((hobby, index) => (
              <span key={index} className="pill">{hobby}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="profile-section">
        <div className="section-header">Medical Background</div>
        <div className="section-item">
          <span>Lifestyle:</span>
          <span>{profile.lifestyle.join(', ')}</span>
        </div>
      </div>

      <div className="divider"></div>

      <div className="profile-section">
        <div className="section-header">Expected Surrogacy</div>
        <div className="section-item">
          <span>Type:</span>
          <span>{profile.surrogacyType}</span>
        </div>
        <div className="section-item">
          <span>Preferred Lifestyle:</span>
          <div>
            {profile.preferredLifestyle.map((lifestyle, index) => (
              <span key={index} className="pill">{lifestyle}</span>
            ))}
          </div>
        </div>
        <div className="section-item">
          <span>Frequency of Contact:</span>
          <span>{profile.contactFrequency}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
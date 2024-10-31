// Profile.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import '../Profile.css';

function Profile2({ profileData }) {
  const { id } = useParams();
  const [profile, setProfile] = useState(profileData || null);

  // Fetch profile data from Firestore if not provided
  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileData && id) {
        const profileRef = doc(db, 'profiles2', id); // Make sure to use the correct collection
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setProfile({ id: profileSnap.id, ...profileSnap.data() });
        } else {
          setProfile(null);
        }
      }
    };
    fetchProfile();
  }, [id, profileData]);

  if (!profile) {
    return <div>Profile not found.</div>;
  }

  return (
    <div className="profile-container">
      {/* Profile Image */}
      {profile.imageURL && (
        <img src={profile.imageURL} alt="Profile Image" className="profile-image" />
      )}
      
      {/* Render Profile Sections and Fields */}
      {profile.sections && profile.sections.sort((a, b) => a.sectionIndex - b.sectionIndex).map((section) => (
        <div key={section.sectionIndex} className="profile-section">
          <h3>{section.sectionName}</h3>
          <div className="profile-fields">
            {section.fields.sort((a, b) => a.fieldIndex - b.fieldIndex).map((field) => (
              <div key={field.name} className="profile-field">
                <p>
                  <strong>{field.label}:</strong> {field.value || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile2;

// // Profile.js

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from './firebase-config';
// import './Profile.css';

// function Profile2({ profileData }) {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(profileData || null);
//   const [sections, setSections] = useState([]);

//   // Fetch profile data from Firestore if not provided
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!profileData && id) {
//         const profileRef = doc(db, 'profiles2', id); // Make sure to use the correct collection
//         const profileSnap = await getDoc(profileRef);
//         if (profileSnap.exists()) {
//           setProfile({ id: profileSnap.id, ...profileSnap.data() });
//         } else {
//           setProfile(null);
//         }
//       }
//     };
//     fetchProfile();
//   }, [id, profileData]);

//   // Fetch form structure to render fields dynamically
//   useEffect(() => {
//     const loadFormStructure = async () => {
//       const formRef = doc(db, 'formFields', 'seekerForm', 'latest', 'latest');
//       const formSnap = await getDoc(formRef);
//       if (formSnap.exists()) {
//         setSections(formSnap.data().sections || []);
//       } else {
//         console.error('Form structure not found in Firestore.');
//       }
//     };
//     loadFormStructure();
//   }, []);

//   if (!profile) {
//     return <div>Profile not found.</div>;
//   }

//   return (
//     <div className="profile-container">
//       {/* Profile Image */}
//       {profile.imageURL && (
//         <img src={profile.imageURL} alt={profile.name} className="profile-image" />
//       )}
      
//       {/* Dynamically Render Profile Sections and Fields */}
//       {sections.sort((a, b) => a.sectionIndex - b.sectionIndex).map((section) => (
//         <div key={section.sectionName} className="profile-section">
//           <h3>{section.sectionName}</h3>
//           <div className="profile-fields">
//             {section.fields.sort((a, b) => a.fieldIndex - b.fieldIndex).map((field) => (
//               <div key={field.name} className="profile-field">
//                 <p><strong>{field.label}:</strong> {profile[field.name] || 'N/A'}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Profile2;

// // src/AdminViewProfileList.js
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
// import db from './firebase-config';
// import ProfileCardContainer from './AdminProfileCardContainer';
// import './styles.css'; // Import the centralized CSS file
// import './AdminViewProfileList.css'; // Import the AdminViewProfileList-specific CSS file

// function AdminViewProfileList() {
//   const [profiles, setProfiles] = useState([]);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       const profilesCollection = collection(db, 'profiles');
//       const profileSnapshot = await getDocs(profilesCollection);
//       const profileList = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(profile => profile.status !== 'approved' && profile.status !== 'rejected');
//       setProfiles(profileList);
//     };

//     fetchProfiles();
//   }, []);

//   const handleApprove = async (id) => {
//     const profileRef = doc(db, 'profiles', id);
//     await updateDoc(profileRef, { status: 'approved' });
//     setProfiles(profiles.map(profile => profile.id !== id));
//   };

//   const handleReject = async (id) => {
//     const profileRef = doc(db, 'profiles', id);
//     await updateDoc(profileRef, { status: 'rejected' });
//     setProfiles(profiles.filter(profile => profile.id !== id)); // Remove the rejected profile from the state
//   };

//   return (
//     <div className="admin-view-profiles">
//       <h1>Admin View Pending Profiles</h1>
//       <div className="profile-list">
//         {profiles.map(profile => (
//           <ProfileCardContainer
//             key={profile.id}
//             profile={profile}
//             onApprove={handleApprove}
//             onReject={handleReject}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminViewProfileList;
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import db from './firebase-config';
import AdminProfileCardContainer from './AdminProfileCardContainer';
import './styles.css'; // Import the centralized CSS file
import './AdminViewProfileList.css'; // Import the AdminViewProfileList-specific CSS file

function AdminViewProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('pending'); //default is pending

  useEffect(() => {
    const fetchProfiles = async () => {
      const profilesCollection = collection(db, 'profiles');
      const profileSnapshot = await getDocs(profilesCollection);
      const profileList = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(profileList);
    };

    fetchProfiles();
  }, []);

  const handleApprove = async (id) => {
    const profileRef = doc(db, 'profiles', id);
    await updateDoc(profileRef, { status: 'approved' });
    setProfiles(profiles.map(profile => profile.id !== id));
  };

  const handleReject = async (id) => {
    const profileRef = doc(db, 'profiles', id);
    await updateDoc(profileRef, { status: 'rejected' });
    setProfiles(profiles.filter(profile => profile.id !== id)); // Remove the rejected profile from the state
  };

  const filteredProfiles = profiles
    .filter(profile => filter === 'all' || profile.status === filter)
    .filter(profile => profile.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="admin-view-profiles">
      <h1>Admin View Profiles</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search profiles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => setFilter('approved')} className={filter === 'approved' ? 'active' : ''}>Approved</button>
        <button onClick={() => setFilter('rejected')} className={filter === 'rejected' ? 'active' : ''}>Rejected</button>
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
      </div>
      <div className="profile-list">
        {filteredProfiles.map(profile => (
          <AdminProfileCardContainer
            key={profile.id}
            profile={profile}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminViewProfileList;

// export default App;
import React from 'react';
import Profile from './Profile';
import MainPage from './MainPage';
import ProfileForm from './ProfileForm';
import ProfileList from './ProfileList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {

  //profiles will move to be a firestore call in dynamic version
  const profiles = [{
    name: 'Jane Doe',
    id: 'be17123f-cf6b-4620-9449-725ac7c15dc3', // wanted it to have uuid but if random generate uuid it will do it every time even on new page load? need to check later
    age: 23,
    location: 'North Carolina, USA',
    children: 2,
    maritalStatus: 'Co-Parenting',
    hobbies: ['Cooking', 'Skiing'],
    lifestyle: ['Non-Smoker', 'Active'],
    surrogacyType: 'Gestational',
    preferredLifestyle: ['Non-Smoker', 'Pescatarian'],
    contactFrequency: 'Daily',
    imageURL : 'https://i.imgur.com/RkPZNc6.jpeg'
  }, 
  {
    name: 'Rachel Beddor',
    id: '8ec3097c-c613-4763-b510-09421a549c38', //random generate uuid
    age: 28,
    location: 'San Francisco, USA',
    children: 0,
    maritalStatus: 'Single and Ready to Mingle',
    hobbies: ['Cooking', 'Hiking', 'Georgia Tech Yellow Jackets'],
    lifestyle: ['Non-Smoker', 'Active'],
    surrogacyType: 'Gestational',
    preferredLifestyle: ['Maximum Debauchery'],
    contactFrequency: 'Daily',
    imageURL : 'https://i.imgur.com/NT4Eonw.jpeg'
  }];

 return (
    <Router>
      <Routes>
        {/* Route for the main page */}
        <Route path="/" element={<MainPage />} />

        {/* Route for creating a profile */}
        <Route path="/create-profile" element={<ProfileForm onSubmit={() => {}} />} />

        {/* Route for viewing profiles */}
        <Route path="/view-profiles" element={<ProfileList profiles={profiles} />} />

        {/* Route for displaying individual profile details */}
        <Route path="/profile/:id" element={<Profile profiles={profiles} />} />
      </Routes>
    </Router>
  );
}


export default App;

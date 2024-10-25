import React, { Suspense } from 'react';
import MainPage from './MainPage';
import ProfileForm from './ProfileForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

import MainPage2 from './MainPage2';

// Lazy load components
const ProfileList = React.lazy(() => import('./ProfileList'));
const Profile = React.lazy(() => import('./Profile'));
const AdminViewProfileList = React.lazy(() => import('./AdminViewProfileList'));
const AdminViewProfile = React.lazy(() => import('./AdminViewProfile'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* route to mainpage2 for debug */}
          <Route path="/mainpage2" element={<PrivateRoute element={<MainPage2 />} />} />


          {/* Route for login */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/" element={<PrivateRoute element={<MainPage />} />} />
          <Route path="/create-profile" element={<PrivateRoute element={<ProfileForm onSubmit={() => {}} />} />} />

          {/* Lazy-loaded profile-related routes */}
          <Route
            path="/view-profiles"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<ProfileList />} />
              </Suspense>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<Profile />} />
              </Suspense>
            }
          />

          {/* Lazy-loaded admin routes */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<AdminViewProfileList />} />
              </Suspense>
            }
          />
          <Route
            path="/admin/profile/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<AdminViewProfile />} />
              </Suspense>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

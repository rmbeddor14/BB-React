import React, { Suspense } from 'react';
import MainPage from './MainPage';
import ProfileForm from './ProfileForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage';
import SurrogateProfileForm from './SurrogateProfileForm';
import SeekerProfileForm from './SeekerProfileForm';
import Portal from './Portal';
import SeekerProfileForm2 from './DynamicFormExplore/SeekerProfileForm2';

import EmailPage from './EmailPage';


// Lazy load components
const ProfileList = React.lazy(() => import('./ProfileList'));
const Profile = React.lazy(() => import('./Profile'));
const AdminViewProfileList = React.lazy(() => import('./AdminPortal/AdminViewProfileList.js'));
const AdminViewProfile = React.lazy(() => import('./AdminPortal/AdminViewProfile.js'));
const ProfileTinderList = React.lazy(() => import('./ProfileTinderList'));

{/* testing admin field manager */}

const AdminFieldManager = React.lazy(() => import('./DynamicFormExplore/AdminFieldManager'));
const DynamicForm = React.lazy(() => import('./DynamicForm'));
const Profile2 = React.lazy(() => import('./DynamicFormExplore/Profile2'));
const ProfileTinderList2 = React.lazy(() => import('./DynamicFormExplore/ProfileTinderList2'));


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Private route for EmailPage */}
          <Route path="/emailpage" element={<PrivateRoute element={<EmailPage />} />} />
          {/* <Route path="/emailpage" element={<EmailPage />} /> */}


          {/*open to public points to mainpage2 */}
          <Route path="/" element={<MainPage />} />

          {/* testing admin field manager and dynamic form */}
          <Route
            path="/admin-field-manager"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<AdminFieldManager />} />
              </Suspense>
            }
          />

          <Route
            path="/dynamic-form"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<DynamicForm />} />
              </Suspense>
            }
          />

          {/* Route for login */}
          <Route path="/login" element={<LoginPage />} />
          



          <Route path="/create-surrogate-profile" element={<PrivateRoute element={<SurrogateProfileForm onSubmit={() => {}} />} />} />

          <Route path="/create-seeker-profile" element={<PrivateRoute element={<SeekerProfileForm onSubmit={() => {}} />} />} />

          {/* dynamic form explore */}
          <Route path="/create-seeker-profile2" element={<PrivateRoute element={<SeekerProfileForm2 onSubmit={() => {}} />} />} />

          <Route
            path="profile2/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<Profile2 />} />
              </Suspense>
            }
          />

          <Route path="/swipe-profiles2" element={
            <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute element={<ProfileTinderList2 />} />
            </Suspense>
          }
          />
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
            path="/portal"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateRoute element={<Portal />} />
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

          {/* Add a route for the swipeable profile list */}
          {/* lazy load*/}
          
          <Route path="/swipe-profiles" element={
            <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute element={<ProfileTinderList />} />
            </Suspense>
          }
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

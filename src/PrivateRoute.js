// // PrivateRoute.js
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const PrivateRoute = ({ element: Component }) => {
//   const { currentUser } = useAuth();
//   const location = useLocation();

//   return currentUser ? (
//     Component
//   ) : (
//     <Navigate to="/login" state={{ from: location }} />
//   );
// };

// export default PrivateRoute;

// // src/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// function PrivateRoute({ element, ...rest }) {
//   const { currentUser, loading, userRole } = useAuth();

//   // Example logging
//   console.log("AuthContext:", { currentUser, userRole, loading });
//   console.log("PrivateRoute:", { currentUser, userRole });


//   if (loading) {
//     return <div>Loading...</div>; // Show loading indicator while auth state is loading
//   }

//   if (!currentUser || userRole !== 'admin') {
//     // Redirect to home if not authenticated or not an admin
//     return <Navigate to="/" replace />;
//   }

//   // Render the element if the user is authenticated and has the "admin" role
//   return element;
// }

// export default PrivateRoute;


// the following has 30 second timeout to deal with asynchronous RBAC issue which should probably be fixed eventually to be synchronous or an improved functionlaity 
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ element }) {
  const { currentUser, loading, userRole } = useAuth();
  const [waitedLongEnough, setWaitedLongEnough] = useState(false);

  // Log values for debugging
  console.log("PrivateRoute:", { currentUser, userRole, loading, waitedLongEnough });

  // Set a timeout for 30 seconds to stop waiting for userRole
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitedLongEnough(true);
    }, 30000); // 30 seconds

    // Clear timeout if component unmounts or userRole is set
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // If still loading, show loading indicator
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (userRole === null && !waitedLongEnough) {
    // Show loading if userRole is null and 30 seconds haven’t passed
    return <div>Loading...</div>;
  }

  if (userRole !== 'admin') {
    // Redirect to home if user is authenticated but either:
    // - 30 seconds have passed and userRole is still null (likely not in the system)
    // - or userRole is not 'admin'
    return <Navigate to="/" replace />;
  }

  // Render the element if the user is authenticated and has the "admin" role
  return element;
}

export default PrivateRoute;

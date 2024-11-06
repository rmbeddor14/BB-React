/* eslint-disable */

// the following works but has limited ability to auth because it allows local host
// we need to add integration with firebase frontend auth 
// const functions = require('firebase-functions');
// const axios = require('axios');
// const cors = require('cors');

// // CORS configuration to allow requests from localhost and a production domain
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',                 // Allow requests from local development
//     'https://bb-react-f3374.web.app/'      // Replace with your actual production domain, if needed
//   ],
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// // General-purpose proxy function with CORS for localhost
// exports.apiProxy = functions.https.onRequest((req, res) => {
//   // Apply CORS middleware with specified options
//   cors(corsOptions)(req, res, async () => {
//     const { url, method = 'POST', headers = {}, data = {} } = req.body;

//     if (!url) {
//       return res.status(400).json({ error: 'Missing target URL in request body.' });
//     }

//     try {
//       // Make the request to the target API using Axios
//       const response = await axios({
//         url,
//         method,
//         headers,
//         data,
//       });

//       // Forward the response from the target API back to the client
//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error('Error forwarding request:', error);
//       res.status(500).json({ error: 'Failed to forward request.', details: error.message });
//     }
//   });
// });


// /* eslint-disable */
// const functions = require('firebase-functions');
// const axios = require('axios');
// const admin = require('firebase-admin');
// const cors = require('cors')({ origin: true });

// admin.initializeApp();

// exports.apiProxy = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     const idToken = req.headers.authorization?.split('Bearer ')[1]; // Extract the token

//     // Verify the ID token
//     try {
//       const decodedToken = await admin.auth().verifyIdToken(idToken);
//       console.log('User ID:', decodedToken.uid);

//       // If token is valid, proceed with API request
//       const { url, method = 'POST', headers = {}, data = {} } = req.body;

//       if (!url) {
//         return res.status(400).json({ error: 'Missing target URL in request body.' });
//       }

//       const response = await axios({
//         url,
//         method,
//         headers,
//         data,
//       });

//       res.status(response.status).json(response.data);
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       return res.status(403).json({ error: 'Unauthorized: Invalid token' });
//     }
//   });
// });

// api proxy with added error logging
/* eslint-disable */
const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.apiProxy = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Extract the token

    try {
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('User ID:', decodedToken.uid);

      // Extract request parameters
      const { url, method = 'POST', headers = {}, data = {} } = req.body;

      // Check if URL is provided
      if (!url) {
        console.error('Missing target URL in request body.');
        return res.status(400).json({ error: 'Missing target URL in request body.' });
      }

      try {
        // Make the API request to Postmark
        const response = await axios({
          url,
          method,
          headers,
          data,
        });

        console.log('API Response:', response.data); // Log API response data
        res.status(response.status).json(response.data);

      } catch (apiError) {
        // Log detailed error information from the API request
        if (apiError.response) {
          console.error('API Request Error:', {
            status: apiError.response.status,
            statusText: apiError.response.statusText,
            headers: apiError.response.headers,
            data: apiError.response.data,
          });
          res.status(apiError.response.status).json({
            error: apiError.response.data,
            statusText: apiError.response.statusText,
            statusCode: apiError.response.status,
          });
        } else {
          console.error('Unexpected Error Making API Request:', apiError.message);
          res.status(500).json({ error: 'Unexpected error making API request.' });
        }
      }
    } catch (authError) {
      // Log the authentication error if token verification fails
      console.error('Authentication Error:', authError.message);
      res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
  });
});
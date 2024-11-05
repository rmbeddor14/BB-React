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


/* eslint-disable */
const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.apiProxy = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // Extract the token

    // Verify the ID token
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('User ID:', decodedToken.uid);

      // If token is valid, proceed with API request
      const { url, method = 'POST', headers = {}, data = {} } = req.body;

      if (!url) {
        return res.status(400).json({ error: 'Missing target URL in request body.' });
      }

      const response = await axios({
        url,
        method,
        headers,
        data,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
  });
});

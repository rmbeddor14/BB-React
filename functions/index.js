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

// // api proxy with added error logging
// /* eslint-disable */
// const functions = require('firebase-functions');
// const axios = require('axios');
// const admin = require('firebase-admin');
// const cors = require('cors')({ origin: true });

// admin.initializeApp();

// exports.apiProxy = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     const idToken = req.headers.authorization?.split('Bearer ')[1]; // Extract the token

//     try {
//       // Verify the ID token
//       const decodedToken = await admin.auth().verifyIdToken(idToken);
//       console.log('User ID:', decodedToken.uid);

//       // Extract request parameters
//       const { url, method = 'POST', headers = {}, data = {} } = req.body;

//       // Check if URL is provided
//       if (!url) {
//         console.error('Missing target URL in request body.');
//         return res.status(400).json({ error: 'Missing target URL in request body.' });
//       }

//       try {
//         // Make the API request to Postmark
//         const response = await axios({
//           url,
//           method,
//           headers,
//           data,
//         });

//         console.log('API Response:', response.data); // Log API response data
//         res.status(response.status).json(response.data);

//       } catch (apiError) {
//         // Log detailed error information from the API request
//         if (apiError.response) {
//           console.error('API Request Error:', {
//             status: apiError.response.status,
//             statusText: apiError.response.statusText,
//             headers: apiError.response.headers,
//             data: apiError.response.data,
//           });
//           res.status(apiError.response.status).json({
//             error: apiError.response.data,
//             statusText: apiError.response.statusText,
//             statusCode: apiError.response.status,
//           });
//         } else {
//           console.error('Unexpected Error Making API Request:', apiError.message);
//           res.status(500).json({ error: 'Unexpected error making API request.' });
//         }
//       }
//     } catch (authError) {
//       // Log the authentication error if token verification fails
//       console.error('Authentication Error:', authError.message);
//       res.status(403).json({ error: 'Unauthorized: Invalid token' });
//     }
//   });
// });

// api proxy with added error logging
/* eslint-disable */
const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const { Logging } = require('@google-cloud/logging');

admin.initializeApp();

const logging = new Logging();
const log = logging.log('apiProxy'); // Create a custom log name

exports.apiProxy = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    const metadata = { resource: { type: 'cloud_function', labels: { function_name: 'apiProxy' } } };

    // Log the received token
    log.write(log.entry(metadata, { severity: 'INFO', message: 'Received request with ID Token', idToken }));

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      log.write(log.entry(metadata, { severity: 'INFO', message: 'User authenticated', userId: decodedToken.uid }));

      const { url, method = 'POST', headers = {}, data = {} } = req.body;
      log.write(log.entry(metadata, { severity: 'INFO', message: 'Request parameters extracted', url, method, headers, data }));

      if (!url) {
        log.write(log.entry(metadata, { severity: 'ERROR', message: 'Missing target URL in request body' }));
        return res.status(400).json({ error: 'Missing target URL in request body.' });
      }

      try {
        const response = await axios({ url, method, headers, data });
        log.write(log.entry(metadata, { severity: 'INFO', message: 'API request successful', response: response.data }));
        res.status(response.status).json(response.data);

      } catch (apiError) {
        if (apiError.response) {
          log.write(log.entry(metadata, {
            severity: 'ERROR',
            message: 'API Request Error',
            errorDetails: {
              status: apiError.response.status,
              statusText: apiError.response.statusText,
              headers: apiError.response.headers,
              data: apiError.response.data,
            }
          }));
          res.status(apiError.response.status).json({
            error: apiError.response.data,
            statusText: apiError.response.statusText,
            statusCode: apiError.response.status,
          });
        } else {
          log.write(log.entry(metadata, { severity: 'ERROR', message: 'Unexpected Error Making API Request', error: apiError.message }));
          res.status(500).json({ error: 'Unexpected error making API request.' });
        }
      }
    } catch (authError) {
      log.write(log.entry(metadata, { severity: 'ERROR', message: 'Authentication Error', error: authError.message }));
      res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
  });
});

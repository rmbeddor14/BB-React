// the following works but is limited in auth 

// // src/EmailPage.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function EmailPage() {
//   const [statusMessage, setStatusMessage] = useState('');

//   const sendEmailViaProxy = async () => {
//     try {
//       // Make a POST request to the Firebase proxy function with necessary parameters
//       const response = await axios.post(
//         'https://apiproxy-wlj3ioo7vq-uc.a.run.app',
//         {
//           url: 'https://api.sendgrid.com/v3/mail/send', // Target API endpoint
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`, // Access the updated environment variable
//             'Content-Type': 'application/json',
//           },
//           data: {
//             personalizations: [
//               {
//                 to: [{ email: 'rmbeddor@gmail.com' }],
//                 subject: 'Test Email from API Proxy on FIREBASE with the BROWSER local',
//               },
//             ],
//             from: { email: 'rmbeddor@gmail.com' },
//             content: [{ type: 'text/plain', value: 'This is a test email body.' }],
//           },
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       // Update status message based on response
//       if (response.status === 202) {
//         setStatusMessage('Email sent successfully!');
//       } else {
//         setStatusMessage('Failed to send email.');
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       setStatusMessage('Error sending email.');
//     }
//   };

//   return (
//     <div>
//       <h1>Send Email</h1>
//       <button onClick={sendEmailViaProxy}>Send Test Email</button>
//       {statusMessage && <p>{statusMessage}</p>}
//     </div>
//   );
// }

// export default EmailPage;


// the following passes auth info from frontend to backend

import React, { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

function EmailPage() {
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmailViaProxy = async () => {
    try {
      // Get the ID token for the currently logged-in user
      const auth = getAuth();
      const idToken = await auth.currentUser.getIdToken();

      // Make a POST request to the Firebase proxy function with the ID token
      const response = await axios.post(
        'https://apiproxy-wlj3ioo7vq-uc.a.run.app',
        {
          url: 'https://api.sendgrid.com/v3/mail/send',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          data: {
            personalizations: [
              {
                to: [{ email: 'rmbeddor@gmail.com' }],
                subject: 'Test Email from API Proxy on FIREBASE with Auth',
              },
            ],
            from: { email: 'rmbeddor@gmail.com' },
            content: [{ type: 'text/plain', value: 'This is a test email body.' }],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Pass the user's ID token here
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 202) {
        setStatusMessage('Email sent successfully!');
      } else {
        setStatusMessage('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatusMessage('Error sending email.');
    }
  };

  return (
    <div>
      <h1>Send Email</h1>
      <button onClick={sendEmailViaProxy}>Send Test Email</button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default EmailPage;

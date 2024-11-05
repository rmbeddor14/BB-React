// // the following uses the sendgrid api but passes auth from frontend to firebase fxn
// import React, { useState } from 'react';
// import axios from 'axios';
// import { getAuth } from 'firebase/auth';

// function EmailPage() {
//   const [statusMessage, setStatusMessage] = useState('');

//   const sendEmailViaProxy = async () => {
//     try {
//       // Get the ID token for the currently logged-in user
//       const auth = getAuth();
//       const idToken = await auth.currentUser.getIdToken();

//       // Make a POST request to the Firebase proxy function with the ID token
//       const response = await axios.post(
//         'https://apiproxy-wlj3ioo7vq-uc.a.run.app',
//         {
//           url: 'https://api.sendgrid.com/v3/mail/send',
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`,
//             'Content-Type': 'application/json',
//           },
//           data: {
//             personalizations: [
//               {
//                 to: [{ email: 'rmbeddor@gmail.com' }],
//                 subject: 'Test Email from API Proxy on FIREBASE with Auth',
//               },
//             ],
//             from: { email: 'rmbeddor@gmail.com' },
//             content: [{ type: 'text/plain', value: 'This is a test email body.' }],
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${idToken}`, // Pass the user's ID token here
//             'Content-Type': 'application/json',
//           },
//         }
//       );

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


// // src/EmailPage.js
// // postmark
// import React, { useState } from 'react';
// import axios from 'axios';
// import { getAuth } from 'firebase/auth';

// function EmailPage() {
//   const [statusMessage, setStatusMessage] = useState('');

//   const sendEmailViaProxy = async () => {
//     try {
//       // Get the ID token for the currently logged-in user
//       const auth = getAuth();
//       const idToken = await auth.currentUser.getIdToken();

//       // Make a POST request to the Firebase proxy function with the ID token
//       const response = await axios.post(
//         'https://apiproxy-wlj3ioo7vq-uc.a.run.app',
//         {
//           url: 'https://api.postmarkapp.com/email', // Postmark API endpoint
//           method: 'POST',
//           headers: {
//             'X-Postmark-Server-Token': `${process.env.REACT_APP_POSTMARK_API_KEY}`, // Use Postmark API key here
//             'Content-Type': 'application/json',
//           },
//           data: {
//             From: 'rbeddor3@gatech.edu', // Sender's email address
//             To: 'rbeddor3@gatech.edu', // Recipient's email address
//             Subject: 'Test Email from Postmark via Firebase Proxy',
//             TextBody: 'This is a test email body.' // Email content
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${idToken}`, // Pass the user's ID token here
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
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

// // add custom api 
// // EmailPage.js
// import React, { useState } from 'react';
// import EmailForm from './EmailForm';
// import EmailCard from './EmailCard';
// import './EmailPage.css';

// const templates = [
//   {
//     id: 1,
//     name: "Elephant",
//     apiConfig: {
//       url: "https://api.postmarkapp.com/email/withTemplate",
//       method: "POST",
//       headers: {
//         "X-Postmark-Server-Token": process.env.REACT_APP_POSTMARK_API_KEY,
//         "Content-Type": "application/json",
//       },
//       data: {
//         TemplateAlias: "code-your-own-1",
//       },
//       fields: [
//         { name: "From", label: "Sender", type: "email" },
//         { name: "To", label: "Recipient", type: "email" },
//         { name: "TemplateModel.customMessage", label: "Custom Message", type: "textarea" }
//       ]
//     }
//   },
//   {
//     id: 2,
//     name: "Generic Email",
//     apiConfig: {
//       url: "https://api.postmarkapp.com/email",
//       method: "POST",
//       headers: {
//         "X-Postmark-Server-Token": process.env.REACT_APP_POSTMARK_API_KEY,
//         "Content-Type": "application/json",
//       },
//       fields: [
//         { name: "From", label: "Sender", type: "email" },
//         { name: "To", label: "Recipient", type: "email" },
//         { name: "Subject", label: "Subject", type: "text" },
//         { name: "TextBody", label: "Body", type: "textarea" }
//       ]
//     }
//   }
// ];

// const EmailPage = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const handleTemplateSelect = (template) => {
//     if (selectedTemplate && selectedTemplate.id === template.id) {
//       setSelectedTemplate(null);
//     } else {
//       setSelectedTemplate(template);
//     }
//   };

//   const handleEmailSent = () => {
//     setSelectedTemplate(null);
//   };

//   return (
//     <div className="email-page">
//       <h1>Email Templates</h1>
//       <div className="template-grid">
//         {templates.map((template) => (
//           <EmailCard key={template.id} template={template} onSelect={handleTemplateSelect} />
//         ))}
//       </div>
//       {selectedTemplate && (
//         <EmailForm
//           selectedTemplate={selectedTemplate}
//           onEmailSent={handleEmailSent}
//         />
//       )}
//     </div>
//   );
// };

// export default EmailPage;


// EmailPage.js
import React, { useState } from 'react';
import EmailForm from './EmailForm';
import EmailCard from './EmailCard';
import './EmailPage.css';

const templates = [
  {
    id: 1,
    name: "Elephant",
    image: "/img/nuts.png",  // Path to the image for "Elephant" template
    apiConfig: {
      url: "https://api.postmarkapp.com/email/withTemplate",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        TemplateAlias: "code-your-own-1",
      },
      fields: [
        { name: "From", label: "Sender", type: "email" },
        { name: "To", label: "Recipient", type: "email" },
        { name: "TemplateModel.customMessage", label: "Custom Message", type: "textarea" }
      ]
    }
  },
  {
    id: 2,
    name: "Basic Template",
    image: "/img/basic.png",  // Example path for another template image
    apiConfig: {
      url: "https://api.postmarkapp.com/email",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      fields: [
        { name: "From", label: "Sender", type: "email" },
        { name: "To", label: "Recipient", type: "email" },
        { name: "Subject", label: "Subject", type: "text" },
        { name: "TextBody", label: "Body", type: "textarea" }
      ]
    }
  }
];

const EmailPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    if (selectedTemplate && selectedTemplate.id === template.id) {
      setSelectedTemplate(null);
    } else {
      setSelectedTemplate(template);
    }
  };

  const handleEmailSent = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="email-page">
      <h1>Email Templates</h1>
      <div className="template-grid">
        {templates.map((template) => (
          <EmailCard key={template.id} template={template} onSelect={handleTemplateSelect} />
        ))}
      </div>
      {selectedTemplate && (
        <EmailForm
          selectedTemplate={selectedTemplate}
          onEmailSent={handleEmailSent}
        />
      )}
    </div>
  );
};

export default EmailPage;

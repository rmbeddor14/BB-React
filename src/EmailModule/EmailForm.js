// // EmailForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { getAuth } from 'firebase/auth';

// const EmailForm = ({ onSubmit }) => {
//   const [recipient, setRecipient] = useState("");
//   const [sender, setSender] = useState("");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");
//   const [statusMessage, setStatusMessage] = useState("");

//   const sendEmail = async (e) => {
//     e.preventDefault();
//     try {
//       const auth = getAuth();
//       const idToken = await auth.currentUser.getIdToken();

//       const response = await axios.post(
//         'https://apiproxy-wlj3ioo7vq-uc.a.run.app',
//         {
//           url: 'https://api.postmarkapp.com/email',
//           method: 'POST',
//           headers: {
//             'X-Postmark-Server-Token': process.env.REACT_APP_POSTMARK_API_KEY,
//             'Content-Type': 'application/json',
//           },
//           data: {
//             From: sender,
//             To: recipient,
//             Subject: subject,
//             TextBody: body,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${idToken}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) {
//         setStatusMessage("Email sent successfully!");
//       } else {
//         setStatusMessage("Failed to send email.");
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       setStatusMessage("Error sending email.");
//     }
//   };

//   return (
//     <form onSubmit={sendEmail}>
//       <h2>Send Email</h2>
//       <div>
//         <label>Recipient:</label>
//         <input type="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
//       </div>
//       <div>
//         <label>Sender:</label>
//         <input type="email" value={sender} onChange={(e) => setSender(e.target.value)} required />
//       </div>
//       <div>
//         <label>Subject:</label>
//         <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
//       </div>
//       <div>
//         <label>Body:</label>
//         <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
//       </div>
//       <button type="submit">Send Email</button>
//       {statusMessage && <p>{statusMessage}</p>}
//     </form>
//   );
// };

// export default EmailForm;
// EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const EmailForm = ({ selectedTemplate, onEmailSent }) => {
  const [formData, setFormData] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const idToken = await auth.currentUser.getIdToken();

      const { url, method, headers, data, fields } = selectedTemplate.apiConfig;

      // Construct the payload dynamically based on form data
      const payload = { ...data };
      fields.forEach((field) => {
        const keys = field.name.split(".");
        let ref = payload;
        while (keys.length > 1) {
          const key = keys.shift();
          ref[key] = ref[key] || {};
          ref = ref[key];
        }
        ref[keys[0]] = formData[field.name];
      });

      // Call Firebase proxy function
      const response = await axios.post(
        'https://apiproxy-wlj3ioo7vq-uc.a.run.app',
        {
          url,
          method,
          headers,
          data: payload,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 202) {
        setStatusMessage("Email sent successfully!");
        onEmailSent();
      } else {
        setStatusMessage("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatusMessage("Error sending email.");
    }
  };

  return (
    <form onSubmit={sendEmail} className="email-form">
      <h2>Send "{selectedTemplate.name}"</h2>
      {selectedTemplate.apiConfig.fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}:</label>
          {field.type === "textarea" ? (
            <textarea
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(e, field)}
              required
            />
          ) : (
            <input
              type={field.type}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(e, field)}
              required
            />
          )}
        </div>
      ))}
      <button type="submit">Send Email</button>
      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

export default EmailForm;

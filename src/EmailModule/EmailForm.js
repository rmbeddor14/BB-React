// EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const EmailForm = ({ onSubmit }) => {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const idToken = await auth.currentUser.getIdToken();

      const response = await axios.post(
        'https://apiproxy-wlj3ioo7vq-uc.a.run.app',
        {
          url: 'https://api.postmarkapp.com/email',
          method: 'POST',
          headers: {
            'X-Postmark-Server-Token': process.env.REACT_APP_POSTMARK_API_KEY,
            'Content-Type': 'application/json',
          },
          data: {
            From: sender,
            To: recipient,
            Subject: subject,
            TextBody: body,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setStatusMessage("Email sent successfully!");
      } else {
        setStatusMessage("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatusMessage("Error sending email.");
    }
  };

  return (
    <form onSubmit={sendEmail}>
      <h2>Send Email</h2>
      <div>
        <label>Recipient:</label>
        <input type="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
      </div>
      <div>
        <label>Sender:</label>
        <input type="email" value={sender} onChange={(e) => setSender(e.target.value)} required />
      </div>
      <div>
        <label>Subject:</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>
      <div>
        <label>Body:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
      </div>
      <button type="submit">Send Email</button>
      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

export default EmailForm;

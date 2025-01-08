// //EmailPage.js

// import React, { useState } from 'react';
// import EmailForm from './EmailForm';
// import EmailCard from './EmailCard';
// import './EmailPage.css';

// const templates = [
//   {
//     id: 1,
//     name: "Elephant",
//     image: "/img/nuts.png",
//     apiConfig: {
//       url: "https://api.postmarkapp.com/email/withTemplate",
//       method: "POST",
//       headers: {
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
//     name: "Basic Template",
//     image: "/img/basic.png",
//     apiConfig: {
//       url: "https://api.postmarkapp.com/email",
//       method: "POST",
//       headers: {
//         "X-Postmark-Server-Token": process.env.REACT_APP_POSTMARK_API_KEY, // API key for this template as well
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
//     setSelectedTemplate(selectedTemplate?.id === template.id ? null : template);
//   };

//   const handleEmailSent = () => {
//     setSelectedTemplate(null);
//   };

//   return (
//     <div className="email-page">
//       <h1>Email Templates</h1>
//       <div className="template-grid">
//         {templates.map((template) => (
//           <div key={template.id} className="template-card-wrapper">
//             <EmailCard template={template} onSelect={() => handleTemplateSelect(template)} />
//             {/* Conditionally render the form below the selected template card */}
//             {selectedTemplate?.id === template.id && (
//               <div className="pop-out-form">
//                 <EmailForm
//                   selectedTemplate={selectedTemplate}
//                   onEmailSent={handleEmailSent}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
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
    image: "/img/nuts.png",
    apiConfig: {
      url: "https://api.postmarkapp.com/email/withTemplate",
      method: "POST",
      headers: {
        "X-Postmark-Server-Token": process.env.REACT_APP_POSTMARK_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: {
        TemplateAlias: "code-your-own-1"
      },
      fields: [
        { name: "From", label: "Sender", type: "email" },
        { name: "To", label: "Recipient", type: "email" },
        { name: "TemplateModel.subject_baby", label: "Subject", type: "text" }
      ]
    }
  },
  {
    id: 2,
    name: "Basic Template",
    image: "/img/basic.png",
    apiConfig: {
      url: "https://api.postmarkapp.com/email",
      method: "POST",
      headers: {
        "X-Postmark-Server-Token": process.env.REACT_APP_POSTMARK_API_KEY,
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
  const [statusMessage, setStatusMessage] = useState("");

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(selectedTemplate?.id === template.id ? null : template);
    setStatusMessage(""); // Reset status message when changing template
  };

  const handleEmailSent = (message) => {
    setSelectedTemplate(null);
    setStatusMessage(message); // Set the success message
  };

  return (
    <div className="email-page">
      <h1>Email Templates</h1>
      <div className="template-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card-wrapper">
            <EmailCard template={template} onSelect={() => handleTemplateSelect(template)} />
            {selectedTemplate?.id === template.id && (
              <div className="pop-out-form">
                <EmailForm
                  selectedTemplate={selectedTemplate}
                  onEmailSent={() => handleEmailSent("Message sent successfully!")}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default EmailPage;

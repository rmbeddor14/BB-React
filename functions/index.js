// // /**
// //  * Import function triggers from their respective submodules:
// //  *
// //  * const {onCall} = require("firebase-functions/v2/https");
// //  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
// //  *
// //  * See a full list of supported triggers at https://firebase.google.com/docs/functions
// //  */

// // const {onRequest} = require("firebase-functions/v2/https");
// // const logger = require("firebase-functions/logger");

// // // Create and deploy your first functions
// // // https://firebase.google.com/docs/functions/get-started

// // // exports.helloWorld = onRequest((request, response) => {
// // //   logger.info("Hello logs!", {structuredData: true});
// // //   response.send("Hello from Firebase!");
// // // });


// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const { onCall } = require("firebase-functions/v2/https");
//  */

/* eslint-disable */

// const {onCall} = require("firebase-functions/v2/https");
// const {initializeApp} = require("firebase-admin/app");
// const logger = require("firebase-functions/logger");
// const sgMail = require("@sendgrid/mail");

// initializeApp();
// sgMail.setApiKey("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"); // Replace with your actual SendGrid API key

// // // Define the sendEmail function
// // exports.sendEmail = onCall(async (data, context) => {
// //   const { sender, recipient, subject, body } = data;

// //   const msg = {
// //     to: recipient,
// //     from: sender, // Use a verified sender email in SendGrid
// //     subject: subject || "Invitation",
// //     text: body,
// //     html: `<p>${body}</p>`,
// //   };

// //   try {
// //     await sgMail.send(msg);
// //     logger.info("Email sent successfully", { recipient });
// //     return { success: true, message: "Email sent successfully!" };
// //   } catch (error) {
// //     logger.error("Error sending email", { error: error.message });
// //     return { success: false, message: "Failed to send email." };
// //   }
// // });
// // try with personalizations

// exports.sendEmail = onCall(async (data, context) => {
//   const { sender, recipient, subject, body } = data;

//   const msg = {
//     personalizations: [
//       {
//         to: [{ email: recipient }],
//       }
//     ],
//     from: sender , // 
//     subject: subject || "Invitation",
//     content: [
//       {
//         type: "text/plain",
//         value: body,
//       },
//       {
//         type: "text/html",
//         value: `<p>${body}</p>`,
//       },
//     ],
//   };

//   console.log("SendGrid message object:", msg);

//   try {
//     await sgMail.send(msg);
//     logger.info("Email sent successfully", { recipient });
//     return { success: true, message: "Email sent successfully!" };
//   } catch (error) {
//     logger.error("Error sending email", { error: error.message });
//     return { success: false, message: "Failed to send email." };
//   }
// });


const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const logger = require("firebase-functions/logger");
const sgMail = require("@sendgrid/mail");

initializeApp();
sgMail.setApiKey("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"); // Replace with your actual SendGrid API key

// exports.sendEmail = onCall(async (data, context) => {
//   // Log the full data object to confirm it includes expected fields
//   logger.info("Received data object:", data);

//   const { sender, recipient, subject, body } = data;

//   // Log each field individually to ensure they are correctly parsed
//   logger.info("Parsed sender:", sender);
//   logger.info("Parsed recipient:", recipient);
//   logger.info("Parsed subject:", subject);
//   logger.info("Parsed body:", body);

//   // Use a hardcoded test message for additional debugging (uncomment to test)
//   // const msg = {
//   //   personalizations: [
//   //     {
//   //       to: [{ email: "test-recipient@example.com" }],
//   //     }
//   //   ],
//   //   from: "your-verified-email@example.com",  // Use a verified email
//   //   subject: "Test Email",
//   //   content: [
//   //     {
//   //       type: "text/plain",
//   //       value: "This is a test email body.",
//   //     },
//   //     {
//   //       type: "text/html",
//   //       value: "<p>This is a test email body.</p>",
//   //     },
//   //   ],
//   // };

//   // Use the actual message data from the frontend
//   const msg = {
//     personalizations: [
//       {
//         to: [{ email: recipient }],
//       }
//     ],
//     from: sender,  // Make sure `sender` is a string, not an object
//     subject: subject || "Invitation",
//     content: [
//       {
//         type: "text/plain",
//         value: body,
//       },
//       {
//         type: "text/html",
//         value: `<p>${body}</p>`,
//       },
//     ],
//   };

//   logger.info("SendGrid message object:", msg);

//   try {
//     await sgMail.send(msg);
//     logger.info("Email sent successfully", { recipient });
//     return { success: true, message: "Email sent successfully!" };
//   } catch (error) {
//     logger.error("Error sending email:", { error: error.message });
//     return { success: false, message: "Failed to send email." };
//   }
// });
exports.sendEmail = onCall(async (data, context) => {
  // Log the full data object to confirm structure
  logger.info("Received data object:", JSON.stringify(data));

  // Adjust parsing to access nested `data` properties
  const sender = data.data?.sender;
  const recipient = data.data?.recipient;
  const subject = data.data?.subject;
  const body = data.data?.body;

  // Log each parsed field to confirm successful extraction
  logger.info("Parsed sender:", sender);
  logger.info("Parsed recipient:", recipient);
  logger.info("Parsed subject:", subject);
  logger.info("Parsed body:", body);

  const msg = {
    personalizations: [
      {
        to: [{ email: recipient }],
      }
    ],
    from: { email: sender },
    subject: subject || "Invitation",
    content: [
      {
        type: "text/plain",
        value: body || "No body text provided.",
      },
      {
        type: "text/html",
        value: `<p>${body || "No body text provided."}</p>`,
      },
    ],
  };

  logger.info("Constructed SendGrid message object:", msg);

  try {
    await sgMail.send(msg);
    logger.info("Email sent successfully", { recipient });
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    logger.error("Error sending email:", { error: error.message });
    return { success: false, message: "Failed to send email." };
  }
});

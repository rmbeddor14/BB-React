// src/DynamicForm.js

import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';

// Manually set to seekerForm for now
function DynamicForm({ formId = 'seekerForm' }) {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFields = async () => {
      // Fetch the latest version of the form fields
      const latestDocRef = doc(db, 'formFields', formId, 'latest', 'latest');
      const latestDocSnap = await getDoc(latestDocRef);

      if (latestDocSnap.exists()) {
        const data = latestDocSnap.data();
        if (data && data.sections && Array.isArray(data.sections)) {
          setSections(data.sections);
        } else {
          console.log('No sections found or data is not properly structured.');
          setSections([]);
        }
      } else {
        console.log('No sections found for this form.');
        setSections([]);
      }
    };

    fetchFields();
  }, [formId]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: '', // Clear error for this field
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    sections.forEach((section) => {
      if (section.fields && Array.isArray(section.fields)) {
        section.fields.forEach((field) => {
          if (field.required && !formData[field.name]) {
            newErrors[field.name] = `${field.label} is required`;
          }
        });
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Form validation failed.');
      return;
    }

    console.log('Submitted Data: ', formData);
    // You can proceed to save the formData to your database here.
  };

  return (
    <form onSubmit={handleSubmit}>
      {sections && sections.length > 0 ? (
        sections
          .slice()
          .sort((a, b) => a.sectionIndex - b.sectionIndex)
          .map((section) => (
            <div key={section.sectionName}>
              <h3>{section.sectionName}</h3>
              {section.fields && section.fields.length > 0 ? (
                section.fields
                  .slice()
                  .sort((a, b) => a.fieldIndex - b.fieldIndex)
                  .map((field) => (
                    <div key={field.name} style={{ marginBottom: '1rem' }}>
                      <label>{field.label}</label>
                      {field.type === 'text' && (
                        <input
                          type="text"
                          name={field.name}
                          placeholder={field.placeholder || ''}
                          required={field.required}
                          onChange={handleChange}
                        />
                      )}
                      {field.type === 'number' && (
                        <input
                          type="number"
                          name={field.name}
                          placeholder={field.placeholder || ''}
                          required={field.required}
                          onChange={handleChange}
                        />
                      )}
                      {field.type === 'dropdown' && (
                        <select
                          name={field.name}
                          required={field.required}
                          onChange={handleChange}
                        >
                          <option value="">
                            {field.placeholder || `Select ${field.label}`}
                          </option>
                          {field.options &&
                            field.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                        </select>
                      )}
                      {errors[field.name] && (
                        <p style={{ color: 'red', fontSize: '0.8rem' }}>
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  ))
              ) : (
                <p>No fields in this section.</p>
              )}
            </div>
          ))
      ) : (
        <p>No sections available.</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;

// //src/DynamicForm.js

// import React, { useEffect, useState } from 'react';
// import { db } from './firebase-config';
// import { doc, getDoc } from 'firebase/firestore';

// // Manually set to seekerForm for now
// function DynamicForm({ formId = 'seekerForm' }) {
//   const [fields, setFields] = useState([]);
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const fetchFields = async () => {
//       // Fetch the latest version of the form fields
//       const latestDocRef = doc(db, 'formFields', formId, 'latest', 'latest');
//       const latestDocSnap = await getDoc(latestDocRef);

//       if (latestDocSnap.exists()) {
//         setFields(latestDocSnap.data().fields);
//       } else {
//         console.log("No fields found for this form.");
//       }
//     };

//     fetchFields();
//   }, [formId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' }); // Clear error for this field
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     fields.forEach((field) => {
//       if (field.required && !formData[field.name]) {
//         newErrors[field.name] = `${field.label} is required`;
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       console.log("Form validation failed.");
//       return;
//     }

//     console.log("Submitted Data: ", formData);
//   };

//   // Group fields by section
//   const groupedFields = fields.reduce((acc, field) => {
//     const section = field.section || 'default'; // Use 'default' if no section is defined
//     if (!acc[section]) {
//       acc[section] = [];
//     }
//     acc[section].push(field);
//     return acc;
//   }, {});

//   return (
//     <form onSubmit={handleSubmit}>
//       {Object.entries(groupedFields).map(([section, sectionFields]) => (
//         <div key={section}>
//           <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3> {/* Capitalize section name */}
//           {sectionFields.map((field) => (
//             <div key={field.name} style={{ marginBottom: '1rem' }}>
//               <label>{field.label}</label>
//               {field.type === 'text' && (
//                 <input
//                   type="text"
//                   name={field.name}
//                   placeholder={field.placeholder || ''}
//                   required={field.required}
//                   onChange={handleChange}
//                 />
//               )}
//               {field.type === 'number' && (
//                 <input
//                   type="number"
//                   name={field.name}
//                   placeholder={field.placeholder || ''}
//                   required={field.required}
//                   onChange={handleChange}
//                 />
//               )}
//               {field.type === 'dropdown' && (
//                 <select
//                   name={field.name}
//                   required={field.required}
//                   onChange={handleChange}
//                 >
//                   <option value="">{field.placeholder || `Select ${field.label}`}</option>
//                   {field.options.map((option) => (
//                     <option key={option} value={option}>{option}</option>
//                   ))}
//                 </select>
//               )}
//               {errors[field.name] && (
//                 <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors[field.name]}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default DynamicForm;

// // import React, { useEffect, useState } from 'react';
// // import { db } from './firebase-config';
// // import { doc, getDoc } from 'firebase/firestore';

// // // manually set to seekerForm for now 
// // function DynamicForm({ formId = 'seekerForm' }) {
// //   const [fields, setFields] = useState([]);
// //   const [formData, setFormData] = useState({});
// //   const [errors, setErrors] = useState({});

// //   useEffect(() => {
// //     const fetchFields = async () => {
// //       // Fetch the latest version of the form fields
// //       const latestDocRef = doc(db, 'formFields', formId, 'latest', 'latest');
// //       const latestDocSnap = await getDoc(latestDocRef);

// //       if (latestDocSnap.exists()) {
// //         setFields(latestDocSnap.data().fields);
// //       } else {
// //         console.log("No fields found for this form.");
// //       }
// //     };

// //     fetchFields();
// //   }, [formId]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setErrors({ ...errors, [e.target.name]: '' }); // Clear error for this field
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     fields.forEach((field) => {
// //       if (field.required && !formData[field.name]) {
// //         newErrors[field.name] = `${field.label} is required`;
// //       }
// //     });
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!validateForm()) {
// //       console.log("Form validation failed.");
// //       return;
// //     }

// //     console.log("Submitted Data: ", formData);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       {fields.map((field) => (
// //         <div key={field.name} style={{ marginBottom: '1rem' }}>
// //           <label>{field.label}</label>
// //           {field.type === 'text' && (
// //             <input
// //               type="text"
// //               name={field.name}
// //               placeholder={field.placeholder || ''}
// //               required={field.required}
// //               onChange={handleChange}
// //             />
// //           )}
// //           {field.type === 'number' && (
// //             <input
// //               type="number"
// //               name={field.name}
// //               placeholder={field.placeholder || ''}
// //               required={field.required}
// //               onChange={handleChange}
// //             />
// //           )}
// //           {field.type === 'dropdown' && (
// //             <select
// //               name={field.name}
// //               required={field.required}
// //               onChange={handleChange}
// //             >
// //               <option value="">{field.placeholder || `Select ${field.label}`}</option>
// //               {field.options.map((option) => (
// //                 <option key={option} value={option}>{option}</option>
// //               ))}
// //             </select>
// //           )}
// //           {errors[field.name] && (
// //             <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors[field.name]}</p>
// //           )}
// //         </div>
// //       ))}
// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // }

// // export default DynamicForm;

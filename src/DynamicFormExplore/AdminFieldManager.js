// src/AdminFieldManager.js

import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

// Helper function to convert a label to camelCase
function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .toLowerCase()
    .replace(/ (.)/g, (match, chr) => chr.toUpperCase()); // Convert spaces to camelCase
}

function AdminFieldManager() {
  const { currentUser } = useAuth();
  const [sections, setSections] = useState([]);
  const [formId] = useState('seekerForm');
  const [newSectionName, setNewSectionName] = useState('');
  const [collapsedByDefault, setCollapsedByDefault] = useState(false);
  const [newField, setNewField] = useState({
    sectionName: '',
    name: '',
    label: '',
    type: 'text',
    required: false,
    options: [],
    placeholder: '',
    fieldIndex: 0, // New property for ordering within section
  });
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    const loadFields = async () => {
      const docRef = doc(db, 'formFields', formId, 'latest', 'latest');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const loadedSections = docSnap.data().sections;
        setSections(loadedSections || []); // Ensure sections is an array
      } else {
        setSections([]); // Default to empty array if no data exists
      }
    };
    loadFields();
  }, [formId]);

  // Handler to add a new section
  const handleAddSection = () => {
    const trimmedSectionName = newSectionName.trim();
    if (!trimmedSectionName) return;

    // Check if section already exists
    if (sections.some((sec) => sec.sectionName === trimmedSectionName)) {
      alert('Section already exists.');
      return;
    }

    const maxIndex =
      sections.length > 0
        ? Math.max(...sections.map((sec) => sec.sectionIndex))
        : -1;

    const newSection = {
      sectionName: trimmedSectionName,
      sectionIndex: maxIndex + 1,
      collapsed_by_default: collapsedByDefault, // Added here
      fields: [],
    };

    setSections([...sections, newSection]);
    setNewSectionName('');
    setCollapsedByDefault(false); // Reset after adding
  };

  // Handler to remove a section
  const handleRemoveSection = (sectionIndex) => {
    setSections(sections.filter((sec) => sec.sectionIndex !== sectionIndex));
  };

  // Handler to move a section up
  const handleMoveSectionUp = (sectionIndex) => {
    if (sectionIndex === 0) return; // Already at the top

    const updatedSections = sections.map((sec) => {
      if (sec.sectionIndex === sectionIndex) {
        return { ...sec, sectionIndex: sec.sectionIndex - 1 };
      } else if (sec.sectionIndex === sectionIndex - 1) {
        return { ...sec, sectionIndex: sec.sectionIndex + 1 };
      } else {
        return sec;
      }
    });
    setSections(updatedSections);
  };

  // Handler to move a section down
  const handleMoveSectionDown = (sectionIndex) => {
    const maxSectionIndex = sections.length - 1;
    if (sectionIndex === maxSectionIndex) return; // Already at the bottom

    const updatedSections = sections.map((sec) => {
      if (sec.sectionIndex === sectionIndex) {
        return { ...sec, sectionIndex: sec.sectionIndex + 1 };
      } else if (sec.sectionIndex === sectionIndex + 1) {
        return { ...sec, sectionIndex: sec.sectionIndex - 1 };
      } else {
        return sec;
      }
    });
    setSections(updatedSections);
  };

  // Handler for field label change
  const handleLabelChange = (e) => {
    const label = e.target.value;
    setNewField((prevField) => ({
      ...prevField,
      label,
      name: `${toCamelCase(prevField.sectionName)}_${toCamelCase(label)}`,
    }));
  };

  // Handler for section selection change in field form
  const handleFieldSectionChange = (e) => {
    const sectionName = e.target.value;
    setNewField((prevField) => ({
      ...prevField,
      sectionName,
      name: `${toCamelCase(sectionName)}_${toCamelCase(prevField.label)}`,
    }));
  };

  // Handler to add or edit a field
  const handleAddOrEditField = () => {
    const { sectionName, label } = newField;
    if (!sectionName || !label) {
      alert('Section and Label are required.');
      return;
    }

    const section = sections.find((sec) => sec.sectionName === sectionName);

    if (!section) {
      alert('Selected section does not exist.');
      return;
    }

    if (editingField) {
      // Editing existing field
      const updatedFields = section.fields.map((field) =>
        field.name === editingField.name ? newField : field
      );
      const updatedSection = { ...section, fields: updatedFields };
      setSections(
        sections.map((sec) =>
          sec.sectionName === section.sectionName ? updatedSection : sec
        )
      );
      setEditingField(null);
    } else {
      // Adding new field
      const maxFieldIndex =
        section.fields.length > 0
          ? Math.max(...section.fields.map((f) => f.fieldIndex))
          : -1;
      const newFieldWithIndex = {
        ...newField,
        fieldIndex: maxFieldIndex + 1,
      };
      const updatedSection = {
        ...section,
        fields: [...section.fields, newFieldWithIndex],
      };
      setSections(
        sections.map((sec) =>
          sec.sectionName === section.sectionName ? updatedSection : sec
        )
      );
    }

    // Reset newField state
    setNewField({
      sectionName: '',
      name: '',
      label: '',
      type: 'text',
      required: false,
      options: [],
      placeholder: '',
      fieldIndex: 0,
    });
  };

  // Handler to remove a field
  const handleRemoveField = (sectionName, fieldName) => {
    const section = sections.find((sec) => sec.sectionName === sectionName);
    if (!section) return;

    const updatedFields = section.fields.filter(
      (field) => field.name !== fieldName
    );
    const updatedSection = { ...section, fields: updatedFields };
    setSections(
      sections.map((sec) =>
        sec.sectionName === sectionName ? updatedSection : sec
      )
    );
  };

  // Handler to edit a field
  const handleEditField = (sectionName, fieldName) => {
    const section = sections.find((sec) => sec.sectionName === sectionName);
    if (!section) return;

    const field = section.fields.find((field) => field.name === fieldName);
    if (!field) return;

    setNewField(field);
    setEditingField(field);
  };

  // Handler to move a field up within its section
  const handleMoveFieldUp = (sectionName, fieldIndex) => {
    const section = sections.find((sec) => sec.sectionName === sectionName);
    if (!section) return;
    if (fieldIndex === 0) return; // Already at the top

    const updatedFields = section.fields.map((field) => {
      if (field.fieldIndex === fieldIndex) {
        return { ...field, fieldIndex: field.fieldIndex - 1 };
      } else if (field.fieldIndex === fieldIndex - 1) {
        return { ...field, fieldIndex: field.fieldIndex + 1 };
      } else {
        return field;
      }
    });

    const updatedSection = { ...section, fields: updatedFields };
    setSections(
      sections.map((sec) =>
        sec.sectionName === sectionName ? updatedSection : sec
      )
    );
  };

  // Handler to move a field down within its section
  const handleMoveFieldDown = (sectionName, fieldIndex) => {
    const section = sections.find((sec) => sec.sectionName === sectionName);
    if (!section) return;
    const maxFieldIndex = section.fields.length - 1;
    if (fieldIndex === maxFieldIndex) return; // Already at the bottom

    const updatedFields = section.fields.map((field) => {
      if (field.fieldIndex === fieldIndex) {
        return { ...field, fieldIndex: field.fieldIndex + 1 };
      } else if (field.fieldIndex === fieldIndex + 1) {
        return { ...field, fieldIndex: field.fieldIndex - 1 };
      } else {
        return field;
      }
    });

    const updatedSection = { ...section, fields: updatedFields };
    setSections(
      sections.map((sec) =>
        sec.sectionName === sectionName ? updatedSection : sec
      )
    );
  };

  // Handler to save all sections and fields to Firebase
  const handleSaveFields = async () => {
    const timestamp = new Date().toISOString();

    const dataToSave = {
      sections: sections.map((section) => ({
         ...section,
         collapsed_by_default: section.collapsed_by_default || false,
      })),
      lastUpdated: timestamp,
      submittedByUID: currentUser?.uid || 'unknown',
      submittedByName: currentUser?.displayName || 'unknown',
    };

    try {
      await setDoc(doc(db, 'formFields', formId, 'latest', 'latest'), dataToSave);
      await setDoc(doc(db, 'formFields', formId, 'versions', timestamp), dataToSave);
      alert('Fields saved with timestamp!');
    } catch (error) {
      console.error('Error saving fields:', error);
      alert('An error occurred while saving the fields.');
    }
  };

  return (
    <div>
      <h2>Manage Fields for {formId}</h2>

      {/* Form to Add New Section */}
      <div>
        <h3>Add New Section</h3>
        <input
          type="text"
          placeholder="Section Name (e.g., Personal Information)"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
        />
        <label>
          Collapsed by Default:
          <input
            type="checkbox"
            checked={collapsedByDefault}
            onChange={(e) => setCollapsedByDefault(e.target.checked)}
          />
        </label>
        <button onClick={handleAddSection}>Add Section</button>
      </div>

 {/* Form to Add or Edit Fields with Helpful Placeholders */}
<div>
  <h3>{editingField ? 'Edit Field' : 'Add New Field'}</h3>
  <select
    value={newField.sectionName}
    onChange={handleFieldSectionChange}
  >
    <option value="">Select Section</option>
    {sections
      .slice()
      .sort((a, b) => a.sectionIndex - b.sectionIndex)
      .map((section) => (
        <option key={section.sectionName} value={section.sectionName}>
          {section.sectionName}
        </option>
      ))}
  </select>
  <input
    type="text"
    placeholder="Label (e.g., Location (City, State))"
    value={newField.label}
    onChange={handleLabelChange}
  />
  <input
    type="text"
    placeholder="Computer Label (Generated)"
    value={newField.name}
    readOnly
  />
  <label>
    Required:
    <input
      type="checkbox"
      checked={newField.required}
      onChange={(e) =>
        setNewField((prevField) => ({
          ...prevField,
          required: e.target.checked,
        }))
      }
    />
  </label>
  {newField.type === 'dropdown' && (
    <input
      type="text"
      placeholder="Comma-separated options (e.g., Single, Married)"
      value={newField.options.join(',')}
      onChange={(e) =>
        setNewField((prevField) => ({
          ...prevField,
          options: e.target.value.split(','),
        }))
      }
    />
  )}
  {/* Add Field Button */}
  <button onClick={handleAddOrEditField}>
    {editingField ? 'Save Changes' : 'Add Field'}
  </button>
</div>


      {/* Display Sections and Fields */}
      <h3>Current Sections and Fields</h3>
      {sections && sections.length > 0 ? (
        sections
          .slice()
          .sort((a, b) => a.sectionIndex - b.sectionIndex)
          .map((section, idx) => (
            <div key={section.sectionName}>
              <h4>
                {section.sectionName} {section.collapsed_by_default ? "(Collapsed)" : "(Expanded)"}
                <button onClick={() => handleMoveSectionUp(section.sectionIndex)}>
                  {'\u25B2'}
                </button>
                <button
                  onClick={() => handleMoveSectionDown(section.sectionIndex)}
                >
                  {'\u25BC'}
                </button>
                <button onClick={() => handleRemoveSection(section.sectionIndex)}>
                  Remove Section
                </button>
              </h4>
              {section.fields && section.fields.length > 0 ? (
                <ul>
                  {section.fields
                    .slice()
                    .sort((a, b) => a.fieldIndex - b.fieldIndex)
                    .map((field) => (
                      <li key={field.name}>
                        <strong>{field.label}</strong> ({field.type})
                        {field.required && ' *'}
                        {field.type === 'dropdown' &&
                          ` - Options: ${field.options.join(', ')}`}
                        <button
                          onClick={() =>
                            handleEditField(section.sectionName, field.name)
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleRemoveField(section.sectionName, field.name)
                          }
                        >
                          Remove
                        </button>
                        <button
                          onClick={() =>
                            handleMoveFieldUp(
                              section.sectionName,
                              field.fieldIndex
                            )
                          }
                        >
                          {'\u25B2'}
                        </button>
                        <button
                          onClick={() =>
                            handleMoveFieldDown(
                              section.sectionName,
                              field.fieldIndex
                            )
                          }
                        >
                          {'\u25BC'}
                        </button>
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No fields in this section.</p>
              )}
            </div>
          ))
      ) : (
        <p>No sections available.</p>
      )}

      <button onClick={handleSaveFields}>Save All Fields</button>
    </div>
  );
}

export default AdminFieldManager;


// // src/AdminFieldManager.js

// import React, { useState, useEffect } from 'react';
// import { db } from './firebase-config';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { useAuth } from './AuthContext';

// // Helper function to convert a label to camelCase
// function toCamelCase(str) {
//   return str
//     .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
//     .trim() // Remove leading and trailing spaces
//     .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
//     .toLowerCase()
//     .replace(/ (.)/g, (match, chr) => chr.toUpperCase()); // Convert spaces to camelCase
// }

// function AdminFieldManager() {
//   const { currentUser } = useAuth();
//   const [sections, setSections] = useState([]);
//   const [formId] = useState('seekerForm');
//   const [newSectionName, setNewSectionName] = useState('');
//   const [newField, setNewField] = useState({
//     sectionName: '',
//     name: '',
//     label: '',
//     type: 'text',
//     required: false,
//     section_collapsed: false,
//     options: [],
//     placeholder: '',
//     fieldIndex: 0, // New property for ordering within section
//   });
//   const [editingField, setEditingField] = useState(null);

//   useEffect(() => {
//     const loadFields = async () => {
//       const docRef = doc(db, 'formFields', formId, 'latest', 'latest');
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const loadedSections = docSnap.data().sections;
//         setSections(loadedSections || []); // Ensure sections is an array
//       } else {
//         setSections([]); // Default to empty array if no data exists
//       }
//     };
//     loadFields();
//   }, [formId]);

//   // Handler to add a new section
//   const handleAddSection = () => {
//     const trimmedSectionName = newSectionName.trim();
//     if (!trimmedSectionName) return;

//     // Check if section already exists
//     if (sections.some((sec) => sec.sectionName === trimmedSectionName)) {
//       alert('Section already exists.');
//       return;
//     }

//     const maxIndex =
//       sections.length > 0
//         ? Math.max(...sections.map((sec) => sec.sectionIndex))
//         : -1;

//     const newSection = {
//       sectionName: trimmedSectionName,
//       sectionIndex: maxIndex + 1,
//       fields: [],
//     };

//     setSections([...sections, newSection]);
//     setNewSectionName('');
//   };

//   // Handler to remove a section
//   const handleRemoveSection = (sectionIndex) => {
//     setSections(sections.filter((sec) => sec.sectionIndex !== sectionIndex));
//   };

//   // Handler to move a section up
//   const handleMoveSectionUp = (sectionIndex) => {
//     if (sectionIndex === 0) return; // Already at the top

//     const updatedSections = sections.map((sec) => {
//       if (sec.sectionIndex === sectionIndex) {
//         return { ...sec, sectionIndex: sec.sectionIndex - 1 };
//       } else if (sec.sectionIndex === sectionIndex - 1) {
//         return { ...sec, sectionIndex: sec.sectionIndex + 1 };
//       } else {
//         return sec;
//       }
//     });
//     setSections(updatedSections);
//   };

//   // Handler to move a section down
//   const handleMoveSectionDown = (sectionIndex) => {
//     const maxSectionIndex = sections.length - 1;
//     if (sectionIndex === maxSectionIndex) return; // Already at the bottom

//     const updatedSections = sections.map((sec) => {
//       if (sec.sectionIndex === sectionIndex) {
//         return { ...sec, sectionIndex: sec.sectionIndex + 1 };
//       } else if (sec.sectionIndex === sectionIndex + 1) {
//         return { ...sec, sectionIndex: sec.sectionIndex - 1 };
//       } else {
//         return sec;
//       }
//     });
//     setSections(updatedSections);
//   };

//   // Handler for field label change
//   const handleLabelChange = (e) => {
//     const label = e.target.value;
//     setNewField((prevField) => ({
//       ...prevField,
//       label,
//       name: `${toCamelCase(prevField.sectionName)}_${toCamelCase(label)}`,
//     }));
//   };

//   // Handler for section selection change in field form
//   const handleFieldSectionChange = (e) => {
//     const sectionName = e.target.value;
//     setNewField((prevField) => ({
//       ...prevField,
//       sectionName,
//       name: `${toCamelCase(sectionName)}_${toCamelCase(prevField.label)}`,
//     }));
//   };

//   // Handler to add or edit a field
//   const handleAddOrEditField = () => {
//     const { sectionName, label } = newField;
//     if (!sectionName || !label) {
//       alert('Section and Label are required.');
//       return;
//     }

//     const section = sections.find((sec) => sec.sectionName === sectionName);

//     if (!section) {
//       alert('Selected section does not exist.');
//       return;
//     }

//     if (editingField) {
//       // Editing existing field
//       const updatedFields = section.fields.map((field) =>
//         field.name === editingField.name ? newField : field
//       );
//       const updatedSection = { ...section, fields: updatedFields };
//       setSections(
//         sections.map((sec) =>
//           sec.sectionName === section.sectionName ? updatedSection : sec
//         )
//       );
//       setEditingField(null);
//     } else {
//       // Adding new field
//       const maxFieldIndex =
//         section.fields.length > 0
//           ? Math.max(...section.fields.map((f) => f.fieldIndex))
//           : -1;
//       const newFieldWithIndex = {
//         ...newField,
//         fieldIndex: maxFieldIndex + 1,
//       };
//       const updatedSection = {
//         ...section,
//         fields: [...section.fields, newFieldWithIndex],
//       };
//       setSections(
//         sections.map((sec) =>
//           sec.sectionName === section.sectionName ? updatedSection : sec
//         )
//       );
//     }

//     // Reset newField state
//     setNewField({
//       sectionName: '',
//       name: '',
//       label: '',
//       type: 'text',
//       required: false,
//       options: [],
//       placeholder: '',
//       fieldIndex: 0,
//     });
//   };

//   // Handler to remove a field
//   const handleRemoveField = (sectionName, fieldName) => {
//     const section = sections.find((sec) => sec.sectionName === sectionName);
//     if (!section) return;

//     const updatedFields = section.fields.filter(
//       (field) => field.name !== fieldName
//     );
//     const updatedSection = { ...section, fields: updatedFields };
//     setSections(
//       sections.map((sec) =>
//         sec.sectionName === sectionName ? updatedSection : sec
//       )
//     );
//   };

//   // Handler to edit a field
//   const handleEditField = (sectionName, fieldName) => {
//     const section = sections.find((sec) => sec.sectionName === sectionName);
//     if (!section) return;

//     const field = section.fields.find((field) => field.name === fieldName);
//     if (!field) return;

//     setNewField(field);
//     setEditingField(field);
//   };

//   // Handler to move a field up within its section
//   const handleMoveFieldUp = (sectionName, fieldIndex) => {
//     const section = sections.find((sec) => sec.sectionName === sectionName);
//     if (!section) return;
//     if (fieldIndex === 0) return; // Already at the top

//     const updatedFields = section.fields.map((field) => {
//       if (field.fieldIndex === fieldIndex) {
//         return { ...field, fieldIndex: field.fieldIndex - 1 };
//       } else if (field.fieldIndex === fieldIndex - 1) {
//         return { ...field, fieldIndex: field.fieldIndex + 1 };
//       } else {
//         return field;
//       }
//     });

//     const updatedSection = { ...section, fields: updatedFields };
//     setSections(
//       sections.map((sec) =>
//         sec.sectionName === sectionName ? updatedSection : sec
//       )
//     );
//   };

//   // Handler to move a field down within its section
//   const handleMoveFieldDown = (sectionName, fieldIndex) => {
//     const section = sections.find((sec) => sec.sectionName === sectionName);
//     if (!section) return;
//     const maxFieldIndex = section.fields.length - 1;
//     if (fieldIndex === maxFieldIndex) return; // Already at the bottom

//     const updatedFields = section.fields.map((field) => {
//       if (field.fieldIndex === fieldIndex) {
//         return { ...field, fieldIndex: field.fieldIndex + 1 };
//       } else if (field.fieldIndex === fieldIndex + 1) {
//         return { ...field, fieldIndex: field.fieldIndex - 1 };
//       } else {
//         return field;
//       }
//     });

//     const updatedSection = { ...section, fields: updatedFields };
//     setSections(
//       sections.map((sec) =>
//         sec.sectionName === sectionName ? updatedSection : sec
//       )
//     );
//   };

//   // Handler to save all sections and fields to Firebase
//   const handleSaveFields = async () => {
//     const timestamp = new Date().toISOString();

//     const dataToSave = {
//       sections,
//       lastUpdated: timestamp,
//       submittedByUID: currentUser?.uid || 'unknown',
//       submittedByName: currentUser?.displayName || 'unknown',
//     };

//     try {
//       await setDoc(doc(db, 'formFields', formId, 'latest', 'latest'), dataToSave);
//       await setDoc(doc(db, 'formFields', formId, 'versions', timestamp), dataToSave);
//       alert('Fields saved with timestamp!');
//     } catch (error) {
//       console.error('Error saving fields:', error);
//       alert('An error occurred while saving the fields.');
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Fields for {formId}</h2>

//       {/* Form to Add New Section */}
//       <div>
//         <h3>Add New Section</h3>
//         <input
//           type="text"
//           placeholder="Section Name (e.g., Personal Information)"
//           value={newSectionName}
//           onChange={(e) => setNewSectionName(e.target.value)}
//         />
//         <button onClick={handleAddSection}>Add Section</button>
//       </div>

//       {/* Form to Add or Edit Fields with Helpful Placeholders */}
//       <div>
//         <h3>{editingField ? 'Edit Field' : 'Add New Field'}</h3>
//         <select
//           value={newField.sectionName}
//           onChange={handleFieldSectionChange}
//         >
//           <option value="">Select Section</option>
//           {sections
//             .slice()
//             .sort((a, b) => a.sectionIndex - b.sectionIndex)
//             .map((section) => (
//               <option key={section.sectionName} value={section.sectionName}>
//                 {section.sectionName}
//               </option>
//             ))}
//         </select>
//         <input
//           type="text"
//           placeholder="Label (e.g., Location (City, State))"
//           value={newField.label}
//           onChange={handleLabelChange}
//         />
//         <input
//           type="text"
//           placeholder="Computer Label (Generated)"
//           value={newField.name}
//           readOnly
//         />
//         <label>
//           Required:
//           <input
//             type="checkbox"
//             checked={newField.required}
//             onChange={(e) =>
//               setNewField((prevField) => ({
//                 ...prevField,
//                 required: e.target.checked,
//               }))
//             }
//           />
//         </label>
//         <label>
//           Section Collapsed on Default:
//           <input
//             type="checkbox"
//             checked={newField.section_collapsed}
//             onChange={(e) =>
//               setNewField((prevField) => ({
//                 ...prevField,
//                 section_collapsed: e.target.checked,
//               }))
//             }
//           />
//         </label>
//         {newField.type === 'dropdown' && (
//           <input
//             type="text"
//             placeholder="Comma-separated options (e.g., Single, Married)"
//             value={newField.options.join(',')}
//             onChange={(e) =>
//               setNewField((prevField) => ({
//                 ...prevField,
//                 options: e.target.value.split(','),
//               }))
//             }
//           />
//         )}
//         <button onClick={handleAddOrEditField}>
//           {editingField ? 'Save Changes' : 'Add Field'}
//         </button>
//       </div>

//       {/* Display Sections and Fields */}
//       <h3>Current Sections and Fields</h3>
//       {sections && sections.length > 0 ? (
//         sections
//           .slice()
//           .sort((a, b) => a.sectionIndex - b.sectionIndex)
//           .map((section, idx) => (
//             <div key={section.sectionName}>
//               <h4>
//                 {section.sectionName}
//                 <button onClick={() => handleMoveSectionUp(section.sectionIndex)}>
//                   {'\u25B2'}
//                 </button>
//                 <button
//                   onClick={() => handleMoveSectionDown(section.sectionIndex)}
//                 >
//                   {'\u25BC'}
//                 </button>
//                 <button onClick={() => handleRemoveSection(section.sectionIndex)}>
//                   Remove Section
//                 </button>
//               </h4>
//               {section.fields && section.fields.length > 0 ? (
//                 <ul>
//                   {section.fields
//                     .slice()
//                     .sort((a, b) => a.fieldIndex - b.fieldIndex)
//                     .map((field) => (
//                       <li key={field.name}>
//                         <strong>{field.label}</strong> ({field.type})
//                         {field.required && ' *'}
//                         {field.type === 'dropdown' &&
//                           ` - Options: ${field.options.join(', ')}`}
//                         <button
//                           onClick={() =>
//                             handleEditField(section.sectionName, field.name)
//                           }
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleRemoveField(section.sectionName, field.name)
//                           }
//                         >
//                           Remove
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleMoveFieldUp(
//                               section.sectionName,
//                               field.fieldIndex
//                             )
//                           }
//                         >
//                           {'\u25B2'}
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleMoveFieldDown(
//                               section.sectionName,
//                               field.fieldIndex
//                             )
//                           }
//                         >
//                           {'\u25BC'}
//                         </button>
//                       </li>
//                     ))}
//                 </ul>
//               ) : (
//                 <p>No fields in this section.</p>
//               )}
//             </div>
//           ))
//       ) : (
//         <p>No sections available.</p>
//       )}

//       <button onClick={handleSaveFields}>Save All Fields</button>
//     </div>
//   );
// }

// export default AdminFieldManager;

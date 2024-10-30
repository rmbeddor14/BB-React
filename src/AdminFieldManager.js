//src/AdminFieldManager.js
// move up and move down not working right
import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

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
  const [fields, setFields] = useState([]);
  const [formId] = useState('seekerForm');
  const [newField, setNewField] = useState({
    section: '',
    name: '',
    label: '',
    type: 'text',
    required: false,
    section_collapsed: false,
    options: [],
    placeholder: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadFields = async () => {
      const docRef = doc(db, 'formFields', formId, 'latest', 'latest');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFields(docSnap.data().fields);
      }
    };
    loadFields();
  }, [formId]);

  const handleLabelChange = (e) => {
    const label = e.target.value;
    setNewField({
      ...newField,
      label,
      name: `${toCamelCase(newField.section)}_${toCamelCase(label)}`
    });
  };

  const handleSectionChange = (e) => {
    const section = e.target.value;
    setNewField({
      ...newField,
      section,
      name: `${toCamelCase(section)}_${toCamelCase(newField.label)}`
    });
  };

  const handleAddOrEditField = () => {
    if (editingIndex !== null) {
      const updatedFields = fields.map((field, index) =>
        index === editingIndex ? newField : field
      );
      setFields(updatedFields);
      setEditingIndex(null);
    } else {
      setFields([...fields, newField]);
    }
    setNewField({ section: '', name: '', label: '', type: 'text', required: false, options: [], placeholder: '' });
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleEditField = (index) => {
    setNewField(fields[index]);
    setEditingIndex(index);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return; // If it's the first item, do nothing
    const reorderedFields = [...fields];
    [reorderedFields[index - 1], reorderedFields[index]] = [reorderedFields[index], reorderedFields[index - 1]];
    setFields(reorderedFields);
  };

  const handleMoveDown = (index) => {
    if (index === fields.length - 1) return; // If it's the last item, do nothing
    const reorderedFields = [...fields];
    [reorderedFields[index], reorderedFields[index + 1]] = [reorderedFields[index + 1], reorderedFields[index]];
    setFields(reorderedFields);
  };

  const handleSaveFields = async () => {
    const timestamp = new Date().toISOString();

    const fieldData = {
      fields,
      lastUpdated: timestamp,
      submittedByUID: currentUser?.uid || 'unknown',
      submittedByName: currentUser?.displayName || 'unknown'
    };

    await setDoc(doc(db, 'formFields', formId, 'latest', 'latest'), fieldData);
    await setDoc(doc(db, 'formFields', formId, 'versions', timestamp), fieldData);

    alert('Fields saved with timestamp!');
  };

  return (
    <div>
      <h2>Manage Fields for {formId}</h2>

      {/* Form to Add or Edit Fields with Helpful Placeholders */}
      <div>
        <input
          type="text"
          placeholder="Section (Partner 1, Partner 2, or Shared)"
          value={newField.section}
          onChange={handleSectionChange}
        />
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
            onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
          />
        </label>
        <label>
          Section Collapsed on Default:
          <input
            type="checkbox"
            checked={newField.section_collapsed}
            onChange={(e) => setNewField({ ...newField, section_collapsed: e.target.checked })}
          />
        </label>
        {newField.type === 'dropdown' && (
          <input
            type="text"
            placeholder="Comma-separated options (e.g., Single, Married)"
            value={newField.options.join(',')}
            onChange={(e) =>
              setNewField({ ...newField, options: e.target.value.split(',') })
            }
          />
        )}
        <button onClick={handleAddOrEditField}>
          {editingIndex !== null ? 'Save Changes' : 'Add Field'}
        </button>
      </div>

      {/* Group and Display Current Fields by Section */}
      <h3>Current Fields</h3>
      {Object.entries(
        fields.reduce((acc, field) => {
          const section = field.section;
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(field);
          return acc;
        }, {})
      ).map(([section, sectionFields]) => (
        <div key={section}>
          <h4>{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
          <ul>
            {sectionFields.map((field, index) => (
              <li key={`${section}-${index}`}>
                <strong>{field.label}</strong> ({field.type})
                {field.required && ' *'}
                {field.type === 'dropdown' && ` - Options: ${field.options.join(', ')}`}
                <button onClick={() => handleEditField(index)}>Edit</button>
                <button onClick={() => handleRemoveField(index)}>Remove</button>
                <button onClick={() => handleMoveUp(index)}>{'\u25B2'}</button>
                <button onClick={() => handleMoveDown(index)}>{'\u25BC'}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={handleSaveFields}>Save All Fields</button>
    </div>
  );
}

export default AdminFieldManager;

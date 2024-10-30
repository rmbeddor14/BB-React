import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext'; // Example context for retrieving UID

// should update so it includes that if you don't change the form at all that it will not save to reduce writes to db 
function AdminFieldManager() {
  const { currentUser } = useAuth(); // Access current user information
  const [fields, setFields] = useState([]);
  const [formId] = useState('seekerForm'); // Specify formId if you have multiple forms
  const [newField, setNewField] = useState({
    name: '',
    label: '',
    type: 'text',
    required: false,
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
    setNewField({ name: '', label: '', type: 'text', required: false, options: [], placeholder: '' });
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleEditField = (index) => {
    setNewField(fields[index]);
    setEditingIndex(index);
  };
  const handleSaveFields = async () => {
    const timestamp = new Date().toISOString();

    const fieldData = {
      fields,
      lastUpdated: timestamp,
      submittedByUID: currentUser?.uid || 'unknown', // Save the UID of the submitting user
      submittedByName: currentUser?.displayName || 'unknown' // Save the name of the submitting user

    };

    // Save to formId/latest (overwrites each time)
    await setDoc(doc(db, 'formFields', formId, 'latest', 'latest'), fieldData);

    // Save to formId/timestamp for historical record
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
          placeholder="Unique identifier (e.g., location)"
          value={newField.name}
          onChange={(e) => setNewField({ ...newField, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Label (e.g., Location (City, State))"
          value={newField.label}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
        />
        <select
          value={newField.type}
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="dropdown">Dropdown</option>
        </select>
        <label>
          Required:
          <input
            type="checkbox"
            checked={newField.required}
            onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
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

      {/* Display Current Fields with Edit and Remove Options */}
      <h3>Current Fields</h3>
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <strong>{field.label}</strong> ({field.type})
            {field.required && ' *'}
            {field.type === 'dropdown' && ` - Options: ${field.options.join(', ')}`}
            <button onClick={() => handleEditField(index)}>Edit</button>
            <button onClick={() => handleRemoveField(index)}>Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSaveFields}>Save All Fields</button>
    </div>
  );
}

export default AdminFieldManager;

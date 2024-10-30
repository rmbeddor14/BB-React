import React, { useEffect, useState } from 'react';
import { db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';

// manually set to seekerForm for now 
function DynamicForm({ formId = 'seekerForm' }) {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFields = async () => {
      // Fetch the latest version of the form fields
      const latestDocRef = doc(db, 'formFields', formId, 'latest', 'latest');
      const latestDocSnap = await getDoc(latestDocRef);

      if (latestDocSnap.exists()) {
        setFields(latestDocSnap.data().fields);
      } else {
        console.log("No fields found for this form.");
      }
    };

    fetchFields();
  }, [formId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error for this field
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed.");
      return;
    }

    console.log("Submitted Data: ", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
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
              <option value="">{field.placeholder || `Select ${field.label}`}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
          {errors[field.name] && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;

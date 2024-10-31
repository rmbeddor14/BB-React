
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import '../ProfileForm.css';
import { db } from '../firebase-config';
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { useAuth } from '../AuthContext'; 
import ImageUpload from '../ImageUpload';

function SeekerProfileForm2({ onSubmit }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); 
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [sections, setSections] = useState([]);

  // Fetch form fields from Firestore on component mount
  useEffect(() => {
    const loadFormStructure = async () => {
      const docRef = doc(db, 'formFields', 'seekerForm', 'latest', 'latest');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSections(docSnap.data().sections || []);
      } else {
        console.error('No form structure found in Firestore.');
      }
    };
    loadFormStructure();
  }, []);

  const handleImageUpload = (url) => {
    setImageURL(url);
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageURL) {
      alert("Please upload an image before submitting.");
      return;
    }
    setUploading(true);

    const timestamp = new Date().toISOString();

    // Organize formData into the desired sections structure
    const structuredData = {
      sections: sections.map((section) => ({
        sectionName: section.sectionName,
        sectionIndex: section.sectionIndex,
        collapsed_by_default: section.collapsed_by_default,
        fields: section.fields.map((field) => ({
          ...field,
          value: formData[field.name] || "", // Add the user's input for each field
        })),
      })),
      imageURL,
      type: 'seeker',
      status: 'pending',
      timestamp,
      uid: currentUser.uid,
      submittedByName: currentUser.displayName || 'unknown',
    };

    // Clean up structured data by removing any empty values
    const cleanProfileData = JSON.parse(
      JSON.stringify(structuredData, (key, value) => (value === "" ? undefined : value))
    );

    try {
      const docRef = await addDoc(collection(db, 'profiles2'), cleanProfileData); // Write to the db
      onSubmit(cleanProfileData);
      navigate(`/profile/${docRef.id}`);
    } catch (error) {
      console.error("Error adding profile: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container card">
      <Link to="/" className="backLink">← Back to Main</Link>
      <h2>Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit}>

        {/* Dynamically Render Sections and Fields */}
        {sections.sort((a, b) => a.sectionIndex - b.sectionIndex).map((section) => (
          <div key={section.sectionName} className="section">
            <h3
              onClick={() => setSections((prevSections) =>
                prevSections.map((sec) =>
                  sec.sectionName === section.sectionName
                    ? { ...sec, collapsed_by_default: !sec.collapsed_by_default }
                    : sec
                )
              )}
              className="section-heading"
            >
              {section.sectionName}
              {section.collapsed_by_default ? " (Click to Expand)" : " (Click to Collapse)"}
            </h3>

            {/* Render Fields if Section is Expanded */}
            {!section.collapsed_by_default && (
              <div className="section-fields">
                {section.fields.sort((a, b) => a.fieldIndex - b.fieldIndex).map((field) => (
                  <div key={field.name} className="inputGroup">
                    <label htmlFor={field.name}>{field.label}{field.required ? ' *' : ''}</label>
                    <input
                      type={field.type === 'dropdown' ? 'select' : field.type}
                      name={field.name}
                      id={field.name}
                      placeholder={field.placeholder || ''}
                      value={formData[field.name] || ''}
                      onChange={onInputChange}
                      required={field.required}
                    />
                    {field.type === 'dropdown' && (
                      <select
                        name={field.name}
                        id={field.name}
                        value={formData[field.name] || ''}
                        onChange={onInputChange}
                        required={field.required}
                      >
                        <option value="">Select an option</option>
                        {field.options.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Image Upload Component */}
        {currentUser && (
          <ImageUpload onUpload={handleImageUpload} userId={currentUser.uid} />
        )}

        {imageURL && (
          <div className="image-preview-container">
            <h3>Uploaded Image Preview:</h3>
            <img src={imageURL} alt="Uploaded Profile" className="image-preview" />
          </div>
        )}

        <button type="submit" className="submitButton" disabled={uploading}>
          {uploading ? "Submitting..." : "Submit Profile"}
        </button>
      </form>
    </div>
  );
}

export default SeekerProfileForm2;


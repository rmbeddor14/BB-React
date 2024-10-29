// src/SeekerProfileForm.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import './ProfileForm.css';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext'; 
import ImageUpload from './ImageUpload';
import PartnerForm from './PartnerForm';

function SeekerProfileForm({ onSubmit }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); 
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showPartner2, setShowPartner2] = useState(false);
  const [formData, setFormData] = useState({});
  const [partner1Collapsed, setPartner1Collapsed] = useState(false);
  const [partner2Collapsed, setPartner2Collapsed] = useState(false);

  const handleImageUpload = (url) => {
    setImageURL(url);
  };

  const handleAddPartner = () => {
    setShowPartner2(true);
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePartner1Collapse = () => {
    setPartner1Collapsed(!partner1Collapsed);
  };

  const togglePartner2Collapse = () => {
    setPartner2Collapsed(!partner2Collapsed);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!imageURL) {
    alert("Please upload an image before submitting.");
    return;
  }
  setUploading(true);

  // Create a timestamp
  const timestamp = new Date().toISOString();

  // Construct the name field
  const name = showPartner2 && formData.partner2Name
    ? `${formData.partner1Name} & ${formData.partner2Name}`
    : formData.partner1Name;

  // Construct profileData with only fields in the form, adding name and timestamp
  const profileData = {
    name,  // Set the combined name here
    partner1: {
      name: formData.partner1Name || undefined,
      age: formData.partner1Age || undefined,
    },
    partner2: showPartner2
      ? {
          name: formData.partner2Name || undefined,
          age: formData.partner2Age || undefined,
        }
      : undefined,
    location: formData.location || undefined,
    maritalStatus: formData.maritalStatus || undefined,
    contactFrequency: formData.contactFrequency || undefined,
    imageURL,
    type: 'seeker',
    status: 'pending',
    timestamp, // Add the timestamp to profileData
  };

  // Clean up profileData by removing undefined values
  const cleanProfileData = JSON.parse(
    JSON.stringify(profileData, (key, value) => (value === undefined ? undefined : value))
  );

  try {
    const docRef = await addDoc(collection(db, 'profiles'), cleanProfileData);
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

        {/* Partner 1 Form */}
        <PartnerForm
          partnerId="partner1"
          formData={formData}
          onInputChange={onInputChange}
          collapsed={partner1Collapsed}
          toggleCollapse={togglePartner1Collapse}
        />

        {/* Add Partner Button */}
        {!showPartner2 && (
          <button
            type="button"
            className="add-partner-button"
            onClick={handleAddPartner}
          >
            + Add Partner
          </button>
        )}

        {/* Partner 2 Form */}
        {showPartner2 && (
          <PartnerForm
            partnerId="partner2"
            formData={formData}
            onInputChange={onInputChange}
            collapsed={partner2Collapsed}
            toggleCollapse={togglePartner2Collapse}
          />
        )}

        {/* Shared Fields */}

        <h3 className="shared-attributes-heading">Couple Information</h3>
        <div className="inputGroup">
          <label htmlFor="Location">Location (City, State)</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location || ''}
            onChange={onInputChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="maritalStatus">Marital Status</label>
          <input
            type="text"
            name="maritalStatus"
            id="maritalStatus"
            value={formData.maritalStatus || ''}
            onChange={onInputChange}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="contactFrequency">Preferred Frequency of Contact:</label>
          <input
            type="text"
            name="contactFrequency"
            id="contactFrequency"
            value={formData.contactFrequency || ''}
            onChange={onInputChange}
          />
        </div>

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

export default SeekerProfileForm;

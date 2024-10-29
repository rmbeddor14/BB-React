// src/SeekerProfileForm.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import './ProfileForm.css';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext'; 
import ImageUpload from './ImageUpload';

function SeekerProfileForm({ onSubmit }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); 
  const [imageURL, setImageURL] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (url) => {
    setImageURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageURL) {
      alert("Please upload an image before submitting.");
      return;
    }
    setUploading(true);

    const formData = new FormData(e.target);
    const profileData = {
      name: formData.get('name'),
      age: formData.get('age'),
      location: formData.get('location'),
      children: formData.get('children'),
      maritalStatus: formData.get('maritalStatus'),
      hobbies: formData.get('hobbies').split(',').map(h => h.trim()),
      lifestyle: formData.get('lifestyle').split(',').map(l => l.trim()),
      surrogacyType: formData.get('surrogacyType'),
      preferredLifestyle: formData.get('preferredLifestyle').split(',').map(p => p.trim()),
      contactFrequency: formData.get('contactFrequency'),
      imageURL, 
      type: 'seeker',
      status: 'pending' 
    };

    try {
      const docRef = await addDoc(collection(db, 'profiles'), profileData);
      onSubmit(profileData);
      navigate(`/profile/${docRef.id}`); // Redirect to the new profile page
    } catch (error) {
      console.error("Error adding profile: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container card">
      <Link to="/" className="backLink">← Back to Main</Link>
      <h2>Create Your Surrogate Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Full Name:</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" id="age" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="location">Location (City, State):</label>
          <input type="text" name="location" id="location" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="children">Number of Children:</label>
          <input type="number" name="children" id="children" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="maritalStatus">Marital Status:</label>
          <input type="text" name="maritalStatus" id="maritalStatus" />
        </div>
        <div className="inputGroup">
          <label htmlFor="hobbies">Hobbies (comma separated):</label>
          <input type="text" name="hobbies" id="hobbies" />
        </div>
        <div className="inputGroup">
          <label htmlFor="lifestyle">Current Lifestyle (comma separated):</label>
          <input type="text" name="lifestyle" id="lifestyle" />
        </div>
        <div className="inputGroup">
          <label htmlFor="surrogacyType">Surrogacy Type (Traditional/Gestational):</label>
          <input type="text" name="surrogacyType" id="surrogacyType" />
        </div>
        <div className="inputGroup">
          <label htmlFor="preferredLifestyle">Preferred Intended Parent Lifestyle (comma separated):</label>
          <input type="text" name="preferredLifestyle" id="preferredLifestyle" />
        </div>
        <div className="inputGroup">
          <label htmlFor="contactFrequency">Preferred Frequency of Contact:</label>
          <input type="text" name="contactFrequency" id="contactFrequency" />
        </div>

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

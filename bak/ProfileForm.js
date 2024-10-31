// src/ProfileForm.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import './ProfileForm.css';
import { db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext'; // Import the AuthContext
import ImageUpload from './ImageUpload';  // Import ImageUpload component

function ProfileForm({ onSubmit }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get the authenticated user
  const [imageURL, setImageURL] = useState(null);

  // Callback for ImageUpload to set image URL
  const handleImageUpload = (url) => {
    setImageURL(url); // Save the uploaded image URL to state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      imageURL,  // Add the uploaded image URL here
      status: 'pending'
    };

    try {
      // Submit profile data to Firestore
      await addDoc(collection(db, 'profiles'), profileData);
      onSubmit(profileData);
      navigate('/');
    } catch (error) {
      console.error("Error adding profile: ", error);
    }
  };

  return (
    <div className="container card">
      <Link to="/" className="backLink">← Back to Main</Link>
      <h2>Fill Out Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" id="age" required />
        </div>
        <div className="inputGroup">
          <label htmlFor="location">Location:</label>
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
          <label htmlFor="lifestyle">Lifestyle (comma separated):</label>
          <input type="text" name="lifestyle" id="lifestyle" />
        </div>
        <div className="inputGroup">
          <label htmlFor="surrogacyType">Surrogacy Type:</label>
          <input type="text" name="surrogacyType" id="surrogacyType" />
        </div>
        <div className="inputGroup">
          <label htmlFor="preferredLifestyle">Preferred Lifestyle (comma separated):</label>
          <input type="text" name="preferredLifestyle" id="preferredLifestyle" />
        </div>
        <div className="inputGroup">
          <label htmlFor="contactFrequency">Frequency of Contact:</label>
          <input type="text" name="contactFrequency" id="contactFrequency" />
        </div>

        {/* ImageUpload Component with userId and callback */}
        {currentUser && (
          <ImageUpload onUpload={handleImageUpload} userId={currentUser.uid} />
        )}

        <button type="submit" className="submitButton">Submit</button>
      </form>
    </div>
  );
}

export default ProfileForm;

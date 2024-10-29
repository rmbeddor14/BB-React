


// src/ImageUpload.js

import React, { useState, useCallback } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './services/cropImage'; // Helper function we'll add for cropping
import './ImageUpload.css';

function ImageUpload({ onUpload, userId }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!imageFile || !croppedAreaPixels || !userId) return;

    setUploading(true);
    setError(null);

    try {

      const timestamp = new Date().toISOString();

      // Get cropped image blob
      const croppedImage = await getCroppedImg(imagePreview, croppedAreaPixels);
      
      // Upload cropped image to Firebase
      const storage = getStorage();
      const storageRef = ref(storage, `profiles/${userId}/${timestamp}/profile-image.jpg`);
      await uploadBytes(storageRef, croppedImage);

      // Get the download URL
      const imageURL = await getDownloadURL(storageRef);
      onUpload(imageURL); // Pass URL to parent component
      resetState();
    } catch (error) {
      setError("Error uploading image.");
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const resetState = () => {
    setImageFile(null);
    setImagePreview(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="image-upload-container">
      <input type="file" onChange={handleFileChange} accept="image/*" />

      {imagePreview && (
        <div className="crop-container">
          <Cropper
            image={imagePreview}
            crop={crop}
            zoom={zoom}
            aspect={1} // 1:1 aspect ratio for square images
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      <button onClick={handleUpload} disabled={!imageFile || uploading}>
        {uploading ? "Uploading..." : "Upload Cropped Image"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ImageUpload;

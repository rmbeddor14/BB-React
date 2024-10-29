
// src/PartnerForm.js

import React from 'react';

function PartnerForm({ partnerId, formData, onInputChange, collapsed, toggleCollapse }) {
  return (
    <div className="partner-form-section">
      <div className="partner-header">
        <h3>{partnerId === 'partner1' ? 'Partner 1 Information' : 'Partner 2 Information'}</h3>
        <button type="button" onClick={toggleCollapse}>
          {collapsed ? 'Edit' : 'Collapse'}
        </button>
      </div>

      {/* Show summary if collapsed */}
      {collapsed ? (
        <p>{partnerId === 'partner1' ? 'Partner 1 details provided' : 'Partner 2 details provided'}</p>
      ) : (
        <>
          <div className="inputGroup">
            <label htmlFor={`${partnerId}Name`}>Full Name:</label>
            <input
              type="text"
              name={`${partnerId}Name`}
              id={`${partnerId}Name`}
              value={formData[`${partnerId}Name`] || ''}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor={`${partnerId}Age`}>Age:</label>
            <input
              type="number"
              name={`${partnerId}Age`}
              id={`${partnerId}Age`}
              value={formData[`${partnerId}Age`] || ''}
              onChange={onInputChange}
              required
            />
          </div>
        </>
      )}
    </div>
  );
}
export default PartnerForm;

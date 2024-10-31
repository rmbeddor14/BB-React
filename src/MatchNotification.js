// MatchNotification.js

import React from 'react';
import './MatchNotification.css';

function MatchNotification({ match, onClose }) {
  return (
    <div className="match-notification">
      <h2>It's a match with {match.name}!</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default MatchNotification;

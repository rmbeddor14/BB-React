// // EmailCard.js
// import React from 'react';

// const EmailCard = ({ template, onSelect }) => {
//   return (
//     <div className="email-card" onClick={() => onSelect(template)}>
//       <h3>{template.name}</h3>
//     </div>
//   );
// };

// export default EmailCard;
// EmailCard.js
import React from 'react';

const EmailCard = ({ template, onSelect }) => {
  return (
    <div className="email-card" onClick={() => onSelect(template)}>
      {template.image && (
        <img src={template.image} alt={`${template.name} image`} className="template-image" />
      )}
      <h3>{template.name}</h3>
    </div>
  );
};

export default EmailCard;

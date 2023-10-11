// IconCard.js

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const IconCard = ({ icon, content, to }) => {
  return (
    <Link to={to} className="  bg-[#2c2f32] flex flex-col items-center justify-center  shadow-lg rounded-lg p-3 gap-3">
      <div className="text-3xl ns: text-white ">{icon}</div>
      
      <p className="text-gray-600 whitespace-pre-wrap">{content}</p>
    </Link>
  );
};

// IconCard.propTypes = {
//   icon: PropTypes.element.isRequired,
//   title: PropTypes.string.isRequired,
//   content: PropTypes.string.isRequired,
//   to: PropTypes.string.isRequired, // Path to navigate to
// };

export default IconCard;

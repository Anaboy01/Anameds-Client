import React from 'react';
import styles from './LoadingAnimation.module.css'; // Import the CSS Module

function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-screen">
      <svg className="w-64 h-48">
        <polyline
          className={`fill-none stroke-current ${styles.back}`} // Use CSS Module class
          strokeWidth="3"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="back"
        ></polyline>
        <polyline
          className={`fill-none stroke-current ${styles.front}`} // Use CSS Module class
          strokeWidth="3"
          strokeDasharray="48 144"
          strokeDashoffset="192"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          id="front"
        ></polyline>
      </svg>
    </div>
  );
}

export default LoadingAnimation;

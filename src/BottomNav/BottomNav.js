// BottomNav.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import './BottomNav.css'; // Import your CSS file for styling

const BottomNav = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'  // Optional: Adds smooth scrolling behavior
    });
  };

  return (
    <div className="bottom-nav">
      <p className="nav-button"><FontAwesomeIcon icon={faThumbsUp} /></p>
      <p className="nav-button" onClick={scrollToBottom}><FontAwesomeIcon icon={faComment} /></p>
      <p className="nav-button"><FontAwesomeIcon icon={faShareNodes} /></p>
    </div>
  );
};

export default BottomNav;

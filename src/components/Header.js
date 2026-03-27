import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Header = ({ handleToggleDarkMode, darkMode }) => {
  return(
    <div className="header">
      <h1>Notes</h1>
      <button 
        onClick={() => handleToggleDarkMode((prevMode) => !prevMode)} 
        className="toggle-btn"
      >
        {darkMode ? <MdLightMode size="1.2em" /> : <MdDarkMode size="1.2em" />}
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  )
}

export default Header;
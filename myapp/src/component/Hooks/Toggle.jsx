import React, { useState } from 'react';

const Toggle = () => {
  const themes = {
    red: 'dark',
    dark: 'light'
    
  };

  const [theme, setTheme] = useState('red'); // Set your initial theme here

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => themes[prevTheme]);
  };

  return (
    <div className={`${theme}-theme`}>
      <h1>Hello, world!</h1>
      <button onClick={toggleTheme} className={`toggle-button ${theme}-theme-button`}>
        {theme === 'red' ? 'Switch to Dark' : 'Switch to Light'}
      </button>
    </div>
  );
};

export default Toggle;

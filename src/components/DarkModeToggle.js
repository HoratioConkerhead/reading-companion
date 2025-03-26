import React from 'react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="dark-mode-toggle flex items-center" onClick={toggleDarkMode}>
      <span className="mr-2 text-sm">
        {darkMode ? 'Dark' : 'Light'}
      </span>
      <div className="toggle-track">
        <div className="toggle-thumb">
          {darkMode ? (
            <span className="absolute inset-0 flex items-center justify-center text-xs">🌙</span>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-xs">☀️</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
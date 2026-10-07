import React from 'react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div 
      className="dark-mode-toggle flex items-center cursor-pointer select-none" 
      onClick={toggleDarkMode}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDarkMode();
        }
      }}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {darkMode ? 'Dark' : 'Light'}
      </span>
      <div className="toggle-track relative">
        <div className={`toggle-thumb absolute transition-all duration-300 ease-in-out ${
          darkMode ? 'left-7' : 'left-0.5'
        }`}>
          <span className="absolute inset-0 flex items-center justify-center text-xs">
            {darkMode ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
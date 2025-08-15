import React, { useState, useEffect } from 'react';

const BookSelector = ({ isOpen, onClose, currentBook, onBookSelect, availableBooks, darkMode }) => {
  const [selectedBook, setSelectedBook] = useState(currentBook);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookChange = (bookKey) => {
    setSelectedBook(bookKey);
  };

  // Reset loading state when currentBook changes or component unmounts
  useEffect(() => {
    setSelectedBook(currentBook);
    setIsLoading(false);
  }, [currentBook]);

  const handleSave = () => {
    if (selectedBook === currentBook) {
      onClose();
      return;
    }
    
    setIsLoading(true);
    onBookSelect(selectedBook);
    // Note: onBookSelect will close the selector when the book loads
  };

  const handleCancel = () => {
    setSelectedBook(currentBook);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`max-w-md w-full mx-4 p-6 rounded-lg shadow-xl ${
        darkMode 
          ? 'bg-gray-800 text-white border border-gray-600' 
          : 'bg-white text-gray-900 border border-gray-200'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Book</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-opacity-20 ${
              darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {Object.entries(availableBooks).map(([bookKey, bookMetadata]) => (
            <label key={bookKey} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="bookSelection"
                value={bookKey}
                checked={selectedBook === bookKey}
                onChange={() => handleBookChange(bookKey)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div className="flex-1">
                <div className="font-medium">{bookMetadata.title || bookKey}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {bookMetadata.author || 'Unknown Author'}
                </div>
                                 {bookMetadata.shortDescription && (
                   <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                     {bookMetadata.shortDescription}
                   </div>
                 )}
              </div>
            </label>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className={`px-4 py-2 rounded ${
              darkMode 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`px-4 py-2 rounded ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Loading...</span>
              </div>
            ) : (
              'Select Book'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSelector;

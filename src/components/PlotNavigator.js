import React, { useState } from 'react';

const PlotNavigator = ({ 
  onEventSelect, 
  onCharacterSelect,
  eventsData,
  charactersData,
  chaptersData,       // Add this prop
  mysteryElements,    // Add this prop
  themeElements       // Add this prop
}) => {
  const [viewMode, setViewMode] = useState('chapters'); // 'chapters', 'mysteries', 'themes'
  const [readerKnowledge, setReaderKnowledge] = useState('full'); // 'progressive', 'full'
  const [expandedChapter, setExpandedChapter] = useState(null);
  
  // Get character name from ID
  const getCharacterName = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    return character ? character.name : characterId;
  };
  
  // Get event title from ID
  const getEventTitle = (eventId) => {
    const event = eventsData.find(e => e.id === eventId);
    return event ? event.title : eventId;
  };
  
  // Handle character click
  const handleCharacterClick = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    if (character) {
      onCharacterSelect(character);
    }
  };
  
  // Handle event click
  const handleEventClick = (eventId) => {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
      onEventSelect(event);
    }
  };
  
  // Check if a mystery is unlocked based on chapter and reader knowledge mode
  const isMysteryUnlocked = (mystery, currentChapter) => {
    if (readerKnowledge === 'full') return true;
    
    // In progressive mode, check the chapter index
    const chapterIndex = chaptersData.findIndex(ch => ch.id === currentChapter);
    const revealChapterIndex = chaptersData.findIndex(ch => ch.id === mystery.revealedInChapter);
    
    return chapterIndex >= revealChapterIndex;
  };
  
  return (
    <div className="plot-navigator">
      {/* Navigation Controls */}
      <div className="mb-6 space-y-4">
        {/* View Mode Toggle */}
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'chapters' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('chapters')}
          >
            Chapters
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'mysteries' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('mysteries')}
          >
            Mysteries
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              viewMode === 'themes' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setViewMode('themes')}
          >
            Themes
          </button>
        </div>
        
        {/* Reader Knowledge Mode */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Reader Knowledge:</label>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded transition-colors ${
                readerKnowledge === 'progressive' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setReaderKnowledge('progressive')}
            >
              Progressive
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded transition-colors ${
                readerKnowledge === 'full' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setReaderKnowledge('full')}
            >
              Full Knowledge
            </button>
          </div>
        </div>
        
        {/* Chapter Selector for Progressive Mode */}
        {readerKnowledge === 'progressive' && (
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Chapter:</label>
            <div>
              <select 
                className="p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                value={expandedChapter || ''}
                onChange={(e) => setExpandedChapter(e.target.value || null)}
              >
                <option value="">Select a chapter</option>
                {chaptersData.map(chapter => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Content based on view mode */}
      {viewMode === 'chapters' && (
        <div className="space-y-6">
          {chaptersData.map((chapter, index) => (
            <div key={chapter.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Chapter {index + 1}: {chapter.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {chapter.date}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-3">{chapter.summary}</p>
              
              {/* Key Events */}
              {chapter.keyEvents && chapter.keyEvents.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Key Events:</h4>
                  <div className="flex flex-wrap gap-2">
                    {chapter.keyEvents.map(eventId => (
                      <button
                        key={eventId}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 transition-colors"
                        onClick={() => handleEventClick(eventId)}
                      >
                        {getEventTitle(eventId)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Key Characters */}
              {chapter.keyCharacters && chapter.keyCharacters.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Key Characters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {chapter.keyCharacters.map(charId => (
                      <button
                        key={charId}
                        className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 transition-colors"
                        onClick={() => handleCharacterClick(charId)}
                      >
                        {getCharacterName(charId)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {viewMode === 'mysteries' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mysteryElements.map(mystery => {
            const isUnlocked = readerKnowledge === 'full' || 
                              (expandedChapter && isMysteryUnlocked(mystery, expandedChapter));
            
            return (
              <div 
                key={mystery.id}
                className={`border border-gray-200 dark:border-gray-700 p-4 rounded-lg transition-colors ${
                  isUnlocked 
                    ? mystery.status === 'twist' 
                      ? 'bg-purple-50 dark:bg-purple-900/20' 
                      : mystery.status === 'major_plot' 
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <h4 className="font-bold text-gray-900 dark:text-gray-100">{mystery.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">First introduced: Chapter {
                  chaptersData.findIndex(ch => ch.id === mystery.firstMentioned) + 1
                }</p>
                
                {isUnlocked ? (
                  <>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{mystery.description}</p>
                    
                    {/* Related characters */}
                    {mystery.relatedCharacters && mystery.relatedCharacters.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Related Characters:</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mystery.relatedCharacters.map(charId => (
                            <button
                              key={charId}
                              className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                              onClick={() => handleCharacterClick(charId)}
                            >
                              {getCharacterName(charId)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Related events */}
                    {mystery.relatedEvents && mystery.relatedEvents.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Key Events:</div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mystery.relatedEvents.map(eventId => (
                            <button
                              key={eventId}
                              className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                              onClick={() => handleEventClick(eventId)}
                            >
                              {getEventTitle(eventId)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 flex">
                      <span className={`text-xs px-2 py-1 rounded ${
                        mystery.status === 'twist' 
                          ? 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200' 
                          : mystery.status === 'major_plot'
                            ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                            : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                      }`}>
                        {mystery.status === 'twist' 
                          ? 'Major Plot Twist' 
                          : mystery.status === 'major_plot'
                            ? 'Central Plot Element'
                            : 'Revealed Mystery'}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="mt-2 flex items-center">
                    <span className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                      Locked until Chapter {
                        chaptersData.findIndex(ch => ch.id === mystery.revealedInChapter) + 1
                      }
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {viewMode === 'themes' && (
        <div className="space-y-6">
          {themeElements.map(theme => (
            <div key={theme.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{theme.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{theme.description}</p>
              
              {/* Theme manifestations */}
              {theme.manifestations && theme.manifestations.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Manifestations:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {theme.manifestations.map((manifestation, index) => (
                      <li key={index}>{manifestation}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Related characters */}
              {theme.relatedCharacters && theme.relatedCharacters.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Related Characters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {theme.relatedCharacters.map(charId => (
                      <button
                        key={charId}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 transition-colors"
                        onClick={() => handleCharacterClick(charId)}
                      >
                        {getCharacterName(charId)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Related events */}
              {theme.relatedEvents && theme.relatedEvents.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Related Events:</h4>
                  <div className="flex flex-wrap gap-2">
                    {theme.relatedEvents.map(eventId => (
                      <button
                        key={eventId}
                        className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded hover:bg-green-200 dark:hover:bg-green-800 text-green-800 dark:text-green-200 transition-colors"
                        onClick={() => handleEventClick(eventId)}
                      >
                        {getEventTitle(eventId)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlotNavigator;
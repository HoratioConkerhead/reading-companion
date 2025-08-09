import React, { useState, useEffect, useRef } from 'react';

const Timeline = ({ 
  onEventSelect, 
  selectedEvent,
  onCharacterSelect,
  eventsData,
  charactersData,
  locationsData
}) => {
  const [timelineFilter, setTimelineFilter] = useState('all');
  const [characterFilter, setCharacterFilter] = useState('all');
  const [layoutMode, setLayoutMode] = useState('chronological'); // 'chronological' or 'parallel'
  const [zoomLevel, setZoomLevel] = useState(50); // Default zoom level at 50%
  
  // Refs for scrolling
  const timelineRef = useRef(null);
  const eventDetailsRef = useRef(null);
  const timelinePosition = useRef(null);
  
  // Filter events based on selection
  const filteredEvents = eventsData.filter(event => {
    // Filter by time period
    const matchesTimePeriod = (() => {
      if (timelineFilter === 'all') return true;
      if (timelineFilter === 'early' && event.date.includes('193')) return true;
      if (timelineFilter === 'mid' && (event.date.includes('1941') || event.date.includes('1942'))) return true;
      if (timelineFilter === 'late' && (event.date.includes('1943') || event.date.includes('1944'))) return true;
      return false;
    })();
    
    // Filter by character
    const matchesCharacter = (() => {
      if (characterFilter === 'all') return true;
      if (!event.characters) return false;
      return event.characters.some(c => c.characterId === characterFilter);
    })();
    
    return matchesTimePeriod && matchesCharacter;
  });
  
  // Sort events chronologically
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    // Extract years or use default values for sorting
    const extractYear = (dateStr) => {
      const match = dateStr.match(/\d{4}/);
      return match ? parseInt(match[0]) : 1900;
    };
    
    const yearA = extractYear(a.date);
    const yearB = extractYear(b.date);
    
    if (yearA !== yearB) return yearA - yearB;
    
    // If years are the same, sort by month if available
    const monthOrder = {
      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
      'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
    };
    
    const extractMonth = (dateStr) => {
      for (const month in monthOrder) {
        if (dateStr.includes(month)) return monthOrder[month];
      }
      return 0;
    };
    
    const monthA = extractMonth(a.date);
    const monthB = extractMonth(b.date);
    
    return monthA - monthB;
  });
  
  // Group events by year for visual organization
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const year = event.date.match(/\d{4}/) ? event.date.match(/\d{4}/)[0] : 'Unknown';
    if (!groups[year]) groups[year] = [];
    groups[year].push(event);
    return groups;
  }, {});
  
  // For parallel storylines view, group by character faction
  const getCharacterGroup = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    return character ? character.group : 'Unknown';
  };
  
  const parallelEvents = (() => {
    const groups = {
      'Protagonists': [],
      'Fifth Columnists': [],
      'German Connection': []
    };
    
    filteredEvents.forEach(event => {
      if (!event.characters) return;
      
      // Determine primary group for this event
      const characterGroups = event.characters.map(c => getCharacterGroup(c.characterId));
      const primaryGroup = (() => {
        const groupCounts = {};
        characterGroups.forEach(group => {
          groupCounts[group] = (groupCounts[group] || 0) + 1;
        });
        
        // Return the most common group, or 'Protagonists' as default
        const maxGroup = Object.keys(groupCounts).reduce((a, b) => 
          groupCounts[a] > groupCounts[b] ? a : b
        );
        return groups[maxGroup] ? maxGroup : 'Protagonists';
      })();
      
      if (groups[primaryGroup]) {
        groups[primaryGroup].push(event);
      }
    });
    
    return groups;
  })();
  
  // Handle event selection
  const handleEventSelect = (event) => {
    onEventSelect(event);
  };
  
  // Handle back to timeline view
  const handleBackToTimeline = () => {
    onEventSelect(null);
  };
  
  // Handle previous event navigation
  const handlePreviousEvent = () => {
    if (!selectedEvent) return;
    
    const currentIndex = sortedEvents.findIndex(e => e.id === selectedEvent.id);
    if (currentIndex > 0) {
      onEventSelect(sortedEvents[currentIndex - 1]);
    }
  };
  
  // Handle next event navigation
  const handleNextEvent = () => {
    if (!selectedEvent) return;
    
    const currentIndex = sortedEvents.findIndex(e => e.id === selectedEvent.id);
    if (currentIndex < sortedEvents.length - 1) {
      onEventSelect(sortedEvents[currentIndex + 1]);
    }
  };
  
  return (
    <div className="timeline-container">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Timeline</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore the chronological sequence of events in the book.
        </p>
      </div>
      
      {/* Timeline Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Period</label>
          <div className="flex">
            <button 
              className={`px-3 py-1 text-sm rounded-l transition-colors ${
                timelineFilter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setTimelineFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-sm transition-colors ${
                timelineFilter === 'early' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setTimelineFilter('early')}
            >
              1932-1939
            </button>
            <button 
              className={`px-3 py-1 text-sm transition-colors ${
                timelineFilter === 'mid' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setTimelineFilter('mid')}
            >
              1940-1942
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r transition-colors ${
                timelineFilter === 'late' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setTimelineFilter('late')}
            >
              1943-1944
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">View</label>
          <div className="flex">
            <button 
              className={`px-3 py-1 text-sm rounded-l transition-colors ${
                layoutMode === 'chronological' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setLayoutMode('chronological')}
            >
              Chronological
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r transition-colors ${
                layoutMode === 'parallel' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setLayoutMode('parallel')}
            >
              Parallel Storylines
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Character</label>
          <select 
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={characterFilter}
            onChange={(e) => setCharacterFilter(e.target.value)}
          >
            <option value="all">All Characters</option>
            <optgroup label="Protagonists">
              {charactersData
                .filter(c => c.group === 'Protagonists')
                .map(character => (
                  <option key={character.id} value={character.id}>{character.name}</option>
                ))
              }
            </optgroup>
            <optgroup label="Fifth Columnists">
              {charactersData
                .filter(c => c.group === 'Fifth Columnists')
                .map(character => (
                  <option key={character.id} value={character.id}>{character.name}</option>
                ))
              }
            </optgroup>
            <optgroup label="German Connection">
              {charactersData
                .filter(c => c.group === 'German Connection')
                .map(character => (
                  <option key={character.id} value={character.id}>{character.name}</option>
                ))
              }
            </optgroup>
          </select>
        </div>
      </div>
      
      {/* Chronological Timeline View */}
      {layoutMode === 'chronological' && (
        <>
          {/* 
            Interactive Timeline - Modified for better positioning
            
            ADJUSTABLE PARAMETERS:
            1. timeline-container height: change "h-32" to increase/decrease the container height
            2. Timeline line position: change "top-24" to adjust where the line sits vertically
            3. Dot position: change "top-24" in the dot style to align with the line
            4. Label position: change "pt-6" to adjust the vertical position of date labels
          */}
          <div className="overflow-x-auto mb-4 relative h-40 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded w-full"> {/* Added width constraint */}
            <div className="w-max h-full max-w-[2000px]"> {/* Changed min-w-max to w-max with a max width */}
              <div className="relative h-full">
                {/* Timeline line - positioned near the bottom */}
                <div className="absolute left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 top-28"></div> {/* Line position - change top-24 to move up/down */}
                
                {/* Timeline events */}
                <div className="flex h-full">
                  {sortedEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      className="relative px-4 h-full" /* Further reduced horizontal spacing */
                      onClick={() => handleEventSelect(event)}
                    >
                      {/* Dot - positioned to match the line */}
                      <div 
                        className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-200 hover:scale-125 ${
                          selectedEvent?.id === event.id 
                            ? 'ring-4 ring-blue-400 dark:ring-blue-500' 
                            : ''
                        }`}
                        style={{
                          top: '26px', /* Dot position - change to align with line */
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: getEventColor(event, charactersData)
                        }}
                      ></div>
                      
                      {/* Event label */}
                      <div className="absolute pt-6 text-center w-full">
                        <div className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Details Panel */}
          {selectedEvent ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{selectedEvent.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedEvent.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    onClick={handlePreviousEvent}
                    disabled={sortedEvents.findIndex(e => e.id === selectedEvent.id) === 0}
                  >
                    Previous
                  </button>
                  <button 
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    onClick={handleNextEvent}
                    disabled={sortedEvents.findIndex(e => e.id === selectedEvent.id) === sortedEvents.length - 1}
                  >
                    Next
                  </button>
                  <button 
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={handleBackToTimeline}
                  >
                    Back to Timeline
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h4>
                  <p className="text-gray-700 dark:text-gray-300">{selectedEvent.description}</p>
                  
                  {selectedEvent.location && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Location</h4>
                      <div className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {getLocationName(selectedEvent.location, locationsData)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {getLocationArea(selectedEvent.location, locationsData)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  {selectedEvent.characters && selectedEvent.characters.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Characters Involved</h4>
                      <div className="space-y-2">
                        {selectedEvent.characters.map((charRef, index) => {
                          const character = charactersData.find(c => c.id === charRef.characterId);
                          return character ? (
                            <div 
                              key={index}
                              className="p-2 border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => onCharacterSelect(character)}
                            >
                              <div className="font-medium text-gray-900 dark:text-gray-100">{character.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{charRef.role || 'Participant'}</div>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.consequences && selectedEvent.consequences.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Consequences</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        {selectedEvent.consequences.map((consequence, index) => (
                          <li key={index}>{consequence}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">Select an event from the timeline to view details</p>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Parallel Storylines View */}
      {layoutMode === 'parallel' && (
        <div className="space-y-6">
          {Object.entries(parallelEvents).map(([group, events]) => (
            <div key={group} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{group}</h3>
              <div className="space-y-3">
                {events.map(event => (
                  <div 
                    key={event.id}
                    className="p-3 border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => handleEventSelect(event)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{event.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{event.date}</div>
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getEventColor(event, charactersData) }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper functions
const getLocationName = (locationId, locationsData) => {
  const location = locationsData.find(l => l.id === locationId);
  return location ? location.name : locationId;
};

const getLocationArea = (locationId, locationsData) => {
  const location = locationsData.find(l => l.id === locationId);
  return location ? location.area : '';
};

const getEventColor = (event, charactersData) => {
  if (!event.characters || event.characters.length === 0) return '#6b7280';
  
  // Determine color based on character groups involved
  const groups = event.characters.map(c => {
    const character = charactersData.find(char => char.id === c.characterId);
    return character ? character.group : 'Unknown';
  });
  
  // Return color based on primary group
  if (groups.includes('Protagonists')) return '#3182ce'; // Blue
  if (groups.includes('Fifth Columnists')) return '#e53e3e'; // Red
  if (groups.includes('German Connection')) return '#d69e2e'; // Yellow
  
  return '#6b7280'; // Gray
};

const getGroupColor = (group) => {
  switch (group) {
    case 'Protagonists':
      return 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    case 'Fifth Columnists':
      return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200';
    case 'German Connection':
      return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    default:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

export default Timeline;
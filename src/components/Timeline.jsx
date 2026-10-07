import React, { useState, useEffect, useRef } from 'react';
import { getLocationName as _getLocationName, getLocationArea as _getLocationArea } from '../utils/dataAccessors';
import { getBookConfig, eventInPeriod, getEventGroupColor, extractYear } from '../utils/bookConfig';

const Timeline = ({ 
  onEventSelect, 
  selectedEvent,
  onCharacterSelect,
  eventsData,
  charactersData,
  locationsData,
  chaptersData = [],
  bookConfig = getBookConfig()
}) => {
  const [timelineFilter, setTimelineFilter] = useState('all'); // 'all' or a time period id
  const [characterFilter, setCharacterFilter] = useState('all');
  const [layoutMode, setLayoutMode] = useState('chronological'); // 'chronological' or 'parallel'
  
  // Ref for scrolling the event strip
  const timelineRef = useRef(null);
  const selectedPeriod = bookConfig.timePeriods.find(p => p.id === timelineFilter) || null;
  const getEventColor = (event) => getEventGroupColor(event, charactersData, bookConfig);
  
  // Filter events based on selection
  const filteredEvents = eventsData.filter(event => {
    // Filter by time period
    const matchesTimePeriod = eventInPeriod(event, selectedPeriod);
    
    // Filter by character
    const matchesCharacter = (() => {
      if (characterFilter === 'all') return true;
      if (!event.characters) return false;
      return event.characters.some(c => c.characterId === characterFilter);
    })();
    
    return matchesTimePeriod && matchesCharacter;
  });
  
  // Sort events chronologically
  // Story order (by chapter), used to place events whose date has no year
  const chapterIndex = new Map(chaptersData.map((ch, index) => [ch.id, index]));
  const storyIndex = (event) => chapterIndex.get(event.introducedInChapter || event.chapter) ?? Number.MAX_SAFE_INTEGER;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const extractMonth = (dateStr) => {
    const index = MONTHS.findIndex(month => (dateStr || '').includes(month));
    return index === -1 ? null : index + 1;
  };
  // An event without a year ("May 27, unknown year") takes the year of the last fully
  // dated (month and year) event before it in the story, rather than sorting first
  const yearByEventId = new Map();
  let lastDatedYear = null;
  [...filteredEvents].sort((a, b) => storyIndex(a) - storyIndex(b)).forEach(event => {
    const year = extractYear(event.date);
    if (year !== null && extractMonth(event.date) !== null) lastDatedYear = year;
    yearByEventId.set(event.id, year ?? lastDatedYear ?? Number.MAX_SAFE_INTEGER);
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const yearA = yearByEventId.get(a.id);
    const yearB = yearByEventId.get(b.id);
    
    if (yearA !== yearB) return yearA - yearB;
    
    // Same year: by month when both have one, otherwise in story order
    const monthA = extractMonth(a.date);
    const monthB = extractMonth(b.date);
    if (monthA !== null && monthB !== null && monthA !== monthB) return monthA - monthB;
    return storyIndex(a) - storyIndex(b);
  });
  
  // For parallel storylines view, group by character faction
  const getCharacterGroup = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    return character ? character.group : 'Unknown';
  };
  
  // Parallel storylines: one column per character group, each event under the group
  // most represented among its characters
  const parallelEvents = (() => {
    const groups = Object.fromEntries(bookConfig.groups.map(g => [g.name, []]));
    filteredEvents.forEach(event => {
      if (!event.characters || event.characters.length === 0) return;
      const groupCounts = {};
      event.characters.forEach(c => {
        const group = getCharacterGroup(c.characterId);
        if (groups[group]) groupCounts[group] = (groupCounts[group] || 0) + 1;
      });
      const primaryGroup = Object.keys(groupCounts).reduce(
        (best, group) => (best === null || groupCounts[group] > groupCounts[best] ? group : best), null
      );
      if (primaryGroup) groups[primaryGroup].push(event);
    });
    // Only groups that have events
    return Object.fromEntries(Object.entries(groups).filter(([, events]) => events.length > 0));
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

  // Keep the selected event visible in the scrolling strip (e.g. after Previous/Next)
  useEffect(() => {
    const strip = timelineRef.current;
    if (!strip || !selectedEvent) return;
    const item = strip.querySelector(`[data-event-id="${selectedEvent.id}"]`);
    if (!item) return;
    const left = item.offsetLeft;
    const right = left + item.offsetWidth;
    if (left < strip.scrollLeft || right > strip.scrollLeft + strip.clientWidth) {
      strip.scrollLeft = left - (strip.clientWidth - item.offsetWidth) / 2;
    }
  }, [selectedEvent]);
  
  return (
    <div className="timeline-container">
      <div className="mb-6">
        
        <p className="text-gray-600 dark:text-gray-400">
          Explore the chronological sequence of events in the book.
        </p>
      </div>
      
      {/* Timeline Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {bookConfig.timePeriods.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Period</label>
            <div className="flex">
              {[{ id: 'all', label: 'All' }, ...bookConfig.timePeriods].map((period, index, all) => (
                <button
                  key={period.id}
                  className={`px-3 py-1 text-sm transition-colors ${index === 0 ? 'rounded-l' : ''} ${index === all.length - 1 ? 'rounded-r' : ''} ${
                    timelineFilter === period.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setTimelineFilter(period.id)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
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
            {bookConfig.groups
              .filter(group => charactersData.some(c => c.group === group.name))
              .map(group => (
                <optgroup key={group.name} label={group.name}>
                  {charactersData
                    .filter(c => c.group === group.name)
                    .map(character => (
                      <option key={character.id} value={character.id}>{character.name}</option>
                    ))
                  }
                </optgroup>
              ))
            }
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
          <div ref={timelineRef} className="overflow-x-auto mb-4 relative h-40 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded w-full"> {/* Added width constraint */}
            <div className="w-max min-w-full h-full"> {/* Grows with the events; the container scrolls sideways */}
              <div className="relative h-full">
                {/* Timeline line - positioned near the bottom */}
                <div className="absolute left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 top-28"></div> {/* Line position - change top-24 to move up/down */}
                
                {/* Timeline events */}
                <div className="flex h-full">
                  {sortedEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      data-event-id={event.id}
                      // Fixed width: the labels are absolutely positioned, so they don't size the column
                      className="relative w-28 flex-shrink-0 h-full cursor-pointer"
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
                          top: '106px', /* Centred on the line (top-28 = 112px, 4px tall); labels sit above */
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: getEventColor(event)
                        }}
                      ></div>
                      
                      {/* Event label */}
                      <div className="absolute pt-3 text-center w-full px-1">
                        <div
                          className="text-xs font-medium text-gray-900 dark:text-gray-100"
                          title={event.title}
                          // Two-line clamp (Tailwind 3.2 has no line-clamp utility)
                          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                        >
                          {event.title}
                        </div>
                        <div
                          className="text-xs text-gray-500 dark:text-gray-400"
                          title={event.date}
                          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                        >
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
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{selectedEvent.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{selectedEvent.date}</p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
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
                        style={{ backgroundColor: getEventColor(event) }}
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
const getLocationName = _getLocationName;
const getLocationArea = _getLocationArea;

export default Timeline;

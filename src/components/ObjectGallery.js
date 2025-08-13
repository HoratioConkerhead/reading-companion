import React, { useState } from 'react';
const ObjectGallery = ({ 
  onObjectSelect, 
  selectedObject,
  objectsData,
  charactersData,
  eventsData
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter objects based on search
  const filteredObjects = objectsData.filter(object => 
    object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    object.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
  
  // Helper to format time periods
  const formatTimePeriod = (period) => {
    return period.charAt(0).toUpperCase() + period.slice(1).replace(/_/g, ' ');
  };
  
  return (
    <div className="object-gallery">
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Explore the significant objects that play important roles in the novel's plot.
        </p>
      </div>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search objects..." 
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-128 overflow-y-auto pr-4">
          {filteredObjects.map(object => (
            <div 
              key={object.id}
              className={`p-3 mb-3 border rounded cursor-pointer transition-colors ${
                selectedObject?.id === object.id 
                  ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => onObjectSelect(object)}
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100">{object.name}</h3>
              <div className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 inline-block mt-1">
                {object.type}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{object.description}</p>
            </div>
          ))}
        </div>
        
        <div className="md:col-span-2">
          {selectedObject ? (
            <div>
              <div className="border border-gray-200 dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-800 mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedObject.name}</h2>
                <div className="text-sm px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 inline-block mt-1">
                  {selectedObject.type}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded mb-4 overflow-hidden">
                    <div className="h-64 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400 p-4 text-center">
                        {selectedObject.image_description || "No image available"}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-900 dark:text-gray-100">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedObject.description}</p>
                  
                  {selectedObject.physical_details && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Physical Details</h3>
                      <p className="text-gray-700 dark:text-gray-300">{selectedObject.physical_details}</p>
                    </>
                  )}
                  
                  {selectedObject.technical_details && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Technical Details</h3>
                      <p className="text-gray-700 dark:text-gray-300">{selectedObject.technical_details}</p>
                    </>
                  )}
                  
                  {selectedObject.significance && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Significance</h3>
                      <p className="text-gray-700 dark:text-gray-300">{selectedObject.significance}</p>
                    </>
                  )}
                </div>
                
                <div>
                  {selectedObject.owner && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-900 dark:text-gray-100">Owner</h3>
                      <div className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {getCharacterName(selectedObject.owner)}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedObject.location && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Location</h3>
                      <div className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {selectedObject.location}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedObject.time_period && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Time Period</h3>
                      <div className="p-2 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {formatTimePeriod(selectedObject.time_period)}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedObject.related_events && selectedObject.related_events.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Related Events</h3>
                      <div className="space-y-2">
                        {selectedObject.related_events.map(eventId => (
                          <div 
                            key={eventId}
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              const event = eventsData.find(e => e.id === eventId);
                              if (event) {
                                // You'll need to add onEventSelect prop to this component
                                // onEventSelect(event);
                              }
                            }}
                          >
                            <div className="font-medium text-gray-900 dark:text-gray-100">{getEventTitle(eventId)}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {selectedObject.related_characters && selectedObject.related_characters.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Related Characters</h3>
                      <div className="space-y-2">
                        {selectedObject.related_characters.map(characterId => (
                          <div 
                            key={characterId}
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              const character = charactersData.find(c => c.id === characterId);
                              if (character) {
                                // You'll need to add onCharacterSelect prop to this component
                                // onCharacterSelect(character);
                              }
                            }}
                          >
                            <div className="font-medium text-gray-900 dark:text-gray-100">{getCharacterName(characterId)}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">Select an object to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObjectGallery;


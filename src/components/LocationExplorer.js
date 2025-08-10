import React, { useState } from 'react';
const LocationExplorer = ({ 
  onLocationSelect, 
  selectedLocation, 
  onEventSelect,
  locationsData,
  eventsData,
  charactersData
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationTypeFilter, setLocationTypeFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  
  // Extract unique location types and areas for filters
  const locationTypes = Array.from(new Set(locationsData.map(loc => loc.type)));
  const locationAreas = Array.from(new Set(locationsData.map(loc => loc.area)));
  
  // Filter locations based on search and filters
  const filteredLocations = locationsData.filter(location => {
    const matchesSearch = 
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (location.description && location.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (location.area && location.area.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = locationTypeFilter === 'all' || location.type === locationTypeFilter;
    const matchesArea = areaFilter === 'all' || location.area === areaFilter;
    
    return matchesSearch && matchesType && matchesArea;
  });
  
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
  
  // Get events related to a location
  const getLocationEvents = (locationId) => {
    return eventsData.filter(event => event.location === locationId);
  };
  
  return (
    <div className="location-explorer">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Location Explorer</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore the significant locations in the book where key events took place.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search locations..." 
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location Type</label>
              <select 
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                value={locationTypeFilter}
                onChange={(e) => setLocationTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                {locationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Area</label>
              <select 
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
              >
                <option value="all">All Areas</option>
                {locationAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="h-128 overflow-y-auto pr-2">
            {filteredLocations.map(location => (
              <div 
                key={location.id}
                className={`p-3 mb-3 border rounded cursor-pointer transition-colors ${
                  selectedLocation?.id === location.id 
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => onLocationSelect(location)}
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100">{location.name}</h3>
                <div className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 inline-block mt-1">
                  {location.type}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{location.area}</div>
                
                {getLocationEvents(location.id).length > 0 && (
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    {getLocationEvents(location.id).length} related events
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedLocation ? (
            <div>
              <div className="border border-gray-200 dark:border-gray-700 rounded p-4 mb-4 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedLocation.name}</h2>
                <div className="text-gray-600 dark:text-gray-400">{selectedLocation.area}</div>
                <div className="mt-2 px-2 py-1 inline-block rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                  {selectedLocation.type}
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded mb-4 overflow-hidden">
                <div className="h-64 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 p-4 text-center">
                    Location image would be displayed here in a full implementation. This would show a 
                    period-appropriate illustration or photo of {selectedLocation.name}.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-900 dark:text-gray-100">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedLocation.description || "No detailed description available."}</p>
                  
                  {selectedLocation.features && selectedLocation.features.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Key Features</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        {selectedLocation.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {selectedLocation.rooms && selectedLocation.rooms.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Notable Rooms/Areas</h3>
                      <div className="space-y-2">
                        {selectedLocation.rooms.map((room, index) => (
                          <div key={index} className="border-l-4 border-blue-200 dark:border-blue-600 pl-3">
                            <div className="font-medium text-gray-900 dark:text-gray-100">{room.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{room.significance}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div>
                  {selectedLocation.significance && selectedLocation.significance.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-900 dark:text-gray-100">Significance</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        {selectedLocation.significance.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {getLocationEvents(selectedLocation.id).length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 mt-4 text-gray-900 dark:text-gray-100">Related Events</h3>
                      <div className="space-y-2">
                        {getLocationEvents(selectedLocation.id).map(event => (
                          <div 
                            key={event.id}
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => onEventSelect(event)}
                          >
                            <div className="font-medium text-gray-900 dark:text-gray-100">{event.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{event.date}</div>
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
                <p className="text-lg">Select a location to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationExplorer;


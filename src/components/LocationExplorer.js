import React, { useState } from 'react';
import { locationsData, eventsData, charactersData } from '../data/mockData';

const LocationExplorer = ({ onLocationSelect, selectedLocation, onEventSelect }) => {
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
        <h2 className="text-2xl font-bold mb-2">Location Explorer</h2>
        <p className="text-gray-600">
          Explore the significant locations in "Stitched Up" where key events took place.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search locations..." 
              className="w-full p-2 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
              <select 
                className="w-full p-2 border rounded"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <select 
                className="w-full p-2 border rounded"
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
                className={`p-3 mb-3 border rounded cursor-pointer hover:bg-gray-100 ${selectedLocation?.id === location.id ? 'bg-blue-100 border-blue-300' : ''}`}
                onClick={() => onLocationSelect(location)}
              >
                <h3 className="font-bold">{location.name}</h3>
                <div className="text-xs px-2 py-1 rounded bg-gray-200 inline-block mt-1">
                  {location.type}
                </div>
                <div className="text-sm text-gray-600 mt-1">{location.area}</div>
                
                {getLocationEvents(location.id).length > 0 && (
                  <div className="mt-2 text-xs text-blue-600">
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
              <div className="border rounded p-4 mb-4 bg-gray-100">
                <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
                <div className="text-gray-600">{selectedLocation.area}</div>
                <div className="mt-2 px-2 py-1 inline-block rounded bg-gray-200 text-sm">
                  {selectedLocation.type}
                </div>
              </div>
              
              <div className="border rounded mb-4 overflow-hidden">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  <p className="text-gray-500 p-4 text-center">
                    Location image would be displayed here in a full implementation. This would show a 
                    period-appropriate illustration or photo of {selectedLocation.name}.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Description</h3>
                  <p>{selectedLocation.description || "No detailed description available."}</p>
                  
                  {selectedLocation.features && selectedLocation.features.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Key Features</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedLocation.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {selectedLocation.rooms && selectedLocation.rooms.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Notable Rooms/Areas</h3>
                      <div className="space-y-2">
                        {selectedLocation.rooms.map((room, index) => (
                          <div key={index} className="border-l-4 border-blue-200 pl-3">
                            <div className="font-medium">{room.name}</div>
                            <div className="text-sm text-gray-600">{room.significance}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                <div>
                  {selectedLocation.significance && selectedLocation.significance.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2">Significance</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedLocation.significance.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {selectedLocation.proximity && selectedLocation.proximity.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Nearby Locations</h3>
                      <div className="space-y-2">
                        {selectedLocation.proximity.map((item, index) => {
                          const connectedLocation = locationsData.find(l => l.id === item.locationId);
                          return connectedLocation ? (
                            <div 
                              key={index} 
                              className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
                              onClick={() => onLocationSelect(connectedLocation)}
                            >
                              <div className="font-medium">{connectedLocation.name}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                          ) : (
                            <div key={index} className="p-2 border rounded">
                              <div className="font-medium">{item.locationId}</div>
                              <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                  
                  {selectedLocation.occupants && selectedLocation.occupants.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Occupants</h3>
                      <div className="space-y-2">
                        {selectedLocation.occupants.map((occupant, index) => (
                          <div key={index} className="p-2 border rounded">
                            <div className="font-medium">{getCharacterName(occupant.characterId)}</div>
                            <div className="text-sm text-gray-600">{occupant.relationship}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Events at this location */}
              {getLocationEvents(selectedLocation.id).length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Key Events at This Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getLocationEvents(selectedLocation.id).map(event => (
                      <div 
                        key={event.id}
                        className="p-3 border rounded cursor-pointer hover:bg-gray-100"
                        onClick={() => onEventSelect(event)}
                      >
                        <div className="text-sm text-gray-600">{event.date}</div>
                        <h4 className="font-bold">{event.title}</h4>
                        <p className="text-sm mt-1 line-clamp-2">{event.description}</p>
                        
                        {event.characters && event.characters.length > 0 && (
                          <div className="mt-2 text-xs text-gray-500">
                            Characters: {event.characters.length}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Location in the Story */}
              {selectedLocation.events && selectedLocation.events.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Role in Story</h3>
                  <div className="space-y-2">
                    {selectedLocation.events.map((eventRef, index) => {
                      const event = eventsData.find(e => e.id === eventRef.eventId);
                      return event ? (
                        <div 
                          key={index}
                          className="p-3 border-l-4 border-blue-300 pl-3 hover:bg-blue-50 cursor-pointer"
                          onClick={() => onEventSelect(event)}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-gray-600">{event.date}</div>
                          </div>
                          <div className="text-sm text-blue-600">{eventRef.role || "Setting"}</div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full border rounded p-12 text-center">
              <p className="text-gray-500 mb-4">Select a location from the list to view details</p>
              <p className="text-sm text-gray-400">
                Locations include country houses, hotels, military facilities, and other sites 
                central to the "Stitched Up" narrative.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationExplorer;


import React, { useState, useEffect } from 'react';
const InteractiveMap = ({ 
  onLocationSelect, 
  onEventSelect,
  locationsData,
  eventsData
}) => {
  const [mapMode, setMapMode] = useState('locations'); // 'locations', 'events', 'characters'
  const [timeFilter, setTimeFilter] = useState('all');
  const [hoveredLocation, setHoveredLocation] = useState(null);

  // For a real implementation, we would use a mapping library like Leaflet
  // This is a simplified version showing the concept

  const handleLocationClick = (locationId) => {
    const location = locationsData.find(loc => loc.id === locationId);
    onLocationSelect(location);
  };

  const handleEventMarkerClick = (eventId) => {
    const event = eventsData.find(e => e.id === eventId);
    onEventSelect(event);
  };

  // Get locations with associated events in the selected time period
  const getFilteredLocations = () => {
    if (timeFilter === 'all') return locationsData;
    
    const filteredEvents = eventsData.filter(event => {
      // Simple filtering - in a real app we'd have more sophisticated date parsing
      if (timeFilter === 'early' && event.date.includes('193')) return true;
      if (timeFilter === 'mid' && event.date.includes('194')) return true;
      if (timeFilter === 'late' && (event.date.includes('1943') || event.date.includes('1944'))) return true;
      return false;
    });
    
    const eventLocationIds = new Set(filteredEvents.map(e => e.location).filter(Boolean));
    return locationsData.filter(loc => eventLocationIds.has(loc.id));
  };

  return (
    <div className="map-container">
      <div className="map-controls flex mb-4 space-x-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Map View</label>
          <div className="flex">
            <button 
              className={`px-3 py-1 text-sm rounded-l ${mapMode === 'locations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapMode('locations')}
            >
              Locations
            </button>
            <button 
              className={`px-3 py-1 text-sm ${mapMode === 'events' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapMode('events')}
            >
              Events
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r ${mapMode === 'characters' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapMode('characters')}
            >
              Characters
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
          <div className="flex">
            <button 
              className={`px-3 py-1 text-sm rounded-l ${timeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeFilter === 'early' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeFilter('early')}
            >
              1932-1939
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeFilter === 'mid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeFilter('mid')}
            >
              1940-1942
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r ${timeFilter === 'late' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setTimeFilter('late')}
            >
              1943-1944
            </button>
          </div>
        </div>
      </div>
      
      <div className="map-display relative border rounded overflow-hidden" style={{ height: '500px' }}>
        {/* This would be a real map in production */}
        <div className="w-full h-full bg-blue-50 flex items-center justify-center text-gray-400">
          <div className="relative w-full h-full">
            {/* UK Map Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="80%" height="80%" viewBox="0 0 300 500">
                {/* Simplified UK outline */}
                <path 
                  d="M100,50 L150,30 L200,50 L230,100 L250,150 L200,200 L220,250 L200,300 L150,350 L100,300 L80,250 L50,150 L100,50" 
                  fill="#e5e5e5" 
                  stroke="#ccc" 
                  strokeWidth="2"
                />
                
                {/* Add Channel */}
                <path 
                  d="M150,350 L250,400" 
                  stroke="#a4caf5" 
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                
                {/* Add simplified Germany */}
                <rect x="250" y="150" width="40" height="60" fill="#e5e5e5" stroke="#ccc" />
                
                {/* Location markers */}
                {getFilteredLocations().map((location, index) => {
                  // Simplified positioning - in a real app we'd use actual coordinates
                  const positions = {
                    'cynthia_house': { x: 150, y: 200 },
                    'denleigh_manor': { x: 130, y: 220 },
                    'hotel_adlon': { x: 270, y: 180 },
                    'imperial_aggregates': { x: 180, y: 250 },
                    'scilly_isles': { x: 50, y: 300 },
                    'churn_ranges': { x: 140, y: 210 },
                    'crawford_place': { x: 170, y: 240 },
                    'bucklebury_camp': { x: 155, y: 195 }
                  };
                  
                  const pos = positions[location.id] || { x: 100 + (index * 20), y: 100 + (index * 20) };
                  
                  return (
                    <g 
                      key={location.id} 
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => handleLocationClick(location.id)}
                      onMouseEnter={() => setHoveredLocation(location.id)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle 
                        r={hoveredLocation === location.id ? 8 : 6} 
                        fill={location.id === 'hotel_adlon' ? "#d69e2e" : "#3182ce"}
                        stroke="#fff"
                        strokeWidth="1"
                      />
                      {hoveredLocation === location.id && (
                        <text 
                          x="10" 
                          y="4" 
                          fontSize="12" 
                          fill="#333"
                        >
                          {location.name}
                        </text>
                      )}
                    </g>
                  );
                })}
                
                {/* Event markers (only shown in events mode) */}
                {mapMode === 'events' && eventsData
                  .filter(event => {
                    if (timeFilter === 'all') return true;
                    if (timeFilter === 'early' && event.date.includes('193')) return true;
                    if (timeFilter === 'mid' && event.date.includes('194')) return true;
                    if (timeFilter === 'late' && (event.date.includes('1943') || event.date.includes('1944'))) return true;
                    return false;
                  })
                  .map((event, index) => {
                    const locationId = event.location;
                    if (!locationId) return null;
                    
                    // Simplified positioning - in a real app we'd use actual coordinates
                    const positions = {
                      'cynthia_house': { x: 150, y: 200 },
                      'denleigh_manor': { x: 130, y: 220 },
                      'hotel_adlon': { x: 270, y: 180 },
                      'imperial_aggregates': { x: 180, y: 250 },
                      'scilly_isles': { x: 50, y: 300 },
                      'churn_ranges': { x: 140, y: 210 },
                      'crawford_place': { x: 170, y: 240 },
                      'bucklebury_camp': { x: 155, y: 195 }
                    };
                    
                    const pos = positions[locationId] || { x: 100, y: 100 };
                    
                    // Offset the marker to avoid overlap
                    pos.x += (index % 3) * 5;
                    pos.y += (index % 3) * 5;
                    
                    return (
                      <g 
                        key={event.id} 
                        transform={`translate(${pos.x}, ${pos.y})`}
                        onClick={() => handleEventMarkerClick(event.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect 
                          x="-4" 
                          y="-4" 
                          width="8" 
                          height="8" 
                          fill="#e53e3e"
                          stroke="#fff"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
              </svg>
            </div>
            
            {/* Map Legend */}
            <div className="absolute bottom-0 left-0 p-4 bg-white bg-opacity-80 rounded-tr">
              <h3 className="text-sm font-bold mb-2">Legend</h3>
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 mr-2 rounded-full bg-blue-500"></div>
                <span className="text-xs">UK Locations</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 mr-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs">German Locations</span>
              </div>
              {mapMode === 'events' && (
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 bg-red-500"></div>
                  <span className="text-xs">Events</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 p-2 border-t">
        <p>This interactive map shows key locations from the novel. In a full implementation, this would use a historical map of 1930s-40s Europe with accurate location plotting.</p>
      </div>
    </div>
  );
};

export default InteractiveMap;


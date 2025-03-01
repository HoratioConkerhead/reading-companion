import React, { useState, useEffect, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Tooltip, 
  Polyline, 
  CircleMarker,
  useMap,
  ZoomControl
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import position data
import { 
  locationPositions, 
  eventPositions, 
  characterPositions, 
  objectPositions,
  mapBoundaries
} from '../data/stitchedUp/positions';

// Fix Leaflet's default icon paths which can cause issues in some build setups
// This is needed because Leaflet's CSS assumes these images are in specific locations
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icon for locations
const locationIcon = (color) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>`,
  className: 'custom-div-icon',
  iconSize: [14, 14],
  iconAnchor: [7, 7]
});

// Custom icon for events
const eventIcon = (isSelected = false) => L.divIcon({
  html: `<div style="background-color: ${isSelected ? '#9f1239' : '#e53e3e'}; width: 12px; height: 12px; border: 2px solid white;"></div>`,
  className: 'custom-div-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Custom icon for characters (triangle)
const characterIcon = (color, isSelected = false) => L.divIcon({
  html: `
    <div style="
      width: 0; 
      height: 0; 
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 14px solid ${color};
      transform: ${isSelected ? 'scale(1.3)' : 'scale(1)'};
    "></div>
  `,
  className: 'custom-div-icon',
  iconSize: [16, 14],
  iconAnchor: [8, 7]
});

// Custom icon for objects
const objectIcon = (isSelected = false) => L.divIcon({
  html: `
    <div style="
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #805ad5;
      border: 2px solid white;
      transform: ${isSelected ? 'scale(1.3)' : 'scale(1)'};
    "></div>
  `,
  className: 'custom-div-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Map Controller component to handle view changes externally
const MapController = ({ center, zoom, bounds, selectedItem }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (center) {
      map.setView(center, zoom || 8);
    }
  }, [map, center, zoom, bounds, selectedItem]);
  
  return null;
};

const InteractiveMap = ({ 
  onLocationSelect, 
  onEventSelect,
  locationsData,
  eventsData,
  charactersData,
  objectsData
}) => {
  // State
  const [mapMode, setMapMode] = useState('all'); // 'all', 'locations', 'events', 'characters', 'objects'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'early', 'mid', 'late'
  const [mapView, setMapView] = useState('uk'); // 'uk', 'europe'
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [mapCenter, setMapCenter] = useState([52.3555, -1.1743]); // Default to UK center
  const [mapZoom, setMapZoom] = useState(6);
  const [mapBounds, setMapBounds] = useState(null);
  
  // Get map view settings based on selected view
  useEffect(() => {
    if (mapView === 'uk') {
      setMapCenter([54, -4]);
      setMapZoom(6);
      setMapBounds([
        [49.5, -8.0], // Southwest
        [59.0, 2.0]   // Northeast
      ]);
    } else if (mapView === 'europe') {
      setMapCenter([50, 4]);
      setMapZoom(5);
      setMapBounds([
        [47.0, -8.0], // Southwest
        [59.0, 15.0]  // Northeast
      ]);
    }
  }, [mapView]);
  
  // Filter events based on time period
  const filteredEvents = eventsData.filter(event => {
    if (timeFilter === 'all') return true;
    if (timeFilter === 'early' && event.date.includes('193')) return true;
    if (timeFilter === 'mid' && event.date.includes('194') && !event.date.includes('1943')) return true;
    if (timeFilter === 'late' && (event.date.includes('1943') || event.date.includes('1944'))) return true;
    return false;
  });
  
  // Handle location click
  const handleLocationClick = (locationId) => {
    const location = locationsData.find(loc => loc.id === locationId);
    if (location) {
      setSelectedItem(locationId);
      setSelectedItemType('location');
      onLocationSelect(location);
    }
  };
  
  // Handle event click
  const handleEventClick = (eventId) => {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
      setSelectedItem(eventId);
      setSelectedItemType('event');
      onEventSelect(event);
    }
  };
  
  // Handle selection from dropdowns
  const handleItemSelect = (itemId, type) => {
    if (!itemId) {
      setSelectedItem(null);
      setSelectedItemType(null);
      return;
    }
    
    setSelectedItem(itemId);
    setSelectedItemType(type);
    
    // Focus map on selected item
    focusMapOnItem(itemId, type);
    
    // Trigger appropriate selection handler
    if (type === 'location') {
      const location = locationsData.find(loc => loc.id === itemId);
      if (location) onLocationSelect(location);
    } else if (type === 'event') {
      const event = eventsData.find(e => e.id === itemId);
      if (event) onEventSelect(event);
    }
  };
  
  // Focus map on an item
  const focusMapOnItem = (itemId, type) => {
    let latLng = null;
    
    switch (type) {
      case 'location': {
        const location = locationPositions[itemId];
        if (location) {
          latLng = [location.lat, location.lon];
        }
        break;
      }
      case 'event': {
        const event = eventPositions[itemId];
        if (event) {
          if (event.locationId) {
            const location = locationPositions[event.locationId];
            if (location) {
              latLng = [location.lat, location.lon];
            }
          } else if (event.path && event.path.length > 0) {
            // Use midpoint of path
            const midIndex = Math.floor(event.path.length / 2);
            latLng = [event.path[midIndex].lat, event.path[midIndex].lon];
          }
        }
        break;
      }
      case 'character': {
        const character = characterPositions[itemId];
        if (character && character.locationId) {
          const location = locationPositions[character.locationId];
          if (location) {
            latLng = [location.lat, location.lon];
          }
        }
        break;
      }
      case 'object': {
        const object = objectPositions[itemId];
        if (object && object.locationId) {
          const location = locationPositions[object.locationId];
          if (location) {
            latLng = [location.lat, location.lon];
          }
        }
        break;
      }
      default:
        break;
    }
    
    if (latLng) {
      setMapCenter(latLng);
      setMapZoom(11); // Zoom in closer on selected item
      setMapBounds(null); // Clear any existing bounds
    }
  };
  
  // Get character group color
  const getCharacterGroupColor = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    if (!character) return "#718096"; // Default gray
    
    // Return color based on character group
    switch (character.group) {
      case 'Protagonists':
        return "#3182ce"; // Blue
      case 'Fifth Columnists':
        return "#e53e3e"; // Red
      case 'German Connection':
        return "#d69e2e"; // Yellow/gold
      default:
        return "#718096"; // Gray
    }
  };
  
  // Get location color
  const getLocationColor = (locationType) => {
    switch (locationType) {
      case 'german':
        return "#d69e2e"; // Yellow/gold for German
      case 'irish':
        return "#38a169"; // Green for Irish
      default:
        return "#3182ce"; // Blue for UK
    }
  };
  
  // Prepare dropdown options
  const getLocationOptions = () => {
    return [
      { value: '', label: 'Select a location' },
      ...locationsData
        .filter(loc => locationPositions[loc.id])
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(loc => ({ value: loc.id, label: loc.name }))
    ];
  };
  
  const getEventOptions = () => {
    return [
      { value: '', label: 'Select an event' },
      ...filteredEvents
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(event => ({ value: event.id, label: event.title }))
    ];
  };
  
  const getCharacterOptions = () => {
    return [
      { value: '', label: 'Select a character' },
      ...charactersData
        .filter(char => {
          const position = characterPositions[char.id];
          return position && position.locationId && locationPositions[position.locationId];
        })
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(char => ({ value: char.id, label: char.name }))
    ];
  };
  
  const getObjectOptions = () => {
    return [
      { value: '', label: 'Select an object' },
      ...objectsData
        .filter(obj => {
          const position = objectPositions[obj.id];
          return position && position.locationId && locationPositions[position.locationId];
        })
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(obj => ({ value: obj.id, label: obj.name }))
    ];
  };
  
  // Render locations as markers
  const renderLocations = () => {
    if (mapMode !== 'locations' && mapMode !== 'all') return null;
    
    return Object.entries(locationPositions).map(([id, location]) => {
      // Skip if location doesn't match view mode
      if ((mapView === 'uk' && location.type === 'german') || 
          (mapView === 'europe' && location.type === 'irish')) {
        return null;
      }
      
      const isSelected = selectedItem === id && selectedItemType === 'location';
      const color = getLocationColor(location.type);
      
      return (
        <Marker 
          key={`loc-${id}`}
          position={[location.lat, location.lon]}
          icon={locationIcon(color)}
          eventHandlers={{
            click: () => handleLocationClick(id)
          }}
        >
          <Tooltip>{location.label}</Tooltip>
          {isSelected && <Popup><strong>{location.label}</strong></Popup>}
        </Marker>
      );
    });
  };
  
  // Render events as markers
  const renderEvents = () => {
    if (mapMode !== 'events' && mapMode !== 'all') return null;
    
    return filteredEvents.map(event => {
      const eventData = eventPositions[event.id];
      if (!eventData) return null;
      
      let position;
      
      // For events with a single location
      if (eventData.locationId) {
        const location = locationPositions[eventData.locationId];
        if (!location) return null;
        
        // Skip if event location doesn't match view mode
        if ((mapView === 'uk' && location.type === 'german') || 
            (mapView === 'europe' && location.type === 'irish')) {
          return null;
        }
        
        position = [location.lat, location.lon];
      } 
      // For events with paths (like train journeys)
      else if (eventData.path && eventData.path.length > 0) {
        // Use midpoint of path for marker
        const midIndex = Math.floor(eventData.path.length / 2);
        position = [eventData.path[midIndex].lat, eventData.path[midIndex].lon];
      } else {
        return null; // Skip if no position
      }
      
      const isSelected = selectedItem === event.id && selectedItemType === 'event';
      
      return (
        <Marker 
          key={`event-${event.id}`}
          position={position}
          icon={eventIcon(isSelected)}
          eventHandlers={{
            click: () => handleEventClick(event.id)
          }}
        >
          <Tooltip>{event.title}</Tooltip>
          {isSelected && (
            <Popup>
              <div>
                <strong>{event.title}</strong>
                <div>{event.date}</div>
              </div>
            </Popup>
          )}
        </Marker>
      );
    });
  };
  
  // Render event paths (like train journeys)
  const renderEventPaths = () => {
    if (mapMode !== 'events' && mapMode !== 'all') return null;
    
    return filteredEvents.map(event => {
      const eventData = eventPositions[event.id];
      if (!eventData || !eventData.path || eventData.path.length < 2) return null;
      
      const pathPositions = eventData.path.map(point => [point.lat, point.lon]);
      const isSelected = selectedItem === event.id && selectedItemType === 'event';
      
      return (
        <React.Fragment key={`path-${event.id}`}>
          <Polyline 
            positions={pathPositions}
            color={isSelected ? '#9f1239' : '#e53e3e'}
            weight={isSelected ? 3 : 2}
            dashArray="5,5"
            eventHandlers={{
              click: () => handleEventClick(event.id)
            }}
          />
          
          {/* Add circles at each point in the path */}
          {eventData.path.map((point, i) => (
            <CircleMarker
              key={`path-point-${event.id}-${i}`}
              center={[point.lat, point.lon]}
              radius={3}
              color="#ffffff"
              fillColor={isSelected ? '#9f1239' : '#e53e3e'}
              fillOpacity={1}
              weight={1}
            >
              <Tooltip>{point.label || `Point ${i+1}`}</Tooltip>
            </CircleMarker>
          ))}
        </React.Fragment>
      );
    });
  };
  
  // Render characters
  const renderCharacters = () => {
    if (mapMode !== 'characters' && mapMode !== 'all') return null;
    
    return Object.entries(characterPositions).map(([id, character]) => {
      if (!character.locationId) return null;
      
      const location = locationPositions[character.locationId];
      if (!location) return null;
      
      // Skip if character location doesn't match view mode
      if ((mapView === 'uk' && location.type === 'german') || 
          (mapView === 'europe' && location.type === 'irish')) {
        return null;
      }
      
      const charData = charactersData.find(c => c.id === id);
      if (!charData) return null;
      
      const isSelected = selectedItem === id && selectedItemType === 'character';
      const color = getCharacterGroupColor(id);
      
      return (
        <Marker 
          key={`char-${id}`}
          position={[location.lat, location.lon]}
          icon={characterIcon(color, isSelected)}
          eventHandlers={{
            click: () => handleItemSelect(id, 'character')
          }}
        >
          <Tooltip>{charData.name}</Tooltip>
          {isSelected && (
            <Popup>
              <div>
                <strong>{charData.name}</strong>
                <div>{charData.role}</div>
              </div>
            </Popup>
          )}
        </Marker>
      );
    });
  };
  
  // Render objects
  const renderObjects = () => {
    if (mapMode !== 'objects' && mapMode !== 'all') return null;
    
    return Object.entries(objectPositions).map(([id, object]) => {
      if (!object.locationId) return null;
      
      const location = locationPositions[object.locationId];
      if (!location) return null;
      
      // Skip if object location doesn't match view mode
      if ((mapView === 'uk' && location.type === 'german') || 
          (mapView === 'europe' && location.type === 'irish')) {
        return null;
      }
      
      const objData = objectsData.find(o => o.id === id);
      if (!objData) return null;
      
      const isSelected = selectedItem === id && selectedItemType === 'object';
      
      return (
        <Marker 
          key={`obj-${id}`}
          position={[location.lat, location.lon]}
          icon={objectIcon(isSelected)}
          eventHandlers={{
            click: () => handleItemSelect(id, 'object')
          }}
        >
          <Tooltip>{objData.name}</Tooltip>
          {isSelected && (
            <Popup>
              <div>
                <strong>{objData.name}</strong>
                <div>{objData.type}</div>
              </div>
            </Popup>
          )}
        </Marker>
      );
    });
  };

  return (
    <div className="map-container">
      <div className="mb-4 flex flex-wrap gap-4">
        {/* View controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Map View</label>
          <div className="flex">
            <button 
              className={`px-3 py-1 text-sm rounded-l ${mapView === 'uk' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapView('uk')}
            >
              UK
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r ${mapView === 'europe' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapView('europe')}
            >
              Europe
            </button>
          </div>
        </div>
        
        {/* Display Mode controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display</label>
          <div className="flex flex-wrap">
            <button 
              className={`px-3 py-1 text-sm rounded-l ${mapMode === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapMode('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-sm ${mapMode === 'locations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
              className={`px-3 py-1 text-sm ${mapMode === 'characters' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapMode('characters')}
            >
              Characters
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r ${mapMode === 'objects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setMapMode('objects')}
            >
              Objects
            </button>
          </div>
        </div>
        
        {/* Time Period filter */}
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
      
      {/* Item selection controls */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedItemType === 'location' ? selectedItem : ''}
            onChange={(e) => handleItemSelect(e.target.value, 'location')}
          >
            {getLocationOptions().map(option => (
              <option key={`loc-${option.value}`} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedItemType === 'event' ? selectedItem : ''}
            onChange={(e) => handleItemSelect(e.target.value, 'event')}
          >
            {getEventOptions().map(option => (
              <option key={`event-${option.value}`} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Character</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedItemType === 'character' ? selectedItem : ''}
            onChange={(e) => handleItemSelect(e.target.value, 'character')}
          >
            {getCharacterOptions().map(option => (
              <option key={`char-${option.value}`} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Object</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedItemType === 'object' ? selectedItem : ''}
            onChange={(e) => handleItemSelect(e.target.value, 'object')}
          >
            {getObjectOptions().map(option => (
              <option key={`obj-${option.value}`} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Leaflet Map */}
      <div className="border rounded overflow-hidden" style={{ height: '500px' }}>
        <MapContainer 
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false} // We'll add it in a better position
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Add zoom control to top-right instead of default top-left */}
          <ZoomControl position="topright" />
          
          {/* Dynamic map controller */}
          <MapController 
            center={mapCenter}
            zoom={mapZoom}
            bounds={mapBounds}
            selectedItem={selectedItem}
          />
          
          {/* Map elements */}
          {renderLocations()}
          {renderEvents()}
          {renderEventPaths()}
          {renderCharacters()}
          {renderObjects()}
        </MapContainer>
      </div>
      
      {/* Map Legend */}
      <div className="mt-4 p-4 border rounded bg-white">
        <h3 className="text-sm font-bold mb-2">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-full bg-blue-500"></div>
            <span className="text-xs">UK Locations</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-full bg-yellow-500"></div>
            <span className="text-xs">German Locations</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-full bg-green-500"></div>
            <span className="text-xs">Irish Locations</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-red-500"></div>
            <span className="text-xs">Events</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ 
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: '10px solid blue',
              marginLeft: '4px'
            }}></div>
            <span className="text-xs">Protagonists</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ 
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: '10px solid #e53e3e',
              marginLeft: '4px'
            }}></div>
            <span className="text-xs">Fifth Columnists</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ 
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: '10px solid #d69e2e',
              marginLeft: '4px'
            }}></div>
            <span className="text-xs">German Connection</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 rounded-full bg-purple-500"></div>
            <span className="text-xs">Objects</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 p-2 border-t">
        <p>Interactive map showing key locations, events, characters, and objects from "Stitched Up". Click on markers for details and use the controls to filter content.</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
import React, { useState, useEffect, useRef } from 'react';
import { 
  locationPositions, 
  eventPositions, 
  characterPositions, 
  objectPositions,
  mapBoundaries
} from '../data/stitchedUp/positions';

const InteractiveMap = ({ 
  onLocationSelect, 
  onEventSelect,
  locationsData,
  eventsData,
  charactersData,
  objectsData
}) => {
  // State
  const [mapMode, setMapMode] = useState('locations'); // 'locations', 'events', 'characters', 'objects'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'early', 'mid', 'late'
  const [mapView, setMapView] = useState('uk'); // 'uk', 'europe'
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [zoomTransform, setZoomTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Refs
  const svgRef = useRef(null);
  const mapContainerRef = useRef(null);
  
  // Helper functions for coordinate calculations
  const latLonToXY = (lat, lon, mapBoundary, width, height) => {
    const { minLat, maxLat, minLon, maxLon } = mapBoundary;
    
    // Calculate X coordinate (longitude)
    const x = ((lon - minLon) / (maxLon - minLon)) * width;
    
    // Calculate Y coordinate (latitude) - note we invert because SVG y increases downward
    const y = ((maxLat - lat) / (maxLat - minLat)) * height;
    
    return { x, y };
  };

  const getLocationPosition = (locationId, mapBoundary, width, height) => {
    const location = locationPositions[locationId];
    if (!location) return null;
    
    return latLonToXY(location.lat, location.lon, mapBoundary, width, height);
  };

  const getEventPosition = (eventId, mapBoundary, width, height) => {
    const event = eventPositions[eventId];
    if (!event) return null;
    
    // If event has a single location
    if (event.locationId) {
      return getLocationPosition(event.locationId, mapBoundary, width, height);
    }
    
    // If event has a path (like train journey)
    if (event.path && event.path.length > 0) {
      // Return the midpoint of the path as the event marker
      const midpointIndex = Math.floor(event.path.length / 2);
      const midpoint = event.path[midpointIndex];
      return latLonToXY(midpoint.lat, midpoint.lon, mapBoundary, width, height);
    }
    
    return null;
  };

  const getEventPath = (eventId, mapBoundary, width, height) => {
    const event = eventPositions[eventId];
    if (!event || !event.path) return null;
    
    return event.path.map(point => {
      const { x, y } = latLonToXY(point.lat, point.lon, mapBoundary, width, height);
      return { x, y, label: point.label };
    });
  };

  const getCharacterPosition = (characterId, mapBoundary, width, height) => {
    const character = characterPositions[characterId];
    if (!character || !character.locationId) return null;
    
    return getLocationPosition(character.locationId, mapBoundary, width, height);
  };

  const getObjectPosition = (objectId, mapBoundary, width, height) => {
    const object = objectPositions[objectId];
    if (!object || !object.locationId) return null;
    
    return getLocationPosition(object.locationId, mapBoundary, width, height);
  };

  const findLocationByCoordinates = (x, y, mapBoundary, width, height, threshold = 10) => {
    for (const [id, location] of Object.entries(locationPositions)) {
      const position = getLocationPosition(id, mapBoundary, width, height);
      if (!position) continue;
      
      const distance = Math.sqrt(Math.pow(position.x - x, 2) + Math.pow(position.y - y, 2));
      if (distance <= threshold) {
        return { id, ...location };
      }
    }
    
    return null;
  };
  
  // Filter events based on time period
  const filteredEvents = eventsData.filter(event => {
    if (timeFilter === 'all') return true;
    if (timeFilter === 'early' && event.date.includes('193')) return true;
    if (timeFilter === 'mid' && event.date.includes('194') && !event.date.includes('1943')) return true;
    if (timeFilter === 'late' && (event.date.includes('1943') || event.date.includes('1944'))) return true;
    return false;
  });
  
  // Effect to update map dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (mapContainerRef.current) {
        // Get the container width and maintain aspect ratio
        const width = mapContainerRef.current.clientWidth;
        const height = width * 0.75; // 4:3 aspect ratio
        setMapDimensions({ width, height });
      }
    };
    
    // Initial set
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Helper to get current map boundary
  const getCurrentMapBoundary = () => {
    return mapBoundaries[mapView];
  };
  
  // Zoom handlers
  const handleZoomIn = () => {
    setZoomTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 5) // Limit max zoom
    }));
  };
  
  const handleZoomOut = () => {
    setZoomTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.5) // Limit min zoom
    }));
  };
  
  const handleResetView = () => {
    setZoomTransform({ x: 0, y: 0, scale: 1 });
  };
  
  // Pan handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - zoomTransform.x, 
      y: e.clientY - zoomTransform.y 
    });
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      setZoomTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Wheel zoom handler
  const handleWheel = (e) => {
    e.preventDefault();
    const scaleAmount = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(zoomTransform.scale * scaleAmount, 0.5), 5);
    
    // Get mouse position relative to SVG
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    const mouseY = e.clientY - svgRect.top;
    
    // Calculate new position to zoom towards mouse
    const newX = mouseX - ((mouseX - zoomTransform.x) * (newScale / zoomTransform.scale));
    const newY = mouseY - ((mouseY - zoomTransform.y) * (newScale / zoomTransform.scale));
    
    setZoomTransform({
      x: newX,
      y: newY,
      scale: newScale
    });
  };
  
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
  
  // Handle change of selected item from dropdowns
  const handleItemSelect = (item, type) => {
    if (!item) {
      setSelectedItem(null);
      setSelectedItemType(null);
      return;
    }
    
    setSelectedItem(item);
    setSelectedItemType(type);
    
    // Focus map on selected item
    focusMapOnItem(item, type);
    
    // Trigger appropriate selection handler
    if (type === 'location') {
      const location = locationsData.find(loc => loc.id === item);
      if (location) onLocationSelect(location);
    } else if (type === 'event') {
      const event = eventsData.find(e => e.id === item);
      if (event) onEventSelect(event);
    }
  };
  
  // Focus map on a specific item
  const focusMapOnItem = (itemId, type) => {
    const boundary = getCurrentMapBoundary();
    let position;
    
    switch (type) {
      case 'location':
        position = getLocationPosition(itemId, boundary, mapDimensions.width, mapDimensions.height);
        break;
      case 'event':
        position = getEventPosition(itemId, boundary, mapDimensions.width, mapDimensions.height);
        break;
      case 'character':
        position = getCharacterPosition(itemId, boundary, mapDimensions.width, mapDimensions.height);
        break;
      case 'object':
        position = getObjectPosition(itemId, boundary, mapDimensions.width, mapDimensions.height);
        break;
      default:
        return;
    }
    
    if (position) {
      // Center map on item position with increased zoom
      const newScale = 2.5;
      const centerX = mapDimensions.width / 2;
      const centerY = mapDimensions.height / 2;
      
      setZoomTransform({
        x: centerX - (position.x * newScale),
        y: centerY - (position.y * newScale),
        scale: newScale
      });
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
  
  // Prepare dropdown options
  const getLocationOptions = () => {
    return [
      { value: '', label: 'Select a location' },
      ...locationsData
        .filter(loc => {
          const position = locationPositions[loc.id];
          if (!position) return false;
          return (mapView === 'uk' && position.type === 'uk') || 
                 (mapView === 'europe') || 
                 (mapView === 'uk' && position.type === 'irish');
        })
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
          if (!position || !position.locationId) return false;
          
          const location = locationPositions[position.locationId];
          if (!location) return false;
          
          return (mapView === 'uk' && location.type === 'uk') || 
                 (mapView === 'europe') || 
                 (mapView === 'uk' && location.type === 'irish');
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
          if (!position || !position.locationId) return false;
          
          const location = locationPositions[position.locationId];
          if (!location) return false;
          
          return (mapView === 'uk' && location.type === 'uk') || 
                 (mapView === 'europe') || 
                 (mapView === 'uk' && location.type === 'irish');
        })
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(obj => ({ value: obj.id, label: obj.name }))
    ];
  };

  // Render map content based on mode
  const renderMapContent = () => {
    const boundary = getCurrentMapBoundary();
    
    return (
      <>
        {/* Render UK outline */}
        <path 
          d="M270,176 L287,179 L292,168 L300,168 L295,151 L310,119 L307,109 L318,86 L309,69 L315,59 L311,51 L320,39 L311,32 L293,35 L280,26 L270,40 L258,51 L248,70 L220,81 L209,91 L199,110 L204,124 L191,146 L194,157 L185,168 L198,191 L196,200 L237,182 L254,187 L270,176"
          fill="#e5e5e5" 
          stroke="#999"
          strokeWidth="1.5"
          transform={`scale(${zoomTransform.scale})`}
        />
        
        {/* Render Ireland outline */}
        <path 
          d="M182,110 L176,121 L166,126 L156,120 L143,129 L142,141 L153,155 L158,168 L170,166 L180,152 L190,145 L187,130 L182,110"
          fill="#e5e5e5" 
          stroke="#999"
          strokeWidth="1.5"
          transform={`scale(${zoomTransform.scale})`}
        />
        
        {/* English Channel */}
        <path 
          d="M270,176 L320,210"
          stroke="#a4caf5"
          strokeWidth="3"
          transform={`scale(${zoomTransform.scale})`}
        />
        
        {/* Render simplified mainland Europe if in Europe view */}
        {mapView === 'europe' && (
          <path 
            d="M320,210 L340,190 L360,170 L400,150 L420,120 L415,90 L390,70 L380,50 L350,40 L340,60 L370,80 L385,100 L380,130 L340,150 L320,180 L320,210"
            fill="#f0f0f0" 
            stroke="#999"
            strokeWidth="1.5"
            transform={`scale(${zoomTransform.scale})`}
          />
        )}
        
        {/* Render locations */}
        {(mapMode === 'locations' || mapMode === 'all') && Object.entries(locationPositions).map(([id, location]) => {
          // Skip if location type doesn't match current map view
          if ((mapView === 'uk' && location.type !== 'uk' && location.type !== 'irish') || 
              (mapView === 'europe' && location.type === 'irish')) {
            return null;
          }
          
          const position = getLocationPosition(id, boundary, mapDimensions.width, mapDimensions.height);
          if (!position) return null;
          
          // Different colors based on location type
          let fillColor = "#3182ce"; // Default blue for UK
          if (location.type === 'german') fillColor = "#d69e2e";
          if (location.type === 'irish') fillColor = "#38a169";
          
          // Highlight selected location
          if (selectedItem === id && selectedItemType === 'location') {
            fillColor = "#e53e3e"; // Red for selected
          }
          
          return (
            <g 
              key={`loc-${id}`}
              transform={`translate(${position.x * zoomTransform.scale}, ${position.y * zoomTransform.scale})`}
              onClick={() => handleLocationClick(id)}
              onMouseEnter={() => setHoveredItem({ id, type: 'location', name: location.label })}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle 
                r={selectedItem === id && selectedItemType === 'location' ? 6 : 4} 
                fill={fillColor}
                stroke="#fff"
                strokeWidth="1"
              />
            </g>
          );
        })}
        
        {/* Render events */}
        {(mapMode === 'events' || mapMode === 'all') && filteredEvents.map(event => {
          const position = getEventPosition(event.id, boundary, mapDimensions.width, mapDimensions.height);
          if (!position) return null;
          
          // Skip if event location doesn't match current map view
          const eventLocation = event.location ? locationPositions[event.location] : null;
          if (eventLocation && 
             ((mapView === 'uk' && eventLocation.type !== 'uk' && eventLocation.type !== 'irish') || 
              (mapView === 'europe' && eventLocation.type === 'irish'))) {
            return null;
          }
          
          // Highlight selected event
          const isSelected = selectedItem === event.id && selectedItemType === 'event';
          
          return (
            <g 
              key={`event-${event.id}`}
              transform={`translate(${position.x * zoomTransform.scale}, ${position.y * zoomTransform.scale})`}
              onClick={() => handleEventClick(event.id)}
              onMouseEnter={() => setHoveredItem({ id: event.id, type: 'event', name: event.title })}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="-4" 
                y="-4" 
                width="8" 
                height="8" 
                fill={isSelected ? "#9f1239" : "#e53e3e"}
                stroke="#fff"
                strokeWidth="1"
              />
            </g>
          );
        })}
        
        {/* Render event paths (like the train journey) */}
        {(mapMode === 'events' || mapMode === 'all') && filteredEvents.map(event => {
          const path = getEventPath(event.id, boundary, mapDimensions.width, mapDimensions.height);
          if (!path) return null;
          
          // Generate SVG path string
          const pathData = path.reduce((acc, point, i) => {
            const command = i === 0 ? 'M' : 'L';
            return `${acc} ${command} ${point.x * zoomTransform.scale} ${point.y * zoomTransform.scale}`;
          }, '');
          
          // Highlight selected event path
          const isSelected = selectedItem === event.id && selectedItemType === 'event';
          
          return (
            <g key={`path-${event.id}`}>
              <path
                d={pathData}
                stroke={isSelected ? "#9f1239" : "#e53e3e"}
                strokeWidth={isSelected ? "3" : "2"}
                strokeDasharray="5,5"
                fill="none"
                onClick={() => handleEventClick(event.id)}
                style={{ cursor: 'pointer' }}
              />
              
              {/* Add dots at each point in the path */}
              {path.map((point, i) => (
                <circle
                  key={`path-point-${event.id}-${i}`}
                  cx={point.x * zoomTransform.scale}
                  cy={point.y * zoomTransform.scale}
                  r="3"
                  fill={isSelected ? "#9f1239" : "#e53e3e"}
                  stroke="#fff"
                  strokeWidth="1"
                />
              ))}
            </g>
          );
        })}
        
        {/* Render characters */}
        {(mapMode === 'characters' || mapMode === 'all') && Object.entries(characterPositions).map(([id, character]) => {
          if (!character.locationId) return null;
          
          // Get the location
          const location = locationPositions[character.locationId];
          if (!location) return null;
          
          // Skip if character location doesn't match current map view
          if ((mapView === 'uk' && location.type !== 'uk' && location.type !== 'irish') || 
              (mapView === 'europe' && location.type === 'irish')) {
            return null;
          }
          
          const position = getCharacterPosition(id, boundary, mapDimensions.width, mapDimensions.height);
          if (!position) return null;
          
          // Get character color from group
          const fillColor = getCharacterGroupColor(id);
          
          // Highlight selected character
          const isSelected = selectedItem === id && selectedItemType === 'character';
          
          return (
            <g 
              key={`char-${id}`}
              transform={`translate(${position.x * zoomTransform.scale}, ${position.y * zoomTransform.scale})`}
              onClick={() => handleItemSelect(id, 'character')}
              onMouseEnter={() => {
                const charData = charactersData.find(c => c.id === id);
                setHoveredItem({ id, type: 'character', name: charData ? charData.name : id });
              }}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ cursor: 'pointer' }}
            >
              <polygon 
                points="0,-6 4,4 -4,4" 
                fill={fillColor}
                stroke="#fff"
                strokeWidth="1"
                transform={isSelected ? "scale(1.3)" : ""}
              />
            </g>
          );
        })}
        
        {/* Render objects */}
        {(mapMode === 'objects' || mapMode === 'all') && Object.entries(objectPositions).map(([id, object]) => {
          if (!object.locationId) return null;
          
          // Get the location
          const location = locationPositions[object.locationId];
          if (!location) return null;
          
          // Skip if object location doesn't match current map view
          if ((mapView === 'uk' && location.type !== 'uk' && location.type !== 'irish') || 
              (mapView === 'europe' && location.type === 'irish')) {
            return null;
          }
          
          const position = getObjectPosition(id, boundary, mapDimensions.width, mapDimensions.height);
          if (!position) return null;
          
          // Highlight selected object
          const isSelected = selectedItem === id && selectedItemType === 'object';
          
          return (
            <g 
              key={`obj-${id}`}
              transform={`translate(${position.x * zoomTransform.scale}, ${position.y * zoomTransform.scale})`}
              onClick={() => handleItemSelect(id, 'object')}
              onMouseEnter={() => {
                const objData = objectsData.find(o => o.id === id);
                setHoveredItem({ id, type: 'object', name: objData ? objData.name : id });
              }}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle 
                r="3" 
                fill="#805ad5" // Purple for objects
                stroke="#fff"
                strokeWidth="1"
                transform={isSelected ? "scale(1.5)" : ""}
              />
              {isSelected && (
                <circle 
                  r="6" 
                  fill="none"
                  stroke="#805ad5"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              )}
            </g>
          );
        })}
        
        {/* Tooltip for hovered item */}
        {hoveredItem && (
          <g 
            className="tooltip" 
            style={{ 
              pointerEvents: 'none',
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.2))'
            }}
          >
            <foreignObject
              x={10}
              y={10}
              width={200}
              height={40}
            >
              <div 
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  maxWidth: '200px',
                  wordWrap: 'break-word'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{hoveredItem.name}</div>
                <div style={{ color: '#666' }}>{hoveredItem.type}</div>
              </div>
            </foreignObject>
          </g>
        )}
      </>
    );
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
              onClick={() => { setMapView('uk'); handleResetView(); }}
            >
              UK
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r ${mapView === 'europe' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => { setMapView('europe'); handleResetView(); }}
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
        
        {/* Zoom controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Zoom</label>
          <div className="flex">
            <button 
              className="px-3 py-1 text-sm rounded-l bg-gray-200 hover:bg-gray-300"
              onClick={handleZoomIn}
            >
              +
            </button>
            <button 
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300"
              onClick={handleZoomOut}
            >
              -
            </button>
            <button 
              className="px-3 py-1 text-sm rounded-r bg-gray-200 hover:bg-gray-300"
              onClick={handleResetView}
            >
              Reset
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
      
      <div className="relative border rounded overflow-hidden" style={{ height: '500px' }} ref={mapContainerRef}>
        {/* SVG Map */}
        <svg 
          ref={svgRef}
          width={mapDimensions.width} 
          height={mapDimensions.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <g transform={`translate(${zoomTransform.x}, ${zoomTransform.y})`}>
            {renderMapContent()}
          </g>
        </svg>
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
        <p>Interactive map showing key locations, events, characters, and objects from "Stitched Up". Use mouse wheel to zoom, drag to pan, and selection controls to focus on specific items.</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
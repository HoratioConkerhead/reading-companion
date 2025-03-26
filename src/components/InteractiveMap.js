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

// Fix Leaflet's default icon paths
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
const MapController = ({ center, zoom, bounds, selectedItem, currentZoomRef }) => {
  const map = useMap();
  
  useEffect(() => {
    // Only track zoom changes, don't reset the view
    const handleZoomEnd = () => {
      currentZoomRef.current = map.getZoom();
    };
    
    map.on('zoomend', handleZoomEnd);
    
    // Only apply bounds if they exist - for initial view
    if (bounds) {
      map.fitBounds(bounds);
    }
    
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map, bounds, currentZoomRef]); // Remove center, zoom, selectedItem
  
  return null;
};


const InteractiveMap = ({ 
  onLocationSelect, 
  onEventSelect,
  onCharacterSelect,
  onObjectSelect,
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
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [mapCenter, setMapCenter] = useState([52.3555, -1.1743]); // Default to UK center
  const [mapZoom, setMapZoom] = useState(6);
  const [mapBounds, setMapBounds] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  const currentZoom = useRef(mapZoom);
  const mapRef = useRef(null);  
  // Get map view settings based on selected view
  useEffect(() => {
/*
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
  */
    }, [mapView]);



  // Get position for any item type
  const getItemPosition = (itemId, itemType) => {
    if (!itemId || !itemType) return null;
    
    switch (itemType) {
      case 'location': {
        const location = locationPositions[itemId];
        return location ? [location.lat, location.lon] : null;
      }
      case 'event': {
        const event = eventPositions[itemId];
        if (!event) return null;
        
        if (event.locationId) {
          const location = locationPositions[event.locationId];
          return location ? [location.lat, location.lon] : null;
        } else if (event.path && event.path.length > 0) {
          const midIndex = Math.floor(event.path.length / 2);
          return [event.path[midIndex].lat, event.path[midIndex].lon];
        }
        return null;
      }
      case 'character': {
        const character = characterPositions[itemId];
        if (!character || !character.locationId) return null;
        
        const location = locationPositions[character.locationId];
        return location ? [location.lat, location.lon] : null;
      }
      case 'object': {
        const object = objectPositions[itemId];
        if (!object || !object.locationId) return null;
        
        const location = locationPositions[object.locationId];
        return location ? [location.lat, location.lon] : null;
      }
      default:
        return null;
    }
  };

  // Get item data for any type
  const getItemData = (itemId, itemType) => {
    switch (itemType) {
      case 'location':
        return locationsData.find(loc => loc.id === itemId);
      case 'event':
        return eventsData.find(e => e.id === itemId);
      case 'character':
        return charactersData.find(c => c.id === itemId);
      case 'object':
        return objectsData.find(o => o.id === itemId);
      default:
        return null;
    }
  };

  // Pan to item position
  const panToItem = (position) => {
    if (!position || !mapRef.current) return;
    
    // Get the current map container size
    const mapSize = mapRef.current.getSize();
    
    // If the panel is shown, adjust the center point
    if (showDetailPanel) {
      // Calculate offset based on panel width (adjust as needed)
      const offsetX = mapSize.x / 6;
      
      // First pan to the position
      mapRef.current.panTo(position);
      
      // Then offset to account for the panel
      setTimeout(() => {
        mapRef.current.panBy([-offsetX, 0]);
      }, 10);
    } else {
      // Just pan to the position if no panel is shown
      mapRef.current.panTo(position);
    }
  };

  // Simplify select handler for any item type
  const selectItem = (itemId, itemType) => {
    if (!itemId) {
      setSelectedItem(null);
      setSelectedItemType(null);
      setSelectedItemData(null);
      setShowDetailPanel(false);
      return;
    }
    
    // Get item data
    const itemData = getItemData(itemId, itemType);
    if (!itemData) return;
    
    // Update state
    setSelectedItem(itemId);
    setSelectedItemType(itemType);
    setSelectedItemData(itemData);
    setShowDetailPanel(true);
    
    // Pan to item position
    const position = getItemPosition(itemId, itemType);
    panToItem(position);
  };


  // capture the map instance:
  const MapInstanceCapture = () => {
    const map = useMap();
    
    useEffect(() => {
      mapRef.current = map;
      // Set initial reference for zoom
      currentZoom.current = map.getZoom();
    }, [map]);
    
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

  // Update selected item data when selection changes
  useEffect(() => {
    if (!selectedItem || !selectedItemType) {
      setSelectedItemData(null);
      setShowDetailPanel(false);
      return;
    }

    let itemData = null;
    switch (selectedItemType) {
      case 'location':
        itemData = locationsData.find(loc => loc.id === selectedItem);
        break;
      case 'event':
        itemData = eventsData.find(e => e.id === selectedItem);
        break;
      case 'character':
        itemData = charactersData.find(c => c.id === selectedItem);
        break;
      case 'object':
        itemData = objectsData.find(o => o.id === selectedItem);
        break;
      default:
        break;
    }

    setSelectedItemData(itemData);
    setShowDetailPanel(!!itemData);
  }, [selectedItem, selectedItemType, locationsData, eventsData, charactersData, objectsData]);
  
  // Handle location click
  const handleLocationClick = (locationId) => {
    const location = locationsData.find(loc => loc.id === locationId);
    if (location) {
      setSelectedItem(locationId);
      setSelectedItemType('location');
      setSelectedItemData(location);
      setShowDetailPanel(true);

      // Use direct map manipulation
      const locationPos = locationPositions[locationId];
      if (locationPos && mapRef.current) {
        mapRef.current.panTo([locationPos.lat, locationPos.lon]);
      }
    }
  };
  
  // Handle event click
  const handleEventClick = (itemId) => {
    const event = eventsData.find(e => e.id === itemId);
    if (event) {
      setSelectedItem(itemId);
      setSelectedItemType('event');
      setSelectedItemData(event);
      setShowDetailPanel(true);

      // Get position from character position data
      const itemPosition = eventPositions[itemId];
      if (itemPosition && itemPosition.locationId) {
        const location = locationPositions[itemPosition.locationId];
        if (location && mapRef.current) {
          mapRef.current.panTo([location.lat, location.lon]);
        }
      }
    }
  };

  // Handle character click
  const handleCharacterClick = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    if (character) {
      setSelectedItem(characterId);
      setSelectedItemType('character');
      setSelectedItemData(character);
      setShowDetailPanel(true);
      
      // Get position from character position data
      const itemPosition = characterPositions[characterId];
      if (itemPosition && itemPosition.locationId) {
        const location = locationPositions[itemPosition.locationId];
        if (location && mapRef.current) {
          mapRef.current.panTo([location.lat, location.lon]);
        }
      }
    }
  };

  // Handle object click
  const handleObjectClick = (itemId) => {
    const object = objectsData.find(o => o.id === itemId);
    if (object) {
      setSelectedItem(itemId);
      setSelectedItemType('object');
      setSelectedItemData(object);
      setShowDetailPanel(true);

      // Get position from character position data
      const itemPosition = objectPositions[itemId];
      if (itemPosition && itemPosition.locationId) {
        const location = locationPositions[itemPosition.locationId];
        if (location && mapRef.current) {
          mapRef.current.panTo([location.lat, location.lon]);
        }
      }

    }
  };
  
// Handle selection from dropdowns
const handleItemSelect = (itemId, type) => {
  if (!itemId) {
    setSelectedItem(null);
    setSelectedItemType(null);
    setSelectedItemData(null);
    setShowDetailPanel(false);
    return;
  }
  
  setSelectedItem(itemId);
  setSelectedItemType(type);
  
  // Find selected item data and set detail panel
  let latLng = null;
  let itemData = null;
  
  switch (type) {
    case 'location': {
      // For locations, get coordinates directly
      const location = locationPositions[itemId];
      if (location) {
        latLng = [location.lat, location.lon];
      }
      itemData = locationsData.find(loc => loc.id === itemId);
      //if (itemData) onLocationSelect(itemData);
      break;
    }
    case 'event': {
      // For events, either use location or path
      const event = eventPositions[itemId];
      if (event) {
        if (event.locationId) {
          // Get coordinates from referenced location
          const location = locationPositions[event.locationId];
          if (location) {
            latLng = [location.lat, location.lon];
          }
        } else if (event.path && event.path.length > 0) {
          // Use midpoint of path for positioning
          const midIndex = Math.floor(event.path.length / 2);
          latLng = [event.path[midIndex].lat, event.path[midIndex].lon];
        }
      }
      itemData = eventsData.find(e => e.id === itemId);
      //if (itemData) onEventSelect(itemData);
      break;
    }
    case 'character': {
      // For characters, get location from the character's position data
      const character = characterPositions[itemId];
      if (character && character.locationId) {
        const location = locationPositions[character.locationId];
        if (location) {
          latLng = [location.lat, location.lon];
        }
      }
      itemData = charactersData.find(c => c.id === itemId);
      //if (itemData && onCharacterSelect) onCharacterSelect(itemData);
      break;
    }
    case 'object': {
      // For objects, get location from the object's position data
      const object = objectPositions[itemId];
      if (object && object.locationId) {
        const location = locationPositions[object.locationId];
        if (location) {
          latLng = [location.lat, location.lon];
        }
      }
      itemData = objectsData.find(o => o.id === itemId);
      //if (itemData && onObjectSelect) onObjectSelect(itemData);
      break;
    }
    default:
      break;
  }

  setSelectedItemData(itemData);
  setShowDetailPanel(!!itemData);
  
  // Now pan to the position if we have valid coordinates
  if (latLng && mapRef.current) {
    const mapSize = mapRef.current.getSize();

//    mapRef.current.panTo(latLng);

//    if (showDetailPanel) {
      // Calculate offset based on panel width (1/6 of map width to the left)
      // This moves the center point left so the selected item isn't hidden behind the panel
      const offsetX = mapSize.x / 3; // Adjust this value as needed
//      mapRef.current.panTo([latLng[0], latLng[1] + offsetX/1]);
//      setTimeout(() => {
        //mapRef.current.panBy([-offsetX, 0]);
//      }, 10);
    //} else {
//      mapRef.current.panTo(latLng);
    //}

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
    
    if (latLng && mapRef.current) {
        mapRef.current.panTo(latLng);
      } else {
        setMapCenter(latLng);
    }
  };
  
  // Handle closing the detail panel
  const handleCloseDetailPanel = () => {
    setShowDetailPanel(false);
  };

  // Navigate to full details page
  const handleViewFullDetails = () => {
    if (!selectedItemType || !selectedItemData) return;

    switch (selectedItemType) {
      case 'location':
        onLocationSelect(selectedItemData);
        break;
      case 'event':
        onEventSelect(selectedItemData);
        break;
      case 'character':
        if (onCharacterSelect) onCharacterSelect(selectedItemData);
        break;
      case 'object':
        if (onObjectSelect) onObjectSelect(selectedItemData);
        break;
      default:
        break;
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
            click: () => handleCharacterClick(id)
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
            click: () => handleObjectClick(id)
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

  // Render detail panel
  const renderDetailPanel = () => {
    //if (!showDetailPanel || !selectedItemData) return null;

    const getTitleByType = () => {
      switch (selectedItemType) {
        case 'location':
          return selectedItemData.name;
        case 'event':
          return selectedItemData.title;
        case 'character':
          return selectedItemData.name;
        case 'object':
          return selectedItemData.name;
        default:
          return '';
      }
    };

    const getContentByType = () => {
      switch (selectedItemType) {
        case 'location':
          return (
            <>
              <div className="text-gray-600 mb-2">{selectedItemData.area} • {selectedItemData.type}</div>
              {selectedItemData.description && (
                <p className="mb-2">{selectedItemData.description}</p>
              )}
              {selectedItemData.significance && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Significance:</h4>
                  <ul className="list-disc pl-4 text-sm">
                    {selectedItemData.significance.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedItemData.features && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Features:</h4>
                  <ul className="list-disc pl-4 text-sm">
                    {selectedItemData.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          );
        case 'event':
          return (
            <>
              <div className="text-gray-600 mb-2">{selectedItemData.date}</div>
              <p className="mb-2">{selectedItemData.description}</p>
              {selectedItemData.keyActions && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Key Actions:</h4>
                  <ul className="list-disc pl-4 text-sm">
                  {selectedItemData.keyActions.map((action, i) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedItemData.characters && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Characters Involved:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedItemData.characters.slice(0, 3).map((char, i) => {
                      const character = charactersData.find(c => c.id === char.characterId);
                      return character ? (
                        <span key={i} className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                          {character.name}
                          {char.role && ` (${char.role})`}
                        </span>
                      ) : null;
                    })}
                    {selectedItemData.characters.length > 3 && (
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                        + {selectedItemData.characters.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          );
        case 'character':
          return (
            <>
              {selectedItemData.role && (
                <div className="text-gray-600 mb-2">{selectedItemData.role}</div>
              )}
              {selectedItemData.group && (
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    selectedItemData.group === 'Protagonists' ? 'bg-blue-100 text-blue-800' :
                    selectedItemData.group === 'Fifth Columnists' ? 'bg-red-100 text-red-800' :
                    selectedItemData.group === 'German Connection' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedItemData.group}
                  </span>
                </div>
              )}
              {selectedItemData.background && (
                <p className="mb-2">{selectedItemData.background}</p>
              )}
              {selectedItemData.personality && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Personality:</h4>
                  <p className="text-sm">{selectedItemData.personality}</p>
                </div>
              )}
              {selectedItemData.traits && selectedItemData.traits.length > 0 && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Traits:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedItemData.traits.map((trait, i) => (
                      <span key={i} className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        case 'object':
          return (
            <>
              {selectedItemData.type && (
                <div className="text-gray-600 mb-2">{selectedItemData.type}</div>
              )}
              <p className="mb-2">{selectedItemData.description}</p>
              {selectedItemData.significance && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Significance:</h4>
                  <ul className="list-disc pl-4 text-sm">
                    {selectedItemData.significance.slice(0, 2).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                    {selectedItemData.significance.length > 2 && (
                      <li>+ {selectedItemData.significance.length - 2} more points</li>
                    )}
                  </ul>
                </div>
              )}
              {selectedItemData.possessors && (
                <div className="mb-2">
                  <h4 className="font-medium text-sm">Possessors:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedItemData.possessors.slice(0, 2).map((possessor, i) => {
                      const character = charactersData.find(c => c.id === possessor.characterId);
                      return character ? (
                        <span key={i} className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                          {character.name} ({possessor.period})
                        </span>
                      ) : null;
                    })}
                    {selectedItemData.possessors.length > 2 && (
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs">
                        + {selectedItemData.possessors.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="bg-white p-4 rounded shadow-md h-full overflow-y-auto">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold">{getTitleByType()}</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={handleCloseDetailPanel}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        {getContentByType()}
        <div className="mt-4">
          <button
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            onClick={handleViewFullDetails}
          >
            View Full Details
          </button>
        </div>
      </div>
    );
  };

  // Main component return
  return (
    <div className="map-container">
      <div className="mb-4 flex flex-wrap gap-4">
        {/* View controls */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Map View</label>
          <div className="flex">


            <button 
              className={`px-3 py-1 text-sm rounded-l ${mapView === 'uk' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => {
                setMapView('uk');
                if (mapRef.current) {
                  mapRef.current.setView([54, -4], 6);
                }
              }}
            >
              UK
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-r ${mapView === 'europe' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => {
                setMapView('europe');
                if (mapRef.current) {
                  mapRef.current.setView([50, 4], 5);
                }
              }}
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
            title={selectedItemType === 'location' && selectedItemData ? selectedItemData.name : ''}
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
            title={selectedItemType === 'event' && selectedItemData ? selectedItemData.title : ''}
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
            title={selectedItemType === 'character' && selectedItemData ? selectedItemData.name : ''}
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
            title={selectedItemType === 'object' && selectedItemData ? selectedItemData.name : ''}
          >
            {getObjectOptions().map(option => (
              <option key={`obj-${option.value}`} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Map and Detail Panel Container */}
      <div className="flex flex-col md:flex-row border rounded overflow-hidden" style={{ height: '600px' }}>
        {/* Leaflet Map - Adjusts width based on panel visibility */}
        <div className={`${showDetailPanel ? 'w-full md:w-2/3' : 'w-full'} h-full transition-all duration-300`}>
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
            
            <MapInstanceCapture />

            {/* Add zoom control to top-right instead of default top-left */}
            <ZoomControl position="topright" />
            
            {/* Dynamic map controller */}
            <MapController 
              center={mapCenter}
              zoom={mapZoom}
              bounds={mapBounds}
              selectedItem={selectedItem}
              currentZoomRef={currentZoom}
            />            
            {/* Map elements */}
            {renderLocations()}
            {renderEvents()}
            {renderEventPaths()}
            {renderCharacters()}
            {renderObjects()}
          </MapContainer>
        </div>
        
        {/* Detail Panel - Conditionally shown */}
        {showDetailPanel && (
          <div className="w-full md:w-1/3 h-full border-l overflow-hidden bg-white">
            {renderDetailPanel()}
          </div>
        )}
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
        <p>Interactive map showing key locations, events, characters, and objects from "Stitched Up". Click on markers for details or use the dropdowns to select specific items. The detail panel will show a summary with the option to view full details.</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
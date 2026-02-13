// Shared data lookup utilities used across multiple components

export const getCharacterName = (characterId, charactersData) => {
  const character = charactersData.find(c => c.id === characterId);
  return character ? character.name : characterId;
};

export const getEventTitle = (eventId, eventsData) => {
  const event = eventsData.find(e => e.id === eventId);
  return event ? event.title : eventId;
};

export const getLocationName = (locationId, locationsData) => {
  const location = locationsData.find(l => l.id === locationId);
  return location ? location.name : locationId;
};

export const getLocationArea = (locationId, locationsData) => {
  const location = locationsData.find(l => l.id === locationId);
  return location ? location.area : '';
};

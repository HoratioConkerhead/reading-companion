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
        <h2 className="text-2xl font-bold mb-2">Key Objects Gallery</h2>
        <p className="text-gray-600">
          Explore the significant objects that play important roles in the novel's plot.
        </p>
      </div>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search objects..." 
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-128 overflow-y-auto pr-4">
          {filteredObjects.map(object => (
            <div 
              key={object.id}
              className={`p-3 mb-3 border rounded cursor-pointer hover:bg-gray-100 ${selectedObject?.id === object.id ? 'bg-blue-100 border-blue-300' : ''}`}
              onClick={() => onObjectSelect(object)}
            >
              <h3 className="font-bold">{object.name}</h3>
              <div className="text-xs px-2 py-1 rounded bg-gray-200 inline-block mt-1">
                {object.type}
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{object.description}</p>
            </div>
          ))}
        </div>
        
        <div className="md:col-span-2">
          {selectedObject ? (
            <div>
              <div className="border rounded p-4 bg-gray-100 mb-4">
                <h2 className="text-2xl font-bold">{selectedObject.name}</h2>
                <div className="text-sm px-2 py-1 rounded bg-gray-200 inline-block mt-1">
                  {selectedObject.type}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="border rounded mb-4 overflow-hidden">
                    <div className="h-64 bg-gray-300 flex items-center justify-center">
                      <p className="text-gray-500 p-4 text-center">
                        {selectedObject.image_description || "No image available"}
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Description</h3>
                  <p>{selectedObject.description}</p>
                  
                  {selectedObject.physical_details && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Physical Details</h3>
                      <p>{selectedObject.physical_details}</p>
                    </>
                  )}
                  
                  {selectedObject.technical_details && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Technical Details</h3>
                      <ul className="list-disc pl-5">
                        {selectedObject.technical_details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                
                <div>
                  {selectedObject.significance && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2">Significance</h3>
                      <ul className="list-disc pl-5 mb-4">
                        {selectedObject.significance.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {selectedObject.history && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">History</h3>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-4 w-1 bg-gray-300"></div>
                        <div className="space-y-4">
                          {selectedObject.history.map((entry, index) => (
                            <div key={index} className="relative flex pl-7">
                              <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                              <div>
                                <h4 className="font-medium">{entry.event}</h4>
                                <p className="text-gray-600 text-sm">{entry.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {selectedObject.possessors && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Possessors</h3>
                      <div className="space-y-2">
                        {selectedObject.possessors.map((entry, index) => (
                          <div key={index} className="p-2 border rounded">
                            <div className="font-medium">{getCharacterName(entry.characterId)}</div>
                            <div className="text-sm text-gray-600">
                              Period: {formatTimePeriod(entry.period)}
                              {entry.alias && <span className="ml-2">({entry.alias})</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {selectedObject.appearances && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Key Appearances</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedObject.appearances.map((eventId, index) => (
                          <div key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                            {formatEventId(eventId)}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {selectedObject.details && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Additional Details</h3>
                  <ul className="list-disc pl-5">
                    {selectedObject.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 border rounded p-12">
              <p>Select an object from the gallery to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format event IDs into readable text
const formatEventId = (eventId) => {
  return eventId
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default ObjectGallery;


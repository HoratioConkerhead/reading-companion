import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ForceGraph2D } from 'react-force-graph';
import 'react-tabs/style/react-tabs.css';

// Import mock data (we'd normally fetch this from our XML)
import { charactersData, eventsData, locationsData, relationshipsData } from './mockData';

const StitchedUpApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timelineFilter, setTimelineFilter] = useState('all');
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  
  // Initialize graph data from our characters and relationships
  useEffect(() => {
    const nodes = charactersData.map(char => ({
      id: char.id,
      name: char.name,
      group: char.group,
      title: char.title || '',
      role: char.role || '',
    }));
    
    const links = relationshipsData.map(rel => ({
      source: rel.from,
      target: rel.to,
      type: rel.type,
    }));
    
    setGraphData({ nodes, links });
  }, []);

  // Character selection handler
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };
  
  // Location selection handler
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };
  
  // Event selection handler
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };
  
  // Graph node click handler
  const handleNodeClick = (node) => {
    const character = charactersData.find(c => c.id === node.id);
    setSelectedCharacter(character);
  };

  return (
    <div className="app-container bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif">Stitched Up</h1>
          <p className="text-sm mt-1">An Interactive Companion to Martin Parsons' Novel</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
          <TabList className="flex bg-white p-2 rounded-t shadow">
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2">Characters</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2">Relationship Web</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2">Timeline</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2">Locations</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded">Plot Navigator</Tab>
          </TabList>

          <div className="bg-white p-6 rounded-b shadow mb-6">
            {/* Characters Tab */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 h-screen overflow-y-auto pr-4">
                  <h2 className="text-xl font-bold mb-4">Character List</h2>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search characters..." 
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="space-y-2">
                    {charactersData.map(character => (
                      <div 
                        key={character.id}
                        className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${selectedCharacter?.id === character.id ? 'bg-blue-100 border-blue-300' : ''}`}
                        onClick={() => handleCharacterSelect(character)}
                      >
                        <h3 className="font-bold">{character.name}</h3>
                        <div className="flex mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${getGroupColor(character.group)}`}>
                            {character.group}
                          </span>
                          {character.title && (
                            <span className="text-xs px-2 py-1 rounded bg-gray-200 ml-2">
                              {character.title}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2 border-l pl-6">
                  {selectedCharacter ? (
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
                          {selectedCharacter.title && <p className="text-gray-600 italic">{selectedCharacter.title}</p>}
                          <div className="flex mt-2">
                            <span className={`text-sm px-2 py-1 rounded ${getGroupColor(selectedCharacter.group)}`}>
                              {selectedCharacter.group}
                            </span>
                          </div>
                        </div>
                        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-500">Photo</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-lg border-b pb-2 mb-2">Background</h3>
                          <p>{selectedCharacter.background || "No background information available."}</p>
                          
                          <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Personality</h3>
                          <p>{selectedCharacter.personality || "No personality information available."}</p>
                          
                          {selectedCharacter.traits && selectedCharacter.traits.length > 0 && (
                            <>
                              <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Key Traits</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedCharacter.traits.map((trait, index) => (
                                  <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                                    {trait}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-lg border-b pb-2 mb-2">Role</h3>
                          <p>{selectedCharacter.role}</p>
                          
                          {selectedCharacter.relations && selectedCharacter.relations.length > 0 && (
                            <>
                              <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Key Relationships</h3>
                              <div className="space-y-2">
                                {selectedCharacter.relations.map((relation, index) => {
                                  const relatedCharacter = charactersData.find(c => c.id === relation.characterId);
                                  return (
                                    <div key={index} className="border-l-4 border-blue-300 pl-3">
                                      <div className="font-medium">{relatedCharacter?.name || relation.characterId}</div>
                                      <div className="text-sm text-gray-600">{relation.description}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </>
                          )}
                          
                          {selectedCharacter.fate && (
                            <>
                              <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Fate</h3>
                              <p>{selectedCharacter.fate}</p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-bold text-lg border-b pb-2 mb-2">Character Development</h3>
                        {selectedCharacter.development && selectedCharacter.development.length > 0 ? (
                          <div className="relative">
                            <div className="absolute top-0 bottom-0 left-8 w-1 bg-gray-300"></div>
                            <div className="space-y-6">
                              {selectedCharacter.development.map((arc, index) => (
                                <div key={index} className="relative flex">
                                  <div className="flex-shrink-0 w-16 text-right">
                                    <div className="h-8 w-8 bg-blue-500 rounded-full z-10 relative flex items-center justify-center text-white">
                                      {index + 1}
                                    </div>
                                  </div>
                                  <div className="flex-grow ml-4 pt-1">
                                    <h4 className="font-medium">{arc.phase}</h4>
                                    <p className="text-gray-600">{arc.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p>No development information available.</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <p>Select a character from the list to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            
            {/* Relationship Web Tab */}
            <TabPanel>
              <h2 className="text-xl font-bold mb-4">Character Relationships</h2>
              <div className="flex mb-4">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded mr-2">Intelligence Network</button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded mr-2">Fifth Columnists</button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">All Relationships</button>
              </div>
              <div className="border rounded" style={{ height: '600px' }}>
                <ForceGraph2D
                  graphData={graphData}
                  nodeLabel={node => node.name}
                  nodeColor={node => getNodeColor(node.group)}
                  linkDirectionalArrowLength={3.5}
                  linkDirectionalArrowRelPos={1}
                  linkCurvature={0.25}
                  onNodeClick={handleNodeClick}
                  linkWidth={1}
                  linkColor={() => '#999'}
                  nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12/globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                    ctx.fillStyle = getNodeColor(node.group);
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
                    ctx.fill();

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#fff';
                    ctx.fillText(label, node.x, node.y);
                  }}
                />
              </div>
              
              {selectedCharacter && (
                <div className="mt-4 p-4 border rounded bg-gray-50">
                  <h3 className="font-bold">{selectedCharacter.name}</h3>
                  <p className="text-sm text-gray-600">{selectedCharacter.role}</p>
                  <p className="mt-2">{selectedCharacter.background}</p>
                </div>
              )}
            </TabPanel>
            
            {/* Timeline Tab */}
            <TabPanel>
              <h2 className="text-xl font-bold mb-4">Event Timeline</h2>
              <div className="flex mb-4">
                <button 
                  className={`px-4 py-2 rounded mr-2 ${timelineFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setTimelineFilter('all')}
                >
                  All Events
                </button>
                <button 
                  className={`px-4 py-2 rounded mr-2 ${timelineFilter === 'cynthia' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setTimelineFilter('cynthia')}
                >
                  Cynthia's Journey
                </button>
                <button 
                  className={`px-4 py-2 rounded mr-2 ${timelineFilter === 'intelligence' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setTimelineFilter('intelligence')}
                >
                  Intelligence Services
                </button>
                <button 
                  className={`px-4 py-2 rounded ${timelineFilter === 'fifth' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setTimelineFilter('fifth')}
                >
                  Fifth Columnists
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  <div className="relative pb-10">
                    <div className="absolute left-0 right-0 h-1 bg-gray-300 top-4"></div>
                    <div className="flex">
                      {eventsData.map((event, index) => (
                        <div 
                          key={event.id} 
                          className="relative px-4"
                          onClick={() => handleEventSelect(event)}
                        >
                          <div className={`w-2 h-2 rounded-full bg-blue-500 relative top-4 z-10 ${index === 0 ? 'ml-0' : ''}`}></div>
                          <div className="text-xs pt-6 w-24 text-center cursor-pointer">
                            {event.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-1 h-128 overflow-y-auto border rounded p-4">
                  {eventsData.map(event => (
                    <div 
                      key={event.id}
                      className={`p-3 mb-2 border rounded cursor-pointer hover:bg-gray-100 ${selectedEvent?.id === event.id ? 'bg-blue-100 border-blue-300' : ''}`}
                      onClick={() => handleEventSelect(event)}
                    >
                      <div className="text-sm text-gray-600">{event.date}</div>
                      <h3 className="font-bold">{event.title}</h3>
                    </div>
                  ))}
                </div>
                
                <div className="md:col-span-2 border rounded p-6">
                  {selectedEvent ? (
                    <div>
                      <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                      <div className="text-gray-600 mb-4">{selectedEvent.date}</div>
                      
                      <p className="mb-4">{selectedEvent.description}</p>
                      
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Location</h3>
                        <div className="p-2 bg-gray-100 rounded">
                          {selectedEvent.location ? (
                            <div>{locationsData.find(l => l.id === selectedEvent.location)?.name || selectedEvent.location}</div>
                          ) : (
                            <div>Multiple or unspecified locations</div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Key Characters</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedEvent.characters && selectedEvent.characters.map((charRef, index) => {
                            const character = charactersData.find(c => c.id === charRef.characterId);
                            return character ? (
                              <div key={index} className="p-2 bg-gray-100 rounded flex items-center">
                                <span>{character.name}</span>
                                {charRef.role && (
                                  <span className="ml-2 text-xs bg-blue-100 px-1 rounded">
                                    {charRef.role}
                                  </span>
                                )}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                      
                      {selectedEvent.keyActions && selectedEvent.keyActions.length > 0 && (
                        <div>
                          <h3 className="font-bold text-lg mb-2">Key Actions</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {selectedEvent.keyActions.map((action, index) => (
                              <li key={index}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <p>Select an event from the timeline to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            
            {/* Locations Tab */}
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 h-128 overflow-y-auto pr-4">
                  <h2 className="text-xl font-bold mb-4">Locations</h2>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Search locations..." 
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="space-y-2">
                    {locationsData.map(location => (
                      <div 
                        key={location.id}
                        className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${selectedLocation?.id === location.id ? 'bg-blue-100 border-blue-300' : ''}`}
                        onClick={() => handleLocationSelect(location)}
                      >
                        <h3 className="font-bold">{location.name}</h3>
                        <div className="text-sm text-gray-600">{location.area}</div>
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
                          <span className="text-gray-500">Location Map/Image</span>
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
                          
                          {selectedLocation.owner && (
                            <>
                              <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Owner</h3>
                              <p>{selectedLocation.owner}</p>
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
                          
                          {selectedLocation.events && selectedLocation.events.length > 0 && (
                            <>
                              <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Key Events</h3>
                              <div className="space-y-2">
                                {selectedLocation.events.map((eventRef, index) => {
                                  const event = eventsData.find(e => e.id === eventRef.eventId);
                                  return event ? (
                                    <div 
                                      key={index} 
                                      className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
                                      onClick={() => handleEventSelect(event)}
                                    >
                                      <div className="text-sm text-gray-600">{event.date}</div>
                                      <div className="font-medium">{event.title}</div>
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <p>Select a location from the list to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
            
            {/* Plot Navigator Tab */}
            <TabPanel>
              <h2 className="text-xl font-bold mb-4">Plot Navigator</h2>
              <div className="flex mb-4">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded mr-2">Reader's View</button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded mr-2">True Events</button>
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Theme Analysis</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded p-4">
                  <h3 className="font-bold text-lg mb-4">Chapter Progression</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold">Preface</h4>
                      <p className="text-sm text-gray-600">German Infiltration</p>
                      <p className="mt-1">A German U-boat delivers an agent to the Scilly Isles. MI5 receives intelligence about German infiltration attempts.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold">Chapter 1: Wiltshire, May 1932</h4>
                      <p className="text-sm text-gray-600">Cynthia's Arrival at Denleigh</p>
                      <p className="mt-1">Lady Cynthia Childreth arrives at Denleigh Manor for a weekend party hosted by her old school friend, Lady Amelia Wyndholme.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-bold">Chapter 2</h4>
                      <p className="text-sm text-gray-600">Meeting the Guests</p>
                      <p className="mt-1">Cynthia meets the other guests at Denleigh. She finds the social interactions tedious and notices Miss Gilchrist's unconventional appearance.</p>
                    </div>
                    
                    <div className="border-l-4 border-gray-300 pl-4">
                      <h4 className="font-bold">Chapter 3</h4>
                      <p className="text-sm text-gray-600">The Approach</p>
                      <p className="mt-1">Bill and Hannah approach Cynthia in the garden and ask her to help with intelligence work.</p>
                    </div>
                    
                    <div className="border-l-4 border-gray-300 pl-4">
                      <h4 className="font-bold">Chapter 4</h4>
                      <p className="text-gray-500 italic">Click to unlock</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded p-4">
                  <h3 className="font-bold text-lg mb-4">Mystery Elements</h3>
                  <div className="space-y-4">
                    <div className="border p-3 rounded bg-blue-50">
                      <h4 className="font-bold">The Knitters Group</h4>
                      <p className="text-sm">First introduced: Chapter 1</p>
                      <p className="mt-1">The group of German Nazi women sympathizers, nicknamed after the historical "tricoteuses" who knit during French Revolution executions.</p>
                    </div>
                    
                    <div className="border p-3 rounded">
                      <h4 className="font-bold">The Mysterious Suitcase</h4>
                      <p className="text-sm">First introduced: Chapter 23</p>
                      <p className="mt-1">A suitcase delivered to Cynthia, initially believed to contain a radio but actually containing women's clothes.</p>
                      <div className="mt-2 flex">
                        <span className="bg-gray-200 text-sm px-2 py-1 rounded">Unlocked</span>
                      </div>
                    </div>
                    
                    <div className="border p-3 rounded">
                      <h4 className="font-bold">Edwards' Murder</h4>
                      <p className="text-sm">First introduced: Chapter 27</p>
                      <p className="mt-1">The mysterious killing of the German agent Edwards in London.</p>
                      <div className="mt-2 flex">
                        <span className="bg-gray-200 text-sm px-2 py-1 rounded">Unlocked</span>
                      </div>
                    </div>
                    
                    <div className="border p-3 rounded bg-gray-100">
                      <h4 className="font-bold">Louise's True Allegiance</h4>
                      <p className="text-sm">First introduced: Chapter 42</p>
                      <p className="mt-1">The revelation that Louise has been working against the fifth columnists.</p>
                      <div className="mt-2 flex">
                        <span className="bg-gray-200 text-sm px-2 py-1 rounded">Locked until Chapter 42</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border rounded p-4">
                <h3 className="font-bold text-lg mb-4">Theme Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border p-3 rounded">
                    <h4 className="font-bold text-blue-700">Class and Privilege</h4>
                    <p className="mt-1">Examination of how class and social standing influence characters' actions and beliefs.</p>
                    <div className="mt-2">
                      <div className="text-sm font-medium">Key Examples:</div>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Contrast between genuine aristocrats (Cynthia) and aspirational middle-class (Snowden)</li>
                        <li>Use of country house parties as recruitment grounds</li>
                        <li>Aristocratic connections of fifth columnists</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="border p-3 rounded">
                    <h4 className="font-bold text-green-700">Deception and Double Identity</h4>
                    <p className="mt-1">Exploration of hidden identities and deception in wartime.</p>
                    <div className="mt-2">
                      <div className="text-sm font-medium">Key Examples:</div>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Multiple characters using aliases and disguises</li>
                        <li>Louise's ultimate betrayal of her group</li>
                        <li>Cynthia's double life</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

// Helper functions
const getGroupColor = (group) => {
  switch (group) {
    case 'Protagonists':
      return 'bg-blue-200 text-blue-800';
    case 'Fifth Columnists':
      return 'bg-red-200 text-red-800';
    case 'German Connection':
      return 'bg-yellow-200 text-yellow-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const getNodeColor = (group) => {
  switch (group) {
    case 'Protagonists':
      return '#4299e1';
    case 'Fifth Columnists':
      return '#f56565';
    case 'German Connection':
      return '#ecc94b';
    default:
      return '#a0aec0';
  }
};

// Mock data (would normally come from our XML)
const mockData = {
  charactersData: [
    {
      id: 'cynthia_childreth',
      name: 'Lady Cynthia Childreth',
      title: 'Lady',
      group: 'Protagonists',
      role: 'Main protagonist, undercover operative',
      background: 'Wealthy aristocrat, well-educated, multilingual, unconventional',
      personality: 'Independent, observant, quick-thinking, adaptable',
      traits: ['Multilingual', 'Well-traveled', 'Independent thinker'],
      relations: [
        { characterId: 'richard_childreth', type: 'spouse', description: 'Marriage of convenience' },
        { characterId: 'amy_wyndholme', type: 'friend', description: 'Old school friend' },
        { characterId: 'bill_laurie', type: 'handler', description: 'Intelligence handler' },
        { characterId: 'mary', type: 'employee_friend', description: 'Secretary and confidante' }
      ],
      development: [
        { phase: 'Beginning', description: 'Socialite with unconventional views' },
        { phase: 'Middle', description: 'Reluctant intelligence asset' },
        { phase: 'End', description: 'Effective operative, honored with OBE' }
      ]
    },
    {
      id: 'richard_childreth',
      name: 'Richard Childreth',
      group: 'Protagonists',
      role: 'Cynthia\'s husband, banker, supporting operative',
      background: 'Self-made financier who worked his way to top position',
      personality: 'Practical, professional, supportive',
      traits: ['Financially astute', 'Loyal'],
      relations: [
        { characterId: 'cynthia_childreth', type: 'spouse', description: 'Marriage of convenience' }
      ]
    },
    {
      id: 'bill_laurie',
      name: 'Wing Commander William Laurie',
      group: 'Protagonists',
      role: 'Intelligence officer, Cynthia\'s handler',
      background: 'Former RFC/RAF pilot injured in WWI',
      personality: 'Strategic, cautious, intelligent',
      traits: ['Military background', 'Strategic thinker'],
      relations: [
        { characterId: 'cynthia_childreth', type: 'asset', description: 'Recruits and handles Cynthia' },
        { characterId: 'hannah_park', type: 'colleague', description: 'Works with Hannah' },
        { characterId: 'jane_maclean', type: 'colleague', description: 'Works with Jane' },
        { characterId: 'edwin', type: 'subordinate', description: 'Edwin is Bill\'s "minder"' },
        { characterId: 'george_bennet', type: 'colleague', description: 'Collaborates with Special Branch' },
        { characterId: 'louise_harrington', type: 'asset', description: 'Secret informant' }
      ]
    },
    {
      id: 'hannah_park',
      name: 'Hannah Park',
      group: 'Protagonists',
      role: 'Intelligence agent',
      background: 'Former Section Controller in WAACs',
      personality: 'Bold, unconventional, adaptable',
      traits: ['Master of disguise', 'Provocative']
    },
    {
      id: 'jane_maclean',
      name: 'Jane Maclean',
      group: 'Protagonists',
      role: 'Intelligence agent',
      background: 'Former Section Controller in WAACs',
      traits: ['Observant']
    },
    {
      id: 'peter_snowden',
      name: 'Colonel Peter Snowden',
      title: 'Claims to be Colonel, actually Major',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, pro-Nazi sympathizer',
      background: 'Self-made man, started as butcher\'s son, served in WWI',
      personality: 'Pompous, pretends to be drunk, calculated',
      traits: ['Military background', 'Status-conscious', 'Feigns drunkenness'],
      fate: 'Escaped to Ireland'
    },
    {
      id: 'marjorie_snowden',
      name: 'Marjorie Snowden',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, pro-Nazi sympathizer',
      personality: 'Strongly opinionated, intolerant',
      traits: ['Cannot drive', 'Outspoken'],
      fate: 'Escaped to Ireland'
    },
    {
      id: 'bob_harrington',
      name: 'Bob Harrington',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, trained marksman',
      background: 'Medical orderly in WWI, seconded for "special duties"',
      personality: 'Determined, obsessive about weapons',
      traits: ['Meticulous', 'Fanatical'],
      fate: 'Shot in hand, arrested and imprisoned'
    },
    {
      id: 'louise_harrington',
      name: 'Louise Harrington',
      group: 'Fifth Columnists',
      role: 'Fifth columnist who becomes double agent',
      background: 'University educated (Girton), linguistics graduate',
      personality: 'Cunning, adaptable, eventually sympathetic',
      traits: ['Knitter', 'Intelligent', 'Morally complex'],
      fate: 'Killed in suspicious gas explosion after events'
    },
    {
      id: 'john_davies',
      name: 'Sir John Davies',
      title: 'Sir',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, pro-Nazi sympathizer',
      background: 'Welsh landowner',
      personality: 'Arrogant, commanding',
      traits: ['Authoritative', 'Wealthy landowner'],
      fate: 'Shot in arm, arrested and imprisoned'
    },
    {
      id: 'megan_davies',
      name: 'Lady Megan Davies',
      title: 'Lady',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, most fanatical of the group',
      background: 'Daughter of a Welsh rector',
      personality: 'Appears mousey but is extremely dedicated to the cause',
      traits: ['Deceptively meek appearance', 'Fanatically devoted to Nazi cause'],
      fate: 'Escaped to Ireland'
    },
    {
      id: 'gerda_stammer',
      name: 'Gerda Stammer',
      group: 'German Connection',
      role: 'German Nazi sympathizer',
      traits: ['Enthusiastic Hitler supporter']
    },
    {
      id: 'franz_stammer',
      name: 'Franz Stammer',
      group: 'German Connection',
      role: 'Works at the Reichsbank'
    },
    {
      id: 'lena_weber',
      name: 'Lena Weber',
      group: 'German Connection',
      role: 'Original member of the German pro-Nazi group',
      traits: ['Dedicated to Nazi cause']
    }
  ],
  
  eventsData: [
    {
      id: 'german_infiltration',
      title: 'German Infiltration via Scilly Isles',
      date: '1943',
      description: 'Helmut Schnitter arrives via submarine at Scilly Isles, MI5 receives intelligence about German infiltration',
      location: 'scilly_isles',
      characters: [
        { characterId: 'helmut_schnitter' }
      ]
    },
    {
      id: 'cynthia_recruitment',
      title: 'Cynthia\'s Recruitment',
      date: 'May 1932',
      description: 'Cynthia attends weekend at Denleigh Manor and is approached for intelligence work',
      location: 'denleigh_manor',
      characters: [
        { characterId: 'cynthia_childreth' },
        { characterId: 'richard_childreth' },
        { characterId: 'bill_laurie', role: 'recruiter' },
        { characterId: 'hannah_park', role: 'recruiter' },
        { characterId: 'jane_maclean', role: 'recruiter' },
        { characterId: 'peter_snowden', role: 'antagonist' },
        { characterId: 'marjorie_snowden', role: 'antagonist' },
        { characterId: 'bob_harrington', role: 'antagonist' },
        { characterId: 'louise_harrington', role: 'antagonist' },
        { characterId: 'amy_wyndholme', role: 'facilitator' }
      ]
    },
    {
      id: 'berlin_trip',
      title: 'Berlin Trip',
      date: '1932-1933 (estimated)',
      description: 'Richard and Cynthia travel to Berlin, stay at Hotel Adlon, meet Nazi sympathizers',
      location: 'hotel_adlon',
      characters: [
        { characterId: 'cynthia_childreth', role: 'operative' },
        { characterId: 'richard_childreth', role: 'operative' },
        { characterId: 'gerda_stammer', role: 'contact' },
        { characterId: 'franz_stammer', role: 'contact' },
        { characterId: 'lena_weber', role: 'contact' }
      ]
    },
    {
      id: 'hitler_sighting',
      title: 'Hitler Reception',
      date: '1932-1933 (estimated)',
      description: 'Brief sighting of Hitler at reception in Berlin',
      location: 'hotel_adlon',
      characters: [
        { characterId: 'cynthia_childreth', role: 'observer' },
        { characterId: 'richard_childreth', role: 'observer' },
        { characterId: 'bob_harrington', role: 'attendee' },
        { characterId: 'louise_harrington', role: 'attendee' },
        { characterId: 'john_davies', role: 'attendee' },
        { characterId: 'megan_davies', role: 'attendee' }
      ]
    },
    {
      id: 'first_party',
      title: 'First Party at Cynthia\'s House',
      date: 'May 27 (year unspecified)',
      description: 'Gathering of Nazi sympathizers at Cynthia\'s home, with intelligence agents observing',
      location: 'cynthia_house',
      characters: [
        { characterId: 'cynthia_childreth', role: 'host' },
        { characterId: 'richard_childreth', role: 'host' },
        { characterId: 'gerda_stammer', role: 'guest' },
        { characterId: 'lena_weber', role: 'guest' },
        { characterId: 'peter_snowden', role: 'guest' },
        { characterId: 'marjorie_snowden', role: 'guest' },
        { characterId: 'bob_harrington', role: 'guest' },
        { characterId: 'louise_harrington', role: 'guest' },
        { characterId: 'john_davies', role: 'guest' },
        { characterId: 'megan_davies', role: 'guest' },
        { characterId: 'bill_laurie', role: 'undercover' },
        { characterId: 'hannah_park', role: 'undercover' },
        { characterId: 'jane_maclean', role: 'undercover' }
      ],
      keyActions: [
        'Marjorie and Lena search Cynthia\'s office'
      ]
    },
    {
      id: 'second_party',
      title: 'Second Party at Cynthia\'s House',
      date: 'July 7 (year unspecified)',
      description: 'Second gathering, with Oswald Mosley in attendance',
      location: 'cynthia_house',
      characters: [
        { characterId: 'cynthia_childreth', role: 'host' },
        { characterId: 'richard_childreth', role: 'host' },
        { characterId: 'peter_snowden', role: 'guest' },
        { characterId: 'marjorie_snowden', role: 'guest' },
        { characterId: 'bob_harrington', role: 'guest' },
        { characterId: 'louise_harrington', role: 'guest' },
        { characterId: 'john_davies', role: 'guest' },
        { characterId: 'megan_davies', role: 'guest' }
      ],
      keyActions: [
        'Mosley asks Cynthia to act as safe house'
      ]
    },
    {
      id: 'edwards_murder',
      title: 'Murder of Edwards',
      date: '1943',
      description: 'Edwards found shot dead in London flat',
      location: 'crawford_place',
      characters: [
        { characterId: 'edwards', role: 'victim' },
        { characterId: 'megan_davies', role: 'killer', disguise: 'Postman' }
      ],
      keyActions: [
        'Edwards shot by woman disguised as postman',
        'Cheque book stolen'
      ]
    },
    {
      id: 'assassination_attempt',
      title: 'Attempted Assassination of Montgomery',
      date: 'December 7, 1943',
      description: 'Failed attempt to shoot Montgomery from Cynthia\'s tower',
      location: 'cynthia_house',
      characters: [
        { characterId: 'bob_harrington', role: 'assassin' },
        { characterId: 'louise_harrington', role: 'saboteur' },
        { characterId: 'john_davies', role: 'accomplice' },
        { characterId: 'bill_laurie', role: 'operative' },
        { characterId: 'cynthia_childreth', role: 'hostage' },
        { characterId: 'richard_childreth', role: 'hostage' }
      ],
      keyActions: [
        'Bob attempts to shoot Montgomery',
        'Louise reveals herself as double agent and stops him',
        'Bill and team raid the house',
        'Bob and Davies arrested'
      ]
    }
  ],
  
  locationsData: [
    {
      id: 'cynthia_house',
      name: 'Cynthia\'s House',
      area: 'Bucklebury, Berkshire',
      type: 'Country house',
      features: [
        'Large country estate',
        'Extensive gardens',
        'Tower/studio room with 360° views',
        'Multiple entrances',
        'Cellar with external entrance',
        'Summerhouse'
      ],
      significance: [
        'Cynthia\'s home',
        'Site of parties for Nazi sympathizers',
        'Location of attempted assassination of Montgomery'
      ],
      description: 'Isolated country house with tower providing view of Bucklebury Common',
      events: [
        { eventId: 'first_party' },
        { eventId: 'second_party' },
        { eventId: 'assassination_attempt' }
      ]
    },
    {
      id: 'denleigh_manor',
      name: 'Denleigh Manor',
      area: 'Wiltshire',
      type: 'Country house',
      features: [
        'Georgian architecture',
        'Large dining room',
        'Gardens'
      ],
      significance: [
        'Where Cynthia is recruited',
        'First meeting of main characters'
      ],
      owner: 'Amy and Horace Wyndholme',
      events: [
        { eventId: 'cynthia_recruitment' }
      ]
    },
    {
      id: 'hotel_adlon',
      name: 'Hotel Adlon',
      area: 'Berlin, Germany',
      type: 'Luxury hotel',
      features: [
        'Japanese garden in lobby',
        'Bar and restaurant',
        'Marble columns'
      ],
      significance: [
        'Where Richard and Cynthia meet German Nazi sympathizers',
        'Where they see Hitler'
      ],
      description: 'Opulent, historical hotel in government quarter near Brandenberg Gate',
      events: [
        { eventId: 'berlin_trip' },
        { eventId: 'hitler_sighting' }
      ]
    },
    {
      id: 'scilly_isles',
      name: 'Scilly Isles/St. Mary\'s',
      area: 'Cornwall',
      type: 'Island',
      significance: [
        'Entry point for German agents',
        'Weakly defended'
      ],
      description: 'Island with regular steamship services to mainland, weak defenses',
      events: [
        { eventId: 'german_infiltration' }
      ]
    },
    {
      id: 'crawford_place',
      name: 'Crawford Place flat',
      area: 'London',
      type: 'Apartment',
      significance: [
        'Where Edwards was killed'
      ],
      description: 'Small flat above a shop',
      events: [
        { eventId: 'edwards_murder' }
      ]
    },
    {
      id: 'bucklebury_camp',
      name: 'American Transport Division Camp',
      area: 'Bucklebury Common, Berkshire',
      type: 'Military camp',
      significance: [
        'Intended location for Montgomery\'s inspection',
        'Target for assassination'
      ],
      events: [
        { eventId: 'montgomery_visit' }
      ]
    }
  ],
  
  relationshipsData: [
    { from: 'bill_laurie', to: 'cynthia_childreth', type: 'handler-asset' },
    { from: 'bill_laurie', to: 'richard_childreth', type: 'handler-asset' },
    { from: 'bill_laurie', to: 'hannah_park', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'jane_maclean', type: 'superior-subordinate' },
    { from: 'cynthia_childreth', to: 'richard_childreth', type: 'spouse' },
    { from: 'john_davies', to: 'peter_snowden', type: 'conspirator' },
    { from: 'peter_snowden', to: 'bob_harrington', type: 'conspirator' },
    { from: 'bob_harrington', to: 'john_davies', type: 'conspirator' },
    { from: 'john_davies', to: 'megan_davies', type: 'spouse' },
    { from: 'peter_snowden', to: 'marjorie_snowden', type: 'spouse' },
    { from: 'bob_harrington', to: 'louise_harrington', type: 'spouse' },
    { from: 'louise_harrington', to: 'bill_laurie', type: 'secret-informant' }
  ]
};

export { mockData };
export default StitchedUpApp;
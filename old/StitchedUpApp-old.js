import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ForceGraph2D } from 'react-force-graph';
import 'react-tabs/style/react-tabs.css';

// Import components
import InteractiveMap from './InteractiveMap';
import SpycraftEncyclopedia from './SpycraftEncyclopedia';

// Import mock data
import { charactersData, eventsData, locationsData, relationshipsData, objectsData } from './mockData';

const StitchedUpApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
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
    setActiveTab(3); // Switch to locations tab
  };
  
  // Event selection handler
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setActiveTab(2); // Switch to timeline tab
  };
  
  // Object selection handler
  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    setActiveTab(6); // Switch to objects tab
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
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2">Map</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2">Plot Navigator</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2">Objects</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded">Spy Encyclopedia</Tab>
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
                                  const relatedCharacter
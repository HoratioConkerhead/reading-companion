import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Import components
import CharacterExplorer from './CharacterExplorer';
import RelationshipWeb from './RelationshipWeb';
import Timeline from './Timeline';
import LocationExplorer from './LocationExplorer';
import InteractiveMap from './InteractiveMap';
import PlotNavigator from './PlotNavigator';
import ObjectGallery from './ObjectGallery';
import SpycraftEncyclopedia from './SpycraftEncyclopedia';

// Import data
import { charactersData, eventsData, locationsData, objectsData } from './mockData';

const StitchedUpApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  
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
  };
  
  return (
    <div className="app-container bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif">Stitched Up</h1>
          <p className="text-sm mt-1">An Interactive Companion to Matt Parry's Novel</p>
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
              <CharacterExplorer 
                onCharacterSelect={handleCharacterSelect} 
                selectedCharacter={selectedCharacter}
              />
            </TabPanel>
            
            {/* Relationship Web Tab */}
            <TabPanel>
              <RelationshipWeb 
                onCharacterSelect={handleCharacterSelect}
                selectedCharacter={selectedCharacter}
              />
            </TabPanel>
            
            {/* Timeline Tab */}
            <TabPanel>
              <Timeline 
                onEventSelect={handleEventSelect}
                selectedEvent={selectedEvent}
              />
            </TabPanel>
            
            {/* Locations Tab */}
            <TabPanel>
              <LocationExplorer 
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
                onEventSelect={handleEventSelect}
              />
            </TabPanel>
            
            {/* Map Tab */}
            <TabPanel>
              <InteractiveMap 
                onLocationSelect={handleLocationSelect}
                onEventSelect={handleEventSelect}
              />
            </TabPanel>
            
            {/* Plot Navigator Tab */}
            <TabPanel>
              <PlotNavigator 
                onEventSelect={handleEventSelect}
                onCharacterSelect={handleCharacterSelect}
              />
            </TabPanel>
            
            {/* Objects Tab */}
            <TabPanel>
              <ObjectGallery 
                onObjectSelect={handleObjectSelect}
                selectedObject={selectedObject}
              />
            </TabPanel>
            
            {/* Spy Encyclopedia Tab */}
            <TabPanel>
              <SpycraftEncyclopedia />
            </TabPanel>
          </div>
        </Tabs>
      </main>
      
      <footer className="bg-gray-700 text-white p-4 mt-8">
        <div className="container mx-auto">
          <p className="text-center">
            "Stitched Up" Interactive Companion © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StitchedUpApp;
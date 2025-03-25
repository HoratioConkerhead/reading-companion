import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'leaflet/dist/leaflet.css';

// Import components
import AppTour from './components/AppTour';
import CharacterExplorer from './components/CharacterExplorer';
import RelationshipWeb from './components/RelationshipWeb';
import Timeline from './components/Timeline';
import LocationExplorer from './components/LocationExplorer';
import InteractiveMap from './components/InteractiveMap';
import PlotNavigator from './components/PlotNavigator';
import ObjectGallery from './components/ObjectGallery';
import SpycraftEncyclopedia from './components/SpycraftEncyclopedia';

// Import data from new structure - using the namespace approach
import { stitchedUp } from './data';

const StitchedUpApp = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [appTour, setAppTour] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  
  // Check for first visit to potentially show tutorial
  useEffect(() => {
    const hasVisited = localStorage.getItem('stitchedUpVisited');
    if (!hasVisited) {
      setFirstVisit(true);
      // We could auto-start the tour here for first time visitors
      localStorage.setItem('stitchedUpVisited', 'true');
    } else {
      setFirstVisit(false);
    }
  }, []);
  
  // Character selection handler
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    // If we're not already on the character tab, switch to it
    if (activeTab !== 0) {
      setActiveTab(0);
    }
  };
  
  // Location selection handler
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Switch to locations tab
    setActiveTab(3);
  };
  
  // Event selection handler
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    // Switch to timeline tab
    setActiveTab(2);
  };
  
  // Object selection handler
  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    // Switch to objects tab
    setActiveTab(6);
  };
  
  // Start app tour
  const startTour = () => {
    setAppTour(true);
  };
  
  // Close app tour
  const closeTour = useCallback(() => {
    setAppTour(false);
  }, []);
  
  // Handle tab change from tour
  const handleTabChangeFromTour = useCallback((tabIndex) => {
    setActiveTab(tabIndex);
  }, []);
  
  // Close first visit message
  const closeFirstVisitMessage = () => {
    setFirstVisit(false);
  };

  return (
    <div className="app-container bg-gray-100 min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif">Stitched Up</h1>
            <p className="text-sm mt-1">An Interactive Companion to Matt Parry's Novel</p>
          </div>
          <div>
            <button 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
              onClick={startTour}
            >
              Tour the App
            </button>
          </div>
        </div>
      </header>
      
      {firstVisit && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="pr-8">
              <h2 className="text-lg font-bold text-blue-800">Welcome to the "Stitched Up" Interactive Companion!</h2>
              <p className="mt-1 text-blue-700">
                This app helps you explore characters, relationships, locations, and plot elements from the novel. 
                Use the tabs below to navigate different aspects of the story.
              </p>
            </div>
            <button 
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
              onClick={closeFirstVisitMessage}
            >
              Got it
            </button>
          </div>
        </div>
      )}
      
      <main className="container mx-auto p-4">
        <Tabs selectedIndex={activeTab} onSelect={index => setActiveTab(index)}>
          <TabList className="flex bg-white p-2 rounded-t shadow overflow-x-auto">
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2 whitespace-nowrap">Characters</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2 whitespace-nowrap">Relationship Web</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2 whitespace-nowrap">Timeline</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2 whitespace-nowrap">Locations</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2 whitespace-nowrap">Map</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2 whitespace-nowrap">Plot Navigator</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded mr-2 whitespace-nowrap">Objects</Tab>
            <Tab className="px-4 py-2 cursor-pointer hover:bg-gray-200 focus:outline-none rounded whitespace-nowrap">Spy Encyclopedia</Tab>
          </TabList>

          <div className="bg-white p-6 rounded-b shadow mb-6">
            {/* Characters Tab */}
            <TabPanel>
              <CharacterExplorer 
                onCharacterSelect={handleCharacterSelect} 
                selectedCharacter={selectedCharacter}
                charactersData={stitchedUp.characters}
                relationshipsData={stitchedUp.relationships}
              />
            </TabPanel>
            
            {/* Relationship Web Tab */}
            <TabPanel>
              <RelationshipWeb 
                onCharacterSelect={handleCharacterSelect}
                selectedCharacter={selectedCharacter}
                charactersData={stitchedUp.characters}
                relationshipsData={stitchedUp.relationships}
              />
            </TabPanel>
            
            {/* Timeline Tab */}
            <TabPanel>
              <Timeline 
                onEventSelect={handleEventSelect}
                selectedEvent={selectedEvent}
                onCharacterSelect={handleCharacterSelect}
                eventsData={stitchedUp.events}
                charactersData={stitchedUp.characters}
                locationsData={stitchedUp.locations}
              />
            </TabPanel>
            
            {/* Locations Tab */}
            <TabPanel>
              <LocationExplorer 
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
                onEventSelect={handleEventSelect}
                locationsData={stitchedUp.locations}
                eventsData={stitchedUp.events}
                charactersData={stitchedUp.characters}
              />
            </TabPanel>
            
            {/* Map Tab */}
            <TabPanel>
              <InteractiveMap
                onLocationSelect={handleLocationSelect}
                onEventSelect={handleEventSelect}
                onCharacterSelect={handleCharacterSelect}
                onObjectSelect={handleObjectSelect}
                locationsData={stitchedUp.locations}
                eventsData={stitchedUp.events}
                charactersData={stitchedUp.characters}
                objectsData={stitchedUp.objects}
              />
            </TabPanel>

            {/* Plot Navigator Tab */}
            <TabPanel>
              <PlotNavigator 
                onEventSelect={handleEventSelect}
                onCharacterSelect={handleCharacterSelect}
                eventsData={stitchedUp.events}
                charactersData={stitchedUp.characters}
                chaptersData={stitchedUp.chapters}
                mysteryElements={stitchedUp.mysteryElements}
                themeElements={stitchedUp.themeElements}
              />
            </TabPanel>
            
            {/* Objects Tab */}
            <TabPanel>
              <ObjectGallery 
                onObjectSelect={handleObjectSelect}
                selectedObject={selectedObject}
                objectsData={stitchedUp.objects}
                charactersData={stitchedUp.characters}
                eventsData={stitchedUp.events}
              />
            </TabPanel>
            
            {/* Spy Encyclopedia Tab */}
            <TabPanel>
              <SpycraftEncyclopedia 
                spycraftEntries={stitchedUp.spycraftEntries}
              />
            </TabPanel>
          </div>
        </Tabs>
        
        {/* Current Selection Summary - Quick Cross-Reference */}
        <div className="bg-white p-4 rounded shadow mb-6 current-selections">
          <h2 className="text-lg font-bold mb-2">Current Selections</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {selectedCharacter && (
              <div className="border p-3 rounded hover:bg-blue-50 cursor-pointer" onClick={() => setActiveTab(0)}>
                <div className="text-sm text-gray-500">Character</div>
                <div className="font-medium">{selectedCharacter.name}</div>
                <div className="text-xs mt-1 text-blue-600">Click to view details</div>
              </div>
            )}
            
            {selectedEvent && (
              <div className="border p-3 rounded hover:bg-blue-50 cursor-pointer" onClick={() => setActiveTab(2)}>
                <div className="text-sm text-gray-500">Event</div>
                <div className="font-medium">{selectedEvent.title}</div>
                <div className="text-xs text-gray-500">{selectedEvent.date}</div>
                <div className="text-xs mt-1 text-blue-600">Click to view details</div>
              </div>
            )}
            
            {selectedLocation && (
              <div className="border p-3 rounded hover:bg-blue-50 cursor-pointer" onClick={() => setActiveTab(3)}>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{selectedLocation.name}</div>
                <div className="text-xs text-gray-500">{selectedLocation.area}</div>
                <div className="text-xs mt-1 text-blue-600">Click to view details</div>
              </div>
            )}
            
            {selectedObject && (
              <div className="border p-3 rounded hover:bg-blue-50 cursor-pointer" onClick={() => setActiveTab(6)}>
                <div className="text-sm text-gray-500">Object</div>
                <div className="font-medium">{selectedObject.name}</div>
                <div className="text-xs mt-1 text-blue-600">Click to view details</div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-700 text-white p-4 mt-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">About this App</h3>
              <p className="text-sm">
                The "Stitched Up" Interactive Companion is designed to enhance your reading experience
                by providing detailed information about characters, locations, events, and spy techniques
                featured in Matt Parry's novel.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">Navigation Tips</h3>
              <ul className="text-sm list-disc pl-5 space-y-1">
                <li>Use the tabs to explore different aspects of the novel</li>
                <li>Click on characters, events, or locations to see more details</li>
                <li>Cross-reference elements using the "Current Selections" panel</li>
                <li>Use the Plot Navigator to understand the story structure</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-2">About the Novel</h3>
              <p className="text-sm">
                "Stitched Up" is a historical spy thriller set during World War II, following 
                Lady Cynthia Childreth's recruitment into intelligence work and her efforts to 
                thwart a Nazi assassination plot.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-600 text-center text-sm">
            <p>"Stitched Up" Interactive Companion © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
      
      {/* App Tour Component */}
      <AppTour 
        isOpen={appTour} 
        onClose={closeTour}
        currentTab={activeTab}
        onTabChange={handleTabChangeFromTour}
      />
    </div>
  );
};

// Helper function to get the CSS class for a character group
export const getGroupColor = (group) => {
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

export default StitchedUpApp;
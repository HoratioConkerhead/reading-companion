import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'leaflet/dist/leaflet.css';
import './styles/enhanced-tabs.css';

// Import components
import AppTour from './components/AppTour';
import DarkModeToggle from './components/DarkModeToggle';
import CharacterExplorer from './components/CharacterExplorer';
import RelationshipWeb from './components/RelationshipWeb';
import Timeline from './components/Timeline';
import LocationExplorer from './components/LocationExplorer';
import InteractiveMap from './components/InteractiveMap';
import PlotNavigator from './components/PlotNavigator';
import ObjectGallery from './components/ObjectGallery';
import SpycraftEncyclopedia from './components/SpycraftEncyclopedia';

// Import data from new structure - using the namespace approach
import { defaultBook } from './data';

const InteractiveReadingCompanion = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [appTour, setAppTour] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // Get book metadata
  const bookData = defaultBook;
  const metadata = bookData.bookMetadata;
  
  // Check for first visit to potentially show tutorial
  useEffect(() => {
    const hasVisited = localStorage.getItem('interactiveReadingCompanionVisited');
    if (!hasVisited) {
      setFirstVisit(true);
      // We could auto-start the tour here for first time visitors
      localStorage.setItem('interactiveReadingCompanionVisited', 'true');
    } else {
      setFirstVisit(false);
    }
    
    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Dark mode toggle handler
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Update the document class for Tailwind dark mode
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
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
    <div className={`app-container min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className="p-4" style={{ backgroundColor: 'var(--color-header-bg)', color: 'var(--color-header-text)' }}>
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif">{metadata.appTitle}</h1>
            <p className="text-sm mt-1">{metadata.appSubtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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
        <div className={`p-4 border-b ${darkMode ? 'bg-blue-900 border-blue-800 text-blue-100' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
          <div className="container mx-auto flex justify-between items-center">
            <div className="pr-8">
              <h2 className="text-lg font-bold">{metadata.welcomeMessage}</h2>
              <p className="mt-1">
                {metadata.welcomeDescription}
              </p>
            </div>
            <button 
              className={`px-3 py-1 rounded text-white text-sm ${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'}`}
              onClick={closeFirstVisitMessage}
            >
              Got it
            </button>
          </div>
        </div>
      )}
      
      <main className="p-4">
        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
          <TabList>
            <Tab>Characters</Tab>
            <Tab>Relationships</Tab>
            <Tab>Timeline</Tab>
            <Tab>Locations</Tab>
            <Tab>Map</Tab>
            <Tab>Plot</Tab>
            <Tab>Objects</Tab>
            <Tab>Spycraft</Tab>
          </TabList>
          
          <div>
            {/* Characters Tab */}
            <TabPanel>
              <CharacterExplorer 
                onCharacterSelect={handleCharacterSelect} 
                selectedCharacter={selectedCharacter}
                charactersData={bookData.characters}
                relationshipsData={bookData.relationships}
              />
            </TabPanel>
            
            {/* Relationship Web Tab */}
            <TabPanel>
                          <RelationshipWeb
              onCharacterSelect={handleCharacterSelect}
              selectedCharacter={selectedCharacter}
              charactersData={bookData.characters}
              relationshipsData={bookData.relationships}
              chaptersData={bookData.chapters}
              darkMode={darkMode}
            />
            </TabPanel>
            
            {/* Timeline Tab */}
            <TabPanel>
              <Timeline 
                onEventSelect={handleEventSelect}
                selectedEvent={selectedEvent}
                onCharacterSelect={handleCharacterSelect}
                eventsData={bookData.events}
                charactersData={bookData.characters}
                locationsData={bookData.locations}
              />
            </TabPanel>
            
            {/* Locations Tab */}
            <TabPanel>
              <LocationExplorer
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
                onEventSelect={handleEventSelect}
                locationsData={bookData.locations}
                eventsData={bookData.events}
                charactersData={bookData.characters}
              />
            </TabPanel>
            
            {/* Map Tab */}
            <TabPanel>
              <InteractiveMap
                onLocationSelect={handleLocationSelect}
                onEventSelect={handleEventSelect}
                onCharacterSelect={handleCharacterSelect}
                onObjectSelect={handleObjectSelect}
                locationsData={bookData.locations}
                eventsData={bookData.events}
                charactersData={bookData.characters}
                objectsData={bookData.objects}
              />
            </TabPanel>
            
            {/* Plot Navigator Tab */}
            <TabPanel>
              <PlotNavigator
                onEventSelect={handleEventSelect}
                onCharacterSelect={handleCharacterSelect}
                eventsData={bookData.events}
                charactersData={bookData.characters}
                chaptersData={bookData.chapters}
                mysteryElements={bookData.mysteryElements}
                themeElements={bookData.themeElements}
              />
            </TabPanel>
            
            {/* Objects Tab */}
            <TabPanel>
              <ObjectGallery
                onObjectSelect={handleObjectSelect}
                selectedObject={selectedObject}
                objectsData={bookData.objects}
                charactersData={bookData.characters}
                eventsData={bookData.events}
              />
            </TabPanel>
            
            {/* Spycraft Encyclopedia Tab */}
            <TabPanel>
              <SpycraftEncyclopedia 
                spycraftEntries={bookData.spycraftEntries}
              />
            </TabPanel>
          </div>
        </Tabs>
        
        {/* Current Selection Summary - Quick Cross-Reference */}
        <div className={`p-4 rounded shadow mb-6 current-selections ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`} style={{ backgroundColor: 'var(--color-panel-bg)', borderColor: 'var(--color-panel-border)' }}>
          <h2 className="text-lg font-bold mb-2">Current Selections</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {selectedCharacter && (
              <div className={`border p-3 rounded cursor-pointer ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'}`} onClick={() => setActiveTab(0)}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Character</div>
                <div className="font-medium">{selectedCharacter.name}</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Click to view details</div>
              </div>
            )}
            
            {selectedEvent && (
              <div className={`border p-3 rounded cursor-pointer ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'}`} onClick={() => setActiveTab(2)}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Event</div>
                <div className="font-medium">{selectedEvent.title}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedEvent.date}</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Click to view details</div>
              </div>
            )}
            
            {selectedLocation && (
              <div className={`border p-3 rounded cursor-pointer ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'}`} onClick={() => setActiveTab(3)}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</div>
                <div className="font-medium">{selectedLocation.name}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedLocation.area}</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Click to view details</div>
              </div>
            )}
            
            {selectedObject && (
              <div className={`border p-3 rounded cursor-pointer ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-blue-50'}`} onClick={() => setActiveTab(6)}>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Object</div>
                <div className="font-medium">{selectedObject.name}</div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Click to view details</div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="p-4 mt-8" style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">About this App</h3>
              <p className="text-sm">
                {metadata.aboutApp}
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
              <h3 className="text-lg font-bold mb-2">About the Book</h3>
              <p className="text-sm">
                {metadata.aboutBook}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-600 text-center text-sm">
            <p>{metadata.copyright} © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
      
      {/* App Tour Component */}
      <AppTour 
        isOpen={appTour} 
        onClose={closeTour}
        currentTab={activeTab}
        onTabChange={handleTabChangeFromTour}
        bookMetadata={metadata}
      />
    </div>
  );
};

// Helper function to get the CSS class for a character group
export const getGroupColor = (group) => {
  switch (group) {
    case 'Protagonists':
      return 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    case 'Fifth Columnists':
      return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200';
    case 'German Connection':
      return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    default:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

export default InteractiveReadingCompanion;
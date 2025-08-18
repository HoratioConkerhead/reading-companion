import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'leaflet/dist/leaflet.css';
import './styles/enhanced-tabs.css';

// Import components
import AppTour from './components/AppTour';
import PageTutorial from './components/PageTutorial';
import DarkModeToggle from './components/DarkModeToggle';
import CharacterExplorer from './components/CharacterExplorer';
import RelationshipWeb from './components/RelationshipWeb';
import Timeline from './components/Timeline';
import LocationExplorer from './components/LocationExplorer';
import InteractiveMap from './components/InteractiveMap';
import PlotNavigator from './components/PlotNavigator';
import ObjectGallery from './components/ObjectGallery';
import SpycraftEncyclopedia from './components/SpycraftEncyclopedia';

// Import data from new structure - using dynamic loading
import { getAvailableBookMetadata, loadBookData, defaultBookKey } from './data';
import BookSelector from './components/BookSelector';

const InteractiveReadingCompanion = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [appTour, setAppTour] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [bookSelectorOpen, setBookSelectorOpen] = useState(false);
  const [currentBookKey, setCurrentBookKey] = useState(defaultBookKey);
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageTutorialOpen, setIsPageTutorialOpen] = useState(false);
  
  // Available books metadata (lightweight, no heavy data)
  const availableBooks = getAvailableBookMetadata();
  
  // Load book data when currentBookKey changes
  useEffect(() => {
    const loadBook = async () => {
      setIsLoading(true);
      try {
        const data = await loadBookData(currentBookKey);
        setBookData(data);
      } catch (error) {
        console.error('Failed to load book data:', error);
        // Fallback to default book if loading fails
        if (currentBookKey !== defaultBookKey) {
          setCurrentBookKey(defaultBookKey);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBook();
  }, [currentBookKey]);
  
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
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      // Only override if there's a saved preference
      const isDarkMode = savedDarkMode === 'true';
      setDarkMode(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // No saved preference, use the default (which is true for dark mode)
      document.documentElement.classList.add('dark');
    }

    // Check for saved book preference (localStorage only)
    const savedBook = localStorage.getItem('selectedBook');
    if (savedBook && availableBooks[savedBook]) {
      setCurrentBookKey(savedBook);
    }
  }, [availableBooks]);
  
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

  // Page Tutorial config per tab
  const getPageTutorialConfig = () => {
    let title = 'Page Tutorial';
    let steps = ['No tutorial is available for this page yet.'];

    // Relationships tab
    if (activeTab === 1) {
      title = 'Relationships — How to use this page';
      steps = [
        [
          'This page lets you explore relationships between characters.',
          'Start by using “Focus on Character” to select someone.'
        ],
        [
          'Hover a character to see connected relationships and a brief description.',
          'Use your mouse wheel to zoom, and drag the background to pan.'
        ],
        [
          'Characters with a white outline have relationships not yet shown.',
          'Click a character to add their related characters and edges.'
        ],
        [
          'Click “Auto arrange” to toggle automatic layout.',
          'Layout uses springs (attraction) and node repulsion — adjust “Spring Force” and “Repulsion Force”.'
        ],
        [
          'Use “Fit to View” to center and zoom to include all visible nodes.',
          'Use the expand icon (↗) to enter a full-screen view.'
        ],
        [
          'Under “View Options”:',
          '— “Size is Importance” scales node size by calculated importance.',
          '— Toggle labels like Relationship, Description, and Counts/Importance.'
        ],
        [
          'If the view is cluttered, toggle “Remove Mode” to click and remove nodes.',
          'Only the largest remaining connected component is kept.'
        ],
        [
          'Click “Show All” to reveal all characters up to the selected chapter.',
          'Then “Fit to View” to frame everything.'
        ],
        [
          '“Pin Mode” pins/unpins nodes (useful for isolated clusters).',
          'This prevents components from drifting apart under repulsion.'
        ],
        [
          '“Reset View” restores defaults without changing the chapter filter or full-screen.',
          '“Show Up To Chapter” limits characters/relationships to avoid spoilers (WIP).'
        ]
      ];
    }

    return { title, steps };
  };
  
  // Close first visit message
  const closeFirstVisitMessage = () => {
    setFirstVisit(false);
  };

  // Book selection handlers
  const openBookSelector = () => {
    setBookSelectorOpen(true);
  };

  const closeBookSelector = () => {
    setBookSelectorOpen(false);
  };

  const handleBookSelect = (bookKey) => {
    if (bookKey === currentBookKey) return; // No change needed
    
    setCurrentBookKey(bookKey);
    localStorage.setItem('selectedBook', bookKey);
    // Reset selections when changing books
    setSelectedCharacter(null);
    setSelectedLocation(null);
    setSelectedEvent(null);
    setSelectedObject(null);
    setActiveTab(0);
    
    // Close the book selector
    setBookSelectorOpen(false);
  };

  // Don't render until book data is loaded
  if (isLoading || !bookData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading {availableBooks[currentBookKey]?.title || 'book'}...</p>
        </div>
      </div>
      );
    }
    
    const metadata = bookData.bookMetadata;

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
               className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
               onClick={openBookSelector}
             >
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </button>
            <button 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
              onClick={startTour}
            >
              Tour the App
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white text-sm"
              onClick={() => setIsPageTutorialOpen(true)}
              title="Show a tutorial for this page"
            >
              Page Tutorial
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
                groupStyles={bookData.bookMetadata?.characterGroupStyles || {}}
              />
            </TabPanel>
            
            {/* Relationship Web Tab */}
            <TabPanel>
              <RelationshipWeb
                onCharacterSelect={handleCharacterSelect}
                selectedCharacter={selectedCharacter}
                charactersData={bookData.characters}
                relationshipsData={bookData.relationships}
                eventsData={bookData.events}
                chaptersData={bookData.chapters}
                darkMode={darkMode}
                groupColors={bookData.bookMetadata?.characterGroupColors || {}}
                importanceConfig={bookData.bookMetadata?.importanceWeights || {}}
                relationshipCategoryColors={bookData.bookMetadata?.relationshipCategoryColors || {}}
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
                // Position data from the book
                locationPositions={bookData.locationPositions || {}}
                eventPositions={bookData.eventPositions || {}}
                characterPositions={bookData.characterPositions || {}}
                objectPositions={bookData.objectPositions || {}}
                mapBoundaries={bookData.mapBoundaries || null}
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
                bookMetadata={bookData.bookMetadata}
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

      <PageTutorial
        isOpen={isPageTutorialOpen}
        onClose={() => setIsPageTutorialOpen(false)}
        title={getPageTutorialConfig().title}
        steps={getPageTutorialConfig().steps}
        darkMode={darkMode}
      />

      {/* Book Selector Component */}
      <BookSelector
        isOpen={bookSelectorOpen}
        onClose={closeBookSelector}
        currentBook={currentBookKey}
        onBookSelect={handleBookSelect}
        availableBooks={availableBooks}
        darkMode={darkMode}
      />
    </div>
  );
};

// Removed hard-coded group color mapping; now provided via bookMetadata

export default InteractiveReadingCompanion;
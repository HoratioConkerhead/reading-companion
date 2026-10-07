import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

// Import data from new structure - using dynamic loading
import { getAvailableBookMetadata, loadBookData, defaultBookKey } from './data';
import { filterByChapter, filterRelationshipsByChapter, filterEventsByChapter } from './utils/chapterFilter';
import { getBookConfig } from './utils/bookConfig';
import BookSelector from './components/BookSelector';
import GlobalSearch from './components/GlobalSearch';

// The URL hash records the view so it can be shared or bookmarked, and so the browser's
// Back button steps through tabs: #book=<bookKey>&tab=<tabId>&upto=<chapterId>
const readViewFromHash = () => {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return { book: params.get('book'), tab: params.get('tab'), upto: params.get('upto') };
};

const viewToHash = ({ book, tab, upto }) => {
  const params = new URLSearchParams();
  if (book) params.set('book', book);
  if (tab) params.set('tab', tab);
  if (upto) params.set('upto', upto);
  return `#${params.toString()}`;
};

const InteractiveReadingCompanion = () => {
  const [activeTabId, setActiveTabId] = useState(() => readViewFromHash().tab || 'relationships');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [appTour, setAppTour] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [bookSelectorOpen, setBookSelectorOpen] = useState(false);
  // Start with the book in the URL, else the saved book (if still available), so only
  // one book is loaded on startup
  const [currentBookKey, setCurrentBookKey] = useState(() => {
    const fromHash = readViewFromHash().book;
    if (fromHash && getAvailableBookMetadata()[fromHash]) return fromHash;
    try {
      const savedBook = localStorage.getItem('selectedBook');
      if (savedBook && getAvailableBookMetadata()[savedBook]) return savedBook;
    } catch {
      // storage unavailable (private mode etc.)
    }
    return defaultBookKey;
  });
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chapterFilterId, setChapterFilterId] = useState(null);
  const [isChapterPickerOpen, setIsChapterPickerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedEncyclopediaId, setSelectedEncyclopediaId] = useState(null);
  // Chapter filter to apply once the next book has loaded (from the URL)
  const pendingChapterRef = useRef(readViewFromHash().upto);
  
  // UI configuration for the loaded book (groups, time periods, tab labels...)
  const bookConfig = useMemo(() => (bookData ? getBookConfig(bookData.bookMetadata, bookData) : null), [bookData]);

  // Available books metadata (lightweight, no heavy data)
  const availableBooks = getAvailableBookMetadata();
  
  // Load book data when currentBookKey changes
  useEffect(() => {
    // Ignore the result if another book was chosen while this one was loading
    let superseded = false;
    const loadBook = async () => {
      setIsLoading(true);
      try {
        const data = await loadBookData(currentBookKey);
        if (superseded) return;
        setBookData(data);
        // Update page title from book metadata
        document.title = data?.bookMetadata?.appTitle || 'Interactive Reading Companion';
        // Chapter filter: from the URL if it named one for this book, else none
        // (it is not otherwise saved between visits)
        const pendingChapter = pendingChapterRef.current;
        pendingChapterRef.current = null;
        setChapterFilterId(pendingChapter && (data.chapters || []).some(ch => ch.id === pendingChapter) ? pendingChapter : null);
      } catch (error) {
        if (superseded) return;
        console.error('Failed to load book data:', error);
        // Fallback to default book if loading fails
        if (currentBookKey !== defaultBookKey) {
          setCurrentBookKey(defaultBookKey);
        }
      } finally {
        if (!superseded) setIsLoading(false);
      }
    };
    
    loadBook();
    return () => {
      superseded = true;
    };
  }, [currentBookKey]);

  // Keep the URL in step with the view: a new history entry per tab, so Back returns to
  // the previous tab; book and chapter changes replace the current entry
  const lastHashTabRef = useRef(activeTabId);
  useEffect(() => {
    if (isLoading) return;
    const hash = viewToHash({ book: currentBookKey, tab: activeTabId, upto: chapterFilterId });
    if (window.location.hash === hash) return;
    const url = `${window.location.pathname}${window.location.search}${hash}`;
    if (lastHashTabRef.current !== activeTabId && window.location.hash) {
      window.history.pushState(null, '', url);
    } else {
      window.history.replaceState(null, '', url);
    }
    lastHashTabRef.current = activeTabId;
  }, [currentBookKey, activeTabId, chapterFilterId, isLoading]);

  // Back/Forward (or a pasted link): apply the view from the URL
  useEffect(() => {
    const applyHash = () => {
      const { book, tab, upto } = readViewFromHash();
      lastHashTabRef.current = tab || 'relationships';
      setActiveTabId(tab || 'relationships');
      if (book && book !== currentBookKey && getAvailableBookMetadata()[book]) {
        pendingChapterRef.current = upto;
        setCurrentBookKey(book);
      } else {
        setChapterFilterId(upto || null);
      }
    };
    window.addEventListener('popstate', applyHash);
    window.addEventListener('hashchange', applyHash);
    return () => {
      window.removeEventListener('popstate', applyHash);
      window.removeEventListener('hashchange', applyHash);
    };
  }, [currentBookKey]);

  // Do not persist chapter filter (session-only)
  
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
    setActiveTabId('characters');
  };
  
  // Location selection handler
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setActiveTabId('locations');
  };
  
  // Event selection handler
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setActiveTabId('timeline');
  };
  
  // Object selection handler
  const handleObjectSelect = (object) => {
    setSelectedObject(object);
    setActiveTabId('objects');
  };

  const handleEncyclopediaSelect = (entry) => {
    setSelectedEncyclopediaId(entry.id);
    setActiveTabId('encyclopedia');
  };

  // Search shortcuts: "/" (when not typing) or Ctrl/Cmd+K
  useEffect(() => {
    const onKeyDown = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  
  // Start app tour
  const startTour = () => {
    setAppTour(true);
  };
  
  // Close app tour
  const closeTour = useCallback(() => {
    setAppTour(false);
  }, []);
  
  // Handle tab change from tour
  const handleTabChangeFromTour = useCallback((tabId) => {
    setActiveTabId(tabId);
  }, []);

  // On narrow screens the tab bar scrolls sideways; keep the selected tab in view when the
  // tab changes programmatically (e.g. selecting a character jumps to the Characters tab)
  useEffect(() => {
    const selected = document.querySelector('.react-tabs__tab--selected');
    const list = selected?.parentElement;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const left = selected.offsetLeft - list.offsetLeft;
    const right = left + selected.offsetWidth;
    if (left < list.scrollLeft) {
      list.scrollLeft = left;
    } else if (right > list.scrollLeft + list.clientWidth) {
      list.scrollLeft = right - list.clientWidth;
    }
  }, [activeTabId, isLoading]);

  // Per-tab tutorials are managed inside each tab component
  
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

    // Build filtered datasets based on global chapterFilterId (per-book)
    const chapters = bookData.chapters || [];

    const filteredCharacters = filterByChapter(bookData.characters, chapters, chapterFilterId, c => c.introducedInChapter);
    const filteredRelationships = filterRelationshipsByChapter(bookData.relationships, bookData.characters, chapters, chapterFilterId);
    const filteredEvents = filterEventsByChapter(bookData.events, chapters, chapterFilterId);
    const filteredLocations = filterByChapter(bookData.locations, chapters, chapterFilterId, l => l.introducedInChapter);
    const filteredObjects = filterByChapter(bookData.objects, chapters, chapterFilterId, o => o.introducedInChapter);
    const byIntroChapter = item => item.introducedInChapter;
    const filteredEncyclopedia = filterByChapter(bookData.spycraftEntries, chapters, chapterFilterId, byIntroChapter);
    const filteredMysteries = filterByChapter(bookData.mysteryElements, chapters, chapterFilterId, byIntroChapter);
    const filteredThemes = filterByChapter(bookData.themeElements, chapters, chapterFilterId, byIntroChapter);


    // Tabs only appear when the book has content for them (judged on the whole book, not the
    // chapter-filtered data, so tabs don't come and go while reading)
    const tabs = [
      {
        id: 'characters',
        content: (
          <CharacterExplorer 
            onCharacterSelect={handleCharacterSelect} 
            selectedCharacter={selectedCharacter}
            charactersData={filteredCharacters}
            relationshipsData={filteredRelationships}
            groupStyles={bookData.bookMetadata?.characterGroupStyles || {}}
            groups={bookConfig.groups}
            chapterFilterId={chapterFilterId}
          />
        )
      },
      {
        id: 'relationships',
        // Always rendered so the graph keeps its layout while other tabs are open
        forceRender: true,
        content: (
          <RelationshipWeb
            onCharacterSelect={handleCharacterSelect}
            selectedCharacter={selectedCharacter}
            charactersData={filteredCharacters}
            relationshipsData={filteredRelationships}
            eventsData={filteredEvents}
            chaptersData={bookData.chapters}
            darkMode={darkMode}
            groupColors={bookData.bookMetadata?.characterGroupColors || {}}
            importanceConfig={bookData.bookMetadata?.importanceWeights || {}}
            relationshipCategoryColors={bookData.bookMetadata?.relationshipCategoryColors || {}}
            currentBookKey={currentBookKey}
            chapterFilterId={chapterFilterId}
            onChapterFilterChange={setChapterFilterId}
          />
        )
      },
      {
        id: 'timeline',
        show: bookData.events.length > 0,
        content: (
          <Timeline 
            onEventSelect={handleEventSelect}
            selectedEvent={selectedEvent}
            onCharacterSelect={handleCharacterSelect}
            eventsData={filteredEvents}
            charactersData={filteredCharacters}
            locationsData={filteredLocations}
            chaptersData={bookData.chapters}
            bookConfig={bookConfig}
          />
        )
      },
      {
        id: 'locations',
        show: bookData.locations.length > 0,
        content: (
          <LocationExplorer
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
            onEventSelect={handleEventSelect}
            locationsData={filteredLocations}
            eventsData={filteredEvents}
            charactersData={filteredCharacters}
          />
        )
      },
      {
        id: 'map',
        show: Object.keys(bookData.locationPositions).length > 0,
        content: (
          <InteractiveMap
            onLocationSelect={handleLocationSelect}
            onEventSelect={handleEventSelect}
            onCharacterSelect={handleCharacterSelect}
            onObjectSelect={handleObjectSelect}
            locationsData={filteredLocations}
            eventsData={filteredEvents}
            charactersData={filteredCharacters}
            objectsData={filteredObjects}
            // Position data from the book
            locationPositions={bookData.locationPositions || {}}
            eventPositions={bookData.eventPositions || {}}
            characterPositions={bookData.characterPositions || {}}
            objectPositions={bookData.objectPositions || {}}
            mapBoundaries={bookData.mapBoundaries || null}
            bookConfig={bookConfig}
          />
        )
      },
      {
        id: 'plot',
        show: chapters.length > 0,
        content: (
          <PlotNavigator
            onEventSelect={handleEventSelect}
            onCharacterSelect={handleCharacterSelect}
            eventsData={filteredEvents}
            charactersData={filteredCharacters}
            chaptersData={bookData.chapters}
            mysteryElements={filteredMysteries}
            themeElements={filteredThemes}
            bookMetadata={bookData.bookMetadata}
            chapterFilterId={chapterFilterId}
          />
        )
      },
      {
        id: 'objects',
        show: bookData.objects.length > 0,
        content: (
          <ObjectGallery
            onObjectSelect={handleObjectSelect}
            selectedObject={selectedObject}
            objectsData={filteredObjects}
            charactersData={filteredCharacters}
            eventsData={filteredEvents}
            locationsData={filteredLocations}
          />
        )
      },
      {
        id: 'encyclopedia',
        show: bookData.spycraftEntries.length > 0,
        className: 'tab-encyclopedia',
        content: (
          <SpycraftEncyclopedia 
            spycraftEntries={filteredEncyclopedia}
            config={bookConfig.encyclopedia}
            selectedEntryId={selectedEncyclopediaId}
          />
        )
      }
    ].filter(tab => tab.show !== false);
    const selectedTabIndex = Math.max(0, tabs.findIndex(tab => tab.id === activeTabId));


  return (
    <div className={`app-container min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <header className="p-3" style={{ backgroundColor: 'var(--color-header-bg)', color: 'var(--color-header-text)' }}>
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif">{metadata.appTitle}</h1>
            <p className="text-xs sm:text-sm mt-1">{metadata.appSubtitle}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="p-2 rounded text-white bg-gray-600 hover:bg-gray-700"
              onClick={() => setIsSearchOpen(true)}
              title="Search (press / or Ctrl+K)"
              aria-label="Search the book"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
            </button>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                         <button 
               className="px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-sm"
               onClick={openBookSelector}
               title="Choose a book"
               aria-label="Choose a book"
             >
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </button>
            <button 
              className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm whitespace-nowrap"
              onClick={startTour}
            >
              <span className="sm:hidden">Tour</span>
              <span className="hidden sm:inline">Tour the App</span>
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
      
      <main className="p-2 sm:p-4">
        {/* Phones: the spoiler filter gets its own full-width button, since the tab bar scrolls */}
        <button
          type="button"
          className={`chapter-filter-mobile md:hidden w-full mb-2 px-3 py-2 rounded flex items-center justify-between gap-2 text-sm font-bold ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800 border border-gray-300'}`}
          onClick={() => setIsChapterPickerOpen(true)}
        >
          <span className="truncate">
            {chapterFilterId
              ? 'Show up to ' + (chapters.find(ch => ch.id === chapterFilterId)?.title || 'Selected chapter')
              : 'Show whole book'}
          </span>
          <span aria-hidden="true">▾</span>
        </button>
        <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setActiveTabId(tabs[index].id)}>
          <TabList>
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                data-tab-id={tab.id}
                className={tab.className ? ['react-tabs__tab', tab.className] : 'react-tabs__tab'}
              >
                {bookConfig.tabLabels[tab.id]}
              </Tab>
            ))}
            {/* In-list global chapter filter trigger styled as a tab */}
            <button
              type="button"
              className={`react-tabs__tab tablist-right-cta ml-2 cursor-pointer font-bold ${darkMode ? 'bg-gray-800' : 'bg-white text-gray-800'}`}
              onClick={() => setIsChapterPickerOpen(true)}
              title="Choose the latest chapter you've read to limit content across the app"
              style={{ userSelect: 'none' }}
            >
              {(() => {
                const chapters = bookData.chapters || [];
                const label = chapterFilterId
                  ? 'Show up to ' + (chapters.find(ch => ch.id === chapterFilterId)?.title || 'Selected chapter')
                  : 'Show whole book';
                return `${label}`;
              })()}
            </button>
          </TabList>

          {/* Centered chapter picker pane */}
          {isChapterPickerOpen && (
            <div className="fixed inset-0 z-40 flex items-center justify-center">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsChapterPickerOpen(false)}></div>
              <div className={`relative z-50 w-full max-w-lg mx-4 rounded shadow-lg ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-600">
                  <h3 className="text-lg font-semibold">Select chapter to view up to</h3>
                  <button
                    className={`px-2 py-1 text-sm rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => setIsChapterPickerOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
                  <button
                    className={`w-full text-left px-3 py-2 rounded border ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
                    onClick={() => { setChapterFilterId(null); setIsChapterPickerOpen(false); }}
                  >
                    Whole book (no limit)
                  </button>
                  {(bookData.chapters || []).map(ch => (
                    <button
                      key={ch.id}
                      className={`w-full text-left px-3 py-2 rounded border ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
                      onClick={() => { setChapterFilterId(ch.id); setIsChapterPickerOpen(false); }}
                    >
                      {ch.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            {tabs.map(tab => (
              <TabPanel key={tab.id} forceRender={tab.forceRender}>
                {tab.content}
              </TabPanel>
            ))}
          </div>
        </Tabs>
        

      </main>
      
      <footer className="p-4 mt-0" style={{ backgroundColor: 'var(--color-footer-bg)', color: 'var(--color-footer-text)' }}>
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
        currentTab={activeTabId}
        tabs={tabs.map(tab => ({ id: tab.id, label: bookConfig.tabLabels[tab.id] }))}
        onTabChange={handleTabChangeFromTour}
        bookMetadata={metadata}
      />

      {/* Search across the (chapter-filtered) book */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        darkMode={darkMode}
        characters={filteredCharacters}
        events={filteredEvents}
        locations={filteredLocations}
        objects={filteredObjects}
        encyclopediaEntries={filteredEncyclopedia}
        encyclopediaLabel={bookConfig.tabLabels.encyclopedia}
        onSelectCharacter={handleCharacterSelect}
        onSelectEvent={handleEventSelect}
        onSelectLocation={handleLocationSelect}
        onSelectObject={handleObjectSelect}
        onSelectEncyclopediaEntry={handleEncyclopediaSelect}
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
// Dynamic book loading - only load data when needed
const bookModules = {
    MattParry_StitchedUp_v1: () => import('./MattParry_StitchedUp_v1'),
    MattParry_StitchedUp_v2: () => import('./MattParry_StitchedUp_v2'),
  // Add future books here:
  // bookName: () => import('./bookName'),
};

// Helper function to get available book metadata without loading full data
export const getAvailableBookMetadata = () => {
  return {
    MattParry_StitchedUp_v1: {
      key: 'MattParry_StitchedUp_v1',
      title: 'Stitched Up (v1)',
      author: 'Matt Parry',
      shortDescription: 'WWII spy thriller following Lady Cynthia Childreth'
    },
    MattParry_StitchedUp_v2: {
        key: 'MattParry_StitchedUp_v2',
        title: 'Stitched Up (v2)',
        author: 'Matt Parry',
        shortDescription: 'WWII spy thriller following Lady Cynthia Childreth'
      },
      // Add future books here:
    // bookName: {
    //   key: 'bookName',
    //   title: 'Book Title',
    //   author: 'Author Name',
    //   shortDescription: 'Brief description...',
    // },
  };
};

// Helper function to get all available book keys
export const getAvailableBookKeys = () => {
  return Object.keys(bookModules);
};

// Helper function to dynamically load a specific book's data
export const loadBookData = async (bookKey) => {
  if (!bookModules[bookKey]) {
    throw new Error(`Book "${bookKey}" not found`);
  }

  try {
    console.log(`Loading book: ${bookKey}`);
    const bookModule = await bookModules[bookKey]();
    console.log(`Book module loaded:`, bookModule);
    
    // Handle different export patterns
    if (bookModule.stitchedUp) {
      console.log(`Using stitchedUp export for ${bookKey}`);
      return bookModule.stitchedUp;
    } else if (bookModule.default) {
      console.log(`Using default export for ${bookKey}`);
      return bookModule.default;
    } else {
      console.log(`Using individual exports for ${bookKey}`);
      // Old format (v1) - construct the object from individual exports
      const constructedBook = {
        bookMetadata: bookModule.bookMetadata,
        characters: bookModule.characters,
        events: bookModule.events,
        locations: bookModule.locations,
        objects: bookModule.objects,
        relationships: bookModule.relationships,
        chapters: bookModule.chapters,
        timeline: bookModule.timeline || [], // Handle missing timeline
        mysteryElements: bookModule.mysteryElements,
        themeElements: bookModule.themeElements,
        spycraftEntries: bookModule.spycraftEntries,
        locationPositions: bookModule.locationPositions,
        eventPositions: bookModule.eventPositions,
        characterPositions: bookModule.characterPositions,
        objectPositions: bookModule.objectPositions,
        mapBoundaries: bookModule.mapBoundaries
      };
      console.log(`Constructed book data:`, constructedBook);
      return constructedBook;
    }
  } catch (error) {
    console.error(`Failed to load book "${bookKey}":`, error);
    throw error;
  }
};

// Legacy function for backward compatibility (deprecated)
export const getAvailableBooks = () => {
  console.warn('getAvailableBooks() is deprecated. Use loadBookData() instead for better performance.');
  // Return a promise that resolves to the default book
  return loadBookData('MattParry_StitchedUp_v2');
};

// Default book key
export const defaultBookKey = 'MattParry_StitchedUp_v2';
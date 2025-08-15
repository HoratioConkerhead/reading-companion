# Interactive Reading Companion - Data Format Documentation

This document describes the data format for the Interactive Reading Companion app and provides guidance for adding new books to the series.

## Data Structure

The app uses a modular data structure organized by book with domain-specific files:

```
/src/data/
  /bookName/
    index.js              // Re-exports all data from this book
    characters.js         // Character data
    locations.js          // Location data
    events.js             // Event data
    objects.js            // Object data
    relationships.js      // Character relationship data (optional; can be derived from characters.relations)
    positions.js          // Geographic positions and map data
    mysteryElements.js    // Mystery-specific elements
    chapters.js           // Chapter information
    spycraftEntries.js    // Spycraft technique data
    themeElements.js      // Thematic elements
    metadata.js           // Book metadata and app configuration
  /book2Name/
    index.js
    characters.js
    locations.js
    objects.js
    events.js
    relationships.js
    positions.js
    mysteryElements.js
    chapters.js
    spycraftEntries.js
    themeElements.js
    metadata.js
  index.js                // Exports all books' data
```

## Data Format Per Type

### Character Data Format
```javascript
export const characters = [
  {
    id: 'character_id',           // Unique identifier
    name: 'Character Name',       // Full character name
    title: 'Title',               // Optional: Character's title (e.g., 'Lady', 'Colonel')
    group: 'Group',               // Character affiliation ('Protagonists', 'Antagonists', etc.)
    role: 'Description of role',  // Character's role in the story
    background: 'Background...',  // Character's background information
    personality: 'Personality traits description',
    traits: ['Trait1', 'Trait2'], // Array of character traits
    relations: [                  // Array of relationships used to derive edges
      { 
        characterId: 'related_character_id', 
        type: 'relationship_type', 
        description: 'Detailed description of relationship',
        introducedInChapter: 'chapter_id' // Optional: when THIS relation starts
      }
    ],
    development: [                // Character development through the story
      { 
        phase: 'Beginning', 
        description: 'Description of character at this phase' 
      }
    ],
    aliases: ['Alias1', 'Alias2'], // Optional: Alternate names or disguises
    fate: 'Character's ultimate fate', // Optional: What happens to character by the end
    key_scenes: ['scene_id_1', 'scene_id_2'], // Optional: Important scenes for this character
    introducedInChapter: 'chapter_id' // NEW: Chapter where character is first introduced
  }
];
```

### Character Importance Rating System

The RelationshipWeb component automatically calculates a 1-100 importance rating for each character based on the following weighted factors:

- **Key Scenes (30 points max)**: Each scene in `key_scenes` contributes 6 points
- **Event Participation (25 points max)**: Each event the character appears in contributes 2.5 points  
- **Relationship Complexity (20 points max)**: Each relationship contributes 2 points
- **Character Group Significance (15 points max)**:
  - Protagonists: 15 points
  - Fifth Columnists: 12 points
  - Military: 10 points
  - Historical Figures: 10 points
  - German Connection: 8 points
  - Supporting Characters: 5 points
  - Default: 3 points
- **Development Arc Depth (10 points max)**: Each development phase contributes 2.5 points

This rating system helps users understand character prominence in the narrative and can be displayed above character nodes in the relationship web visualization.

**Chapter-Based Filtering**: Characters can be filtered by their introduction chapter, allowing the relationship web to show only characters and relationships relevant up to a specific point in the story. This prevents spoilers and enables progressive revelation of the narrative.

### Location Data Format
```javascript
export const locations = [
  {
    id: 'location_id',            // Unique identifier
    name: 'Location Name',        // Location name
    area: 'Geographic area',      // Region/country/city
    type: 'Location type',        // E.g., 'Country house', 'Military facility'
    features: [                   // Physical characteristics
      'Feature description 1',
      'Feature description 2'
    ],
    significance: [               // Plot significance
      'Significance point 1',
      'Significance point 2'
    ],
    description: 'Detailed description of location',
    events: [                     // Events that occurred at this location
      { eventId: 'event_id', role: 'setting/critical_location/etc.' }
    ],
    occupants: [                  // Characters associated with location
      { characterId: 'character_id', relationship: 'owner/resident/etc.' }
    ],
    rooms: [                      // Optional: Specific areas within location
      { name: 'Room name', significance: 'Room significance' }
    ],
    proximity: [                  // Optional: Nearby locations
      { locationId: 'nearby_location_id', description: 'Relationship to this location' }
    ],
    owner: 'Owner name'           // Optional: Property owner information
  }
];
```

### Event Data Format
```javascript
export const events = [
  {
    id: 'event_id',               // Unique identifier
    title: 'Event Title',         // Name of the event
    date: 'Event date/timeframe', // When it happened
    description: 'Event description',
    location: 'location_id',      // Where it happened (references location id)
    characters: [                 // Who was involved
      { 
        characterId: 'character_id', 
        role: 'role in event',
        disguise: 'optional disguise during event' 
      }
    ],
    significance: 'Event significance to plot',
    chapter: 'Book chapter reference', // Optional: Chapter number/name
    keyActions: [                  // Important actions during event
      'Action description 1',
      'Action description 2'
    ]
  }
];
```

### Relationship Data Format (Derived or Explicit)
```javascript
export const relationships = [
  {
    from: 'character_id_1',       // Character initiating relationship
    to: 'character_id_2',         // Target character
    type: 'relationship-type',    // Nature of relationship (e.g., 'handler-asset', 'spouse')
    introducedInChapter: 'chapter_id' // NEW: Chapter where relationship is first introduced
  }
];
```

Notes:
- This file is optional. If omitted, relationships are automatically derived from `characters[].relations` by pairing both sides and combining their `type` values (e.g., `employer` + `confidante` → `employer-confidante`).
- If `introducedInChapter` is not provided at the relation level, the derived relationship uses the earliest of the two characters' `introducedInChapter` values.
- Providing an explicit `relationships.js` is supported but not required.

**Chapter-Based Filtering**: Relationships can be filtered by their introduction chapter, enabling the relationship web to progressively reveal connections as the reader progresses through the story. This prevents spoilers and creates a dynamic reading experience where the network grows chapter by chapter.

### Object Data Format
```javascript
export const objects = [
  {
    id: 'object_id',              // Unique identifier
    name: 'Object Name',          // Name of the object
    type: 'Object type',          // Category (e.g., 'Weapon', 'Document')
    description: 'Description of object',
    physical_details: 'Physical appearance',
    technical_details: [          // Optional specific characteristics
      'Technical detail 1',
      'Technical detail 2'
    ],
    significance: [               // Importance to the plot
      'Significance point 1',
      'Significance point 2'
    ],
    history: [                    // Object's journey through the story
      { event: 'Event name', details: 'What happened with the object' }
    ],
    possessors: [                 // Characters who possessed the object
      { 
        characterId: 'character_id', 
        period: 'early/mid/late', 
        alias: 'Optional alias during possession' 
      }
    ],
    appearances: [                // Events where the object appears
      'event_id_1', 'event_id_2'
    ],
    image_description: 'Description of what the object looks like' // For visualization
  }
];
```

### Positions Data Format (NEW)
```javascript
// Geographic positions for locations optimized for mapping
export const locationPositions = {
  'location_id': { 
    lat: 51.4286, 
    lon: -1.2507, 
    label: "Location Name", 
    type: "uk/german/irish" 
  }
};

// Event positions (may be at existing location or unique position)
export const eventPositions = {
  'event_id': { locationId: 'existing_location_id' },
  'event_with_path': { 
    path: [
      { lat: 51.4286, lon: -1.2507, label: "Point 1" },
      { lat: 51.5000, lon: -1.2000, label: "Point 2" }
    ]
  }
};

// Character last known positions
export const characterPositions = {
  'character_id': { locationId: 'location_id' }
};

// Object positions
export const objectPositions = {
  'object_id': { locationId: 'location_id' }
};

// Map boundaries for different regions
export const mapBoundaries = {
  'uk': { bounds: [[49.0, -8.0], [61.0, 2.0]] },
  'german': { bounds: [[47.0, 5.0], [55.0, 15.0]] }
};
```

### Mystery Elements Data Format (NEW)
```javascript
export const mysteryElements = [
  {
    id: 'mystery_id',             // Unique identifier
    title: 'Mystery Title',       // Name of the mystery element
    description: 'Description of the mystery',
    firstMentioned: 'chapter_reference', // When first mentioned
    revealedInChapter: 'chapter_reference', // When revealed
    relatedCharacters: ['character_id_1', 'character_id_2'],
    relatedEvents: ['event_id_1', 'event_id_2'], // Optional
    status: 'revealed/twist/major_plot/background' // Current status
  }
];
```

### Theme Elements Data Format (NEW)
```javascript
export const themeElements = [
  {
    id: 'theme_id',               // Unique identifier
    title: 'Theme Title',         // Name of the theme
    description: 'Description of the theme',
    examples: [                   // Examples from the story
      'Example description 1',
      'Example description 2'
    ],
    relatedCharacters: ['character_id_1', 'character_id_2'],
    relatedEvents: ['event_id_1', 'event_id_2'], // Optional
    relatedObjects: ['object_id_1', 'object_id_2'] // Optional
  }
];
```

### Chapters Data Format (NEW)
```javascript
export const chapters = [
  {
    id: 'chapter_id',             // Unique identifier
    title: 'Chapter Title',       // Full chapter title
    description: 'Chapter description',
    events: ['event_id_1', 'event_id_2'], // Events in this chapter
    timeframe: 'Time period'      // When this chapter takes place
  }
];
```

### Spycraft Entries Format
```javascript
export const spycraftEntries = [
  {
    id: 'technique_id',           // Unique identifier
    title: 'Technique Name',      // Name of the spy technique
    description: 'Description of the technique',
    historicalContext: 'Historical background of this spy method',
    examples: [                   // How it was used in the book
      'Example from book 1',
      'Example from book 2'
    ],
    techniques: [                 // Optional: Specific methods within this category
      'Specific technique 1',
      'Specific technique 2'
    ],
    bookScenes: ['scene_id_1', 'scene_id_2'] // Related scenes in the book
  }
];
```

### Metadata Data Format (NEW)
```javascript
export const bookMetadata = {
  title: "Book Title",
  author: "Author Name",
  genre: "Genre",
  setting: "Setting",
  description: "Book description",
  publisher: "Publisher",
  publicationYear: 2023,
  series: "Series Name",
  seriesOrder: 1,
  
  // App-specific metadata
  appTitle: "App Title",
  appSubtitle: "App Subtitle",
  welcomeMessage: "Welcome message",
  welcomeDescription: "Welcome description",
  aboutApp: "About the app",
  aboutBook: "About the book",
  tourWelcome: "Tour welcome message",
  tourConclusion: "Tour conclusion message",
  
  // Character groups for the book
  characterGroups: {
    'Group1': 'Description of group 1',
    'Group2': 'Description of group 2'
  },
  
  // Footer copyright
  copyright: "Copyright text"
};
```

## Adding a New Book

To add a new book to the series:

1. Create a new folder in `/src/data/` with the book's name (e.g., `/src/data/bookName/`)
2. Create separate files for each data type following the formats above:
   - `characters.js`
   - `locations.js`
   - `events.js`
   - `objects.js`
   - `relationships.js` (optional; omit if deriving from `characters.relations`)
   - `positions.js`
   - `mysteryElements.js`
   - `chapters.js`
   - `spycraftEntries.js`
   - `themeElements.js`
   - `metadata.js`
3. Create an `index.js` file that re-exports all data from the separate files
4. Update the main `/src/data/index.js` to include the new book

Example for new book:

```javascript
// /src/data/bookName/characters.js
export const characters = [...];

// /src/data/bookName/locations.js
export const locations = [...];

// /src/data/bookName/index.js
export { characters } from './characters.js';
export { locations } from './locations.js';
export { events } from './events.js';
// export { relationships } from './relationships.js'; // Optional: only if not deriving
export { objects } from './objects.js';
export { spycraftEntries } from './spycraftEntries.js';
export { chapters } from './chapters.js';
export { mysteryElements } from './mysteryElements.js';
export { themeElements } from './themeElements.js';
export { bookMetadata } from './metadata.js';
export { locationPositions, eventPositions, characterPositions, objectPositions, mapBoundaries } from './positions.js';

// /src/data/index.js
export * as bookName from './bookName';
```

## Using the Data in Components

Components can import data in two ways:

1. Import all data from a specific book:
```javascript
import { bookName } from '../data';
// Use: bookName.characters, bookName.events, etc.
```

2. Import specific data types directly:
```javascript
import { characters, events } from '../data/bookName';
// Use: characters, events directly
```

Choose the approach that works best for your component's needs.

## Data Validation

When creating data files, ensure:

1. **Unique IDs**: All IDs must be unique within their category
2. **Valid References**: All references to other entities (characterId, locationId, eventId) must exist
3. **Required Fields**: Required fields are marked above, optional fields are noted
4. **Data Consistency**: Character groups, relationship types, and other enums should be consistent across files
5. **Geographic Accuracy**: Coordinates in positions.js should be accurate for mapping functionality

## Chapter-Based Filtering System

The application supports progressive revelation of content based on the reader's progress through the story. This system prevents spoilers and creates a dynamic experience where the narrative network grows chapter by chapter.

### Implementation Details

**Character Introduction Tracking**:
- Each character includes an `introducedInChapter` field indicating when they first appear
- Characters can be filtered to show only those introduced up to a specific chapter
- This enables the relationship web to progressively add new characters

**Relationship Timeline Tracking**:
- Each relationship includes an `introducedInChapter` field indicating when it's established
- Relationships can be filtered to show only those relevant up to a specific chapter
- This prevents revealing connections before they're established in the story

**Filtering Behavior**:
- **Character Explorer**: Can limit character list to those introduced up to current chapter
- **Relationship Web**: Can show only characters and relationships relevant to current chapter
- **Timeline**: Can limit events to those occurring up to current chapter
- **Location Explorer**: Can filter locations based on when they become relevant
- **Object Gallery**: Can show only objects introduced up to current chapter

### Benefits

1. **Spoiler Prevention**: Readers can explore the app without encountering future plot developments
2. **Progressive Discovery**: The narrative network grows organically as the story progresses
3. **Reading Companion**: Perfect for readers who want to explore as they read
4. **Post-Reading Analysis**: Full network available after completing the book
5. **Educational Use**: Teachers can control how much information students see

### Usage Examples

```javascript
// Filter characters by chapter
const charactersUpToChapter = characters.filter(char => 
  char.introducedInChapter <= currentChapter
);

// Filter relationships by chapter
const relationshipsUpToChapter = relationships.filter(rel => 
  rel.introducedInChapter <= currentChapter
);

// Get all content for a specific chapter
const chapterContent = {
  characters: characters.filter(char => char.introducedInChapter === chapterId),
  relationships: relationships.filter(rel => rel.introducedInChapter === chapterId),
  events: events.filter(event => event.chapter === chapterId)
};
```

### Future Enhancements

The chapter-based system is designed to be extensible for future features:

1. **Progressive Character Information**: Different character details revealed at different chapters
2. **Relationship Evolution**: Track how relationships change over time
3. **Location Discovery**: Progressive revelation of location significance
4. **Object History**: Show object movement and significance progressively
5. **Theme Development**: Track how themes emerge and develop throughout the story
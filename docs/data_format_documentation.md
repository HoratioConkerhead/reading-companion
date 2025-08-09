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
    relationships.js      // Character relationship data
    positions.js          // Position/role data
    mysteryElements.js    // Mystery-specific elements
    chapters.js           // Chapter information
    spycraftEntries.js    // Spycraft technique data
    themeElements.js      // Thematic elements
  /book2Name/
    index.js
    characters.js
    locations.js
    events.js
    objects.js
    relationships.js
    positions.js
    mysteryElements.js
    chapters.js
    spycraftEntries.js
    themeElements.js
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
    relations: [                  // Array of relationships to other characters
      { 
        characterId: 'related_character_id', 
        type: 'relationship_type', 
        description: 'Detailed description of relationship' 
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
    key_scenes: ['scene_id_1', 'scene_id_2'] // Optional: Important scenes for this character
  }
];
```

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
    ]
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

### Relationship Data Format
```javascript
export const relationships = [
  {
    from: 'character_id_1',       // Character initiating relationship
    to: 'character_id_2',         // Target character
    type: 'relationship-type',    // Nature of relationship (e.g., 'handler-asset', 'spouse')
  }
];
```

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

## Adding a New Book

To add a new book to the series:

1. Create a new folder in `/src/data/` with the book's name (e.g., `/src/data/bookName/`)
2. Create separate files for each data type following the formats above:
   - `characters.js`
   - `locations.js`
   - `events.js`
   - `objects.js`
   - `relationships.js`
   - `positions.js`
   - `mysteryElements.js`
   - `chapters.js`
   - `spycraftEntries.js`
   - `themeElements.js`
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
export { relationships } from './relationships.js';
export { objects } from './objects.js';
export { spycraftEntries } from './spycraftEntries.js';
export { chapters } from './chapters.js';
export { mysteryElements } from './mysteryElements.js';
export { themeElements } from './themeElements.js';

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
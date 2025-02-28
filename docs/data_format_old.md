# Data Organization Analysis for "Stitched Up" Interactive App

## Current Data Structure

After reviewing your code files, I've analyzed the data organization:

1. **mockData.js** serves as the primary data file containing:
   - charactersData
   - locationsData
   - eventsData
   - relationshipsData
   - objectsData

2. **Individual files** exist for specific data types:
   - characters.js (detailed character profiles)
   - events.js (event information)
   - locations.js (location details)
   - spycraftEntries.js (spy techniques)

However, the application components primarily import from `mockData.js` rather than the individual files.

## Recommended Data Organization

For a series of books, I recommend the following structure:

```
/src/data/
  /stitchedUp/
    index.js         // Re-exports all data from this book
    data.js          // All data for "Stitched Up"
  /book2Name/
    index.js
    data.js
  index.js           // Exports all books' data
```

**Benefits of this approach:**
- Clear separation between books
- Easier addition of new books without affecting existing code
- Components can import specific data from specific books
- Avoids potential naming conflicts between books
- Makes it clear which data belongs to which book

In each book's `data.js` file, you would export all data types for that book:

```javascript
// src/data/stitchedUp/data.js
export const characters = [...];
export const locations = [...];
export const events = [...];
export const relationships = [...];
export const objects = [...];
export const spycraftEntries = [...];

// src/data/stitchedUp/index.js
export * from './data';

// src/data/index.js
export * as stitchedUp from './stitchedUp';
export * as book2Name from './book2Name';
```

Then components could import like this:
```javascript
import { stitchedUp } from '../data';
// or
import { characters, events } from '../data/stitchedUp';
```

## Data Format Documentation

Here's the format documentation for each data type to help with future book analysis:

### Character Data Format
```javascript
export const characters = [
  {
    id: 'character_id',           // Unique identifier
    name: 'Character Name',       // Full character name
    title: 'Title',               // Optional: Character's title (e.g., 'Lady', 'Colonel')
    group: 'Group',               // Character affiliation ('Protagonists', 'Fifth Columnists', etc.)
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

This documentation should help you create detailed data files for other books in the series while maintaining consistent formatting.
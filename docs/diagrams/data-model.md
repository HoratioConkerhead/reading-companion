# Stitched Up Companion - Data Model and Relationships

This diagram illustrates the data model of the Stitched Up Companion app, showing the relationships between different data entities.

```mermaid
erDiagram
    CHARACTERS {
        string id
        string name
        string title
        string group
        string role
        string background
        string personality
        array traits
        array relations
        array development
        string fate
        array key_scenes
    }
    
    LOCATIONS {
        string id
        string name
        string area
        string type
        array features
        array significance
        string description
        array events
        array occupants
        array rooms
    }
    
    EVENTS {
        string id
        string title
        string date
        string description
        string location
        array characters
        string significance
        array keyActions
    }
    
    RELATIONSHIPS {
        string from
        string to
        string type
    }
    
    OBJECTS {
        string id
        string name
        string type
        string description
        array physical_details
        array significance
        array history
        array possessors
        array appearances
    }
    
    SPYCRAFT-ENTRIES {
        string id
        string title
        string description
        string historicalContext
        array examples
        array techniques
        array bookScenes
    }
    
    CHAPTERS {
        string id
        string title
        string description
        array events
        string timeframe
    }
    
    MYSTERY-ELEMENTS {
        string id
        string title
        string description
        string firstMentioned
        string revealedInChapter
        array relatedCharacters
        string status
    }
    
    MAP-POSITIONS {
        object locationPositions
        object eventPositions
        object characterPositions
        object objectPositions
    }
    
    CHARACTERS ||--o{ RELATIONSHIPS : "has"
    CHARACTERS ||--o{ EVENTS : "appears in"
    LOCATIONS ||--o{ EVENTS : "hosts"
    EVENTS }o--|| CHAPTERS : "belongs to"
    OBJECTS ||--o{ EVENTS : "appears in"
    CHARACTERS }o--o{ OBJECTS : "possesses"
    EVENTS }o--o{ MYSTERY-ELEMENTS : "reveals"
    SPYCRAFT-ENTRIES }o--o{ EVENTS : "referenced in"
    LOCATIONS }|--|| MAP-POSITIONS : "positioned at"
    CHARACTERS }|--|| MAP-POSITIONS : "positioned at"
    EVENTS }|--|| MAP-POSITIONS : "positioned at"
    OBJECTS }|--|| MAP-POSITIONS : "positioned at"
```

## Data Entities

The data model consists of several interconnected entities:

- **CHARACTERS**: People in the novel, including protagonists, antagonists, and supporting characters
- **LOCATIONS**: Places where events happen, with geographical information
- **EVENTS**: Things that happen in the story, involving characters and locations
- **RELATIONSHIPS**: Connections between characters (family, colleagues, enemies, etc.)
- **OBJECTS**: Important items in the story
- **SPYCRAFT-ENTRIES**: Encyclopedia entries about espionage techniques
- **CHAPTERS**: Sections of the book's narrative
- **MYSTERY-ELEMENTS**: Plot elements that are gradually revealed
- **MAP-POSITIONS**: Geographical coordinates for map visualization

## Key Relationships

The diagram shows how these entities are connected:

- Characters have relationships with other characters
- Characters appear in events
- Events take place at locations
- Events belong to chapters in the narrative
- Objects appear in events and can be possessed by characters
- Mystery elements are revealed through events
- Spycraft entries are referenced in events
- Geographic positions connect entities to the map

This rich interconnected data model allows users to explore the novel from multiple angles and follow threads through the narrative.

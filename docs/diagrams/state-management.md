# Stitched Up Companion - State Management and Component Interaction

This sequence diagram illustrates how the components in the Stitched Up Companion app interact with each other and how state is managed throughout the application.

```mermaid
sequenceDiagram
    participant User
    participant App as App.js (Main Container)
    participant CharExp as CharacterExplorer
    participant RelWeb as RelationshipWeb
    participant Time as Timeline
    participant LocExp as LocationExplorer
    participant Map as InteractiveMap
    participant Plot as PlotNavigator
    participant ObjGal as ObjectGallery
    participant SpyEnc as SpycraftEncyclopedia
    participant Selection as Current Selection Panel

    User->>App: Opens application
    App->>CharExp: Init with characters data
    App->>RelWeb: Init with relationships data
    App->>Time: Init with events data
    App->>LocExp: Init with locations data
    App->>Map: Init with map positions
    App->>Plot: Init with plot data
    App->>ObjGal: Init with objects data
    App->>SpyEnc: Init with spycraft data
    App->>Selection: Init empty selections

    Note over User,Selection: Example: Character Selection Flow

    User->>CharExp: Selects character (e.g., "Cynthia")
    CharExp->>App: handleCharacterSelect("Cynthia")
    App->>App: setSelectedCharacter("Cynthia")
    App->>Selection: Update with selected character
    App->>CharExp: Update with selectedCharacter

    User->>RelWeb: Views relationships for "Cynthia"
    RelWeb->>App: handleCharacterSelect("Richard")
    App->>App: setSelectedCharacter("Richard")
    App->>Selection: Update with new selected character
    App->>CharExp: Update with new selectedCharacter
    App->>RelWeb: Update with new selectedCharacter

    Note over User,Selection: Example: Cross-Reference Flow

    User->>Map: Selects location "Cynthia's House"
    Map->>App: handleLocationSelect("cynthia_house")
    App->>App: setSelectedLocation("cynthia_house")
    App->>App: setActiveTab("Locations")
    App->>Selection: Update with selected location
    App->>LocExp: Update with selectedLocation
    App->>LocExp: Focus view (tab switch)

    User->>Selection: Clicks on "Cynthia" in Selection Panel
    Selection->>App: setActiveTab("Characters")
    App->>CharExp: Focus view (tab switch)

    Note over User,Selection: Event Selection With Related Elements

    User->>Time: Selects event "Assassination Attempt"
    Time->>App: handleEventSelect("assassination_attempt")
    App->>App: setSelectedEvent("assassination_attempt")
    App->>Selection: Update with selected event
    App->>Time: Update with selectedEvent

    User->>Time: Clicks on character in event details
    Time->>App: handleCharacterSelect("Bob Harrington")
    App->>App: setSelectedCharacter("bob_harrington")
    App->>App: setActiveTab("Characters")
    App->>Selection: Update with selected character
    App->>CharExp: Update with selectedCharacter
    App->>CharExp: Focus view (tab switch)

    Note over User,Selection: Object Interaction Flow

    User->>ObjGal: Selects object "German Rifle"
    ObjGal->>App: handleObjectSelect("german_rifle")
    App->>App: setSelectedObject("german_rifle")
    App->>Selection: Update with selected object
    App->>ObjGal: Update with selectedObject

    User->>ObjGal: Clicks location in object details
    ObjGal->>App: handleLocationSelect("churn_ranges")
    App->>App: setSelectedLocation("churn_ranges")
    App->>App: setActiveTab("Locations")
    App->>Selection: Update with selected location
    App->>LocExp: Update with selectedLocation
    App->>LocExp: Focus view (tab switch)
```

## State Management Overview

The application uses React's state management through the main App.js component:

1. **Initialization**:
   - The App.js component loads all data and passes it to child components
   - Initial state for selections is empty

2. **State Variables**:
   - `selectedCharacter`: Currently selected character
   - `selectedLocation`: Currently selected location
   - `selectedEvent`: Currently selected event
   - `selectedObject`: Currently selected object
   - `activeTab`: Currently active tab

3. **Handler Functions**:
   - `handleCharacterSelect()`: Updates the selected character
   - `handleLocationSelect()`: Updates the selected location
   - `handleEventSelect()`: Updates the selected event
   - `handleObjectSelect()`: Updates the selected object

## Common Interaction Patterns

The diagram illustrates several common interaction patterns:

1. **Direct Selection**:
   - User selects item in its primary tab
   - State updates and details display

2. **Cross-Reference Selection**:
   - User selects a related item in one tab
   - App updates state and switches to the appropriate tab

3. **Current Selections Panel Navigation**:
   - User interacts with the Current Selections panel
   - App switches to the appropriate tab for the selected item

These patterns allow for fluid exploration of the novel's interconnected elements across different views.

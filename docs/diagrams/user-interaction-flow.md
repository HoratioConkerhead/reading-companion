# Stitched Up Companion - User Interaction Flow

This diagram illustrates how users interact with the different components of the Stitched Up Companion app, showing the flow of actions and navigation between different parts of the application.

```mermaid
flowchart TD
    Start([User Opens App]) --> Welcome{First Visit?}
    Welcome -->|Yes| WelcomeMsg[Show Welcome Message]
    Welcome -->|No| MainView
    WelcomeMsg --> MainView[Main Tab View]
    MainView --> Tour[Optional App Tour]
    
    MainView --> CharTab[Characters Tab]
    MainView --> RelTab[Relationship Web Tab]
    MainView --> TimeTab[Timeline Tab]
    MainView --> LocTab[Locations Tab]
    MainView --> MapTab[Map Tab]
    MainView --> PlotTab[Plot Navigator Tab]
    MainView --> ObjTab[Objects Tab]
    MainView --> SpyTab[Spycraft Encyclopedia Tab]
    
    CharTab --> CF[Filter Characters]
    CharTab --> CS[Search Characters]
    CharTab --> CD[View Character Details]
    
    RelTab --> RV[Visualize Relationships]
    RelTab --> RF[Filter Relationship Types]
    RelTab --> RS[Select Character]
    
    TimeTab --> TF[Filter Events]
    TimeTab --> TV[View Event Details]
    TimeTab --> TS[Select Time Period]
    
    LocTab --> LF[Filter Locations]
    LocTab --> LD[View Location Details]
    LocTab --> LE[See Related Events]
    
    MapTab --> MV[Change Map View]
    MapTab --> MF[Filter Map Elements]
    MapTab --> MT[Select Time Period]
    MapTab --> MS[Select Item on Map]
    
    PlotTab --> PC[Navigate Chapters]
    PlotTab --> PM[Explore Mystery Elements]
    PlotTab --> PT[View Themes]
    
    ObjTab --> OF[Filter Objects]
    ObjTab --> OD[View Object Details]
    ObjTab --> OH[See Object History]
    
    SpyTab --> SE[Explore Spycraft Techniques]
    SpyTab --> SH[Read Historical Context]
    SpyTab --> SR[See Book References]
    
    %% Cross-tab interactions
    CD --> |Select Related Character| CD
    CD --> |Jump to Location| LD
    CD --> |View Event| TV
    
    LD --> |View Related Event| TV
    LD --> |Show on Map| MS
    LD --> |View Related Character| CD
    
    TV --> |View Related Character| CD
    TV --> |View Location| LD
    TV --> |Show on Map| MS
    
    MS --> |View Full Details| CD
    MS --> |View Full Details| LD
    MS --> |View Full Details| TV
    MS --> |View Full Details| OD
    
    %% Current selections panel
    CD --> CurrentPanel[Current Selections Panel]
    LD --> CurrentPanel
    TV --> CurrentPanel
    OD --> CurrentPanel
    MS --> CurrentPanel
    
    CurrentPanel --> |Jump to Character| CD
    CurrentPanel --> |Jump to Location| LD
    CurrentPanel --> |Jump to Event| TV
    CurrentPanel --> |Jump to Object| OD
    
    classDef start fill:#6AE368,stroke:#333,stroke-width:2px
    classDef tab fill:#68B0E3,stroke:#333,stroke-width:1px
    classDef action fill:#E3CF68,stroke:#333,stroke-width:1px
    classDef panel fill:#E368B4,stroke:#333,stroke-width:1px
    
    class Start,Welcome start
    class CharTab,RelTab,TimeTab,LocTab,MapTab,PlotTab,ObjTab,SpyTab tab
    class CF,CS,CD,RV,RF,RS,TF,TV,TS,LF,LD,LE,MV,MF,MT,MS,PC,PM,PT,OF,OD,OH,SE,SH,SR action
    class CurrentPanel,WelcomeMsg,Tour,MainView panel
```

## User Journey

The diagram illustrates the common user journeys through the application:

1. **Initial Entry**: User opens the app, possibly sees a welcome message if it's their first visit
2. **Tab Navigation**: User selects between the various content tabs
3. **Content Exploration**: Within each tab, users can:
   - Filter and search for specific content
   - View detailed information about items
   - Select related elements
4. **Cross-Tab Navigation**: Users can jump between tabs through:
   - Selecting related elements (like a character in an event)
   - Using the Current Selections panel to navigate between selected items
   - Map-based exploration connecting locations, events, and characters

## Key Interaction Points

- **Tab Controls**: The main navigation mechanism for the application
- **Content Filters**: Allow users to narrow down what they're viewing
- **Detail Views**: Show comprehensive information about selected items
- **Selection Panel**: Provides quick access to currently selected elements
- **Cross-References**: Allow navigation between related content

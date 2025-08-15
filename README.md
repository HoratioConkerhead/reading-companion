# Interactive Reading Companion

An interactive web application to explore complex novels and book series, helping readers navigate the web of characters, locations, events, and plot elements.

![Interactive Reading Companion](https://via.placeholder.com/800x400?text=Interactive+Reading+Companion)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components](#components)
- [Data Model](#data-model)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Interactive Reading Companion is designed to enhance the reading experience of complex novels and book series. It helps readers track characters, understand relationships, follow locations, and navigate intricate plots through an interactive interface.

The app serves as both a reading companion and a post-reading exploration tool, offering different perspectives on a novel's narrative structure.

## Features

### Character Explorer
Browse detailed character profiles including backgrounds, personalities, relationships, and character development arcs. Filter characters by faction or search by name.

### Relationship Web
Visualize the complex network of relationships between characters. Filter connections by relationship type and character group.

**Advanced Features:**
- **Character Importance Ratings**: Each character is assigned a 1-100 importance score based on:
  - Key scenes count (30 points max)
  - Event participation (25 points max) 
  - Relationship complexity (20 points max)
  - Character group significance (15 points max)
  - Development arc depth (10 points max)
- **Interactive Network Graph**: Drag nodes to rearrange, click to expand relationships
- **Chapter-based Filtering**: Avoid spoilers by limiting relationships to specific chapters
- **Auto-arrangement**: Physics-based automatic layout with adjustable forces
- **Multiple View Options**: Toggle between relationship counts, importance ratings, descriptions, and relationship labels
- **Progressive Revelation**: Characters and relationships appear as they're introduced in the story, preventing spoilers

### Timeline
Navigate the story chronologically with a visual timeline of events. Filter by time period, character involvement, or view parallel storylines.

### Location Explorer
Explore the novel's settings with detailed information about each location, its significance, and associated events.

### Interactive Map
View a geographic representation of key locations, with options to filter by time period and show events or character movements.

### Plot Navigator
Understand the narrative structure through chapter progression, mystery elements, and thematic analysis.

### Object Gallery
Examine important objects from the story, their significance, and their movement between characters throughout the plot.

### Spycraft Encyclopedia
Learn about espionage techniques referenced in the novel and their historical context in intelligence operations.

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/interactive-reading-companion.git
   cd interactive-reading-companion
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
├── docs/                  # Documentation files
│   ├── data_format_documentation.md
│   ├── design_document.md
│   ├── StitchedUpAnalysis.md
│   └── diagrams/          # Architecture and flow diagrams
├── public/                # Static files
└── src/                   # Source code
    ├── assets/            # Images and other assets
    ├── components/        # React components
    │   ├── CharacterExplorer.js
    │   ├── RelationshipWeb.js
    │   ├── Timeline.js
    │   ├── LocationExplorer.js
    │   ├── InteractiveMap.js
    │   ├── PlotNavigator.js
    │   ├── ObjectGallery.js
    │   ├── SpycraftEncyclopedia.js
    │   ├── AppTour.js
    │   └── DarkModeToggle.js
    ├── data/              # Data files
    │   ├── index.js
    │   └── stitchedUp/    # Data for "Stitched Up" novel
    │       ├── characters.js
    │       ├── locations.js
    │       ├── events.js
    │       ├── objects.js
    │       ├── relationships.js
    │       ├── positions.js
    │       ├── mysteryElements.js
    │       ├── chapters.js
    │       ├── spycraftEntries.js
    │       ├── themeElements.js
    │       ├── metadata.js
    │       └── index.js
    ├── styles/            # CSS and styling
    │   ├── style.css
    │   └── enhanced-tabs.css
    ├── App.js             # Main app component
    └── index.js           # Entry point
```

## Components

### App.js
The main container component that manages global state and navigation between tabs.

### CharacterExplorer
Displays character profiles with filtering and search functionality.

### RelationshipWeb
Visualizes character relationships using a network graph with interactive features:
- **Character Importance Ratings**: Each character is assigned a 1-100 importance score based on:
  - Key scenes count (30 points max)
  - Event participation (25 points max) 
  - Relationship complexity (20 points max)
  - Character group significance (15 points max)
  - Development arc depth (10 points max)
- **Interactive Network Graph**: Drag nodes to rearrange, click to expand relationships
- **Chapter-based Filtering**: Avoid spoilers by limiting relationships to specific chapters
- **Auto-arrangement**: Physics-based automatic layout with adjustable forces
- **Multiple View Options**: Toggle between relationship counts, importance ratings, descriptions, and relationship labels

### Timeline
Shows events in chronological order with filtering options.

### LocationExplorer
Presents detailed information about locations from the novel.

### InteractiveMap
Provides a geographical perspective on the story locations.

### PlotNavigator
Helps users understand the narrative structure and themes.

### ObjectGallery
Showcases key items from the story with their history and significance.

### SpycraftEncyclopedia
Explains espionage techniques referenced in the novel.

## Data Model

The application uses a structured data model organized by domain in separate files:

- `characters.js`: Character information including relationships, background, personality traits
- `events.js`: Timeline events with dates, descriptions, and involved characters
- `locations.js`: Settings from the novel with features and significance
- `objects.js`: Key items from the story with their history and significance
- `relationships.js`: Character relationship mappings and types
- `positions.js`: Geographic coordinates for map visualization
- `mysteryElements.js`: Mystery-specific plot elements and clues
- `chapters.js`: Chapter information and narrative structure
- `spycraftEntries.js`: Information about espionage techniques
- `themeElements.js`: Thematic elements and motifs from the novel
- `metadata.js`: Book metadata and app configuration

**Chapter-Based Filtering**: The data model includes chapter tracking for characters and relationships, enabling progressive revelation of content and spoiler prevention. Characters and relationships can be filtered to show only those relevant up to a specific chapter in the story.

The data structure is designed to be easily extensible for different books and series, with each data type organized in its own file for better maintainability.

## Technologies Used

- React: Front-end library for building the user interface
- React Tabs: Tab navigation component
- Tailwind CSS: Utility-first CSS framework for styling
- Custom Physics Engine: For relationship web visualization and auto-arrangement

## Deployment

### Build for Production

1. Create a production build:
   ```
   npm run build
   ```

2. The build artifacts will be stored in the `build/` directory.

### Hosting Options

The app can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static site hosting service

## Future Enhancements

1. **Advanced Visualizations**
   - Enhanced force-directed graph for relationship web
   - Improved mapping library integration
   - Timeline visualization improvements

2. **Content Enhancements**
   - Add character portraits and location images
   - Include more quotes and excerpts from the novel
   - Audio narration integration

3. **Reading Progress Integration**
   - Add functionality for readers to track their progress through the novel
   - Progressive reveal of content based on reading position

4. **User Experience**
   - Complete the "App Tour" guided introduction
   - Add annotations and note-taking features
   - User preferences and customization

5. **Performance Optimizations**
   - Lazy loading of components
   - Data caching strategies
   - Virtual scrolling for large datasets

6. **Multi-Book Support**
   - Support for multiple books in a series
   - Cross-book character and plot connections
   - Series-wide relationship mapping

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

This project was created as an interactive companion for complex novels and book series, designed to enhance the reading experience by providing additional context and exploration tools.
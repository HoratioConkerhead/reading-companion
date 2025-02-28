# Stitched Up Interactive Companion

An interactive web application to explore Martin Parsons' spy thriller novel "Stitched Up", helping readers navigate the complex web of characters, locations, events, and plot elements.

![Stitched Up Interactive App](https://via.placeholder.com/800x400?text=Stitched+Up+Interactive+App)

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

"Stitched Up" is a spy thriller set during World War II that follows Lady Cynthia Childreth's recruitment into intelligence work and her efforts to thwart a Nazi assassination plot. This companion app helps readers track characters, understand relationships, follow locations, and navigate the intricate plot.

The app serves as both a reading companion and a post-reading exploration tool, offering different perspectives on the novel's narrative.

## Features

### Character Explorer
Browse detailed character profiles including backgrounds, personalities, relationships, and character development arcs. Filter characters by faction or search by name.

### Relationship Web
Visualize the complex network of relationships between characters. Filter connections by relationship type and character group.

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

### Spy Encyclopedia
Learn about espionage techniques referenced in the novel and their historical context in WWII intelligence operations.

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/stitched-up-interactive.git
   cd stitched-up-interactive
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
    │   └── SpycraftEncyclopedia.js
    ├── data/              # Data files
    │   ├── characters.js
    │   ├── events.js
    │   ├── locations.js
    │   ├── mockData.js
    │   └── spycraftEntries.js
    ├── styles/            # CSS and styling
    ├── App.js             # Main app component
    └── index.js           # Entry point
```

## Components

### App.js
The main container component that manages global state and navigation between tabs.

### CharacterExplorer
Displays character profiles with filtering and search functionality.

### RelationshipWeb
Visualizes character relationships using a network graph or list view.

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

The application uses a structured data model defined in the following files:

- `characters.js`: Character information including relationships, background, personality traits
- `events.js`: Timeline events with dates, descriptions, and involved characters
- `locations.js`: Settings from the novel with features and significance
- `spycraftEntries.js`: Information about espionage techniques
- `mockData.js`: Consolidated data for development

The data structure is designed to reflect the XML schema defined in `docs/stitchedup.xml`.

## Technologies Used

- React: Front-end library for building the user interface
- React Tabs: Tab navigation component
- Tailwind CSS: Utility-first CSS framework for styling
- React Force Graph (planned): Library for relationship visualization

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
   - Implement force-directed graph for relationship web
   - Add mapping library for interactive location map

2. **Content Enhancements**
   - Add character portraits and location images
   - Include more quotes and excerpts from the novel

3. **Reading Progress Integration**
   - Add functionality for readers to track their progress through the novel
   - Progressive reveal of content based on reading position

4. **User Experience**
   - Complete the "App Tour" guided introduction
   - Add annotations and note-taking features

5. **Performance Optimizations**
   - Lazy loading of components
   - Data caching strategies

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

This project was created as an interactive companion to Martin Parsons' novel "Stitched Up", designed to enhance the reading experience by providing additional context and exploration tools.
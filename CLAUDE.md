# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive Reading Companion — a React 18 SPA that helps readers explore complex novels through characters, relationships, timelines, locations, maps, plot elements, objects, and spycraft entries. Currently built around Matt Parry's WWII spy thriller "Stitched Up". Deployed to GitHub Pages.

## Commands

- `npm start` (or `npm run dev`) — Vite dev server on localhost:3000/reading-companion/
- `npm run build` — Production build to `/dist`
- `npm run preview` — Serve the production build locally
- `npm test` — Run tests once (Vitest + React Testing Library); `npm run test:watch` to watch
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run deploy` — Build and deploy `dist/` to the `gh-pages` branch (GitHub Pages)
- `npm run validate:data` — Validate data integrity (character IDs, relationship refs, chapter tracking)
- `npm run build:data` — Consolidate book data and validate (`node scripts/consolidate-data.mjs --book MattParry_StitchedUp`)

## Architecture

**Stack:** React 18 built with Vite 7, Tailwind CSS 3, Leaflet/React-Leaflet for maps, custom physics engine for relationship graph. No backend — pure client-side with static data imports.

**State management:** React hooks only (useState, useEffect, useRef, useCallback, useMemo). No Redux or Context API. Global state lives in `App.jsx` and passes down via props. User preferences (dark mode, selected book) persist in localStorage.

**Entry flow:** `index.html` → `src/index.jsx` → `src/App.jsx` (manages tabs + global state + chapter filter) → 8 tab components. Files containing JSX use the `.jsx` extension; data, hooks and utils are plain `.js`. `package.json` has `"type": "module"`, so CommonJS configs use `.cjs` (Tailwind, PostCSS).

### Multi-Book Data System

Books are auto-discovered via `src/data/index.js` using Vite's `import.meta.glob()`: every `metadata.js` is loaded eagerly for the book picker, and each book's data is loaded lazily as its own chunk when selected. Each book lives in `src/data/<BookDir>/` and must have a `metadata.js` file to be discovered. Optional `index.js` can export a consolidated `book` object; otherwise the loader constructs one from individual files.

Per-book data files: `characters.js`, `relationships.js`, `events.js`, `locations.js`, `objects.js`, `chapters.js`, `positions.js`, `mysteryElements.js`, `spycraftEntries.js`, `themeElements.js`, `metadata.js`.

### Spoiler Prevention

Chapter-based filtering is central to the app. Characters, relationships, events, locations, and objects all have `introducedInChapter` fields. The global chapter picker in `App.jsx` filters all data before passing to components, preventing spoilers.

### RelationshipWeb Component

The largest and most complex component (`RelationshipWeb.jsx`, with `relationship-web/` subcomponents and `hooks/useForceSimulation.js`). Implements a custom physics engine with spring forces, repulsion, and velocity damping for force-directed graph layout. Uses `requestAnimationFrame` for animation. Interaction uses Pointer Events (mouse, touch, pen) with pinch-zoom; on phones the side panel becomes a drawer. Supports pin/remove modes, auto-arrangement, and FPS monitoring (F10 toggle). Character importance is scored 1-100 using a weighted formula across 5 dimensions.

### Styling

Tailwind CSS with custom theme colors (primary: #3b4d61, secondary: #aa9b77). Dark mode via Tailwind's `.dark` class + CSS custom properties. Custom CSS in `src/styles/style.css` and `src/styles/enhanced-tabs.css`. Fonts: Playfair Display (headings), Source Sans Pro (body).

### Data Validation Scripts

Scripts in `/scripts/` are ESM (`.mjs`). `validate-data.mjs` checks referential integrity across all data files. `consolidate-data.mjs` merges extracted data into the per-book format.

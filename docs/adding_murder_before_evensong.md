# Adding *Murder Before Evensong*

A placeholder book exists at `src/data/RichardColes_MurderBeforeEvensong/`. It is
marked `draft: true`, so it is hidden from the book picker; open the app with
`?drafts` (e.g. `http://localhost:3000/reading-companion/?drafts`) to see it.

Only bibliographic facts are filled in. Everything else (characters, chapters,
relationships, events, clues) must come from a source, because the app's spoiler
filter depends on knowing which chapter each thing first appears in.

## Option A: from the novel's text (most accurate)

1. Put the text in `books/private/Richard Coles - Murder Before Evensong/`, one file
   per chapter (as with `books/Matt Parry - Stitched Up/`).
   **`books/private/` is git-ignored.** This repository is public and the novel is
   in copyright, so its text must never be committed. Only the extracted data
   (names, short summaries, relationships) goes into `src/data/`.
2. Fill in `chapters.js` with one entry per chapter (`id`, `title`, `summary`).
3. Extract chapter by chapter into
   `src/data/RichardColes_MurderBeforeEvensong/extractions/chapter_XX.json`
   (format: `docs/extraction_format.md`; workflow and rules:
   `docs/data_generation_guide.md`).
4. Consolidate and validate:
   ```
   node scripts/consolidate-data.mjs --book RichardColes_MurderBeforeEvensong
   npm run validate:data -- --book RichardColes_MurderBeforeEvensong
   ```
5. Add events, locations, objects, mysteries, themes and clues (`spycraftEntries.js`,
   shown as the "Clues" tab).
6. When it looks right, remove `draft: true` from `metadata.js`.

## Option B: from notes on the stage play

Without the text, the play can supply the cast and the order of events: treat
each scene (or act) as a "chapter" in `chapters.js`, and record who appears and
what is revealed in each. Keep in mind the play may differ from the novel; the
book's metadata and copy would then say it follows the play.

Useful notes to capture per scene: who is present (and their role), new
relationships revealed, where it takes place, what happens, any clue noticed,
and anything that is later revealed to mean something else.

## Things to decide

- **Character groups**: `metadata.js` starts with generic mystery groups
  (Investigators, Suspects, Victims, Police, Villagers). Rename them to suit the
  cast; colours and badge styles are set alongside.
- **Map**: the setting is a fictional village, so real coordinates may not apply.
  Leave `positions.js` empty and the Map tab stays hidden, or place the village at
  a plausible spot and position its locations around it.
- **Time periods**: leave `timePeriods` out unless events have dates worth
  filtering by.

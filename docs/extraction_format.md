# Per-Chapter Extraction Format

This document defines the minimal JSON structure to capture data per chapter in a single pass. A consolidation script will merge these into final data files. Refer to `docs/data_format_documentation.md` for the authoritative schema used in output files.

File location per book:
- `src/data/<BookDir>/extractions/chapter_XX.json` (e.g., `src/data/MattParry_StitchedUp/extractions/chapter_01.json`)

## JSON Schema (minimal)

```json
{
  "chapterId": "chapter_01",
  "charactersIntroduced": [
    { "id": "lady_cynthia_childreth", "name": "Lady Cynthia Childreth" }
  ],
  "relationsIntroduced": [
    {
      "aId": "wing_commander_bill_lawrie",
      "aName": "Wing Commander Bill Lawrie",
      "bId": "lady_cynthia_childreth",
      "bName": "Lady Cynthia Childreth",
      "aToBType": "handler",
      "bToAType": "asset",
      "description": "Recruits and briefs her"
    }
  ],
  "locationsIntroduced": [
    { "id": "denleigh_house", "name": "Denleigh House" }
  ],
  "eventsIntroduced": [
    { "id": "first_weekend_party", "title": "First Weekend at Denleigh" }
  ],
  "objectsIntroduced": [
    { "id": "coded_invitation", "name": "Coded Invitation" }
  ],
  "timeline": []
}
```

Notes:
- IDs must be lowercase snake_case. Normalization happens in consolidation, but prefer correct form upfront.
- `relationsIntroduced` must describe both directions via `aToBType` and `bToAType` (asymmetric types are allowed).
- `chapterId` should match the `chapters.js` id for consistency.
- The consolidation step will assign `introducedInChapter = chapterId` to every entity introduced in the file.

## Authoring Guidelines
- Record earliest textual mention for a character in `charactersIntroduced`.
- Only include relations that are supported by the text of this chapter, with a short description.
- Keep descriptions concise and evidence-based; avoid spoilers beyond this chapter.
- It’s okay to leave optional arrays empty if nothing new is introduced in this chapter.

## Consolidation
Run:

```
node scripts/consolidate-data.mjs --book MattParry_StitchedUp
```

- Output goes to `src/data/<BookDir>/_generated/characters.js`. Use `--overwrite` to back up and replace the live file.
- After generation, validate with:

```
npm run validate:data
```

- Fix any reported issues before committing.

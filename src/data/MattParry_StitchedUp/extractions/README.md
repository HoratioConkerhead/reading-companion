# Extractions (Per-Chapter)

Place per-chapter JSON files here following `docs/extraction_format.md`.

- Example filename: `chapter_01.json`
- Run consolidation:

```
node scripts/consolidate-data.mjs --book MattParry_StitchedUp
```

Use `--overwrite` to replace the live `characters.js` after backing it up.

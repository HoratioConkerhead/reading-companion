# Data Generation Guide (Characters, Relations, Chapters, etc.)

This guide documents a reliable workflow and prompt patterns for generating book data files from source text while adhering to the project’s data format. Refer to `docs/data_format_documentation.md` for the authoritative schema and field definitions.

## Scope and Sources

- Primary source: the canonical chapter text in `books/<Author - Title>/`.
- Do not read any pre‑existing data files of the same type to “learn” the answers (prevents leakage of prior mistakes). Use them only for diff checks after generation.
- Validate results with the provided script: `node scripts/validate-data.mjs`.
- Global rule: every entity (characters, relations, events, objects, locations, spycraft, themes, mystery elements) MUST include `introducedInChapter` to enable universal “show up to chapter” filtering.

## Golden Rules (must‑haves)

- IDs: unique, lowercase snake_case (e.g., `lady_cynthia_childreth`, `helmut_schnitter`).
- Relations are the single source of truth for the relationship web (edges are derived later).
- Every relation must be reciprocated from the counterpart character (asymmetric types allowed, e.g., `handler`/`asset`).
- Every relation must include `introducedInChapter` and must not be earlier than either character’s `introducedInChapter`.
- `introducedInChapter` for a character is the earliest textual mention (mention is enough, not only dialogue/action).
- No placeholders or inventions: all details must be supported by the text; avoid spoilers beyond the chapter in which something is introduced.

## Workflow (chapter-first extraction)

1. Read all chapters once quickly to build a mental model of the arc.
2. Do a chapter-by-chapter pass and extract (see `docs/extraction_format.md`):
   - New characters introduced (with `introducedInChapter = chapterId`).
   - First mention chapter for existing characters.
   - Relationships introduced (reciprocated, each with `introducedInChapter = chapterId`).
   - New locations/events/objects/spycraft entries/theme elements/mystery elements (each with `introducedInChapter = chapterId`).
3. After the per‑chapter pass, consolidate the global character list:
   - Merge duplicates.
   - Normalize IDs to snake_case.
   - Fill `introducedInChapter` with the earliest chapter per character.
4. Build the `relations` arrays on characters:
   - For every discovered relation, add both sides (reciprocal) with appropriate (possibly asymmetric) `type` and the same `introducedInChapter`.
   - Keep descriptions concise and grounded in textual evidence.
5. Run validation and fix:
   - `node scripts/validate-data.mjs`
   - Address any errors: unknown IDs, missing reciprocals, invalid `introducedInChapter`, duplicates.
6. (Optional) Diff against legacy data to find omissions, then confirm each addition against the source text.

## Running Consolidation

Use the consolidation script to generate final files from per-chapter extractions (writes to `_generated/` by default):

```
node scripts/consolidate-data.mjs --book <BookDirectoryName>
```

Add `--overwrite` to back up and replace the live file(s). Always run the validator afterward.

## Common Pitfalls and How We Fixed Them

- Missing supporting characters (butlers, ADCs, local officials): the network looked sparse; we added them with minimal, true relations.
- Relations without reciprocals: derived edges later expect symmetry; always add both sides.
- Wrong `introducedInChapter`: confirm earliest mention; relation introduction cannot predate either character’s introduction.
- Legacy ID mismatches: maintain a mapping doc to align old ids with canonical ones.
- Over‑inventing: only include what is actually in the chapter text; leave `key_scenes` empty if unsure.

## Relationship Type Guidance (concise, often asymmetric)

- `spouse`, `friend`, `colleague`, `conspirator`, `associate`
- Asymmetric examples: `handler`/`asset`, `superior`/`subordinate`, `employer`/`subordinate`, `protector`/`protected`, `recruiter`/`asset`.

## Prompt Patterns (for use with an LLM)

Replace variables in ALL‑CAPS.

### 1) Chapter Extraction Prompt

“Read CHAPTER_ID (TITLE). List all characters first mentioned in this chapter with a brief evidence extract. Then list relationships that start in this chapter as triples: A, B, type (use concise/asymmetric classification), and a one‑sentence evidence note. Also list any new locations, events, objects, spycraft entries, theme elements, and mystery elements introduced in this chapter. Do not invent; only use content present in this chapter. No spoilers from later chapters.”

### 2) Consolidation Prompt

“Given the per‑chapter extractions from CHAPTER_RANGE, consolidate a unique character list with earliest introduction and draft a relations table. Enforce:
- unique lowercase snake_case ids,
- symmetric relations (asymmetric types allowed),
- relation.introducedInChapter ≥ character.introducedInChapter for both ends.”

### 3) Formatting Prompt (final file)

“Create the final data file strictly following the schema described in `docs/data_format_documentation.md`. Ensure all required fields are present, relations reference existing ids, are reciprocated, and include valid `introducedInChapter` values.”

### 4) Validation/Repair Prompt

“Here are the validator errors/warnings. Repair the data so that:
- no relation points to an unknown id,
- all relations are reciprocated with valid `introducedInChapter`,
- no relation introduction predates either character’s introduction.”

## Legacy → Canonical ID Mapping (example)

- `cynthia_childreth` → `lady_cynthia_childreth`
- `bill_laurie` → `wing_commander_bill_lawrie`
- `mary` → `mary_ashdown`

Add others as encountered; keep this list in your working notes for diffs.

## Minimum Include Policy (Supporting Roles)

Include supporting characters who:
- affect plot, security, or information flow (e.g., butler who coordinates guests, ADC who liaises, village postmistress spotting watchers).
- For purely nameless roles, omit.

Keep their relations minimal and true (e.g., `employer`/`subordinate`, `colleague`).

## Quality Checklist (use before committing)

- [ ] IDs unique, snake_case; names correct.
- [ ] Every character has correct `introducedInChapter` (earliest mention).
- [ ] Every relation has:
  - [ ] Existing `characterId`
  - [ ] Reciprocal entry from counterpart
  - [ ] `introducedInChapter` not earlier than either character’s intro
  - [ ] Concise, textual description
- [ ] Every location/event/object/spycraft/theme/mystery element includes `introducedInChapter` corresponding to its earliest on-page mention.
- [ ] No invented facts, no spoilers beyond intro chapter.
- [ ] `node scripts/validate-data.mjs` shows no errors; suggestions reviewed.

## Running the Validator

```
node scripts/validate-data.mjs
```

- The script checks for unknown references, reciprocity, chapter ids, duplicates, and suggests missing `introducedInChapter` values based on earliest available.
- Integrate it into CI so data PRs fail fast on schema violations.

## UI Tip: Isolated Characters

Isolated characters (no relations) are expected. The Relationship Web provides a “Pin isolated nodes” option to keep them visible during auto‑arrange without fabricating edges.

---

Following this guide and checklist should let you regenerate complete, validated data files for new books with consistent quality and minimal manual clean‑up.

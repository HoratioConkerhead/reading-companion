# *Murder Before Evensong*

The companion for Richard Coles's *Murder Before Evensong* lives in
`src/data/RichardColes_MurderBeforeEvensong/`. It is still marked `draft: true`, so it
is hidden from the book picker; open the app with `?drafts` (e.g.
`https://horatioconkerhead.github.io/reading-companion/?drafts`) to see it. Remove
`draft: true` from `metadata.js` once it has been reviewed.

## How it was made

The data was written from the novel's text, read chapter by chapter. The text is
kept outside the repository (the novel is in copyright and the repository is public):
only facts and short summaries in our own words are committed, with no quotations.

| File | Contents |
| --- | --- |
| `chapters.js` | 38 chapters with plain titles ("Chapter 9") and a summary of each |
| `characters.js` | 36 characters and 82 two-way relationships |
| `events.js` | 55 events, dated (spring 1988, plus wartime and earlier history) |
| `locations.js`, `positions.js` | 23 places, and a plan of the parish for the Map tab |
| `objects.js` | 15 objects |
| `mysteryElements.js` | 9 open questions, with clues and resolutions |
| `spycraftEntries.js` | 13 clues (the "Clues" tab) |
| `themeElements.js` | 7 themes |

The story's dates follow from real events the book mentions: Open Day falls on
St George's Day, a Saturday (1988), the League Cup final is Arsenal v Luton, the
Eurovision winner is Céline Dion, and Graeme Hick has just made 405 not out.

## Keeping a whodunnit spoiler-free

Every item has the chapter in which the reader learns of it, and the rule is that an
item belongs to the earliest chapter by which **everything it says** is known. Where
something is learned later, it goes in a separate list item tagged with that chapter
(see "Chapter-tagged list items" in `docs/data_format_documentation.md`), for example:

- a character's background only uses what is known when they first appear; their later
  story is in `development` entries, each with its chapter, and their fate is hidden
  while a chapter is chosen;
- relationships appear from the chapter they become known (the killer's relationships
  to the victims only from the solution);
- a clue's `meaning` stays hidden until its `revealedInChapter`;
- character groups describe where people belong in Champton (The Rectory, Estate &
  House...), not their part in the mystery.

`metadata.js` sets `startSpoilerFree: true`, so a new reader starts at Chapter 1
instead of seeing the whole book.

## Checking it

```
npm run validate:data -- --book RichardColes_MurderBeforeEvensong
node scripts/data-report.mjs --book RichardColes_MurderBeforeEvensong --text "<folder of chapter texts>"
```

The report's text check expects one file per chapter named like `09 - Chapter 9.txt`.
It flags people who share a surname (the de Floures, the Thwaites) as introduced late;
those are false positives.

## To review

- Whether any summary or description gives away more than its chapter has revealed.
- The plan of the parish in `positions.js` (positions follow the book's layout of the
  village, but are approximate).
- Minor characters left out (e.g. Mr Williams the undertaker, Mrs Buckhurst, the
  Stanilands, Mrs Lee, Will the gallery owner).

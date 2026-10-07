# Data review (groundwork for Stitched Up v4)

Generated reports, one checklist per book:

- [`StitchedUp_v2.md`](StitchedUp_v2.md): the default book, cross-checked against the text in `books/Matt Parry - Stitched Up/`
- [`StitchedUp_v2_chapter_changes.md`](StitchedUp_v2_chapter_changes.md): the chapter corrections made to v2's events, objects and mysteries
- [`JekyllAndHyde.md`](JekyllAndHyde.md)

Regenerate (e.g. for v4) with:

```
node scripts/data-report.mjs --book MattParry_StitchedUp_v2 --text "books/Matt Parry - Stitched Up" --out docs/data-review/StitchedUp_v2.md
```

The report is advisory: every item is something to check, and some are false positives
(e.g. the text check matches whole words from names, so "Montgomery" also matches
"Montgomery's ADC"). `npm run validate:data` remains the strict check.

## Main findings for Stitched Up v2

### 1. Event chapters don't follow the text (spoiler risk)

Events are assigned two per chapter in sequence (Preface, 1, 1, 2, 2, ... 24, 24), not
to the chapter where they happen. Chapters 25 to 50 and the Epilogue have no events at
all. For example, the **assassination attempt (December 1943) is in Chapter 19 in the
data**, but the text doesn't mention an assassination or Montgomery until Chapter 35. Because the chapter filter
uses these chapters, readers part-way through can see late events on the Timeline, Map
and Plot tabs. This is the most important thing to fix in v4: assign each event the
chapter where it happens, and add events for Chapters 25 onwards.

**Corrected for v2 in the meantime:** events, objects and mysteries now have chapters
checked against the text; see [`StitchedUp_v2_chapter_changes.md`](StitchedUp_v2_chapter_changes.md)
for every change and the evidence.

### 2. Characters missing from the character list

Events and objects refer to people who aren't characters in v2, and the text names
people the data doesn't cover:

- **Bert** (about 50 mentions from Chapter 28) and **Lena Weber** (28, from Chapter 12)
  are characters in v1 but not v2.
- **Mike** (32 mentions from Chapter 24) and **Keith** (22, from Chapter 24) are names to
  check.
- **T. G. Edwards** is recorded as an alias of Helmut Schnitter, but 8 events still
  refer to `tg_edwards`. If Edwards is Schnitter's cover name, check that this alias
  isn't itself a spoiler before the reveal.
- Events also use group placeholders as if they were characters (`intelligence_teams`,
  `conspirators`, `murderer`, `security_forces`, ...). Either link the actual people,
  or leave them out of `characters` in events.

### 3. First appearances that are too late

14 characters are introduced in the data after the text first names them, for example
Bill Lawrie and Hannah Park (as "Mr Newton" and "Miss Gilchrist" in Chapter 1, recorded
from Chapter 3), Lady Megan Davies ("Davies" in Chapter 1, recorded from Chapter 11) and
Mosley (Chapter 2, recorded from Chapter 22). A first mention counts as an introduction (see
`docs/data_generation_guide.md`).

### 4. One-sided relationships

Nine relationships are recorded on only one of the two characters (e.g. Gladys and Don
both relate to Cynthia, but Cynthia has no relation back), and Amy and Horace Wyndholme's
relationship is dated before Horace is introduced. Helmut Schnitter has no relationships
at all.

### 5. Other broken references

16 events are at locations that don't exist (`various`, `uk`, ...), and objects and
locations refer to 13 events that don't exist (e.g. `atlantic_hotel_surveillance`,
`green_car_discovery`). These were probably renamed or dropped.

### Already fixed

Events, objects, the timeline and map positions used older ids for Cynthia
(`cynthia_childreth`) and Bill (`bill_lawrie`), and for the Box Tunnel
(`train_box_tunnel`), so the two main characters were missing from every event's cast
list, the Timeline's character filter and the map, and had no event points in their
importance score. These ids have been updated across events, objects, the timeline and
map positions (48 lines).

## Suggestions for v4

1. Start from the per-chapter extraction workflow (`docs/data_generation_guide.md`,
   `docs/extraction_format.md`) so every entity gets its chapter from the text.
2. Record events per chapter in the extractions, including Chapters 25 to 50.
3. Run `npm run validate:data -- --book <v4>` and this report after consolidating;
   aim for no broken references, no one-sided relations and no late introductions.
4. Decide how to handle secret identities (Edwards / Schnitter) so aliases don't
   reveal twists early: for example, give the alias its own character that is linked
   to the real one from the reveal chapter.

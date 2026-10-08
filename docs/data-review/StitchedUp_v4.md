# Stitched Up v4: how it was made, and notes on the text

v4 (`src/data/MattParry_StitchedUp_v4/`, a draft: open the app with `?drafts`) was rebuilt
from the text in `books/Matt Parry - Stitched Up/`, chapter by chapter:

1. Detailed notes were taken on every chapter (characters, relationships, events, places,
   objects, tradecraft, secrets and reveals).
2. The data was drafted in five batches of about ten chapters against a shared list of ids,
   with every item tied to the chapter in which the reader learns it.
3. The batches were merged, de-duplicated and checked: `npm run validate:data` and
   `node scripts/data-report.mjs --book MattParry_StitchedUp_v4 --text "books/Matt Parry - Stitched Up"`.

| Data | v2 | v4 |
| --- | --- | --- |
| Chapters with events | 26 of 52 | 52 of 52 |
| Characters | 35 | 62 |
| Relationships | 58 | 116 |
| Events | 52 | 168 |
| Locations | 26 | 69 |
| Objects | 29 | 64 |
| Tradecraft and clues | 19 | 96 |
| Mysteries | 20 | 26 |

What changed from v2 (see `README.md` for v2's problems):

- Events run through all 50 chapters and the epilogue, each in the chapter where it happens.
- Characters missing from v2 are in (Lena Weber, Bert, Mike Robbins, Keith Macmillan, Alison,
  Jim, Felicity, Edwin, Don, Gladys, Jack, Paul Holness and others), and names follow the text:
  v2's invented surnames (Hargreaves, Ashdown, Holmes, Hart, Gray) are gone. Jim's surname,
  Redgrave, is from Chapter 49.
- **Cover names**: Bill Laurie appears as "Mr Newton" and Hannah Park as "Miss Gilchrist" until
  Chapter 3 reveals them. Roles change as the story reveals them (`reveals`), so for example
  Louise Harrington is a member of the network until Chapter 50.
- Character groups say where people belong (The Childreths, Denleigh Party, Berlin...), not
  which side they turn out to be on.
- Later facts are chapter-tagged: development, clues, object and place significance, and mystery
  resolutions only appear once the reader reaches them.
- Every relationship is recorded on both people, from the chapter it becomes known.

## Notes on the text (for the author)

Things noticed while reading that may be slips or worth checking:

- The title page of '00 - PREFACE.txt' credits the book to 'Martin Parsons' (dedicated to Oliver Dennis), not Matt Parry.
- chapter_02: Cynthia counts 'two pro-Nazi wives', but Marjorie has not yet voiced any views at that point (she only does so in chapter_04); only Louise has spoken.
- Flight times clash: the 580-mile Croydon-Berlin trip at the steward's 110 mph cruise would take over five hours, yet the text says about two to two and a half hours (chapters 7-8).
- chapter_09: Stammer says Germany's 'employment rate is now over 40%', meaning unemployment.
- chapter_07: Felicity books returns for 'the week after', while Jane (chapter_06) says they will be in Germany seven days or fewer.
- chapter_03: Hannah says Richard already knows about them, but in chapter_04 Richard says MI5 only asked about the bank's German dealings and hinted they might contact Cynthia.
- chapter_10: Stammer introduces the Mullers and Sprangers as people Richard 'met this morning', implying Andreas Muller and Christian Spranger were the two silent colleagues at the chapter_09 meeting; the text never states it outright.
- chapter_13: Stammer says Richard spoke to Marjorie Snowden 'at the party last night', but the Snowdens are never shown at the Berlin reception; probably a slip for Denleigh.
- Spellings vary in the text: 'Laurie'/'Lawrie' (ch17 'Laurie'), 'Hindenberg', 'Brandenberg', 'Boorman' for Albert Bormann, 'Gera' for Gerda (ch19), 'les tricoteuse' (ch14).
- Edwards is never called Helmut Schnitter in the text after the preface; the link (two cases, St Mary's, the Penzance ferry) is a strong inference. I tagged helmut_schnitter as 'the man calling himself Edwards' from ch24; drop the tag in ch24 if you want to be stricter.
- George's rank: ch25 says Chief Inspector, ch26 his card reads Detective Chief Inspector.
- Ch23 text says 'Earls' for Earls Court and 'Krystal Nacht'; ch21 dates Mosley's Fascist Defence Force to August 1933 after New Party meetings were disrupted (historically the New Party had become the BUF by then).
- Ch32 places the 'postman' near Gloucester Place, but chs 28-29 put Edwards' flat in Crawford Place (off the Edgware Road). The location id crawford_place_flat should stand.
- Ch33: Cynthia recalls 'the warning phone call from Louise', but in ch23 it is Marjorie Snowden who phones to say Cynthia will be called on, and in ch24 Snowden says 'Marjorie has forewarned you'. Probably a slip.
- Ch38 dates Harrington's forty-minute drive to Friday, but in ch40 Mike calls it 'last Thursday'. In ch40 George and Bill meet in the Admiral Duncan on Saturday evening, but George later says they met 'on Friday'.
- Ch35: George says 'Portal has just died'. Historically Air Chief Marshal Portal survived the war; the First Sea Lord, Dudley Pound, died in October 1943. This is an authorial error and should not be repeated as fact.
- Spelling varies between 'Jimmy Coats' (ch35) and 'Jimmy Coates' (ch36). He is mentioned only, so no character entry was created.
- ch41 opens 'Bert drove Mike back to his office', but the scene is plainly Bill (ch40 has Bill offering to drive Mike, and Bill is speaking a moment later). Treated as Bill.
- ch41: Bill says he'll get the itinerary from 'the MoD'. That is anachronistic for 1943 (it was the War Office).
- ch48: Bill asks for one team to be left in place with Mike, yet Mike attends the ch49 meeting (as one of 'the four from the cars').
- Bill's surname is "Lawrie" in Chapter 3 but "Laurie" elsewhere (Chapters 6, 17, 28); v4 uses Laurie.
- Dates: the preface and Chapter 25 put the landing in June 1943, but Chapters 23-24 place it
  after Mosley's release (historically November 1943), and Chapter 40 puts the February
  inspection four months away (about October). v4 dates Chapters 24-35 to mid-1943 and
  Chapters 36-50 to late 1943 (25 November and 7 December 1943 match the real weekdays given).
- The Edwards account: Chapter 16 opens it in 1932 under a name the bank's directors chose,
  Chapter 31 says MI5 created the name, and Chapter 47 has Richard say it was set up in 1933 at
  the Germans' request.

#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Data review report for a book: a Markdown checklist of gaps, broken references,
 * one-sided relationships, chapter-order problems and (optionally) a cross-check of
 * first appearances against the book's text. Advisory: unlike validate-data, it
 * flags things to look at rather than hard errors.
 *
 * Usage:
 *   node scripts/data-report.mjs --book <BookDirectoryName> [--text "<books/Author - Title>"] [--out <file.md>]
 *
 * The text directory holds one file per chapter named like the Stitched Up texts:
 * "00 - PREFACE.txt", "01 - Chapter 1.txt", ..., "51 - Epilogue.txt".
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { assembleBook } from '../src/data/bookAssembly.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const parseArgs = (argv) => {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) {
      args[argv[i].slice(2)] = argv[i + 1];
      i += 1;
    }
  }
  return args;
};

const loadBook = async (bookKey) => {
  const bookDir = path.join(projectRoot, 'src', 'data', bookKey);
  const files = (await fs.readdir(bookDir)).filter(f => f.endsWith('.js'));
  const importFile = (file) => import(pathToFileURL(path.join(bookDir, file)).href);
  const indexModule = files.includes('index.js') ? await importFile('index.js') : null;
  if (indexModule && (indexModule.book || indexModule.default)) return assembleBook({ indexModule });
  return assembleBook({ fileModules: await Promise.all(files.filter(f => f !== 'index.js').map(importFile)) });
};

// "00 - PREFACE.txt" -> preface, "07 - Chapter 7.txt" -> chapter_07, "51 - Epilogue.txt" -> epilogue
const chapterIdForTextFile = (fileName) => {
  if (/preface/i.test(fileName)) return 'preface';
  if (/epilogue/i.test(fileName)) return 'epilogue';
  const match = fileName.match(/chapter\s+(\d+)/i);
  return match ? `chapter_${match[1].padStart(2, '0')}` : null;
};

// Words in a name that are too generic to identify someone in the text
const NAME_STOPWORDS = new Set([
  'lady', 'lord', 'sir', 'mr', 'mrs', 'miss', 'dr', 'doctor', 'wing', 'commander', 'inspector', 'chief',
  'colonel', 'general', 'captain', 'major', 'sergeant', 'field', 'marshal', 'the', 'of', 'and', 'de', 'von',
  'van', 'old', 'young', 'reverend', 'canon', 'father', 'detective', 'constable', 'admiral', 'professor'
]);

const nameTokens = (names) => {
  const tokens = new Set();
  names.filter(Boolean).forEach((name) => {
    // Split on anything that isn't a letter (spaces, hyphens, straight and curly quotes...)
    String(name).split(/[^A-Za-zÀ-ÖØ-öø-ÿ]+/).forEach((word) => {
      if (word.length >= 3 && !NAME_STOPWORDS.has(word.toLowerCase()) && /^[A-Z]/.test(word)) tokens.add(word);
    });
  });
  return [...tokens];
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const main = async () => {
  const args = parseArgs(process.argv);
  if (!args.book) {
    console.error('Usage: node scripts/data-report.mjs --book <BookDirectoryName> [--text <dir>] [--out <file.md>]');
    process.exitCode = 1;
    return;
  }
  const book = await loadBook(args.book);
  const { characters, events, locations, objects, chapters, mysteryElements, themeElements, spycraftEntries } = book;

  const chapterIndex = new Map(chapters.map((c, i) => [c.id, i]));
  const chapterName = (id) => (chapterIndex.has(id) ? chapters[chapterIndex.get(id)].title.trim() : `\`${id}\``);
  const characterIds = new Set(characters.map(c => c.id));
  const locationIds = new Set(locations.map(l => l.id));
  const eventIds = new Set(events.map(e => e.id));
  const objectIds = new Set(objects.map(o => o.id));
  const characterName = (id) => characters.find(c => c.id === id)?.name || id;

  // Which chapter an event belongs to, as the app's chapter filter decides it
  const eventChapterIndex = new Map();
  chapters.forEach((ch, idx) => (ch.events || []).forEach((id) => {
    if (!eventChapterIndex.has(id)) eventChapterIndex.set(id, idx);
  }));
  const chapterOfEvent = (ev) => {
    if (ev.introducedInChapter && chapterIndex.has(ev.introducedInChapter)) return chapterIndex.get(ev.introducedInChapter);
    if (eventChapterIndex.has(ev.id)) return eventChapterIndex.get(ev.id);
    if (ev.chapter && chapterIndex.has(String(ev.chapter))) return chapterIndex.get(String(ev.chapter));
    return -1;
  };

  const sections = [];
  const section = (title, intro, rows) => sections.push({ title, intro, rows });
  const list = (items) => items;

  // 1. Spoiler safety: items the chapter filter cannot place are always shown
  const missingIntro = [];
  [['Character', characters], ['Location', locations], ['Object', objects], ['Mystery', mysteryElements],
    ['Theme', themeElements], ['Encyclopedia entry', spycraftEntries]].forEach(([kind, items]) => {
    items.forEach((item) => {
      const intro = item.introducedInChapter;
      if (!intro) missingIntro.push(`${kind} **${item.name || item.title || item.id}** has no \`introducedInChapter\``);
      else if (!chapterIndex.has(intro)) missingIntro.push(`${kind} **${item.name || item.title || item.id}** has unknown chapter \`${intro}\``);
    });
  });
  events.forEach((ev) => {
    if (chapterOfEvent(ev) === -1) missingIntro.push(`Event **${ev.title}** can't be placed in a chapter (no \`introducedInChapter\`, not listed in any chapter's \`events\`, \`chapter\`: \`${ev.chapter ?? '—'}\`)`);
  });
  section('Spoiler safety',
    "The chapter filter always shows anything it can't place in a chapter, so these can leak spoilers.",
    list(missingIntro));

  // 2. Relationships
  const pairs = new Map();
  characters.forEach((c) => (c.relations || []).forEach((rel) => {
    const key = [c.id, rel.characterId].sort().join('::');
    const entry = pairs.get(key) || { sides: {} };
    entry.sides[c.id] = rel;
    pairs.set(key, entry);
  }));
  const oneSided = [];
  const relationOrder = [];
  pairs.forEach((entry, key) => {
    const [a, b] = key.split('::');
    const ids = Object.keys(entry.sides);
    if (!characterIds.has(a) || !characterIds.has(b)) return; // reported under references
    if (ids.length === 1) {
      const from = ids[0];
      const to = from === a ? b : a;
      const rel = entry.sides[from];
      oneSided.push(`**${characterName(from)}** → **${characterName(to)}** (\`${rel.type}\`: ${rel.description || 'no description'}) has no reverse relation on ${characterName(to)}`);
    }
    ids.forEach((id) => {
      const rel = entry.sides[id];
      const relIdx = chapterIndex.get(rel.introducedInChapter);
      const other = id === a ? b : a;
      const latestCharIntro = Math.max(
        chapterIndex.get(characters.find(c => c.id === id)?.introducedInChapter) ?? -1,
        chapterIndex.get(characters.find(c => c.id === other)?.introducedInChapter) ?? -1
      );
      if (relIdx !== undefined && relIdx < latestCharIntro) {
        relationOrder.push(`**${characterName(id)}** → **${characterName(other)}** is introduced in ${chapterName(rel.introducedInChapter)}, before both characters have appeared (${chapterName(chapters[latestCharIntro].id)})`);
      }
    });
  });
  const isolated = characters.filter(c => ![...pairs.keys()].some(k => k.split('::').includes(c.id)))
    .map(c => `**${c.name}** (${c.group}) has no relationships`);
  section('Relationships',
    'The relationship web expects every relation to be recorded on both characters, and no relation to appear before both of its characters have.',
    [...oneSided, ...relationOrder, ...isolated]);

  // 3. Broken references
  const refs = [];
  characters.forEach(c => (c.relations || []).forEach((rel) => {
    if (!characterIds.has(rel.characterId)) refs.push(`Character **${c.name}** relates to unknown character \`${rel.characterId}\``);
  }));
  events.forEach((ev) => {
    (ev.characters || []).forEach((ref) => {
      if (!characterIds.has(ref.characterId)) refs.push(`Event **${ev.title}** lists unknown character \`${ref.characterId}\``);
    });
    if (ev.location && !locationIds.has(ev.location)) refs.push(`Event **${ev.title}** is at unknown location \`${ev.location}\``);
  });
  objects.forEach((o) => {
    (o.characters || []).forEach((id) => { if (!characterIds.has(id)) refs.push(`Object **${o.name}** lists unknown character \`${id}\``); });
    (o.events || []).forEach((id) => { if (!eventIds.has(id)) refs.push(`Object **${o.name}** lists unknown event \`${id}\``); });
    if (o.location && !locationIds.has(o.location)) refs.push(`Object **${o.name}** is at unknown location \`${o.location}\``);
  });
  locations.forEach(l => (l.events || []).forEach((id) => {
    if (!eventIds.has(id)) refs.push(`Location **${l.name}** lists unknown event \`${id}\``);
  }));
  chapters.forEach(ch => (ch.events || []).forEach((id) => {
    if (!eventIds.has(id)) refs.push(`${ch.title.trim()} lists unknown event \`${id}\``);
  }));
  mysteryElements.forEach((m) => {
    (m.relatedCharacters || []).forEach((id) => { if (!characterIds.has(id)) refs.push(`Mystery **${m.title}** lists unknown character \`${id}\``); });
    (m.relatedEvents || []).forEach((id) => { if (!eventIds.has(id)) refs.push(`Mystery **${m.title}** lists unknown event \`${id}\``); });
  });
  const positionKinds = [['locationPositions', locationIds, 'location'], ['eventPositions', eventIds, 'event'],
    ['characterPositions', characterIds, 'character'], ['objectPositions', objectIds, 'object']];
  positionKinds.forEach(([key, ids, kind]) => Object.keys(book[key] || {}).forEach((id) => {
    if (!ids.has(id)) refs.push(`\`positions.js\` ${key} has unknown ${kind} \`${id}\``);
  }));
  section('Broken references', 'Ids that point at nothing; the app silently skips these.', refs);

  // 4. Chronology
  const chronology = [];
  characters.forEach((c) => {
    const intro = chapterIndex.get(c.introducedInChapter);
    if (intro === undefined) return;
    const firstEvent = events
      .filter(ev => (ev.characters || []).some(ref => ref.characterId === c.id))
      .map(ev => ({ ev, idx: chapterOfEvent(ev) }))
      .filter(x => x.idx !== -1)
      .sort((x, y) => x.idx - y.idx)[0];
    if (firstEvent && firstEvent.idx < intro) {
      chronology.push(`**${c.name}** is introduced in ${chapterName(c.introducedInChapter)} but takes part in **${firstEvent.ev.title}** in ${chapterName(chapters[firstEvent.idx].id)}`);
    }
  });
  objects.forEach((o) => {
    const intro = chapterIndex.get(o.introducedInChapter);
    const firstEvent = (o.events || []).map(id => events.find(e => e.id === id)).filter(Boolean)
      .map(ev => ({ ev, idx: chapterOfEvent(ev) })).filter(x => x.idx !== -1).sort((x, y) => x.idx - y.idx)[0];
    if (intro !== undefined && firstEvent && firstEvent.idx < intro) {
      chronology.push(`Object **${o.name}** is introduced in ${chapterName(o.introducedInChapter)} but appears in **${firstEvent.ev.title}** in ${chapterName(chapters[firstEvent.idx].id)}`);
    }
  });
  mysteryElements.forEach((m) => {
    const intro = chapterIndex.get(m.introducedInChapter);
    const reveal = chapterIndex.get(m.revealedInChapter);
    if (intro !== undefined && reveal !== undefined && reveal < intro) {
      chronology.push(`Mystery **${m.title}** is revealed in ${chapterName(m.revealedInChapter)}, before it is introduced (${chapterName(m.introducedInChapter)})`);
    }
    if (m.revealedInChapter && reveal === undefined) {
      chronology.push(`Mystery **${m.title}** is revealed in unknown chapter \`${m.revealedInChapter}\``);
    }
  });
  const emptyChapters = chapters.filter(ch => !(ch.events || []).length && !events.some(ev => chapterOfEvent(ev) === chapterIndex.get(ch.id)))
    .map(ch => `${ch.title.trim()} has no events`);
  section('Chronology', 'Things that happen before they are introduced, which hides them from readers who have reached that point.', [...chronology, ...emptyChapters]);

  // 5. Map coverage
  const map = [];
  locations.forEach((l) => { if (!book.locationPositions[l.id]) map.push(`Location **${l.name}** has no map position`); });
  events.forEach((ev) => { if (!book.eventPositions[ev.id]) map.push(`Event **${ev.title}** has no map position`); });
  section('Map coverage', 'Items without a position in `positions.js` are not shown on the map.', map);

  // 6. Cross-check against the text
  let textSummary = null;
  if (args.text) {
    const textDir = path.resolve(projectRoot, args.text);
    const files = (await fs.readdir(textDir)).filter(f => f.endsWith('.txt'));
    const texts = [];
    for (const file of files) {
      const id = chapterIdForTextFile(file);
      if (id && chapterIndex.has(id)) texts.push({ id, idx: chapterIndex.get(id), text: await fs.readFile(path.join(textDir, file), 'utf8') });
    }
    texts.sort((a, b) => a.idx - b.idx);
    const firstMention = (names) => {
      const tokens = nameTokens(names);
      if (tokens.length === 0) return { tokens, idx: -1 };
      // A whole word, not a contraction like "Don't"
      const pattern = new RegExp(`\\b(${tokens.map(escapeRegex).join('|')})\\b(?!['’]t)`);
      for (const t of texts) {
        const match = t.text.match(pattern);
        if (match) return { tokens, idx: t.idx, word: match[1] };
      }
      return { tokens, idx: -1 };
    };
    const later = [];
    const earlier = [];
    const notFound = [];
    characters.forEach((c) => {
      const { tokens, idx, word } = firstMention([c.name, ...(c.aliases || [])]);
      const intro = chapterIndex.get(c.introducedInChapter);
      if (idx === -1) notFound.push(`**${c.name}** (searched for ${tokens.map(t => `"${t}"`).join(', ') || 'nothing usable'}) is not named in the text`);
      else if (intro === undefined) return;
      else if (idx < intro) later.push(`**${c.name}**: data says ${chapterName(c.introducedInChapter)}, but the text has "${word}" in ${chapterName(chapters[idx].id)}`);
      else if (idx > intro) earlier.push(`**${c.name}**: data says ${chapterName(c.introducedInChapter)}, but "${word}" first appears in ${chapterName(chapters[idx].id)}`);
    });
    // Capitalised words that recur in the text but match no character, alias or location:
    // likely people (or places) the data is missing
    const known = new Set([
      ...characters.flatMap(c => nameTokens([c.name, ...(c.aliases || [])])),
      ...locations.flatMap(l => nameTokens([l.name]))
    ]);
    const COMMON = new Set(('The A An And But Or If In On At To Of For With From By As It Its He She His Her They Them Their We Our You Your I My Me ' +
      'This That These Those There Then When Where What Who Why How Yes No Not Mr Mrs Miss Sir Lady Lord Dr ' +
      'Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April May June July August September October November December ' +
      'God Christmas England English Britain British Germany German Germans London Europe Nazi Nazis War Chapter Well Oh Ah So Now Just All Some One Two ' +
      'After Before While Although Even Still Perhaps Maybe Good Thank Thanks Please Hello Right Okay OK Let Do Did Does Is Was Are Were Be Been Have Has Had ' +
      'Can Could Would Should Will Shall Might Must Very Much More Most Any Every Each Our Here Come Go Look See Yet Also Only Once Again Out Up').split(' '));
    const counts = new Map();
    texts.forEach(({ idx, text }) => {
      // Skip the first word of each sentence (capitalised anyway)
      const matches = text.matchAll(/(?<![.!?"“‘'\n]\s)(?<!^)\b([A-Z][a-z]{2,})\b/gm);
      for (const m of matches) {
        const word = m[1];
        if (COMMON.has(word) || known.has(word)) continue;
        const entry = counts.get(word) || { count: 0, first: idx };
        entry.count += 1;
        counts.set(word, entry);
      }
    });
    const unknownNames = [...counts.entries()]
      .filter(([, e]) => e.count >= 15)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 40)
      .map(([word, e]) => `"${word}": ${e.count} mentions, first in ${chapterName(chapters[e.first].id)}`);

    textSummary = `${texts.length} chapter texts read from \`${args.text}\`.`;
    section('Characters introduced later than the text names them',
      'The text names these characters before the chapter the data introduces them in. Usually the data should be moved earlier (a first mention counts as an introduction).',
      later);
    section('Characters introduced earlier than the text names them',
      'The data introduces these characters before the text names them, which can be a spoiler. Some may be referred to without their name at first.',
      earlier);
    section('Names in the text that the data does not cover',
      'Capitalised words (not starting a sentence) used at least 15 times that match no character, alias or location. Some will be ordinary words or places; the rest are candidates for missing characters or aliases.',
      unknownNames);
    section('Characters not found in the text',
      'Possibly a misspelt name, a name the text never uses, or a character that is not in this book. Matching uses whole words from the name and aliases, ignoring titles.',
      notFound);
  }

  // Report
  const title = book.bookMetadata.title || args.book;
  const lines = [
    `# Data review: ${title}`,
    '',
    `Generated by \`node scripts/data-report.mjs --book ${args.book}${args.text ? ` --text "${args.text}"` : ''}\`.`,
    'Advisory: each item is something to check, not necessarily a mistake.',
    '',
    '| Data | Count |',
    '| --- | --- |',
    ...[['Chapters', chapters], ['Characters', characters], ['Relationships', book.relationships], ['Events', events],
      ['Locations', locations], ['Objects', objects], ['Mysteries', mysteryElements], ['Themes', themeElements],
      ['Encyclopedia entries', spycraftEntries]].map(([label, items]) => `| ${label} | ${items.length} |`),
    '',
    ...(textSummary ? [textSummary, ''] : []),
    '## Summary',
    '',
    ...sections.map(s => `- ${s.title}: ${s.rows.length === 0 ? 'nothing found' : `**${s.rows.length}**`}`),
    ''
  ];
  sections.forEach((s) => {
    lines.push(`## ${s.title}`, '', s.intro, '');
    if (s.rows.length === 0) lines.push('Nothing found.', '');
    else lines.push(...s.rows.map(r => `- [ ] ${r}`), '');
  });
  const markdown = lines.join('\n');

  if (args.out) {
    const outPath = path.resolve(projectRoot, args.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, markdown);
    console.log(`Wrote ${path.relative(projectRoot, outPath)}`);
    sections.forEach(s => console.log(`  ${s.title}: ${s.rows.length}`));
  } else {
    console.log(markdown);
  }
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

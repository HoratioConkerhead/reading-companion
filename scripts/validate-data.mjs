/* eslint-disable no-console */
// ESM Node script to validate data integrity for all books
// Run with: node scripts/validate-data.mjs

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const importFromRoot = async (relPath) => {
  const full = path.resolve(projectRoot, relPath);
  return await import(pathToFileURL(full).href);
};

const toSet = (arr) => new Set(arr);

const logHeader = (title) => {
  console.log(`\n=== ${title} ===`);
};

const warn = (msg) => console.warn(`WARN: ${msg}`);
const error = (msg) => console.error(`ERROR: ${msg}`);

const earliestChapter = (candidates, chapters) => {
  const chapterIndex = new Map(chapters.map((c, i) => [c.id, i]));
  let best = null;
  let bestIdx = Number.POSITIVE_INFINITY;
  for (const id of candidates) {
    if (!id) continue;
    const idx = chapterIndex.has(id) ? chapterIndex.get(id) : Number.POSITIVE_INFINITY;
    if (idx < bestIdx) {
      best = id;
      bestIdx = idx;
    }
  }
  return best;
};

const validateBook = async (bookKey, bookModulePath) => {
  logHeader(`Validating book: ${bookKey}`);
  const mod = await importFromRoot(bookModulePath);

  // Support both default export style (stitchedUp) and individual exports
  const book = mod.stitchedUp
    ? mod.stitchedUp
    : {
        bookMetadata: mod.bookMetadata,
        characters: mod.characters,
        events: mod.events,
        locations: mod.locations,
        objects: mod.objects,
        relationships: mod.relationships,
        chapters: mod.chapters,
        timeline: mod.timeline || [],
        mysteryElements: mod.mysteryElements,
        themeElements: mod.themeElements,
        spycraftEntries: mod.spycraftEntries,
      };

  const problems = [];
  const suggestions = [];

  const characters = book.characters || [];
  const chapters = book.chapters || [];
  const relationships = book.relationships || [];

  const characterIds = toSet(characters.map(c => c.id));
  const chapterIds = toSet(chapters.map(c => c.id));

  // 1) Validate character relations reference existing characters
  characters.forEach(c => {
    const relations = Array.isArray(c.relations) ? c.relations : [];
    relations.forEach((rel, idx) => {
      if (!rel.characterId || !characterIds.has(rel.characterId)) {
        problems.push(`Character ${c.id} has relation[${idx}] to unknown id: ${rel.characterId}`);
      }
    });
  });

  // 2) Validate reciprocal relations and capture sides and metadata
  const pairToSides = new Map(); // key -> { aId, bId, byId: { [id]: rel } }
  characters.forEach(c => {
    const a = c.id;
    const relations = Array.isArray(c.relations) ? c.relations : [];
    relations.forEach(rel => {
      const b = rel.characterId;
      if (!b) return;
      const [id1, id2] = a < b ? [a, b] : [b, a];
      const key = `${id1}::${id2}`;
      const existing = pairToSides.get(key) || { aId: id1, bId: id2, byId: {} };
      existing.byId[a] = rel;
      pairToSides.set(key, existing);
    });
  });

  pairToSides.forEach((entry, key) => {
    const sides = new Set(Object.keys(entry.byId));
    if (sides.size !== 2) {
      problems.push(`Relation not reciprocal for pair ${key}`);
      const missingId = sides.has(entry.aId) ? entry.bId : entry.aId;
      // Suggest reciprocal stub
      suggestions.push({
        type: 'missingReciprocal',
        pair: key,
        suggestion: `{ characterId: '${missingId}', type: 'REPLACE_ME', description: 'Add reciprocal relation', introducedInChapter: 'CHAPTER_ID' }`,
      });
    }
  });

  // 3) Validate relationships edges reference existing characters
  relationships.forEach((rel, idx) => {
    if (!characterIds.has(rel.from) || !characterIds.has(rel.to)) {
      problems.push(`Edge[${idx}] references unknown ids: ${rel.from} -> ${rel.to}`);
    }
  });

  // 4) Check introducedInChapter values exist in chapters (characters, relations, edges)
  characters.forEach(c => {
    if (c.introducedInChapter && !chapterIds.has(c.introducedInChapter)) {
      problems.push(`Character ${c.id} has unknown introducedInChapter: ${c.introducedInChapter}`);
    }
    const relations = Array.isArray(c.relations) ? c.relations : [];
    relations.forEach((rel, idx) => {
      if (rel.introducedInChapter && !chapterIds.has(rel.introducedInChapter)) {
        problems.push(`Character ${c.id} relation[${idx}] has unknown introducedInChapter: ${rel.introducedInChapter}`);
      }
    });
  });
  relationships.forEach((rel, idx) => {
    if (rel.introducedInChapter && !chapterIds.has(rel.introducedInChapter)) {
      problems.push(`Edge[${idx}] has unknown introducedInChapter: ${rel.introducedInChapter}`);
    }
  });

  // 5) Duplicate character ids
  if (characterIds.size !== characters.length) {
    problems.push('Duplicate character IDs detected');
  }

  // 6) Suggestions for missing relation-level introducedInChapter
  pairToSides.forEach(({ aId, bId, byId }) => {
    const relA = byId[aId];
    const relB = byId[bId];
    const aChar = characters.find(c => c.id === aId) || {};
    const bChar = characters.find(c => c.id === bId) || {};

    // For each side missing introducedInChapter, suggest a value
    const candidatePool = [];
    if (relA?.introducedInChapter) candidatePool.push(relA.introducedInChapter);
    if (relB?.introducedInChapter) candidatePool.push(relB.introducedInChapter);
    if (aChar.introducedInChapter) candidatePool.push(aChar.introducedInChapter);
    if (bChar.introducedInChapter) candidatePool.push(bChar.introducedInChapter);
    const inferred = earliestChapter(candidatePool, chapters);

    if (relA && !relA.introducedInChapter) {
      suggestions.push({
        type: 'missingRelationIntroducedInChapter',
        side: aId,
        pair: `${aId}::${bId}`,
        suggestion: `For ${aId}→${bId}, add introducedInChapter: '${inferred || 'CHAPTER_ID'}'`,
      });
    }
    if (relB && !relB.introducedInChapter) {
      suggestions.push({
        type: 'missingRelationIntroducedInChapter',
        side: bId,
        pair: `${aId}::${bId}`,
        suggestion: `For ${bId}→${aId}, add introducedInChapter: '${inferred || 'CHAPTER_ID'}'`,
      });
    }
  });

  // Report
  if (problems.length === 0) {
    console.log('No problems found.');
  } else {
    problems.forEach(p => error(p));
  }

  if (suggestions.length > 0) {
    logHeader('Suggestions');
    suggestions.forEach(s => warn(`${s.type}: ${s.suggestion}`));
  }

  if (problems.length > 0) {
    process.exitCode = 1;
  }
};

const main = async () => {
  await validateBook('stitchedUp', 'src/data/MattParry_StitchedUp/index.js');
  await validateBook('stitchedUp_old', 'src/data/stitchedUp_old/index.js');
};

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});



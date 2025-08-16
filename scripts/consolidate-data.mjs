#!/usr/bin/env node
/**
 * Consolidate per-chapter extractions into final data files.
 *
 * Usage:
 *   node scripts/consolidate-data.mjs --book MattParry_StitchedUp [--overwrite]
 *
 * Inputs:
 *   src/data/<book>/extractions/chapter_XX.json files following docs/extraction_format.md
 *
 * Outputs:
 *   - By default: src/data/<book>/_generated/characters.js
 *   - With --overwrite: backup existing characters.js then write new characters.js
 *
 * Validation: Run `npm run validate:data` separately after generation.
 */

import fs from 'fs/promises';
import path from 'path';

function parseArgs(argv) {
  const args = { book: null, overwrite: false };
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--book') {
      args.book = argv[i + 1];
      i += 1;
    } else if (arg === '--overwrite') {
      args.overwrite = true;
    }
  }
  if (!args.book) {
    console.error('Error: --book <BookDirectoryName> is required (e.g., MattParry_StitchedUp)');
    process.exit(1);
  }
  return args;
}

function ensureLowerSnakeCase(id) {
  const normalized = id
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/gi, '_')
    .toLowerCase()
    .replace(/__+/g, '_')
    .replace(/^_+|_+$/g, '');
  return normalized;
}

function chapterSortKey(filename) {
  const match = filename.match(/chapter_(\d+)/i);
  if (!match) return 9999;
  return Number(match[1]);
}

function earliestChapter(chA, chB) {
  if (!chA) return chB;
  if (!chB) return chA;
  const a = Number((chA.match(/chapter_(\d+)/i) || [])[1] || 9999);
  const b = Number((chB.match(/chapter_(\d+)/i) || [])[1] || 9999);
  return a <= b ? chA : chB;
}

async function readJson(filePath) {
  const text = await fs.readFile(filePath, 'utf8');
  return JSON.parse(text);
}

function makeEmptyCharacter(id, name, introducedInChapter) {
  return {
    id,
    name: name || id.replace(/_/g, ' '),
    title: '',
    group: '',
    role: '',
    background: '',
    personality: '',
    traits: [],
    relations: [],
    development: [],
    aliases: [],
    fate: '',
    key_scenes: [],
    introducedInChapter: introducedInChapter || ''
  };
}

function writeCharactersModule(charactersArray) {
  const jsonLike = JSON.stringify(charactersArray, null, 2)
    .replace(/"(\w+)":/g, (m, p1) => `${p1}:`) // unquote keys for readability
    .replace(/"/g, "'" ); // single quotes to match project style
  return `export const characters = ${jsonLike}\n`;
}

async function backupFile(filePath) {
  try {
    const stat = await fs.stat(filePath);
    if (stat && stat.isFile()) {
      const dir = path.dirname(filePath);
      const base = path.basename(filePath, path.extname(filePath));
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      const backup = path.join(dir, `${base}_backup_${ts}.js`);
      await fs.copyFile(filePath, backup);
      return backup;
    }
  } catch {
    // ignore
  }
  return null;
}

async function main() {
  const { book, overwrite } = parseArgs(process.argv);

  const bookDir = path.join('src', 'data', book);
  const extractionsDir = path.join(bookDir, 'extractions');

  // Read all extraction files
  let files;
  try {
    files = await fs.readdir(extractionsDir);
  } catch (err) {
    console.error(`Error: Cannot read extractions at ${extractionsDir}. ${err.message}`);
    process.exit(1);
  }

  const chapterFiles = files
    .filter(f => f.toLowerCase().endsWith('.json'))
    .sort((a, b) => chapterSortKey(a) - chapterSortKey(b));

  if (chapterFiles.length === 0) {
    console.error(`No extraction files found in ${extractionsDir}`);
    process.exit(1);
  }

  // Aggregates
  const charactersById = new Map();
  const relations = []; // { aId, bId, aType, bType, description, introducedInChapter }

  for (const file of chapterFiles) {
    const chapterId = file.replace(/\.json$/i, ''); // e.g., chapter_01
    const full = path.join(extractionsDir, file);
    const data = await readJson(full);

    const chapterLabel = data.chapterId || chapterId;

    // Characters introduced in this chapter
    (data.charactersIntroduced || []).forEach(ch => {
      const id = ensureLowerSnakeCase(ch.id);
      const name = ch.name || ch.id;
      const existing = charactersById.get(id);
      if (!existing) {
        charactersById.set(id, makeEmptyCharacter(id, name, chapterLabel));
      } else {
        existing.introducedInChapter = earliestChapter(existing.introducedInChapter, chapterLabel);
        if (!existing.name || existing.name === existing.id.replace(/_/g, ' ')) {
          existing.name = name;
        }
      }
    });

    // Relations introduced in this chapter (symmetric, possibly asymmetric types)
    (data.relationsIntroduced || []).forEach(rel => {
      const aId = ensureLowerSnakeCase(rel.aId);
      const bId = ensureLowerSnakeCase(rel.bId);
      if (!aId || !bId || aId === bId) return;

      // Ensure both characters exist in the global set, even if introduced earlier/later
      if (!charactersById.has(aId)) charactersById.set(aId, makeEmptyCharacter(aId, rel.aName || aId, chapterLabel));
      if (!charactersById.has(bId)) charactersById.set(bId, makeEmptyCharacter(bId, rel.bName || bId, chapterLabel));

      relations.push({
        aId,
        bId,
        aType: rel.aToBType || 'associate',
        bType: rel.bToAType || 'associate',
        description: rel.description || '',
        introducedInChapter: chapterLabel
      });
    });
  }

  // Build character relations arrays with reciprocity and ordering constraints
  const characters = Array.from(charactersById.values());

  const chapterIndex = (ch) => Number((ch.match(/chapter_(\d+)/i) || [])[1] || 9999);

  function pushRelation(char, targetId, type, description, introducedInChapter) {
    if (!char.relations) char.relations = [];
    const exists = char.relations.some(r => r.characterId === targetId && r.type === type);
    if (!exists) {
      char.relations.push({
        characterId: targetId,
        type,
        description: description || '',
        introducedInChapter
      });
    }
  }

  relations.forEach(rel => {
    const a = charactersById.get(rel.aId);
    const b = charactersById.get(rel.bId);
    if (!a || !b) return;

    // Ensure relation intro is not earlier than either character intro
    let intro = rel.introducedInChapter;
    const introOrder = chapterIndex(intro);
    const minOrder = Math.max(chapterIndex(a.introducedInChapter || intro), chapterIndex(b.introducedInChapter || intro));
    if (introOrder < minOrder) {
      // bump to later chapter to satisfy constraint
      intro = chapterIndex(a.introducedInChapter) >= chapterIndex(b.introducedInChapter)
        ? a.introducedInChapter
        : b.introducedInChapter;
    }

    pushRelation(a, b.id, rel.aType, rel.description, intro);
    pushRelation(b, a.id, rel.bType, rel.description, intro);
  });

  // Sort characters by introducedInChapter then by name for stable output
  characters.sort((x, y) => {
    const cx = chapterIndex(x.introducedInChapter);
    const cy = chapterIndex(y.introducedInChapter);
    if (cx !== cy) return cx - cy;
    return (x.name || x.id).localeCompare(y.name || y.id);
  });

  // Sort each relations array by introducedInChapter then target id
  characters.forEach(c => {
    if (Array.isArray(c.relations)) {
      c.relations.sort((r1, r2) => {
        const c1 = chapterIndex(r1.introducedInChapter);
        const c2 = chapterIndex(r2.introducedInChapter);
        if (c1 !== c2) return c1 - c2;
        return r1.characterId.localeCompare(r2.characterId);
      });
    }
  });

  const outputContent = writeCharactersModule(characters);

  const outDir = overwrite ? bookDir : path.join(bookDir, '_generated');
  const outFile = path.join(outDir, 'characters.js');

  await fs.mkdir(outDir, { recursive: true });

  if (overwrite) {
    const liveFile = path.join(bookDir, 'characters.js');
    await backupFile(liveFile);
    await fs.writeFile(liveFile, outputContent, 'utf8');
    console.log(`Wrote ${liveFile}`);
  } else {
    await fs.writeFile(outFile, outputContent, 'utf8');
    console.log(`Wrote ${outFile}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});



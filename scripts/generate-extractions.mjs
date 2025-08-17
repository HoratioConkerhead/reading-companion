#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

function parseArgs(argv) {
  const args = { book: null, source: null };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--book') { args.book = argv[i + 1]; i += 1; }
    else if (a === '--source') { args.source = argv[i + 1]; i += 1; }
  }
  if (!args.book || !args.source) {
    console.error('Usage: node scripts/generate-extractions.mjs --book <BookDir> --source "books/Author - Title"');
    process.exit(1);
  }
  return args;
}

function toExtractionId(filename) {
  // Examples: "00 - PREFACE.txt", "01 - Chapter 1.txt", "51 - Epilogue.txt"
  const m = filename.match(/^(\d{2})\s+-\s+(.+?)\.txt$/i);
  if (!m) return null;
  const num = Number(m[1]);
  const title = m[2].trim();
  if (num === 0) return { chapterId: 'preface', number: num, title };
  if (num === 51) return { chapterId: 'epilogue', number: num, title };
  if (num >= 1 && num <= 50) return { chapterId: `chapter_${String(num).padStart(2, '0')}`, number: num, title };
  return null;
}

async function main() {
  const { book, source } = parseArgs(process.argv);
  const sourceDir = path.join(source);
  const outDir = path.join('src', 'data', book, 'extractions');
  await fs.mkdir(outDir, { recursive: true });

  let files = await fs.readdir(sourceDir);
  files = files.filter(f => /^[0-9]{2}\s+-\s+.+\.txt$/i.test(f)).sort();

  const templates = [];
  for (const f of files) {
    const info = toExtractionId(f);
    if (!info) continue;
    const fileName = `${info.chapterId}.json`;
    const template = {
      chapterId: info.chapterId,
      charactersIntroduced: [],
      relationsIntroduced: [],
      locationsIntroduced: [],
      eventsIntroduced: [],
      objectsIntroduced: [],
      timeline: []
    };
    templates.push({ name: fileName, json: JSON.stringify(template) });
  }

  for (const t of templates) {
    const target = path.join(outDir, t.name);
    await fs.writeFile(target, t.json, 'utf8');
    console.log(`Wrote ${target}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});




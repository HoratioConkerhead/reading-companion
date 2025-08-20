// Utilities for deriving relationship edges from character relations

/**
 * Build unique, symmetric edges from characters[].relations.
 * - Combines asymmetric relation types into a hyphenated label
 * - Picks introducedInChapter from relation-level values if present, else earliest character intro
 *
 * @param {Array} charactersList - Array of character objects with `id`, `introducedInChapter`, and `relations`
 * @param {Array} chaptersList - Array of chapter objects with `id`
 * @returns {Array} relationships - Array of { from, to, type, introducedInChapter }
 */
export const deriveRelationshipsFromCharacters = (charactersList, chaptersList = []) => {
  const pairKeyToEntry = new Map();
  const characterById = new Map(charactersList.map(c => [c.id, c]));

  charactersList.forEach(character => {
    const relations = Array.isArray(character.relations) ? character.relations : [];
    relations.forEach(rel => {
      const targetId = rel.characterId;
      if (!targetId) return;

      const a = character.id;
      const b = targetId;
      const [id1, id2] = a < b ? [a, b] : [b, a];
      const key = `${id1}::${id2}`;

      const existing = pairKeyToEntry.get(key) || { id1, id2, byId: {} };
      existing.byId[a] = rel;
      pairKeyToEntry.set(key, existing);
    });
  });

  const getChapterIndex = (chapterId) => {
    if (!chapterId || !Array.isArray(chaptersList) || chaptersList.length === 0) return -1;
    return chaptersList.findIndex(ch => ch.id === chapterId);
  };

  const result = [];
  pairKeyToEntry.forEach(entry => {
    const { id1, id2, byId } = entry;
    const rel1 = byId[id1];
    const rel2 = byId[id2];

    // Build type label from both sides when available
    const typeParts = [];
    if (rel1 && rel1.type) typeParts.push(rel1.type);
    if (rel2 && rel2.type && rel2.type !== rel1?.type) typeParts.push(rel2.type);
    const type = typeParts.length > 0 ? typeParts.join('-') : 'related';

    // Determine introducedInChapter correctly:
    // 1) Prefer relation-level introduced chapters (earliest among them if both sides provide one)
    // 2) If none provided, fallback to earliest known character introduction between the pair
    const pickEarliest = (candidates) => {
      return candidates.reduce((earliest, candidate) => {
        if (!candidate) return earliest;
        const aIdx = getChapterIndex(candidate);
        if (aIdx === -1) return earliest;
        if (!earliest) return candidate;
        const bIdx = getChapterIndex(earliest);
        if (bIdx === -1) return candidate;
        return aIdx < bIdx ? candidate : earliest;
      }, null);
    };

    const relationLevelIntroduced = [rel1?.introducedInChapter, rel2?.introducedInChapter].filter(Boolean);
    let introducedInChapter = null;
    if (relationLevelIntroduced.length > 0) {
      introducedInChapter = pickEarliest(relationLevelIntroduced);
    } else {
      const charIntro1 = characterById.get(id1)?.introducedInChapter;
      const charIntro2 = characterById.get(id2)?.introducedInChapter;
      introducedInChapter = pickEarliest([charIntro1, charIntro2]);
    }

    // Derive general category from combined type
    const category = toRelationshipCategory(type);

    result.push({ from: id1, to: id2, type, category, introducedInChapter });
  });

  return result;
};

/**
 * Map a specific relationship type string to a general category label
 * Categories align with legend and coloring: 'Spouse', 'Handler/Asset', 'Conspirator/Enemy',
 * 'Colleague/Partner', 'Superior/Subordinate', 'Friend', 'Informant/Double-Agent', 'Other'
 */
export const toRelationshipCategory = (type) => {
  const t = (type || '').toLowerCase();
  if (t.includes('spouse')) return 'Spouse';
  if (t.includes('handler') || t.includes('asset')) return 'Handler/Asset';
  if (t.includes('conspirator') || t.includes('enemy') || t.includes('target') || t.includes('victim')) return 'Conspirator/Enemy';
  if (t.includes('colleague') || t.includes('partner')) return 'Colleague/Partner';
  if (t.includes('superior') || t.includes('subordinate')) return 'Superior/Subordinate';
  if (t.includes('friend')) return 'Friend';
  if (t.includes('informant') || t.includes('double-agent')) return 'Informant/Double-Agent';
  return 'Other';
};



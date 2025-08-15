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

    // Determine introducedInChapter: prefer relation-level, fallback to earliest character intro
    const introducedCandidates = [];
    if (rel1?.introducedInChapter) introducedCandidates.push(rel1.introducedInChapter);
    if (rel2?.introducedInChapter) introducedCandidates.push(rel2.introducedInChapter);
    const charIntro1 = characterById.get(id1)?.introducedInChapter;
    const charIntro2 = characterById.get(id2)?.introducedInChapter;
    if (charIntro1) introducedCandidates.push(charIntro1);
    if (charIntro2) introducedCandidates.push(charIntro2);

    let introducedInChapter = null;
    if (introducedCandidates.length > 0) {
      introducedInChapter = introducedCandidates.reduce((earliest, candidate) => {
        if (!candidate) return earliest;
        if (!earliest) return candidate;
        const aIdx = getChapterIndex(candidate);
        const bIdx = getChapterIndex(earliest);
        if (aIdx === -1 && bIdx === -1) return earliest; // neither known in chapters list
        if (aIdx === -1) return earliest;
        if (bIdx === -1) return candidate;
        return aIdx < bIdx ? candidate : earliest;
      }, null);
    }

    result.push({ from: id1, to: id2, type, introducedInChapter });
  });

  return result;
};



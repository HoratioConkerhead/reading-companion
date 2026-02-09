// Generic chapter-based filtering utility

/**
 * Filter items by chapter, keeping only those introduced at or before the target chapter.
 * @param {Array} items - Array of data items to filter
 * @param {Array} chapters - Array of chapter objects with `id`
 * @param {string|null} chapterFilterId - The chapter ID to filter up to, or null for no filter
 * @param {Function} getIntroducedChapter - Function to extract the introducedInChapter value from an item
 * @returns {Array} Filtered items
 */
export const filterByChapter = (items, chapters, chapterFilterId, getIntroducedChapter) => {
  if (!chapterFilterId) return items;

  const getChapterIndex = (id) => {
    if (!id) return -1;
    return chapters.findIndex(ch => ch.id === id);
  };

  const targetIdx = getChapterIndex(chapterFilterId);
  if (targetIdx === -1) return items;

  return (items || []).filter(item => {
    const intro = getIntroducedChapter(item);
    if (!intro) return true;
    const idx = getChapterIndex(intro);
    if (idx === -1) return true;
    return idx <= targetIdx;
  });
};

/**
 * Filter relationships by chapter, using relation-level or character-level intro chapters.
 * @param {Array} relationships - Array of relationship objects
 * @param {Array} characters - Array of character objects
 * @param {Array} chapters - Array of chapter objects with `id`
 * @param {string|null} chapterFilterId - The chapter ID to filter up to, or null for no filter
 * @returns {Array} Filtered relationships
 */
export const filterRelationshipsByChapter = (relationships, characters, chapters, chapterFilterId) => {
  if (!chapterFilterId) return relationships;

  const getChapterIndex = (id) => {
    if (!id) return -1;
    return chapters.findIndex(ch => ch.id === id);
  };

  const targetIdx = getChapterIndex(chapterFilterId);
  if (targetIdx === -1) return relationships;

  const introIdxByChar = new Map(
    (characters || []).map(c => [c.id, getChapterIndex(c.introducedInChapter)])
  );

  return (relationships || []).filter(rel => {
    let relIdx = -1;
    if (rel.introducedInChapter) {
      relIdx = getChapterIndex(rel.introducedInChapter);
    } else {
      const a = introIdxByChar.get(rel.from) ?? -1;
      const b = introIdxByChar.get(rel.to) ?? -1;
      const cand = [a, b].filter(v => v !== -1);
      relIdx = cand.length ? Math.min(...cand) : -1;
    }
    if (relIdx === -1) return false;
    return relIdx <= targetIdx;
  });
};

/**
 * Filter events by chapter, checking introducedInChapter, chapter event lists, or event.chapter.
 * @param {Array} events - Array of event objects
 * @param {Array} chapters - Array of chapter objects with `id` and `events`
 * @param {string|null} chapterFilterId - The chapter ID to filter up to, or null for no filter
 * @returns {Array} Filtered events
 */
export const filterEventsByChapter = (events, chapters, chapterFilterId) => {
  if (!chapterFilterId) return events;

  const getChapterIndex = (id) => {
    if (!id) return -1;
    return chapters.findIndex(ch => ch.id === id);
  };

  const targetIdx = getChapterIndex(chapterFilterId);
  if (targetIdx === -1) return events;

  const chapterIndexByEventId = new Map();
  chapters.forEach((ch, idx) => {
    (ch.events || []).forEach(eid => {
      if (!chapterIndexByEventId.has(eid)) chapterIndexByEventId.set(eid, idx);
    });
  });

  return (events || []).filter(ev => {
    let idx = -1;
    if (ev.introducedInChapter) idx = getChapterIndex(ev.introducedInChapter);
    else if (chapterIndexByEventId.has(ev.id)) idx = chapterIndexByEventId.get(ev.id);
    else if (ev.chapter) idx = getChapterIndex(String(ev.chapter));
    if (idx === -1) return true;
    return idx <= targetIdx;
  });
};

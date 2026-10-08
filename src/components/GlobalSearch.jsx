import React, { useState, useEffect, useRef, useMemo } from 'react';

const MAX_RESULTS_PER_GROUP = 6;

// Rank: name starts with the query, then name contains it, then other text does
const rank = (query, name, otherText) => {
  const q = query.toLowerCase();
  const n = (name || '').toLowerCase();
  if (n.startsWith(q)) return 0;
  if (n.includes(q)) return 1;
  if ((otherText || '').toLowerCase().includes(q)) return 2;
  return -1;
};

const searchGroup = (query, items, getName, getOther) => items
  .map(item => ({ item, score: rank(query, getName(item), getOther(item)) }))
  .filter(r => r.score !== -1)
  .sort((a, b) => a.score - b.score || getName(a.item).localeCompare(getName(b.item)))
  .slice(0, MAX_RESULTS_PER_GROUP)
  .map(r => r.item);

/**
 * Search across the book's characters, events, locations, objects and encyclopedia
 * entries. It is given the chapter-filtered data, so it never reveals spoilers.
 */
const GlobalSearch = ({
  isOpen,
  onClose,
  darkMode,
  characters = [],
  events = [],
  locations = [],
  objects = [],
  encyclopediaEntries = [],
  encyclopediaLabel = 'Encyclopedia',
  onSelectCharacter,
  onSelectEvent,
  onSelectLocation,
  onSelectObject,
  onSelectEncyclopediaEntry
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      // Focus after the dialog renders
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const groups = useMemo(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    return [
      {
        label: 'Characters',
        results: searchGroup(q, characters, c => c.name, c => [...(c.aliases || []), c.role, c.group].join(' '))
          .map(c => ({ key: `c-${c.id}`, title: c.name, subtitle: c.role, onSelect: () => onSelectCharacter(c) }))
      },
      {
        label: 'Events',
        results: searchGroup(q, events, e => e.title, e => `${e.description || ''} ${e.date || ''}`)
          .map(e => ({ key: `e-${e.id}`, title: e.title, subtitle: e.date, onSelect: () => onSelectEvent(e) }))
      },
      {
        label: 'Locations',
        results: searchGroup(q, locations, l => l.name, l => `${l.description || ''} ${l.area || ''} ${l.region || ''}`)
          .map(l => ({ key: `l-${l.id}`, title: l.name, subtitle: l.area || l.region || l.type, onSelect: () => onSelectLocation(l) }))
      },
      {
        label: 'Objects',
        results: searchGroup(q, objects, o => o.name, o => o.description)
          .map(o => ({ key: `o-${o.id}`, title: o.name, subtitle: o.type, onSelect: () => onSelectObject(o) }))
      },
      {
        label: encyclopediaLabel,
        results: searchGroup(q, encyclopediaEntries, e => e.title, e => e.description)
          .map(e => ({ key: `s-${e.id}`, title: e.title, subtitle: e.category, onSelect: () => onSelectEncyclopediaEntry(e) }))
      }
    ].filter(group => group.results.length > 0);
  }, [query, characters, events, locations, objects, encyclopediaEntries, encyclopediaLabel,
    onSelectCharacter, onSelectEvent, onSelectLocation, onSelectObject, onSelectEncyclopediaEntry]);

  const flatResults = groups.flatMap(g => g.results);

  const choose = (result) => {
    result.onSelect();
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatResults[activeIndex]) {
      choose(flatResults[activeIndex]);
    }
  };

  if (!isOpen) return null;

  let resultIndex = -1;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`relative w-full max-w-lg rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <div className={`flex items-center gap-2 px-4 py-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <svg className="w-5 h-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="flex-1 min-w-0 bg-transparent outline-none text-base"
            placeholder="Search characters, events, places…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={handleKeyDown}
            aria-label="Search the book"
          />
          <button
            className={`px-2 py-1 text-sm rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <p className="px-4 py-6 text-sm text-gray-500">Type at least two letters. Only things up to your chosen chapter are searched.</p>
          ) : groups.length === 0 ? (
            <p className="px-4 py-6 text-sm text-gray-500">No matches up to your chosen chapter.</p>
          ) : (
            groups.map(group => (
              <div key={group.label} className="py-2">
                <div className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{group.label}</div>
                {group.results.map(result => {
                  resultIndex += 1;
                  const isActive = resultIndex === activeIndex;
                  const index = resultIndex;
                  return (
                    <button
                      key={result.key}
                      className={`w-full text-left px-4 py-2 ${isActive ? (darkMode ? 'bg-gray-800' : 'bg-blue-50') : ''} ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-50'}`}
                      onClick={() => choose(result)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div className="font-medium">{result.title}</div>
                      {result.subtitle && <div className="text-sm text-gray-500 truncate">{result.subtitle}</div>}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;

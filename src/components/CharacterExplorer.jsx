import React, { useState, useEffect, useRef } from 'react';
import { itemText, visibleItems } from '../utils/chapterItems';

const CharacterExplorer = ({ 
  onCharacterSelect, 
  selectedCharacter,
  charactersData,
  relationshipsData,
  groupStyles = {},
  groups = [],
  chaptersData = [],
  chapterFilterId = null
}) => {
  // With a "show up to" chapter set, hide details that describe the rest of the book
  const isFiltered = Boolean(chapterFilterId);
  // Only show a profile for a character the reader has met
  const profile = selectedCharacter && charactersData.some(c => c.id === selectedCharacter.id)
    ? charactersData.find(c => c.id === selectedCharacter.id)
    : null;

  // On phones the profile is below the list: bring it into view when a character is chosen
  const profileRef = useRef(null);
  useEffect(() => {
    if (!profile || !profileRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 767px)').matches) {
      profileRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [profile?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const [searchQuery, setSearchQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Filter and sort characters
  const filteredCharacters = charactersData.filter(character => {
    // Filter by search query
    const matchesSearch = 
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (character.role && character.role.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by group
    const matchesGroup = groupFilter === 'all' || character.group === groupFilter;
    
    return matchesSearch && matchesGroup;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'importance') {
      // Sort by presumed importance based on data completeness
      const aImportance = (a.relations?.length || 0) + (a.development?.length || 0);
      const bImportance = (b.relations?.length || 0) + (b.development?.length || 0);
      return bImportance - aImportance;
    }
    return 0;
  });
  
  // Relationships up to the reader's chapter (relationshipsData is already filtered),
  // described from this character's side where their own relations say how
  const getCharacterRelationships = (characterId) => {
    const ownRelations = charactersData.find(c => c.id === characterId)?.relations || [];
    const seen = new Set();
    return relationshipsData
      .filter(rel => rel.from === characterId || rel.to === characterId)
      .map(rel => {
        const otherId = rel.from === characterId ? rel.to : rel.from;
        const own = ownRelations.find(r => r.characterId === otherId);
        return { characterId: otherId, type: own?.type || rel.type, description: own?.description };
      })
      .filter(rel => (seen.has(rel.characterId) ? false : seen.add(rel.characterId)));
  };

  // development is a list of { phase, description, chapter? } (or plain strings in older
  // data). Entries with a chapter are shown up to the reader's chapter; without chapters,
  // only the first entry is shown while filtering, since the rest may be spoilers.
  const visibleDevelopment = (development) => {
    if (!Array.isArray(development)) return [];
    if (!isFiltered) return development;
    const hasChapters = development.some(dev => dev && typeof dev === 'object' && dev.chapter);
    return hasChapters ? visibleItems(development, chaptersData, chapterFilterId) : development.slice(0, 1);
  };

  return (
    <div className="character-explorer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 max-h-[60vh] md:max-h-none md:h-screen overflow-y-auto md:pr-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Character List</h2>
          
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search characters..." 
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mb-4 flex flex-wrap gap-2">
            <button 
              className={`px-3 py-1 text-sm rounded transition-colors ${
                groupFilter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setGroupFilter('all')}
            >
              All
            </button>
            {/* One button per character group in the book that has characters to show */}
            {groups.filter(group => charactersData.some(c => c.group === group.name)).map(group => (
              <button
                key={group.name}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  groupFilter === group.name
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setGroupFilter(group.name)}
                title={group.description || undefined}
              >
                {group.name}
              </button>
            ))}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sort by</label>
            <select 
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="importance">Importance</option>
            </select>
          </div>
          
          <div className="space-y-2">
            {filteredCharacters.map(character => (
              <div 
                key={character.id}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedCharacter?.id === character.id 
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => onCharacterSelect(character)}
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100">{character.name}</h3>
                <div className="flex flex-wrap mt-1 gap-1">
                  <span className={`text-xs px-2 py-1 rounded ${groupStyles[character.group] || 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                    {character.group}
                  </span>
                  {character.title && (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {character.title}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                  {character.role || "Unknown role"}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Character Details Panel */}
        <div className="md:col-span-2">
          {profile ? (
            <div ref={profileRef} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 scroll-mt-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{profile.name}</h2>
                  {profile.title && (
                    <p className="text-lg text-gray-600 dark:text-gray-400">{profile.title}</p>
                  )}
                  <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${groupStyles[profile.group] || 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                    {profile.group}
                  </span>
                  {!isFiltered && Array.isArray(profile.aliases) && profile.aliases.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Also known as: {profile.aliases.join(', ')}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Basic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Role:</span>
                      <span className="ml-2 text-gray-900 dark:text-gray-100">{profile.role || "Unknown"}</span>
                    </div>
                    {[['Description', profile.description], ['Background', profile.background], ['Personality', profile.personality]]
                      .filter(([, text]) => typeof text === 'string' && text.trim())
                      .map(([label, text]) => (
                        <div key={label}>
                          <span className="font-medium text-gray-700 dark:text-gray-300">{label}:</span>
                          <p className="mt-1 text-gray-900 dark:text-gray-100">{text}</p>
                        </div>
                      ))}
                    {Array.isArray(profile.traits) && profile.traits.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {profile.traits.map(trait => (
                          <span key={trait} className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{trait}</span>
                        ))}
                      </div>
                    )}
                    {visibleDevelopment(profile.development).length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Character Development:</span>
                        <ul className="mt-1 list-disc list-inside text-gray-900 dark:text-gray-100">
                          {visibleDevelopment(profile.development).map((dev, index) => (
                            <li key={index}>{itemText(dev)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {isFiltered && visibleDevelopment(profile.development).length < (profile.development?.length || 0) && (
                      <p className="mt-1 text-sm italic text-gray-500 dark:text-gray-400">Later development is hidden while you're reading up to a chapter.</p>
                    )}
                    {!isFiltered && typeof profile.fate === 'string' && profile.fate.trim() && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Fate:</span>
                        <p className="mt-1 text-gray-900 dark:text-gray-100">{profile.fate}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Relationships */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Relationships</h3>
                  {(() => {
                    const relationships = getCharacterRelationships(profile.id);
                    if (relationships.length === 0) {
                      return <p className="text-gray-500 dark:text-gray-400">No relationships found.</p>;
                    }
                    
                    return (
                      <div className="space-y-2">
                        {relationships.map((rel) => {
                          const relatedCharacter = charactersData.find(c => c.id === rel.characterId);
                          if (!relatedCharacter) return null;
                          
                          return (
                            <button
                              key={rel.characterId}
                              className="w-full text-left p-2 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              onClick={() => onCharacterSelect(relatedCharacter)}
                            >
                              <div className="font-medium text-gray-900 dark:text-gray-100">{relatedCharacter.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{rel.type}</div>
                              {rel.description && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{rel.description}</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">Select a character to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterExplorer;
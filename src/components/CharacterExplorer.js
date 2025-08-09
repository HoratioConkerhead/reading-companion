import React, { useState, useEffect } from 'react';

const CharacterExplorer = ({ 
  onCharacterSelect, 
  selectedCharacter,
  charactersData,
  relationshipsData 
}) => {
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
  
  // Get character relationships
  const getCharacterRelationships = (characterId) => {
    // Direct relationships from character's own data
    const directRelations = charactersData.find(c => c.id === characterId)?.relations || [];
    
    // Relationships from the relationships data
    const fromRelations = relationshipsData
      .filter(rel => rel.from === characterId)
      .map(rel => ({
        characterId: rel.to,
        type: rel.type
      }));
      
    const toRelations = relationshipsData
      .filter(rel => rel.to === characterId)
      .map(rel => ({
        characterId: rel.from,
        type: rel.type
      }));
    
    // Combine all relationships, removing duplicates
    const allRelations = [...directRelations, ...fromRelations, ...toRelations];
    const uniqueRelations = allRelations.filter((rel, index, self) => 
      index === self.findIndex((r) => r.characterId === rel.characterId)
    );
    
    return uniqueRelations;
  };
  
  return (
    <div className="character-explorer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-screen overflow-y-auto pr-4">
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
          
          <div className="mb-4 flex space-x-2">
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
            <button 
              className={`px-3 py-1 text-sm rounded transition-colors ${
                groupFilter === 'Protagonists' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setGroupFilter('Protagonists')}
            >
              Protagonists
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded transition-colors ${
                groupFilter === 'Fifth Columnists' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setGroupFilter('Fifth Columnists')}
            >
              Fifth Columnists
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded transition-colors ${
                groupFilter === 'German Connection' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setGroupFilter('German Connection')}
            >
              German Connection
            </button>
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
                  <span className={`text-xs px-2 py-1 rounded ${getGroupColor(character.group)}`}>
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
          {selectedCharacter ? (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedCharacter.name}</h2>
                  {selectedCharacter.title && (
                    <p className="text-lg text-gray-600 dark:text-gray-400">{selectedCharacter.title}</p>
                  )}
                  <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${getGroupColor(selectedCharacter.group)}`}>
                    {selectedCharacter.group}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Basic Information</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Role:</span>
                      <span className="ml-2 text-gray-900 dark:text-gray-100">{selectedCharacter.role || "Unknown"}</span>
                    </div>
                    {selectedCharacter.description && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Description:</span>
                        <p className="mt-1 text-gray-900 dark:text-gray-100">{selectedCharacter.description}</p>
                      </div>
                    )}
                    {selectedCharacter.development && selectedCharacter.development.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Character Development:</span>
                        <ul className="mt-1 list-disc list-inside text-gray-900 dark:text-gray-100">
                          {selectedCharacter.development.map((dev, index) => (
                            <li key={index}>{dev}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Relationships */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Relationships</h3>
                  {(() => {
                    const relationships = getCharacterRelationships(selectedCharacter.id);
                    if (relationships.length === 0) {
                      return <p className="text-gray-500 dark:text-gray-400">No relationships found.</p>;
                    }
                    
                    return (
                      <div className="space-y-2">
                        {relationships.map((rel, index) => {
                          const relatedCharacter = charactersData.find(c => c.id === rel.characterId);
                          if (!relatedCharacter) return null;
                          
                          return (
                            <div key={index} className="p-2 border border-gray-200 dark:border-gray-700 rounded">
                              <div className="font-medium text-gray-900 dark:text-gray-100">{relatedCharacter.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{rel.type}</div>
                            </div>
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

// Helper function to get the CSS class for a character group
const getGroupColor = (group) => {
  switch (group) {
    case 'Protagonists':
      return 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200';
    case 'Fifth Columnists':
      return 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200';
    case 'German Connection':
      return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200';
    default:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

export default CharacterExplorer;
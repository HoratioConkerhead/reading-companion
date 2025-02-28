import React, { useState, useEffect } from 'react';
import { charactersData, relationshipsData } from '../data/mockData';

const CharacterExplorer = ({ onCharacterSelect, selectedCharacter }) => {
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
          <h2 className="text-xl font-bold mb-4">Character List</h2>
          
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search characters..." 
              className="w-full p-2 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mb-4 flex space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded ${groupFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setGroupFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${groupFilter === 'Protagonists' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setGroupFilter('Protagonists')}
            >
              Protagonists
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${groupFilter === 'Fifth Columnists' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setGroupFilter('Fifth Columnists')}
            >
              Fifth Columnists
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${groupFilter === 'German Connection' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setGroupFilter('German Connection')}
            >
              Germans
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select 
              className="w-full p-2 border rounded"
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
                className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${selectedCharacter?.id === character.id ? 'bg-blue-100 border-blue-300' : ''}`}
                onClick={() => onCharacterSelect(character)}
              >
                <h3 className="font-bold">{character.name}</h3>
                <div className="flex flex-wrap mt-1 gap-1">
                  <span className={`text-xs px-2 py-1 rounded ${getGroupColor(character.group)}`}>
                    {character.group}
                  </span>
                  {character.title && (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200">
                      {character.title}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1 truncate">
                  {character.role || "Unknown role"}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 border-l pl-6">
          {selectedCharacter ? (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCharacter.name}</h2>
                  {selectedCharacter.title && <p className="text-gray-600 italic">{selectedCharacter.title}</p>}
                  <div className="flex mt-2">
                    <span className={`text-sm px-2 py-1 rounded ${getGroupColor(selectedCharacter.group)}`}>
                      {selectedCharacter.group}
                    </span>
                  </div>
                </div>
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Background</h3>
                  <p>{selectedCharacter.background || "No background information available."}</p>
                  
                  <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Personality</h3>
                  <p>{selectedCharacter.personality || "No personality information available."}</p>
                  
                  {selectedCharacter.traits && selectedCharacter.traits.length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Key Traits</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCharacter.traits.map((trait, index) => (
                          <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {selectedCharacter.aliases && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Aliases & Disguises</h3>
                      <ul className="list-disc pl-5">
                        {selectedCharacter.aliases.map((alias, index) => (
                          <li key={index}>{alias}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Role</h3>
                  <p>{selectedCharacter.role || "No role information available."}</p>
                  
                  {getCharacterRelationships(selectedCharacter.id).length > 0 && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Key Relationships</h3>
                      <div className="space-y-2">
                        {getCharacterRelationships(selectedCharacter.id).map((relation, index) => {
                          const relatedCharacter = charactersData.find(c => c.id === relation.characterId);
                          if (!relatedCharacter) return null;
                          
                          return (
                            <div 
                              key={index} 
                              className="border-l-4 border-blue-300 pl-3 cursor-pointer hover:bg-blue-50"
                              onClick={() => onCharacterSelect(relatedCharacter)}
                            >
                              <div className="font-medium">{relatedCharacter.name}</div>
                              <div className="text-sm text-gray-600">{relation.type || relation.description || "Relationship"}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                  
                  {selectedCharacter.fate && (
                    <>
                      <h3 className="font-bold text-lg border-b pb-2 mb-2 mt-4">Fate</h3>
                      <p>{selectedCharacter.fate}</p>
                    </>
                  )}
                </div>
              </div>
              
              {selectedCharacter.development && selectedCharacter.development.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Character Development</h3>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-8 w-1 bg-gray-300"></div>
                    <div className="space-y-6">
                      {selectedCharacter.development.map((arc, index) => (
                        <div key={index} className="relative flex">
                          <div className="flex-shrink-0 w-16 text-right">
                            <div className="h-8 w-8 bg-blue-500 rounded-full z-10 relative flex items-center justify-center text-white">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-grow ml-4 pt-1">
                            <h4 className="font-medium">{arc.phase}</h4>
                            <p className="text-gray-600">{arc.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedCharacter.key_scenes && (
                <div className="mt-6">
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">Key Scenes</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCharacter.key_scenes.map((sceneId, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                        {formatSceneId(sceneId)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Select a character from the list to view details</p>
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
      return 'bg-blue-200 text-blue-800';
    case 'Fifth Columnists':
      return 'bg-red-200 text-red-800';
    case 'German Connection':
      return 'bg-yellow-200 text-yellow-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

// Helper function to format scene IDs into readable text
const formatSceneId = (sceneId) => {
  return sceneId
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default CharacterExplorer;


import React, { useState } from 'react';
import { charactersData, relationshipsData } from '../data/mockData';

const RelationshipWeb = ({ onCharacterSelect, selectedCharacter }) => {
  const [groupFilter, setGroupFilter] = useState('all');
  const [relationshipTypeFilter, setRelationshipTypeFilter] = useState('all');
  
  // Extract unique relationship types for filter dropdown
  const relationshipTypes = Array.from(new Set(relationshipsData.map(rel => rel.type)));
  
  // Filter characters based on group selection
  const filteredCharacters = charactersData.filter(char => {
    if (groupFilter === 'all') return true;
    return char.group === groupFilter;
  });
  
  // Filter relationships based on filters
  const filteredRelationships = relationshipsData.filter(rel => {
    // Get the characters at both ends of the relationship
    const sourceChar = charactersData.find(c => c.id === rel.from);
    const targetChar = charactersData.find(c => c.id === rel.to);
    
    // Check if both characters match the group filter
    const sourceMatchesGroup = groupFilter === 'all' || sourceChar?.group === groupFilter;
    const targetMatchesGroup = groupFilter === 'all' || targetChar?.group === groupFilter;
    
    // If we're filtering by group, at least one end of the relationship must match
    const matchesGroup = groupFilter === 'all' || (sourceMatchesGroup || targetMatchesGroup);
    
    // Check if relationship type matches filter
    const matchesType = relationshipTypeFilter === 'all' || rel.type.includes(relationshipTypeFilter);
    
    return matchesGroup && matchesType;
  });
  
  // Get character name from ID
  const getCharacterName = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    return character ? character.name : characterId;
  };
  
  // Handle character click
  const handleCharacterClick = (character) => {
    onCharacterSelect(character);
  };
  
  // Get color for a character group
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
  
  // Helper function to format relationship types for display
  const formatRelationshipType = (type) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' - ');
  };
  
  return (
    <div className="relationship-web">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Character Relationship Explorer</h2>
        <p className="text-gray-600 mb-4">
          Explore the connections between characters in "Stitched Up". Select characters to view their details and relationships.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Group</label>
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 text-sm rounded ${groupFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setGroupFilter('all')}
              >
                All Groups
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
                German Connection
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Relationship Type</label>
            <select 
              className="w-full p-2 border rounded"
              value={relationshipTypeFilter}
              onChange={(e) => setRelationshipTypeFilter(e.target.value)}
            >
              <option value="all">All Relationships</option>
              {relationshipTypes.map(type => (
                <option key={type} value={type}>{formatRelationshipType(type)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Character List */}
        <div>
          <h3 className="font-bold text-lg mb-3">Characters</h3>
          <div className="h-96 overflow-y-auto pr-2 space-y-2">
            {filteredCharacters.map(character => (
              <div 
                key={character.id}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${selectedCharacter?.id === character.id ? 'bg-blue-100 border-blue-300' : ''}`}
                onClick={() => handleCharacterClick(character)}
              >
                <h4 className="font-bold">{character.name}</h4>
                <div className={`inline-block text-xs px-2 py-1 rounded mt-1 ${getGroupColor(character.group)}`}>
                  {character.group}
                </div>
                <div className="text-sm text-gray-600 mt-1">{character.role}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Relationships List */}
        <div className="md:col-span-2">
          <h3 className="font-bold text-lg mb-3">Relationships</h3>
          <div className="border rounded p-4 h-96 overflow-y-auto">
            {filteredRelationships.length > 0 ? (
              <div className="space-y-3">
                {filteredRelationships.map((rel, index) => {
                  const sourceChar = charactersData.find(c => c.id === rel.from);
                  const targetChar = charactersData.find(c => c.id === rel.to);
                  
                  if (!sourceChar || !targetChar) return null;
                  
                  return (
                    <div key={index} className="border p-3 rounded hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button 
                            className={`font-medium hover:underline ${getCharacterNameColor(sourceChar.group)}`}
                            onClick={() => handleCharacterClick(sourceChar)}
                          >
                            {sourceChar.name}
                          </button>
                          <span className="mx-2">â†’</span>
                          <button 
                            className={`font-medium hover:underline ${getCharacterNameColor(targetChar.group)}`}
                            onClick={() => handleCharacterClick(targetChar)}
                          >
                            {targetChar.name}
                          </button>
                        </div>
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                          {formatRelationshipType(rel.type)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <p>No relationships match your current filters.</p>
                <p className="mt-2 text-sm">Try changing your group or relationship type filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Selected Character Details */}
      {selectedCharacter && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-bold text-lg">{selectedCharacter.name}</h3>
          <div className="text-sm text-gray-600 mb-2">{selectedCharacter.role}</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 className="font-medium mb-1">Background</h4>
              <p className="text-sm">{selectedCharacter.background || "No background information available."}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Key Relationships</h4>
              {selectedCharacter.relations && selectedCharacter.relations.length > 0 ? (
                <div className="space-y-1">
                  {selectedCharacter.relations.map((relation, index) => {
                    const relatedCharacter = charactersData.find(c => c.id === relation.characterId);
                    return relatedCharacter ? (
                      <div key={index} className="text-sm">
                        <button 
                          className="font-medium hover:underline"
                          onClick={() => handleCharacterClick(relatedCharacter)}
                        >
                          {relatedCharacter.name}
                        </button>
                        <span className="text-gray-600"> - {relation.description || relation.type}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No relationship information available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get text color for character names based on their group
const getCharacterNameColor = (group) => {
  switch (group) {
    case 'Protagonists':
      return 'text-blue-700';
    case 'Fifth Columnists':
      return 'text-red-700';
    case 'German Connection':
      return 'text-yellow-700';
    default:
      return 'text-gray-700';
  }
};

export default RelationshipWeb;

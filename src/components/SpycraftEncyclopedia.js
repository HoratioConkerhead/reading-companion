import React, { useState } from 'react';

// In a real implementation, this would come from the XML data
const spycraftEntries = [
  {
    id: 'safe_house',
    title: 'Safe Houses',
    description: 'Secure locations where agents can hide, rest, or conduct operations without fear of detection.',
    historicalContext: 'During WWII, safe houses were crucial for the operation of resistance movements and intelligence networks.',
    examples: [
      'Cynthia\'s house in Bucklebury is requested to be used as a safe house by Mosley',
      'The Snowdens and others use their country houses to host Nazi sympathizers'
    ],
    bookScenes: ['chapter21', 'chapter22']
  },
  {
    id: 'surveillance',
    title: 'Surveillance',
    description: 'The close observation of a person, place, or object to gather intelligence or evidence.',
    historicalContext: 'MI5 and other intelligence agencies heavily relied on surveillance to track potential spies and fifth columnists.',
    examples: [
      'Bill\'s team watching Cynthia\'s house',
      'The watchers posted in village locations disguised as artists',
      'George following Edwards from Scilly Isles'
    ],
    bookScenes: ['chapter26', 'chapter27']
  },
  {
    id: 'disguise',
    title: 'Disguise',
    description: 'The use of altered appearance to conceal one\'s identity or intentions.',
    historicalContext: 'Agents often adopted disguises to move freely in enemy territory or to approach targets without arousing suspicion.',
    examples: [
      'Hannah Park\'s various disguises (including Miss Gilchrist)',
      'Megan Davies disguised as a postman to kill Edwards',
      'Bob Harrington dressed as a woman for the assassination attempt'
    ],
    bookScenes: ['chapter2', 'chapter28', 'chapter42']
  },
  {
    id: 'dead_drop',
    title: 'Dead Drops',
    description: 'A method of passing items or information between agents without requiring direct contact.',
    historicalContext: 'Dead drops were essential for maintaining network security, as they eliminated the need for face-to-face meetings.',
    examples: [
      'The suitcase delivered to Cynthia\'s house',
      'Documents passed through intermediaries like the publisher'
    ],
    bookScenes: ['chapter35']
  },
  {
    id: 'code_words',
    title: 'Recognition Signals & Code Words',
    description: 'Predetermined phrases, gestures, or items used to identify friendly agents or to authenticate communications.',
    historicalContext: 'Recognition signals helped prevent infiltration by enemy agents and ensured secure communications.',
    examples: [
      'Bill\'s rank (Wing Commander) used as recognition signal',
      'Felicity\'s publisher serving as intermediary',
      'Special phone line for secure communications'
    ],
    bookScenes: ['chapter12', 'chapter15']
  },
  {
    id: 'tradecraft',
    title: 'Basic Tradecraft',
    description: 'The methods used to avoid surveillance, maintain cover, and conduct secret operations.',
    historicalContext: 'Intelligence agencies developed sophisticated tradecraft techniques throughout WWII.',
    examples: [
      'Don teaching Cynthia about "back doubles" and counter-surveillance',
      'Using reflections in shop windows to detect followers',
      'The separate phone line for secure communications'
    ],
    bookScenes: ['chapter18']
  },
  {
    id: 'double_agents',
    title: 'Double Agents',
    description: 'Operatives who appear to work for one side but are actually loyal to another.',
    historicalContext: 'The British "Double Cross System" was highly successful in turning German agents during WWII.',
    examples: [
      'Louise Harrington working for Bill while appearing loyal to the fifth columnists',
      'Her ultimate sabotage of the assassination attempt'
    ],
    bookScenes: ['chapter42', 'chapter46']
  },
  {
    id: 'cover_identity',
    title: 'Cover Identities',
    description: 'False personas adopted by agents to conceal their true identities and purposes.',
    historicalContext: 'Elaborate cover stories were developed for agents, often with supporting documentation.',
    examples: [
      'Davies using the name "Young" to deliver the suitcase',
      'Felicity posing as a writer in Aldworth',
      'Bill using the name "Newton" at Denleigh Manor'
    ],
    bookScenes: ['chapter3', 'chapter40']
  }
];

const SpycraftEncyclopedia = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredEntries = spycraftEntries.filter(entry => 
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    entry.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };
  
  return (
    <div className="spycraft-encyclopedia">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Spy Tradecraft Encyclopedia</h2>
        <p className="text-gray-600">
          Explore the spy techniques and methods used in "Stitched Up" and learn about their historical context in WWII espionage.
        </p>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search spy techniques..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-128 overflow-y-auto border rounded p-4">
          <h3 className="font-bold mb-3">Techniques</h3>
          <div className="space-y-2">
            {filteredEntries.map(entry => (
              <div 
                key={entry.id}
                className={`p-3 border rounded cursor-pointer hover:bg-gray-100 ${selectedEntry?.id === entry.id ? 'bg-blue-100 border-blue-300' : ''}`}
                onClick={() => handleEntryClick(entry)}
              >
                <h4 className="font-bold">{entry.title}</h4>
                <p className="text-sm text-gray-600 truncate">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 border rounded p-6">
          {selectedEntry ? (
            <div>
              <h2 className="text-2xl font-bold">{selectedEntry.title}</h2>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg border-b pb-2 mb-2">Description</h3>
                <p>{selectedEntry.description}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg border-b pb-2 mb-2">Historical Context</h3>
                <p>{selectedEntry.historicalContext}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg border-b pb-2 mb-2">Examples in "Stitched Up"</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedEntry.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 p-4 bg-gray-100 rounded">
                <h3 className="font-bold mb-2">Related Items</h3>
                <div className="flex flex-wrap gap-2">
                  {spycraftEntries
                    .filter(entry => entry.id !== selectedEntry.id)
                    .slice(0, 3)
                    .map(entry => (
                      <button 
                        key={entry.id}
                        className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50"
                        onClick={() => handleEntryClick(entry)}
                      >
                        {entry.title}
                      </button>
                    ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold text-lg">Historical Note</h3>
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 mt-2">
                  <p className="text-sm italic">
                    The intelligence tactics portrayed in "Stitched Up" are based on real methods used during WWII. The British intelligence services were particularly adept at counter-espionage and the running of double agents.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Select a spy technique from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpycraftEncyclopedia;


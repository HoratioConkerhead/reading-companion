import React, { useState } from 'react';

const SpycraftEncyclopedia = ({
  spycraftEntries
}) => {
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


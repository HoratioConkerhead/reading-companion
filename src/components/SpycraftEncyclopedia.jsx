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
        <p className="text-gray-600 dark:text-gray-400">
          Explore the spy techniques and methods used in the book and learn about their historical context in WWII espionage.
        </p>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search spy techniques..."
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-128 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-800">
          <h3 className="font-bold mb-3 text-gray-900 dark:text-gray-100">Techniques</h3>
          <div className="space-y-2">
            {filteredEntries.map(entry => (
              <div 
                key={entry.id}
                className={`p-3 border rounded cursor-pointer transition-colors ${
                  selectedEntry?.id === entry.id 
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleEntryClick(entry)}
              >
                <h4 className="font-bold text-gray-900 dark:text-gray-100">{entry.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 border border-gray-200 dark:border-gray-700 rounded p-6 bg-white dark:bg-gray-800">
          {selectedEntry ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedEntry.title}</h2>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-900 dark:text-gray-100">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedEntry.description}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-900 dark:text-gray-100">Historical Context</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedEntry.historicalContext}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="font-bold text-lg border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 text-gray-900 dark:text-gray-100">Examples in the Book</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  {selectedEntry.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Related Items</h3>
                <div className="flex flex-wrap gap-2">
                  {spycraftEntries
                    .filter(entry => entry.id !== selectedEntry.id)
                    .slice(0, 3)
                    .map(entry => (
                      <button 
                        key={entry.id}
                        className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                        onClick={() => handleEntryClick(entry)}
                      >
                        {entry.title}
                      </button>
                    ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Historical Note</h3>
                <div className="p-4 border-l-4 border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 mt-2">
                  <p className="text-sm italic text-gray-700 dark:text-gray-300">
                    The intelligence tactics portrayed in the book are based on real methods used during WWII. The British intelligence services were particularly adept at counter-espionage and the running of double agents.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg">Select a spy technique to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpycraftEncyclopedia;


import React, { useState } from 'react';

// In a real implementation, we'd have a proper chapters structure
// For now, let's create a mock chapters array based on the events
const chaptersData = [
  {
    id: 'preface',
    title: 'Preface',
    description: 'Introduction to the German infiltration of UK via Scilly Isles',
    events: ['german_infiltration'],
    timeframe: '1943'
  },
  {
    id: 'chapter1',
    title: 'Chapter 1: Wiltshire, May 1932',
    description: 'Cynthia arrives at Denleigh Manor for a weekend party',
    events: ['cynthia_recruitment'],
    timeframe: 'May 1932'
  },
  {
    id: 'chapter2',
    title: 'Chapter 2: Infiltration',
    description: 'Cynthia and Richard are recruited for intelligence work',
    events: ['cynthia_recruitment'],
    timeframe: 'May 1932' 
  },
  {
    id: 'chapter3',
    title: 'Chapter 3: Berlin',
    description: 'Richard and Cynthia travel to Berlin to establish their cover',
    events: ['berlin_trip', 'hitler_sighting'],
    timeframe: '1932-1933'
  },
  {
    id: 'chapter4',
    title: 'Chapter 4: The First Party',
    description: 'Cynthia hosts Nazi sympathizers at her home',
    events: ['first_party'],
    timeframe: 'May 27 (year unspecified)'
  },
  {
    id: 'chapter5',
    title: 'Chapter 5: Growing Network',
    description: 'The Nazi sympathizer network expands, with Mosley making an appearance',
    events: ['second_party'],
    timeframe: 'July 7 (year unspecified)'
  },
  {
    id: 'chapter6',
    title: 'Chapter 6: The Mysterious Edwards',
    description: 'German agent Edwards arrives in the UK',
    events: ['edwards_arrival', 'train_journey'],
    timeframe: '1943'
  },
  {
    id: 'chapter7',
    title: 'Chapter 7: Death in London',
    description: 'Edwards is found murdered in his London flat',
    events: ['edwards_murder'],
    timeframe: '1943'
  },
  {
    id: 'chapter8',
    title: 'Chapter 8: Preparations',
    description: 'The Fifth Columnists test a German rifle and prepare for their operation',
    events: ['rifle_testing'],
    timeframe: 'Late 1943'
  },
  {
    id: 'chapter9',
    title: 'Chapter 9: Escape to Ireland',
    description: 'The Davies escape to Ireland ahead of the assassination attempt',
    events: ['davies_ireland_escape'],
    timeframe: 'December 1943'
  },
  {
    id: 'chapter10',
    title: 'Chapter 10: Occupation',
    description: 'The conspirators take over Cynthia\'s house',
    events: ['house_occupation'],
    timeframe: 'December 5-7, 1943'
  },
  {
    id: 'chapter11',
    title: 'Chapter 11: The Attempt',
    description: 'The assassination attempt on Montgomery is foiled',
    events: ['assassination_attempt'],
    timeframe: 'December 7, 1943'
  },
  {
    id: 'epilogue',
    title: 'Epilogue',
    description: 'The aftermath of the failed plot',
    events: ['louise_death'],
    timeframe: 'Two weeks after the assassination attempt'
  }
];

// Mystery elements that get revealed through the story
const mysteryElements = [
  {
    id: 'knitters_group',
    title: 'The Knitters Group',
    description: 'The group of German Nazi women sympathizers, nicknamed after the historical "tricoteuses" who knit during French Revolution executions.',
    firstMentioned: 'chapter1',
    revealedInChapter: 'chapter1',
    relatedCharacters: ['gerda_stammer', 'lena_weber', 'louise_harrington'],
    status: 'revealed'
  },
  {
    id: 'mysterious_suitcase',
    title: 'The Mysterious Suitcase',
    description: 'A suitcase delivered to Cynthia, initially believed to contain a radio but actually containing women\'s clothes and German rifle components disguised as knitting needles.',
    firstMentioned: 'chapter6',
    revealedInChapter: 'chapter10',
    relatedCharacters: ['john_davies', 'bob_harrington'],
    relatedEvents: ['train_journey'],
    status: 'revealed'
  },
  {
    id: 'edwards_identity',
    title: 'Edwards\' True Purpose',
    description: 'The German agent Edwards was bringing critical equipment for the assassination attempt but became a liability.',
    firstMentioned: 'chapter6',
    revealedInChapter: 'chapter8',
    relatedCharacters: ['edwards', 'megan_davies'],
    relatedEvents: ['edwards_murder'],
    status: 'revealed'
  },
  {
    id: 'louise_allegiance',
    title: 'Louise\'s True Allegiance',
    description: 'The revelation that Louise has been working against the fifth columnists as a double agent.',
    firstMentioned: 'chapter1',
    revealedInChapter: 'chapter11',
    relatedCharacters: ['louise_harrington', 'bill_laurie'],
    relatedEvents: ['assassination_attempt'],
    status: 'twist'
  },
  {
    id: 'assassination_target',
    title: 'The Assassination Target',
    description: 'The plan to assassinate General Montgomery from Cynthia\'s tower.',
    firstMentioned: 'chapter8',
    revealedInChapter: 'chapter10',
    relatedCharacters: ['bob_harrington', 'john_davies'],
    relatedEvents: ['rifle_testing', 'house_occupation', 'assassination_attempt'],
    status: 'major_plot'
  }
];

// Theme elements throughout the story
const themeElements = [
  {
    id: 'class_privilege',
    title: 'Class and Privilege',
    description: 'Examination of how class and social standing influence characters\' actions and beliefs.',
    examples: [
      'Contrast between genuine aristocrats (Cynthia) and aspirational middle-class (Snowden)',
      'Use of country house parties as recruitment grounds',
      'Aristocratic connections of fifth columnists'
    ],
    relatedCharacters: ['cynthia_childreth', 'peter_snowden', 'john_davies']
  },
  {
    id: 'deception_identity',
    title: 'Deception and Double Identity',
    description: 'Exploration of hidden identities and deception in wartime.',
    examples: [
      'Multiple characters using aliases and disguises',
      'Louise\'s ultimate betrayal of her group',
      'Cynthia\'s double life'
    ],
    relatedCharacters: ['louise_harrington', 'cynthia_childreth', 'hannah_park']
  },
  {
    id: 'loyalty_betrayal',
    title: 'Loyalty and Betrayal',
    description: 'The complex nature of loyalty during wartime and how personal beliefs conflict with national interest.',
    examples: [
      'Louise\'s change of allegiance',
      'The fifth columnists betraying their country',
      'Cynthia\'s initial reluctance to get involved'
    ],
    relatedCharacters: ['louise_harrington', 'bob_harrington', 'cynthia_childreth']
  },
  {
    id: 'knitting_symbolism',
    title: 'Knitting as Symbol',
    description: 'The use of knitting as a symbol throughout the novel, representing both domesticity and hidden danger.',
    examples: [
      'The German Nazi women nicknamed "the knitters"',
      'Louise\'s signature trait that helps identify her',
      'Historical reference to "les tricoteuses" - women who knit during French Revolution executions'
    ],
    relatedCharacters: ['louise_harrington', 'gerda_stammer', 'lena_weber']
  }
];


const PlotNavigator = ({ 
  onEventSelect, 
  onCharacterSelect,
  eventsData,
  charactersData
}) => {
  const [viewMode, setViewMode] = useState('chapters'); // 'chapters', 'mysteries', 'themes'
  const [readerKnowledge, setReaderKnowledge] = useState('full'); // 'progressive', 'full'
  const [expandedChapter, setExpandedChapter] = useState(null);
  
  // Get character name from ID
  const getCharacterName = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    return character ? character.name : characterId;
  };
  
  // Get event title from ID
  const getEventTitle = (eventId) => {
    const event = eventsData.find(e => e.id === eventId);
    return event ? event.title : eventId;
  };
  
  // Handle character click
  const handleCharacterClick = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    if (character) {
      onCharacterSelect(character);
    }
  };
  
  // Handle event click
  const handleEventClick = (eventId) => {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
      onEventSelect(event);
    }
  };
  
  // Check if a mystery is unlocked based on chapter and reader knowledge mode
  const isMysteryUnlocked = (mystery, currentChapter) => {
    if (readerKnowledge === 'full') return true;
    
    // In progressive mode, check the chapter index
    const chapterIndex = chaptersData.findIndex(ch => ch.id === currentChapter);
    const revealChapterIndex = chaptersData.findIndex(ch => ch.id === mystery.revealedInChapter);
    
    return chapterIndex >= revealChapterIndex;
  };
  
  return (
    <div className="plot-navigator">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Plot Navigator</h2>
        <p className="text-gray-600">
          Explore the narrative structure, mysteries, and themes of "Stitched Up" to enhance your understanding of the novel.
        </p>
      </div>
      
      <div className="flex mb-4">
        <button 
          className={`px-4 py-2 cursor-pointer focus:outline-none rounded mr-2 ${viewMode === 'chapters' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setViewMode('chapters')}
        >
          Chapter Progression
        </button>
        <button 
          className={`px-4 py-2 cursor-pointer focus:outline-none rounded mr-2 ${viewMode === 'mysteries' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setViewMode('mysteries')}
        >
          Mystery Elements
        </button>
        <button 
          className={`px-4 py-2 cursor-pointer focus:outline-none rounded ${viewMode === 'themes' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setViewMode('themes')}
        >
          Theme Analysis
        </button>
      </div>
      
      {viewMode === 'chapters' && (
        <>
          {readerKnowledge === 'progressive' && (
            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-sm">
              <p>
                <strong>Progressive Reader Mode:</strong> Chapters are revealed as if you were reading the 
                novel for the first time. Expand each chapter to continue the story.
              </p>
            </div>
          )}
          
          <div className="flex mb-4">
            <button 
              className={`px-4 py-2 text-sm rounded-l ${readerKnowledge === 'progressive' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setReaderKnowledge('progressive')}
            >
              Reader's View
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-r ${readerKnowledge === 'full' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setReaderKnowledge('full')}
            >
              Full Overview
            </button>
          </div>
          
          <div className="space-y-4">
            {chaptersData.map((chapter, index) => {
              // In progressive mode, only show chapters up to the expanded one
              if (readerKnowledge === 'progressive' && 
                  expandedChapter && 
                  index > chaptersData.findIndex(ch => ch.id === expandedChapter)) {
                return null;
              }
              
              const isExpanded = expandedChapter === chapter.id;
              const chapterEvents = chapter.events.map(eventId => 
                eventsData.find(e => e.id === eventId)
              ).filter(Boolean);
              
              return (
                <div 
                  key={chapter.id}
                  className={`border-l-4 pl-4 ${isExpanded ? 'border-blue-500' : 'border-gray-300'}`}
                >
                  <div 
                    className={`font-bold cursor-pointer ${isExpanded ? 'text-blue-600' : ''}`}
                    onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                  >
                    {chapter.title}
                    <span className="text-sm text-gray-600 ml-2">{chapter.timeframe}</span>
                  </div>
                  
                  {!isExpanded && (
                    <p className="text-sm text-gray-600 mt-1">{chapter.description}</p>
                  )}
                  
                  {isExpanded && (
                    <div className="mt-2 pl-2">
                      <p className="mb-3">{chapter.description}</p>
                      
                      {chapterEvents.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm">Key Events:</h4>
                          <div className="space-y-2 mt-2">
                            {chapterEvents.map(event => (
                              <div 
                                key={event.id}
                                className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                                onClick={() => handleEventClick(event.id)}
                              >
                                <div className="font-medium">{event.title}</div>
                                <div className="text-sm text-gray-600">{event.date}</div>
                                <p className="text-sm mt-1">{event.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Mystery elements in this chapter */}
                        {mysteryElements.filter(m => 
                          m.firstMentioned === chapter.id || m.revealedInChapter === chapter.id
                        ).length > 0 && (
                          <div className="p-3 border rounded bg-pink-50">
                            <h4 className="font-medium text-sm mb-2">Mystery Elements Introduced:</h4>
                            <div className="space-y-2">
                              {mysteryElements.filter(m => 
                                m.firstMentioned === chapter.id || m.revealedInChapter === chapter.id
                              ).map(mystery => (
                                <div key={mystery.id} className="text-sm">
                                  <div className="font-medium">{mystery.title}</div>
                                  {mystery.revealedInChapter === chapter.id ? (
                                    <div className="text-green-600">Revealed in this chapter</div>
                                  ) : (
                                    <div className="text-blue-600">First mentioned, revealed later</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Character development */}
                        <div className="p-3 border rounded">
                          <h4 className="font-medium text-sm mb-2">Character Focus:</h4>
                          <div className="space-y-1">
                            {chapterEvents.flatMap(event => 
                              event.characters?.map(charRef => ({
                                ...charRef,
                                event: event.id
                              })) || []
                            )
                            .filter((charRef, index, self) => 
                              index === self.findIndex(c => c.characterId === charRef.characterId)
                            )
                            .slice(0, 5) // Limit to top 5 characters
                            .map(charRef => {
                              const character = charactersData.find(c => c.id === charRef.characterId);
                              return character ? (
                                <div 
                                  key={character.id}
                                  className="flex items-center cursor-pointer hover:underline"
                                  onClick={() => handleCharacterClick(character.id)}
                                >
                                  <span className="text-sm">{character.name}</span>
                                  {charRef.role && (
                                    <span className="text-xs bg-gray-200 rounded px-1 ml-2">{charRef.role}</span>
                                  )}
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {index < chaptersData.length - 1 && readerKnowledge === 'progressive' && (
                        <button 
                          className="mt-4 px-3 py-1 bg-blue-500 text-white text-sm rounded"
                          onClick={() => setExpandedChapter(chaptersData[index + 1].id)}
                        >
                          Continue to {chaptersData[index + 1].title.split(':')[0]}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      
      {viewMode === 'mysteries' && (
        <div className="space-y-4">
          {readerKnowledge === 'progressive' && (
            <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 text-sm">
              <p>
                <strong>Progressive Reader Mode:</strong> Mystery elements are unlocked as they're 
                revealed in the story. Select a chapter to see which mysteries have been revealed.
              </p>
              
              <div className="mt-2">
                <label className="block text-sm font-medium mb-1">Current Chapter:</label>
                <select 
                  className="w-full md:w-auto p-2 border rounded"
                  value={expandedChapter || ''}
                  onChange={(e) => setExpandedChapter(e.target.value || null)}
                >
                  <option value="">Select a chapter</option>
                  {chaptersData.map(chapter => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mysteryElements.map(mystery => {
              const isUnlocked = readerKnowledge === 'full' || 
                                (expandedChapter && isMysteryUnlocked(mystery, expandedChapter));
              
              return (
                <div 
                  key={mystery.id}
                  className={`border p-3 rounded ${
                    isUnlocked 
                      ? mystery.status === 'twist' 
                        ? 'bg-purple-50' 
                        : mystery.status === 'major_plot' 
                          ? 'bg-blue-50'
                          : 'bg-green-50'
                      : 'bg-gray-100'
                  }`}
                >
                  <h4 className="font-bold">{mystery.title}</h4>
                  <p className="text-sm">First introduced: Chapter {
                    chaptersData.findIndex(ch => ch.id === mystery.firstMentioned) + 1
                  }</p>
                  
                  {isUnlocked ? (
                    <>
                      <p className="mt-1">{mystery.description}</p>
                      
                      {/* Related characters */}
                      {mystery.relatedCharacters && mystery.relatedCharacters.length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm font-medium">Related Characters:</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {mystery.relatedCharacters.map(charId => (
                              <button
                                key={charId}
                                className="text-xs px-2 py-1 bg-white border rounded hover:bg-gray-100"
                                onClick={() => handleCharacterClick(charId)}
                              >
                                {getCharacterName(charId)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Related events */}
                      {mystery.relatedEvents && mystery.relatedEvents.length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm font-medium">Key Events:</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {mystery.relatedEvents.map(eventId => (
                              <button
                                key={eventId}
                                className="text-xs px-2 py-1 bg-white border rounded hover:bg-gray-100"
                                onClick={() => handleEventClick(eventId)}
                              >
                                {getEventTitle(eventId)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-2 flex">
                        <span className={`text-xs px-2 py-1 rounded ${
                          mystery.status === 'twist' 
                            ? 'bg-purple-200 text-purple-800' 
                            : mystery.status === 'major_plot'
                              ? 'bg-blue-200 text-blue-800'
                              : 'bg-green-200 text-green-800'
                        }`}>
                          {mystery.status === 'twist' 
                            ? 'Major Plot Twist' 
                            : mystery.status === 'major_plot'
                              ? 'Central Plot Element'
                              : 'Revealed Mystery'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 flex items-center">
                      <span className="bg-gray-200 text-sm px-2 py-1 rounded">
                        Locked until Chapter {
                          chaptersData.findIndex(ch => ch.id === mystery.revealedInChapter) + 1
                        }
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {viewMode === 'themes' && (
        <div className="space-y-6">
          <p className="text-gray-600">
            Explore the major themes and motifs running through "Stitched Up" and how they connect 
            to characters and events in the novel.
          </p>
          
          {themeElements.map(theme => (
            <div key={theme.id} className="border rounded p-4">
              <h3 className="font-bold text-lg text-blue-700">{theme.title}</h3>
              <p className="mt-1">{theme.description}</p>
              
              <div className="mt-4">
                <div className="text-sm font-medium">Key Examples:</div>
                <ul className="list-disc pl-5 text-sm mt-1">
                  {theme.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              
              {theme.relatedCharacters && theme.relatedCharacters.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium">Key Characters:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {theme.relatedCharacters.map(charId => (
                      <button
                        key={charId}
                        className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                        onClick={() => handleCharacterClick(charId)}
                      >
                        {getCharacterName(charId)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="border rounded p-4 bg-gray-50 mt-6">
            <h3 className="font-bold text-lg mb-2">Literary Analysis</h3>
            <p>
              "Stitched Up" uses the spy thriller genre to explore broader themes of loyalty, 
              deception, class division, and the moral compromises made during wartime. The novel's 
              structure mirrors the complexity of intelligence work itself, with information revealed 
              gradually and perspectives shifting as characters' true motivations come to light.
            </p>
            <p className="mt-2">
              The book's title operates on multiple levels, referring both to the knitting motif 
              throughout the story and the way characters find themselves "stitched up" (betrayed or 
              trapped) by circumstances and the actions of others.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlotNavigator;


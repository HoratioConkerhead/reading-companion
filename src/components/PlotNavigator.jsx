import React, { useState } from 'react';
import { getCharacterName as _getCharacterName, getEventTitle as _getEventTitle } from '../utils/dataAccessors';
import { itemText, visibleItems } from '../utils/chapterItems';

const PlotNavigator = ({ 
  onEventSelect, 
  onCharacterSelect,
  eventsData,
  charactersData,
  chaptersData,
  mysteryElements,
  themeElements,
  bookMetadata,
  chapterFilterId = null
}) => {
  const [viewMode, setViewMode] = useState('chapters'); // 'chapters', 'mysteries', 'themes'
  const [readerKnowledge, setReaderKnowledge] = useState('full'); // 'progressive', 'full'
  const [expandedChapter, setExpandedChapter] = useState(null);
  
  // The global "show up to" chapter: nothing after it is shown, whatever the reader mode
  const filterIndex = chapterFilterId ? chaptersData.findIndex(ch => ch.id === chapterFilterId) : -1;
  const lastVisibleIndex = filterIndex === -1 ? chaptersData.length - 1 : filterIndex;
  const visibleChapters = chaptersData.slice(0, lastVisibleIndex + 1);
  const chapterIndexOf = (chapterId) => chaptersData.findIndex(ch => ch.id === chapterId);
  const chapterTitle = (chapterId) => chaptersData.find(ch => ch.id === chapterId)?.title || 'a later chapter';
  // A mystery's resolution is a spoiler until the reader has reached the chapter that reveals it
  const isRevealedWithinFilter = (mystery) => {
    const revealIndex = chapterIndexOf(mystery.revealedInChapter);
    return revealIndex !== -1 && revealIndex <= lastVisibleIndex;
  };

  const getCharacterName = (characterId) => _getCharacterName(characterId, charactersData);
  const getEventTitle = (eventId) => _getEventTitle(eventId, eventsData);
  // Lists can hold { text, chapter } items: only show those up to the reader's chapter,
  // and only link to characters and events the reader has met (the data is pre-filtered)
  const shownItems = (items) => visibleItems(items, chaptersData, chapterFilterId);
  const metCharacters = (ids) => (ids || []).filter(id => charactersData.some(c => c.id === id));
  const seenEvents = (ids) => (ids || []).filter(id => eventsData.some(e => e.id === id));
  
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
    const chapterIndex = chapterIndexOf(currentChapter);
    const revealChapterIndex = chapterIndexOf(mystery.revealedInChapter);
    
    return revealChapterIndex !== -1 && chapterIndex >= revealChapterIndex;
  };
  
  return (
    <div className="plot-navigator">
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Explore the narrative structure, mysteries, and themes of the book to enhance your understanding of the novel.
        </p>
      </div>
      
      <div className="flex mb-4">
        <button 
          className={`px-4 py-2 cursor-pointer focus:outline-none rounded mr-2 transition-colors ${
            viewMode === 'chapters' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setViewMode('chapters')}
        >
          Chapter Progression
        </button>
        <button 
          className={`px-4 py-2 cursor-pointer focus:outline-none rounded mr-2 transition-colors ${
            viewMode === 'mysteries' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setViewMode('mysteries')}
        >
          Mystery Elements
        </button>
        <button 
          className={`px-4 py-2 cursor-pointer focus:outline-none rounded transition-colors ${
            viewMode === 'themes' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setViewMode('themes')}
        >
          Theme Analysis
        </button>
      </div>
      
      <div className="flex mb-4">
        <button 
          className={`px-4 py-2 text-sm rounded-l transition-colors ${
            readerKnowledge === 'progressive' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setReaderKnowledge('progressive')}
        >
          Reader's View
        </button>
        <button 
          className={`px-4 py-2 text-sm rounded-r transition-colors ${
            readerKnowledge === 'full' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => setReaderKnowledge('full')}
        >
          Full Overview
        </button>
      </div>
      
      {viewMode === 'chapters' && (
        <>
          {readerKnowledge === 'progressive' && (
            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Progressive Reader Mode:</strong> Chapters are revealed as if you were reading the 
                novel for the first time. Expand each chapter to continue the story.
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {visibleChapters.map((chapter, index) => {
              // In progressive mode, only show chapters up to the expanded one
              if (readerKnowledge === 'progressive' && 
                  expandedChapter && 
                  index > chaptersData.findIndex(ch => ch.id === expandedChapter)) {
                return null;
              }
              
              const isExpanded = expandedChapter === chapter.id;
              const chapterEvents = chapter.events ? chapter.events.map(eventId => 
                eventsData.find(e => e.id === eventId)
              ).filter(Boolean) : [];
              
              return (
                <div 
                  key={chapter.id}
                  className={`border-l-4 pl-4 transition-colors ${
                    isExpanded 
                      ? 'border-blue-500' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <div 
                    className={`font-bold cursor-pointer transition-colors ${
                      isExpanded 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                    onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                  >
                    {chapter.title}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{chapter.timeframe || chapter.date}</span>
                  </div>
                  
                  {!isExpanded && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{chapter.description || chapter.summary}</p>
                  )}
                  
                  {isExpanded && (
                    <div className="mt-2 pl-2">
                      <p className="mb-3 text-gray-700 dark:text-gray-300">{chapter.description || chapter.summary}</p>
                      
                      {chapterEvents.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">Key Events:</h4>
                          <div className="space-y-2 mt-2">
                            {chapterEvents.map(event => (
                              <div 
                                key={event.id}
                                className="p-2 border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => handleEventClick(event.id)}
                              >
                                <div className="font-medium text-gray-900 dark:text-gray-100">{event.title}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{event.date}</div>
                                <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{event.description}</p>
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
                          <div className="p-3 border border-gray-200 dark:border-gray-700 rounded bg-pink-50 dark:bg-pink-900/20">
                            <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">Mystery Elements Introduced:</h4>
                            <div className="space-y-2">
                              {mysteryElements.filter(m => 
                                m.firstMentioned === chapter.id || m.revealedInChapter === chapter.id
                              ).map(mystery => (
                                <div key={mystery.id} className="text-sm">
                                  <div className="font-medium text-gray-900 dark:text-gray-100">{mystery.title}</div>
                                  {mystery.revealedInChapter === chapter.id && isRevealedWithinFilter(mystery) ? (
                                    <div className="text-green-600 dark:text-green-400">Revealed in this chapter</div>
                                  ) : (
                                    <div className="text-blue-600 dark:text-blue-400">First mentioned, revealed later</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Character development */}
                        <div className="p-3 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
                          <h4 className="font-medium text-sm mb-2 text-gray-900 dark:text-gray-100">Character Focus:</h4>
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
                                  <span className="text-sm text-gray-900 dark:text-gray-100">{character.name}</span>
                                  {charRef.role && (
                                    <span className="text-xs bg-gray-200 dark:bg-gray-700 rounded px-1 ml-2 text-gray-700 dark:text-gray-300">{charRef.role}</span>
                                  )}
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {index < chaptersData.length - 1 && readerKnowledge === 'progressive' && (
                        <button 
                          className="mt-4 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
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
            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Progressive Reader Mode:</strong> Mystery elements are unlocked as they're 
                revealed in the story. Select a chapter to see which mysteries have been revealed.
              </p>
              
              <div className="mt-2">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Current Chapter:</label>
                <select 
                  className="w-full md:w-auto p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  value={expandedChapter || ''}
                  onChange={(e) => setExpandedChapter(e.target.value || null)}
                >
                  <option value="">Select a chapter</option>
                  {visibleChapters.map(chapter => (
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
                  className={`border border-gray-200 dark:border-gray-700 p-3 rounded transition-colors ${
                    isUnlocked 
                      ? mystery.status === 'twist' 
                        ? 'bg-purple-50 dark:bg-purple-900/20' 
                        : mystery.status === 'major_plot' 
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{mystery.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">First introduced: {chapterTitle(mystery.firstMentioned)}</p>
                  {mystery.type && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{mystery.type}</span>
                  )}
                  
                  {isUnlocked ? (
                    <>
                      <p className="mt-1 text-gray-700 dark:text-gray-300">{mystery.description}</p>
                      {mystery.significance && (
                        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300"><span className="font-medium">Significance:</span> {mystery.significance}</p>
                      )}
                      {shownItems(mystery.clues).length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Clues:</div>
                          <ul className="list-disc pl-5 text-sm mt-1 text-gray-700 dark:text-gray-300">
                            {shownItems(mystery.clues).map((clue, index) => <li key={index}>{itemText(clue)}</li>)}
                          </ul>
                        </div>
                      )}
                      {mystery.resolution && (
                        isRevealedWithinFilter(mystery) ? (
                          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300"><span className="font-medium">Resolution:</span> {mystery.resolution}</p>
                        ) : (
                          <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">Resolution hidden until {chapterTitle(mystery.revealedInChapter)}</p>
                        )
                      )}
                      
                      {/* Related characters */}
                      {metCharacters(mystery.relatedCharacters).length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Related Characters:</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {metCharacters(mystery.relatedCharacters).map(charId => (
                              <button
                                key={charId}
                                className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                                onClick={() => handleCharacterClick(charId)}
                              >
                                {getCharacterName(charId)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Related events */}
                      {seenEvents(mystery.relatedEvents).length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Key Events:</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {seenEvents(mystery.relatedEvents).map(eventId => (
                              <button
                                key={eventId}
                                className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
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
                            ? 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200' 
                            : mystery.status === 'major_plot'
                              ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
                              : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                        }`}>
                          {mystery.status === 'twist' || mystery.status === 'major_twist'
                            ? 'Major Plot Twist' 
                            : mystery.status === 'major_plot'
                              ? 'Central Plot Element'
                              : isRevealedWithinFilter(mystery) ? 'Revealed Mystery' : 'Unresolved Mystery'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 flex items-center">
                      <span className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                        Locked until {chapterTitle(mystery.revealedInChapter)}
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
          <p className="text-gray-600 dark:text-gray-400">
            Explore the major themes and motifs running through the book and how they connect 
            to characters and events in the novel.
          </p>
          
          {themeElements.map(theme => (
            <div key={theme.id} className="border border-gray-200 dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-800">
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-2">{theme.title}</h3>
              <p className="mt-1 text-gray-700 dark:text-gray-300">{theme.description}</p>
              
              {theme.category && (
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{theme.category}</span>
              )}
              {theme.significance && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300"><span className="font-medium">Significance:</span> {theme.significance}</p>
              )}

              {shownItems(theme.examples).length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Key Examples:</div>
                  <ul className="list-disc pl-5 text-sm mt-1 text-gray-700 dark:text-gray-300">
                    {shownItems(theme.examples).map((example, index) => (
                      <li key={index}>{itemText(example)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {shownItems(theme.development).length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">How it develops:</div>
                  <ol className="list-decimal pl-5 text-sm mt-1 text-gray-700 dark:text-gray-300">
                    {shownItems(theme.development).map((step, index) => <li key={index}>{itemText(step)}</li>)}
                  </ol>
                </div>
              )}
              
              {metCharacters(theme.relatedCharacters).length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Key Characters:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {metCharacters(theme.relatedCharacters).map(charId => (
                      <button
                        key={charId}
                        className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
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
          
          {bookMetadata?.literaryAnalysis && (
            <div className="border border-gray-200 dark:border-gray-700 rounded p-4 bg-gray-50 dark:bg-gray-800 mt-6">
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{bookMetadata.literaryAnalysis.title || 'Literary Analysis'}</h3>
              {Array.isArray(bookMetadata.literaryAnalysis.paragraphs) && bookMetadata.literaryAnalysis.paragraphs.length > 0 ? (
                bookMetadata.literaryAnalysis.paragraphs.map((para, idx) => (
                  <p key={idx} className={`text-gray-700 dark:text-gray-300 ${idx > 0 ? 'mt-2' : ''}`}>{para}</p>
                ))
              ) : (
                bookMetadata.literaryAnalysis.content ? (
                  <p className="text-gray-700 dark:text-gray-300">{bookMetadata.literaryAnalysis.content}</p>
                ) : null
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlotNavigator;
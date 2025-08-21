import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import PageTutorial from './PageTutorial';

const RelationshipWeb = ({ 
  onCharacterSelect, 
  selectedCharacter,
  charactersData,
  relationshipsData = [],
  eventsData = [], // Add events data for importance calculation
  chaptersData = [], // Add chapters data for filtering
  darkMode = false, // Add darkMode prop for theme-aware colors
  groupColors = {},
  importanceConfig = {},
  relationshipCategoryColors = {},
  currentBookKey,
  chapterFilterId,
  onChapterFilterChange
}) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [focusedCharacter, setFocusedCharacter] = useState(() => (charactersData && charactersData.length > 0 ? charactersData[0].id : null));
  const [draggedNode, setDraggedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isAutoArrangeOn, setIsAutoArrangeOn] = useState(false);
  const [springForce, setSpringForce] = useState(100);
  const [repulsionForce, setRepulsionForce] = useState(100000);
  const [isFullPage, setIsFullPage] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeMode, setActiveMode] = useState('none'); // 'none' | 'pin' | 'remove'
  const isPinMode = activeMode === 'pin';
  const isRemoveMode = activeMode === 'remove';
  const [pinnedNodeIds, setPinnedNodeIds] = useState(new Set());
  const [autoPinnedNodeIds, setAutoPinnedNodeIds] = useState(new Set());
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const previousBookKeyRef = useRef(currentBookKey);
  
  // View options state
  const [showDescription, setShowDescription] = useState(false); // off by default
  const [showRelationship, setShowRelationship] = useState(false); // off default
  const [showNumber, setShowNumber] = useState(false); // off y default
  const [showImportance, setShowImportance] = useState(false); // off by default
  const [scaleSizeByImportance, setScaleSizeByImportance] = useState(false); // off by default
  
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const wasClick = useRef(false);
  const clickStartPos = useRef({ x: 0, y: 0 });
  const wasAutoArrangeOn = useRef(false);
  const textWidthCache = useRef(new Map());
  const suppressAutoFocusRef = useRef(false);
  // Keep a live reference to nodes to avoid stale closures in RAF
  const nodesRef = useRef(nodes);
  // Keep nodesRef synchronized before paint so RAF sees latest targets
  useLayoutEffect(() => { nodesRef.current = nodes; }, [nodes]);
  // Spring animation state for node sizes
  const sizeAnimationVelocitiesRef = useRef(new Map()); // id -> velocity
  const sizeAnimationActiveRef = useRef(false);
  const sizeAnimationLastTimeRef = useRef(null);
  const previousTargetSizesRef = useRef(new Map()); // id -> last seen target size
  const sizeAnimationFrameRef = useRef(null);
  // FPS tracking (for auto-arrange)
  const [fps, setFps] = useState(0);
  const [showFps, setShowFps] = useState(false);
  const [fpsHistory, setFpsHistory] = useState([]);
  const fpsStatsRef = useRef({ frames: 0, lastReport: 0, lastFps: 0 });
  // Live refs for values used inside RAF loop to avoid stale closures
  const springForceRef = useRef(springForce);
  const repulsionForceRef = useRef(repulsionForce);
  const edgesRef = useRef(edges);
  const pinnedNodeIdsRef = useRef(pinnedNodeIds);
  const autoPinnedNodeIdsRef = useRef(autoPinnedNodeIds);

  useEffect(() => {
    if (typeof performance !== 'undefined') {
      fpsStatsRef.current.lastReport = performance.now();
      fpsStatsRef.current.frames = 0;
      fpsStatsRef.current.lastFps = 0;
    }
  }, []);

  // Keep physics-related refs up to date for the RAF loop
  useEffect(() => { springForceRef.current = springForce; }, [springForce]);
  useEffect(() => { repulsionForceRef.current = repulsionForce; }, [repulsionForce]);
  useEffect(() => { edgesRef.current = edges; }, [edges]);
  useEffect(() => { pinnedNodeIdsRef.current = pinnedNodeIds; }, [pinnedNodeIds]);
  useEffect(() => { autoPinnedNodeIdsRef.current = autoPinnedNodeIds; }, [autoPinnedNodeIds]);

  // Toggle FPS with F10
  useEffect(() => {
    const handleKeyDown = (e) => {
      // F10 has key === 'F10' across modern browsers
      if (e.key === 'F10') {
        e.preventDefault();
        setShowFps(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Calculate character importance rating (1-100) based on multiple factors
  const calculateCharacterImportance = useCallback((character) => {
    let score = 0;
    
    const weights = {
      keyScenesPer: importanceConfig.keyScenes?.perItem ?? 6,
      keyScenesMax: importanceConfig.keyScenes?.max ?? 30,
      eventPer: importanceConfig.eventParticipation?.perItem ?? 2.5,
      eventMax: importanceConfig.eventParticipation?.max ?? 25,
      relationshipsPer: importanceConfig.relationships?.perItem ?? 2,
      relationshipsMax: importanceConfig.relationships?.max ?? 20,
      developmentPer: importanceConfig.development?.perItem ?? 2.5,
      developmentMax: importanceConfig.development?.max ?? 10,
      defaultGroupBonus: importanceConfig.defaultGroupBonus ?? 3
    };

    const defaultGroupBonuses = {
      'Protagonists': 15,
      'Fifth Columnists': 12,
      'Military': 10,
      'Historical Figures': 10,
      'German Connection': 8,
      'Supporting Characters': 5
    };
    const groupBonuses = importanceConfig.groupBonuses || defaultGroupBonuses;

    // Key scenes
    if (character.key_scenes) {
      score += Math.min(character.key_scenes.length * weights.keyScenesPer, weights.keyScenesMax);
    }

    // Event participation
    const eventCount = (eventsData || []).filter(event => 
      (event.characters || []).some(char => char.characterId === character.id)
    ).length;
    score += Math.min(eventCount * weights.eventPer, weights.eventMax);

    // Relationship count
    const relationshipCount = relationshipsData.filter(rel => 
      rel.from === character.id || rel.to === character.id
    ).length;
    score += Math.min(relationshipCount * weights.relationshipsPer, weights.relationshipsMax);

    // Character group bonus
    score += groupBonuses[character.group] ?? weights.defaultGroupBonus;

    // Development arc bonus
    if (character.development) {
      score += Math.min(character.development.length * weights.developmentPer, weights.developmentMax);
    }

    // Ensure score is between 1 and 100
    return Math.max(1, Math.min(100, Math.round(score)));
  }, [relationshipsData, eventsData, importanceConfig]);

  // Find the largest connected component in the graph
  const findLargestConnectedComponent = useCallback((currentNodes, currentEdges) => {
    if (currentNodes.length === 0) return [];
    
    // Build adjacency list
    const adjacencyList = new Map();
    currentNodes.forEach(node => {
      adjacencyList.set(node.id, new Set());
    });
    
    currentEdges.forEach(edge => {
      if (adjacencyList.has(edge.from) && adjacencyList.has(edge.to)) {
        adjacencyList.get(edge.from).add(edge.to);
        adjacencyList.get(edge.to).add(edge.from);
      }
    });
    
    // Find all connected components using DFS
    const visited = new Set();
    const components = [];
    
    const dfs = (nodeId, component) => {
      visited.add(nodeId);
      component.push(nodeId);
      
      const neighbors = adjacencyList.get(nodeId) || new Set();
      neighbors.forEach(neighborId => {
        if (!visited.has(neighborId)) {
          dfs(neighborId, component);
        }
      });
    };
    
    currentNodes.forEach(node => {
      if (!visited.has(node.id)) {
        const component = [];
        dfs(node.id, component);
        components.push(component);
      }
    });
    
    // Return the largest component
    if (components.length === 0) return [];
    
    const largestComponent = components.reduce((largest, current) => 
      current.length > largest.length ? current : largest
    );
    
    return largestComponent;
  }, []);

  // Find all connected components in the graph
  const findConnectedComponents = useCallback((currentNodes, currentEdges) => {
    if (!currentNodes || currentNodes.length === 0) return [];

    const adjacencyList = new Map();
    currentNodes.forEach(node => {
      adjacencyList.set(node.id, new Set());
    });

    currentEdges.forEach(edge => {
      if (adjacencyList.has(edge.from) && adjacencyList.has(edge.to)) {
        adjacencyList.get(edge.from).add(edge.to);
        adjacencyList.get(edge.to).add(edge.from);
      }
    });

    const visited = new Set();
    const components = [];

    const dfs = (nodeId, component) => {
      visited.add(nodeId);
      component.push(nodeId);
      const neighbors = adjacencyList.get(nodeId) || new Set();
      neighbors.forEach(neighborId => {
        if (!visited.has(neighborId)) dfs(neighborId, component);
      });
    };

    currentNodes.forEach(node => {
      if (!visited.has(node.id)) {
        const component = [];
        dfs(node.id, component);
        components.push(component);
      }
    });

    return components;
  }, []);

  // Count relationships for a character
  const getRelationshipCount = useCallback((characterId) => {
    return relationshipsData.filter(rel => 
      rel.from === characterId || rel.to === characterId
    ).length;
  }, [relationshipsData]);

  // Get character group color with brightness based on relationship count
  const getGroupColor = useCallback((group, relationshipCount = 0) => {
    // Base color from book metadata mapping, fallback to black
    const baseColor = groupColors[group] || '#000000';

    // If no relationship count provided, return base color
    if (relationshipCount === 0) return baseColor;

    // Convert hex to RGB for manipulation
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate brightness factor based on relationship count
    // More relationships = brighter color (up to 50% brighter)
    const maxRelationships = 10; // Adjust this based on your data
    const brightnessFactor = Math.min(1.5, 1 + (relationshipCount / maxRelationships) * 0.5);

    // Apply brightness
    const newR = Math.min(255, Math.round(r * brightnessFactor));
    const newG = Math.min(255, Math.round(g * brightnessFactor));
    const newB = Math.min(255, Math.round(b * brightnessFactor));

    // Convert back to hex
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }, [groupColors]);

  // Get appropriate text color based on theme
  const getTextColor = (isDark = false) => {
    return isDark ? '#ffffff' : '#000000';
  };

  // Get text color with good contrast against a background color
  const getContrastTextColor = (backgroundColor, isDark = false) => {
    // For dark mode, always use white text
    if (isDark) return '#ffffff';
    
    // For light mode, use black text for light backgrounds, white for dark backgrounds
    // Convert hex to RGB and calculate luminance
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Use black text on light backgrounds, white on dark backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Calculate text width using canvas.measureText with fallback to estimation
  const getTextWidth = useCallback((text, fontSize = 10) => {
    const cacheKey = `${text}-${fontSize}`;
    if (textWidthCache.current.has(cacheKey)) {
      return textWidthCache.current.get(cacheKey);
    }
    
    // Try to use canvas.measureText if available (most accurate)
    if (typeof document !== 'undefined' && document.createElement) {
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = `${fontSize}px Arial`; // Match your SVG font family
        const width = context.measureText(text).width;
        textWidthCache.current.set(cacheKey, width);
        return width;
      } catch (e) {
        // Fall back to estimation if canvas fails
        console.warn('Canvas text measurement failed, using estimation:', e);
      }
    }
    
    // Fallback: improved estimation
    const avgCharWidth = fontSize * 0.6;
    const width = text.length * avgCharWidth;
    textWidthCache.current.set(cacheKey, width);
    return width;
  }, []);

  // Calculate node size based on importance (if enabled)
  const getNodeSize = useCallback((importance, isFocused = false) => {
    const scale = 10 + (importance / 100) * 50;
    return Math.max(scale, 15);
  }, []);

  // Ensure each node has an animatedSize initialized to its current target
  useEffect(() => {
    setNodes(prev => prev.map(n => ({
      ...n,
      animatedSize: n.animatedSize != null ? n.animatedSize : (n.size != null ? n.size : 30)
    })));
  }, [nodes.length]);

  // Spring-based animation towards target size (node.size)
  const stepSizeAnimation = useCallback((timestamp) => {
    if (!sizeAnimationActiveRef.current) {
      sizeAnimationFrameRef.current = null;
      return;
    }
    const last = sizeAnimationLastTimeRef.current;
    sizeAnimationLastTimeRef.current = timestamp;
    const dt = Math.min(0.05, last ? (timestamp - last) / 1000 : 0.016); // seconds

    // Spring params for node size animation (tuned for a subtle, bouncy feel)
    const stiffness = 260; // higher -> faster
    const damping = 14; // lower -> more oscillation

    const velocities = sizeAnimationVelocitiesRef.current;
    let anyChange = false;

    const currentNodes = nodesRef.current;
    const updatedNodes = currentNodes.map(node => {
      const target = node.size != null ? node.size : 30;
      const current = node.animatedSize != null ? node.animatedSize : target;
      let v = velocities.get(node.id) || 0;

      const displacement = current - target; // positive if larger than target
      // Acceleration from Hooke's law with damping: a = -k*x - c*v
      const acceleration = (-stiffness * displacement) - (damping * v);
      v = v + acceleration * dt;
      let next = current + v * dt;

      // Convergence check
      const close = Math.abs(next - target) < 0.1 && Math.abs(v) < 0.1;
      if (close) {
        next = target;
        v = 0;
      } else {
        anyChange = true;
      }

      velocities.set(node.id, v);
      if (next !== node.animatedSize) {
        return { ...node, animatedSize: next };
      }
      return node;
    });

    // stop when converged
    if (anyChange) {
      setNodes(updatedNodes);
      sizeAnimationFrameRef.current = window.requestAnimationFrame(stepSizeAnimation);
    } else {
      sizeAnimationActiveRef.current = false;
      sizeAnimationFrameRef.current = null;
    }
  }, [setNodes]);

  const startSizeAnimation = useCallback(() => {
    sizeAnimationActiveRef.current = true;
    sizeAnimationLastTimeRef.current = null;
    if (!sizeAnimationFrameRef.current) {
      sizeAnimationFrameRef.current = window.requestAnimationFrame(stepSizeAnimation);
    }
  }, [stepSizeAnimation]);

  // Get appropriate stroke color for nodes based on theme
  const getNodeStrokeColor = useCallback((isDark = false, characterId = null) => {
    if (!characterId) {
      return isDark ? '#ffffff' : '#000000';
    }
    
    // Check if this character is missing any relationships
    const characterRelationships = relationshipsData.filter(rel => 
      rel.from === characterId || rel.to === characterId
    );
    
    // Get all characters connected to this one
    const connectedCharacterIds = new Set();
    characterRelationships.forEach(rel => {
      connectedCharacterIds.add(rel.from);
      connectedCharacterIds.add(rel.to);
    });
    
    // Check if any connected characters are not currently visible in nodes
    const isMissingRelationships = Array.from(connectedCharacterIds).some(id => 
      id !== characterId && !nodes.some(node => node.id === id)
    );
    
    if (isMissingRelationships) {
      // Missing relationships: white in dark mode, black in light mode
      return isDark ? '#ffffff' : '#000000';
    } else {
      // Not missing relationships: black in dark mode, white in light mode
      return isDark ? '#000000' : '#ffffff';
    }
  }, [relationshipsData, nodes]);

  // Map a relationship type string to a display category label used in the legend
  const getRelationshipCategoryLabel = useCallback((type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('spouse')) return 'Spouse';
    if (t.includes('handler') || t.includes('asset')) return 'Handler/Asset';
    if (t.includes('conspirator') || t.includes('enemy')) return 'Conspirator/Enemy';
    if (t.includes('colleague') || t.includes('partner')) return 'Colleague/Partner';
    if (t.includes('superior') || t.includes('subordinate')) return 'Superior/Subordinate';
    if (t.includes('friend')) return 'Friend';
    if (t.includes('informant') || t.includes('double-agent')) return 'Informant/Double-Agent';
    if (t.includes('target') || t.includes('victim')) return 'Conspirator/Enemy';
    return 'Other';
  }, []);

  // Get relationship color
  const getRelationshipColor = useCallback((type) => {
    // Prefer metadata-driven category colors
    const label = getRelationshipCategoryLabel(type);
    const fromMeta = relationshipCategoryColors[label];
    if (fromMeta) return fromMeta;

    // Fallback mapping
    return '#718096'; // gray
  }, [relationshipCategoryColors, getRelationshipCategoryLabel]);

  

  // Format relationship type
  const formatRelationshipType = useCallback((type) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' - ');
  }, []);

  // Sync local chapter state with global filter
  useEffect(() => {
    setCurrentChapter(chapterFilterId || null);
  }, [chapterFilterId]);

  // Filter relationships by chapter
  const filterRelationshipsByChapter = useCallback((relationships, chapterId) => {
    if (!chapterId) return relationships;
    
    const getChapterIndex = (id) => {
      if (!id) return -1;
      return chaptersData.findIndex(ch => ch.id === id);
    };

    const targetChapterIndex = getChapterIndex(chapterId);
    if (targetChapterIndex === -1) return relationships;

    // Precompute character introduction chapter indices for efficient lookup
    const characterIntroIndexById = new Map(
      (charactersData || []).map(c => [c.id, getChapterIndex(c.introducedInChapter)])
    );

    // Include only relationships introduced on/before the selected chapter.
    // If a relationship lacks its own introduction, infer from earliest-known intro of its endpoints.
    return relationships.filter(rel => {
      let relationshipIntroIndex = -1;

      if (rel.introducedInChapter) {
        relationshipIntroIndex = getChapterIndex(rel.introducedInChapter);
      } else {
        const aIdx = characterIntroIndexById.get(rel.from) ?? -1;
        const bIdx = characterIntroIndexById.get(rel.to) ?? -1;
        const candidates = [aIdx, bIdx].filter(idx => idx !== -1);
        relationshipIntroIndex = candidates.length > 0 ? Math.min(...candidates) : -1;
      }

      // If still unknown, exclude to avoid leaking future relationships
      if (relationshipIntroIndex === -1) return false;
      return relationshipIntroIndex <= targetChapterIndex;
    });
  }, [chaptersData, charactersData]);

  // Filter characters by chapter
  const filterCharactersByChapter = useCallback((characters, chapterId) => {
    if (!chapterId) return characters;
    
    const chapterIndex = chaptersData.findIndex(ch => ch.id === chapterId);
    if (chapterIndex === -1) return characters;
    
    // Filter characters based on when they are introduced
    return characters.filter(char => {
      if (char.introducedInChapter) {
        const charChapterIndex = chaptersData.findIndex(ch => ch.id === char.introducedInChapter);
        return charChapterIndex <= chapterIndex;
      }
      // If no chapter info, show the character
      return true;
    });
  }, [chaptersData]);

  // Build legend items from relationships present up to the selected chapter (no fixed order)
  const relationshipLegendItems = useMemo(() => {
    const filtered = filterRelationshipsByChapter(relationshipsData, currentChapter) || [];
    const colorByLabel = new Map();
    filtered.forEach(rel => {
      const label = rel.category || getRelationshipCategoryLabel(rel.type);
      if (!colorByLabel.has(label)) {
        colorByLabel.set(label, getRelationshipColor(rel.category || rel.type));
      }
    });

    // If no relationships yet, don't show a legend
    if (colorByLabel.size === 0) {
      return [];
    }

    // Use natural insertion order of discovered categories
    return Array.from(colorByLabel, ([label, color]) => ({ label, color }));
  }, [relationshipsData, currentChapter, filterRelationshipsByChapter, getRelationshipColor, getRelationshipCategoryLabel]);

  // Page tutorial content for Relationships tab
  const tutorialTitle = 'Relationships — How to use this page';
  const tutorialSteps = [
    [
      'This page lets you explore relationships between characters.',
      'Start by using "Focus on Character" to select someone.'
    ],
    [
      'Hover a character to see connected relationships and a brief description.',
      'Use your mouse wheel to zoom, and drag the background to pan.'
    ],
    [
      'Characters with a white outline have relationships not yet shown.',
      'Click a character to add their related characters and edges.'
    ],
    [
      'The view may now be cluttered, Click "Auto arrange" to toggle automatic layout.',
      'Layout uses springs (attraction) and node repulsion.',
      'Adjust "Spring Force" and "Repulsion Force" using the sliders.'
    ],
    [
      'You may now want more space. Use the expand icon to enter a full-screen view.',
      'Now use "Fit to View" to center and zoom to include all visible nodes.'
    ],
    [
      'Under "View Options" you can control labels and sizing.',
      'Click "Size is Importance" to scale node size by calculated importance.',
      'Toggle labels like Relationship, Description, and Counts/Importance.'
    ],
    [
      'If the view is cluttered, toggle "Remove Mode" to click and remove nodes.',
      'Only the largest remaining connected component is kept to you can remove whole branches.'
    ],
    [
      'Click "Show All" to reveal all characters up to the selected chapter.',
      'Then "Fit to View" to frame everything.'
    ],
    [
      '"Pin Mode" pins/unpins nodes.',
      'This prevents clusters from drifting apart under repulsion.',
      'Click a pinned node to unpin it.At least one node per group must be pinned'
    ],
    [
      '"Reset View" restores defaults without changing the chapter filter or full-screen.',
      'Use the Up To control on the tab bar to limit content by chapter and avoid spoilers.'
    ]
  ];

      // Initialize nodes in a circular layout with focused character in center
  const initializeNodes = useCallback(() => {
    // Filter characters based on current chapter
    const filteredCharacters = filterCharactersByChapter(charactersData, currentChapter);
    
    const focusedCharacterFiltered = focusedCharacter 
      ? filteredCharacters.filter(char => 
          char.id === focusedCharacter ||
          relationshipsData.some(rel => 
            (rel.from === focusedCharacter && rel.to === char.id) ||
            (rel.to === focusedCharacter && rel.from === char.id)
          )
        )
      : filteredCharacters;

    const centerX = 400;
    const centerY = 300;
    const radius = 200; // Fixed radius of 200 pixels

    // Separate focused character from others for proper circle calculation
    const focusedChar = focusedCharacterFiltered.find(char => char.id === focusedCharacter);
    const otherCharacters = focusedCharacterFiltered.filter(char => char.id !== focusedCharacter);
    
    const newNodes = [];
    
    // Add focused character in center
    if (focusedChar) {
             const relationshipCount = getRelationshipCount(focusedChar.id);
      const importance = calculateCharacterImportance(focusedChar);
      const size = scaleSizeByImportance ? getNodeSize(importance, true) : 30;
      newNodes.push({
        id: focusedChar.id,
        name: focusedChar.name,
        role: focusedChar.role,
        group: focusedChar.group,
        position: { x: centerX, y: centerY },
        color: getGroupColor(focusedChar.group, relationshipCount),
        relationshipCount,
        importance,
        size,
        isFocused: true
      });
    }
    
    // Place other characters in a circle around the focused character
            otherCharacters.forEach((character, index) => {
      const relationshipCount = getRelationshipCount(character.id);
      const importance = calculateCharacterImportance(character);
      const size = scaleSizeByImportance ? getNodeSize(importance, false) : 30;
      const totalInCircle = otherCharacters.length;
      
      // Calculate angle evenly around the circle
      const angle = (index * 2 * Math.PI) / totalInCircle;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      newNodes.push({
        id: character.id,
        name: character.name,
        role: character.role,
        group: character.group,
        position: { x, y },
        color: getGroupColor(character.group, relationshipCount),
        relationshipCount,
        importance,
        size,
        isFocused: false
      });
    });

          setNodes(newNodes);
  }, [charactersData, relationshipsData, focusedCharacter, currentChapter, getRelationshipCount, getGroupColor, calculateCharacterImportance, getNodeSize, scaleSizeByImportance, filterCharactersByChapter]); // Add currentChapter and filterCharactersByChapter dependencies

  // Initialize edges
  const initializeEdges = useCallback(() => {
    const filteredRelationships = filterRelationshipsByChapter(relationshipsData, currentChapter);
    
    // Show ALL relationships between the initially visible characters
    const relevantRelationships = filteredRelationships.filter(rel => {
      // Check if both characters in this relationship are visible
      const fromVisible = nodes.some(node => node.id === rel.from);
      const toVisible = nodes.some(node => node.id === rel.to);
      
      // Only show relationships where both characters are visible
      return fromVisible && toVisible;
    });

    const newEdges = relevantRelationships.map((relationship, index) => ({
      id: `${relationship.from}-${relationship.to}-${index}`,
      from: relationship.from,
      to: relationship.to,
      type: relationship.type,
      color: getRelationshipColor(relationship.type),
      label: formatRelationshipType(relationship.type)
    }));

    // Avoid unnecessary updates if edges haven't effectively changed
    const sameLength = edges.length === newEdges.length;
    if (sameLength) {
      let identical = true;
      for (let i = 0; i < newEdges.length; i++) {
        const a = newEdges[i];
        const b = edges[i];
        if (!b || a.id !== b.id || a.type !== b.type || a.label !== b.label) {
          identical = false;
          break;
        }
      }
      if (identical) return;
    }

    setEdges(newEdges);
  }, [relationshipsData, currentChapter, nodes, edges, filterRelationshipsByChapter, getRelationshipColor, formatRelationshipType]);

  // Initialize graph when focused character changes (do not move nodes on chapter change)
  useEffect(() => {
    // Skip initialization when explicitly suppressed (e.g., book change or show-all action)
    if (suppressAutoFocusRef.current) {
      suppressAutoFocusRef.current = false; // one-shot suppression
      return;
    }

    initializeNodes();
    
    // Center the view on the focused character after initialization
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      const characterX = 400; // This matches the centerX in initializeNodes
      const characterY = 300; // This matches the centerY in initializeNodes
      
      // Calculate pan to center the character
      const newPanX = centerX - characterX;
      const newPanY = centerY - characterY;
      
      setPan({ x: newPanX, y: newPanY });
    }
  }, [focusedCharacter, initializeNodes]);

  // Initialize edges after nodes are set
  useEffect(() => {
    if (nodes.length > 0) {
      initializeEdges();
      // ensure sizes begin animating after nodes appear
      startSizeAnimation();
    } else {
      setEdges([]);
    }
  }, [nodes, initializeEdges, startSizeAnimation]);

  // When chapter filter changes, remove nodes introduced after the selected chapter
  // Do not reinitialize or move existing nodes
  useEffect(() => {
    setNodes(prevNodes => {
      if (!currentChapter) return prevNodes; // show all
      const chapterIndex = chaptersData.findIndex(ch => ch.id === currentChapter);
      if (chapterIndex === -1) return prevNodes;

      // Compute allowed character ids up to the selected chapter
      const allowedCharacters = filterCharactersByChapter(charactersData, currentChapter);
      const allowedIds = new Set(allowedCharacters.map(c => c.id));

      const filtered = prevNodes.filter(n => allowedIds.has(n.id));
      return filtered;
    });
  }, [currentChapter, chaptersData, charactersData, filterCharactersByChapter]);

  // Update node sizes when the sizing option changes (without re-initializing)
  useEffect(() => {
    if (nodes.length > 0) {
      // Stop any in-progress size RAF to avoid race conditions, reset velocities
      if (sizeAnimationFrameRef.current) {
        cancelAnimationFrame(sizeAnimationFrameRef.current);
        sizeAnimationFrameRef.current = null;
      }
      sizeAnimationActiveRef.current = false;
      sizeAnimationVelocitiesRef.current.clear();

      setNodes(currentNodes => {
        const mapped = currentNodes.map(node => {
          const newTarget = scaleSizeByImportance
            ? getNodeSize(node.importance, node.isFocused)
            : 30;
          const currentRendered = node.animatedSize != null ? node.animatedSize : (node.size != null ? node.size : 30);
          return {
            ...node,
            // seed animation from whatever is currently rendered
            animatedSize: currentRendered,
            size: newTarget
          };
        });
        return mapped;
      });
      // kick the spring animation after the DOM commit; schedule on next frame
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        window.requestAnimationFrame(() => startSizeAnimation());
      } else {
        startSizeAnimation();
      }
    }
  }, [scaleSizeByImportance, getNodeSize, nodes.length, startSizeAnimation]);

  // Restart size animation whenever any node's target size changes
  useEffect(() => {
    if (nodes.length === 0) return;
    let anyTargetChanged = false;
    const prev = previousTargetSizesRef.current;
    nodes.forEach(n => {
      const target = n.size != null ? n.size : 30;
      const last = prev.get(n.id);
      if (last == null || Math.abs(last - target) > 0.25) {
        anyTargetChanged = true;
      }
      prev.set(n.id, target);
    });
    if (anyTargetChanged) {
      // If the toggle changed mid-flight, restart cleanly
      if (sizeAnimationFrameRef.current) {
        cancelAnimationFrame(sizeAnimationFrameRef.current);
        sizeAnimationFrameRef.current = null;
      }
      sizeAnimationActiveRef.current = false;
      sizeAnimationVelocitiesRef.current.clear();
      startSizeAnimation();
    }
  }, [nodes, startSizeAnimation]);

  // Sync with external selectedCharacter prop
  useEffect(() => {
    if (selectedCharacter && selectedCharacter.id !== focusedCharacter) {
      const allowedCharacters = filterCharactersByChapter(charactersData, currentChapter);
      const allowedIds = new Set(allowedCharacters.map(c => c.id));
      if (allowedIds.has(selectedCharacter.id)) {
        // Clear all nodes and edges when changing focus
        setNodes([]);
        setEdges([]);
        setFocusedCharacter(selectedCharacter.id);
      }
    }
  }, [selectedCharacter, charactersData, currentChapter, filterCharactersByChapter, focusedCharacter]);

  // Ensure a default focused character when charactersData changes or current focus is missing
  useEffect(() => {
    // If nodes already exist (e.g., after Show All), do not override with auto-focus
    if (nodes.length > 0) return;
    if (suppressAutoFocusRef.current) {
      suppressAutoFocusRef.current = false; // one-shot
      return;
    }
    if (!charactersData || charactersData.length === 0) return;
    const allowedCharacters = filterCharactersByChapter(charactersData, currentChapter);
    const existsInCurrent = focusedCharacter && allowedCharacters.some(c => c.id === focusedCharacter);
    if (!existsInCurrent && !selectedCharacter) {
      setNodes([]);
      setEdges([]);
      const nextFocus = allowedCharacters.length > 0 ? allowedCharacters[0].id : null;
      setFocusedCharacter(nextFocus);
    }
  }, [charactersData, currentChapter, filterCharactersByChapter, focusedCharacter, selectedCharacter, nodes.length]);

  // Keep show-all mode until user explicitly focuses a character

       // Auto arrange simulation - runs continuously when enabled
    const runAutoArrange = useCallback(() => {
      if (!isAutoArrangeOn) return;
      
      setNodes(currentNodes => {
        if (currentNodes.length === 0) return currentNodes;
        
        const pinnedSet = new Set([
          ...Array.from(pinnedNodeIdsRef.current || new Set()),
          ...Array.from(autoPinnedNodeIdsRef.current || new Set())
        ]);

        const simulation = {
          nodes: currentNodes.map(node => ({
            ...node,
            velocity: { x: 0, y: 0 },
            force: { x: 0, y: 0 }
          })),
          edges: edgesRef.current,
          pinnedSet,
          // (center pull for isolates removed per user request)
          
          // Physics constants - use ref values (live updates)
          repulsionForce: repulsionForceRef.current,
          springForce: springForceRef.current,
          springLength: 120,
          damping: 0.85,
          maxVelocity: 80,
          // centerPull removed
          
          // Run simulation step
          step: function() {
            const nodes = this.nodes;
            const numNodes = nodes.length;
            const pinnedSet = this.pinnedSet;
            const damping = this.damping;
            const maxVelocity = this.maxVelocity;
            const repulsionForce = this.repulsionForce;
            const springForce = this.springForce;
            const springLength = this.springLength;

            // Reset forces
            for (let i = 0; i < numNodes; i++) {
              const node = nodes[i];
              node.force.x = 0;
              node.force.y = 0;
            }

            // Precompute pinned flags and id->index map for fast lookup
            const pinnedFlags = new Array(numNodes);
            const idToIndex = new Map();
            for (let i = 0; i < numNodes; i++) {
              const node = nodes[i];
              idToIndex.set(node.id, i);
              pinnedFlags[i] = pinnedSet.has(node.id);
            }

            // Repulsion between all node pairs (push them apart)
            for (let i = 0; i < numNodes; i++) {
              const node1 = nodes[i];
              for (let j = i + 1; j < numNodes; j++) {
                const node2 = nodes[j];
                const dx = node2.position.x - node1.position.x;
                const dy = node2.position.y - node1.position.y;
                const distSq = dx * dx + dy * dy;
                if (distSq === 0) continue;
                const distance = Math.sqrt(distSq);
                const invDist = 1 / distance;
                const force = repulsionForce / distSq;

                const node1Pinned = pinnedFlags[i];
                const node2Pinned = pinnedFlags[j];

                if (!node1Pinned && !node2Pinned) {
                  const fx = (dx * invDist) * force;
                  const fy = (dy * invDist) * force;
                  node1.force.x -= fx;
                  node1.force.y -= fy;
                  node2.force.x += fx;
                  node2.force.y += fy;
                } else if (node1Pinned && !node2Pinned) {
                  node2.force.x += (dx * invDist) * force;
                  node2.force.y += (dy * invDist) * force;
                } else if (!node1Pinned && node2Pinned) {
                  node1.force.x -= (dx * invDist) * force;
                  node1.force.y -= (dy * invDist) * force;
                }
              }
            }

            // Spring attraction along edges (pull connected nodes together)
            const edges = this.edges;
            for (let e = 0; e < edges.length; e++) {
              const edge = edges[e];
              const i = idToIndex.get(edge.from);
              const j = idToIndex.get(edge.to);
              if (i === undefined || j === undefined) continue;
              const sourceNode = nodes[i];
              const targetNode = nodes[j];

              const dx = targetNode.position.x - sourceNode.position.x;
              const dy = targetNode.position.y - sourceNode.position.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              const invDist = 1 / distance;

              // Spring force (attraction with ideal length)
              const displacement = distance - springLength;
              const force = (springForce / 1000) * displacement;

              const sourcePinned = pinnedFlags[i];
              const targetPinned = pinnedFlags[j];

              if (!sourcePinned && !targetPinned) {
                const fx = (dx * invDist) * force;
                const fy = (dy * invDist) * force;
                sourceNode.force.x += fx;
                sourceNode.force.y += fy;
                targetNode.force.x -= fx;
                targetNode.force.y -= fy;
              } else if (sourcePinned && !targetPinned) {
                targetNode.force.x -= (dx * invDist) * force;
                targetNode.force.y -= (dy * invDist) * force;
              } else if (!sourcePinned && targetPinned) {
                sourceNode.force.x += (dx * invDist) * force;
                sourceNode.force.y += (dy * invDist) * force;
              }
            }

            // Apply forces to velocities and update positions
            const maxVelocitySq = maxVelocity * maxVelocity;
            for (let i = 0; i < numNodes; i++) {
              const node = nodes[i];
              const pinned = pinnedFlags[i];
              if (!pinned) {
                node.velocity.x += node.force.x;
                node.velocity.y += node.force.y;
              } else {
                node.velocity.x = 0;
                node.velocity.y = 0;
              }

              // Apply damping
              node.velocity.x *= damping;
              node.velocity.y *= damping;

              // Limit velocity (avoid sqrt when under cap)
              const speedSq = node.velocity.x * node.velocity.x + node.velocity.y * node.velocity.y;
              if (speedSq > maxVelocitySq) {
                const speed = Math.sqrt(speedSq);
                const scale = maxVelocity / speed;
                node.velocity.x *= scale;
                node.velocity.y *= scale;
              }

              // Update position
              if (!pinned) {
                node.position.x += node.velocity.x;
                node.position.y += node.velocity.y;
              }
            }
          }
        };
        
        // Run one step
        simulation.step();
        
        // FPS accounting (update roughly every 500ms)
        if (typeof performance !== 'undefined') {
          const now = performance.now();
          const stats = fpsStatsRef.current;
          stats.frames += 1;
          const elapsed = now - stats.lastReport;
          if (elapsed >= 500) {
            const currentFps = Math.round((stats.frames * 1000) / elapsed);
            stats.frames = 0;
            stats.lastReport = now;
            // push into history buffer (always push, even if unchanged)
            setFpsHistory(prev => {
              const next = [...prev, currentFps];
              const MAX = 60; // history length
              return next.length > MAX ? next.slice(next.length - MAX) : next;
            });
            if (currentFps !== stats.lastFps) {
              stats.lastFps = currentFps;
              setFps(currentFps);
            }
          }
        }

        // Schedule next step if still enabled
        if (isAutoArrangeOn && animationRef.current) {
          animationRef.current = requestAnimationFrame(runAutoArrange);
        }
        
        return simulation.nodes;
      });
    }, [isAutoArrangeOn]);
  
           // Run auto arrange when enabled
    useEffect(() => {
      if (isAutoArrangeOn) {
        // Start the animation loop if not already running
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(runAutoArrange);
        }
      } else {
        // Stop the animation when auto arrange is turned off
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }

      }
    }, [isAutoArrangeOn, runAutoArrange]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (sizeAnimationFrameRef.current) cancelAnimationFrame(sizeAnimationFrameRef.current);
    };
  }, []);

  // Auto-pin one node per disconnected component when multiple components exist
  useEffect(() => {
    if (nodes.length === 0) {
      if (autoPinnedNodeIds.size > 0) setAutoPinnedNodeIds(new Set());
      return;
    }
    const components = findConnectedComponents(nodes, edges);
    if (components.length <= 1) {
      if (autoPinnedNodeIds.size > 0) setAutoPinnedNodeIds(new Set());
      return;
    }

    const degreeMap = new Map();
    nodes.forEach(n => degreeMap.set(n.id, 0));
    edges.forEach(e => {
      if (degreeMap.has(e.from)) degreeMap.set(e.from, (degreeMap.get(e.from) || 0) + 1);
      if (degreeMap.has(e.to)) degreeMap.set(e.to, (degreeMap.get(e.to) || 0) + 1);
    });

    const nextAuto = new Set();
    components.forEach(componentIds => {
      const hasUserPin = componentIds.some(id => pinnedNodeIds.has(id));
      if (hasUserPin) return;
      let bestId = null;
      let bestScore = -Infinity;
      componentIds.forEach(id => {
        const node = nodes.find(n => n.id === id);
        if (!node) return;
        const deg = degreeMap.get(id) || 0;
        const score = deg * 100 + (node.importance || 0);
        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      });
      if (bestId) nextAuto.add(bestId);
    });

    const same = autoPinnedNodeIds.size === nextAuto.size && Array.from(autoPinnedNodeIds).every(id => nextAuto.has(id));
    if (!same) setAutoPinnedNodeIds(nextAuto);
  }, [nodes, edges, pinnedNodeIds, autoPinnedNodeIds, autoPinnedNodeIds.size, findConnectedComponents]);

  // Handle node drag start
  const handleNodeMouseDown = (e, nodeId) => {
    e.preventDefault();
    e.stopPropagation();
    
    setNodes(currentNodes => {
      const node = currentNodes.find(n => n.id === nodeId);
      if (!node) return currentNodes;
      
      // Reset click detection for this interaction
      wasClick.current = true;
      clickStartPos.current = { x: e.clientX, y: e.clientY };
      
      setIsDragging(true);
      setDraggedNode(nodeId);
      // Store the offset between the mouse (in world coords) and the node position
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const worldMouseX = (mouseX - pan.x) / zoom;
        const worldMouseY = (mouseY - pan.y) / zoom;
        setDragStart({ x: worldMouseX - node.position.x, y: worldMouseY - node.position.y });
      } else {
        // Fallback: no container ref, assume no pan/zoom
        setDragStart({ x: 0, y: 0 });
      }
      
      // Stop auto arrange if it's running
      if (isAutoArrangeOn) {
        wasAutoArrangeOn.current = true;
        setIsAutoArrangeOn(false);
      }
      
      return currentNodes;
    });
  };

  // Handle node drag
  const handleNodeMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    if (isDragging && draggedNode) {
      setNodes(prevNodes => {
        const node = prevNodes.find(n => n.id === draggedNode);
        if (!node) return prevNodes;
        
        // Convert mouse to world coordinates taking current pan/zoom into account
        let newX = node.position.x;
        let newY = node.position.y;
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          const worldMouseX = (mouseX - pan.x) / zoom;
          const worldMouseY = (mouseY - pan.y) / zoom;
          newX = worldMouseX - dragStart.x;
          newY = worldMouseY - dragStart.y;
        }
        
        // Check if mouse moved enough to not be a click
        const moveDistance = Math.sqrt(
          Math.pow(e.clientX - clickStartPos.current.x, 2) + 
          Math.pow(e.clientY - clickStartPos.current.y, 2)
        );
        
        // Increase threshold to make click detection more reliable
        if (moveDistance > 8) {
          wasClick.current = false;
        }
        
        return prevNodes.map(n => 
          n.id === draggedNode 
            ? { ...n, position: { x: newX, y: newY } }
            : n
        );
      });
    }
  }, [isDragging, draggedNode, dragStart, pan, zoom]);

  // Handle node click - add character's relationships or remove node
  const handleNodeClick = useCallback((nodeId) => {
    if (isPinMode) {
      setPinnedNodeIds(prev => {
        const next = new Set(prev);
        if (next.has(nodeId)) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }
        return next;
      });

      // Only pin once, so return to normal mode
      setActiveMode('none');

      return;
    }
    if (isRemoveMode) {
      // Remove mode: remove the clicked node and keep only the largest connected component
      setNodes(currentNodes => {
        const remainingNodes = currentNodes.filter(n => n.id !== nodeId);
        
        // Find the largest connected component among remaining nodes
        const largestComponentIds = findLargestConnectedComponent(remainingNodes, edges);
        
        // Keep only nodes in the largest component
        const filteredNodes = remainingNodes.filter(n => largestComponentIds.includes(n.id));
        
        // Update edges to only show relationships between remaining nodes
        setEdges(currentEdges => {
          const remainingNodeIds = new Set(filteredNodes.map(n => n.id));
          return currentEdges.filter(edge => 
            remainingNodeIds.has(edge.from) && remainingNodeIds.has(edge.to)
          );
        });
        
        // Only remove once, so return to normal mode
        setActiveMode('none');

        return filteredNodes;
      });
      return;
    }
    
    // Normal mode: add character's relationships
    setNodes(currentNodes => {
      
      // Add this character's relationships to the current view
      const characterRelationships = relationshipsData.filter(rel => 
        rel.from === nodeId || rel.to === nodeId
      );
      
      // Get all characters connected to this one
      const connectedCharacterIds = new Set();
      characterRelationships.forEach(rel => {
        connectedCharacterIds.add(rel.from);
        connectedCharacterIds.add(rel.to);
      });
      
      // Find new characters to add (respecting chapter filtering)
      const existingIds = new Set(currentNodes.map(n => n.id));
      const filteredCharacters = filterCharactersByChapter(charactersData, currentChapter);

      const newCharacters = filteredCharacters.filter(char => 
        connectedCharacterIds.has(char.id) && !existingIds.has(char.id)
      );
      
      // Always update edges to show relationships for the clicked character
      // Get the clicked node for positioning new characters
      const clickedNode = currentNodes.find(n => n.id === nodeId);
      if (!clickedNode) return currentNodes;
      
      // Calculate what the updated nodes will be (including any new ones)
      const updatedNodes = newCharacters.length > 0 ? [...currentNodes, ...newCharacters.map((char, index) => {
        // Helper function to calculate position for this character
        const calculatePosition = () => {
          let attempts = 0;
          const minDistance = 120; // Increased minimum distance between nodes
          
          do {
            const angle = (index * 2 * Math.PI) / newCharacters.length + (attempts * 0.3);
            const radius = 150 + (attempts * 25); // Start with larger radius and increase more
            const x = clickedNode.position.x + radius * Math.cos(angle);
            const y = clickedNode.position.y + radius * Math.sin(angle);
            attempts++;
            
            // Check if this position overlaps with any existing node
            const overlaps = currentNodes.some(existingNode => {
              const dx = existingNode.position.x - x;
              const dy = existingNode.position.y - y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              return distance < minDistance;
            });
            
            if (!overlaps || attempts > 15) break; // More attempts and stop if no overlap
          } while (attempts <= 15);
          
          // Return the final calculated position
          const finalAngle = (index * 2 * Math.PI) / newCharacters.length + ((attempts - 1) * 0.3);
          const finalRadius = 150 + ((attempts - 1) * 25);
          return {
            x: clickedNode.position.x + finalRadius * Math.cos(finalAngle),
            y: clickedNode.position.y + finalRadius * Math.sin(finalAngle)
          };
        };
        
                 const position = calculatePosition();
         const relationshipCount = getRelationshipCount(char.id);
         const importance = calculateCharacterImportance(char);
         const size = scaleSizeByImportance ? getNodeSize(importance, false) : 30;
         return {
           id: char.id,
           name: char.name,
           role: char.role,
           group: char.group,
           position: position,
           color: getGroupColor(char.group, relationshipCount),
           relationshipCount,
           importance,
           size,
           isFocused: false
         };
      })] : currentNodes;
             
      // Update edges to show ALL relationships between visible characters
      setEdges(currentEdges => {
        const existingEdgeIds = new Set(currentEdges.map(e => e.id));
        
        // Get all characters that will be visible after adding new ones
        const allVisibleIds = new Set(updatedNodes.map(n => n.id));
        
        // Find all relationships between visible characters
        const allVisibleRelationships = relationshipsData.filter(rel => 
          allVisibleIds.has(rel.from) && allVisibleIds.has(rel.to)
        );
                
        // Filter by chapter if needed
        const filteredRelationships = filterRelationshipsByChapter(allVisibleRelationships, currentChapter);
        
        const newEdges = filteredRelationships
          .filter(rel => {
            // Check if we already have any edge between these two characters
            const baseEdgeId = `${rel.from}-${rel.to}`;
            const hasExistingEdge = Array.from(existingEdgeIds).some(existingId => 
              existingId.startsWith(baseEdgeId)
            );
            return !hasExistingEdge;
          })
          .map((relationship, index) => ({
            id: `${relationship.from}-${relationship.to}-${Date.now()}-${index}`,
            from: relationship.from,
            to: relationship.to,
            type: relationship.type,
            color: getRelationshipColor(relationship.type),
            label: formatRelationshipType(relationship.type)
          }));
        
        // Always update edges, even if no new characters were added
        if (newEdges.length > 0) {
          return [...currentEdges, ...newEdges];
        } else {
          return currentEdges;
        }
      });
      
      return updatedNodes;
    });
  }, [isPinMode, isRemoveMode, edges, relationshipsData, charactersData, currentChapter, findLargestConnectedComponent, getRelationshipCount, getGroupColor, filterRelationshipsByChapter, filterCharactersByChapter, getRelationshipColor, formatRelationshipType, calculateCharacterImportance, getNodeSize, scaleSizeByImportance]);

  // Handle node drag end
  const handleNodeMouseUp = useCallback((e, nodeId) => {
    if (isDragging) {
      setIsDragging(false);
      setDraggedNode(null);
      
      // Restore auto arrange if it was on before dragging
      if (wasAutoArrangeOn.current) {
        setIsAutoArrangeOn(true);
        wasAutoArrangeOn.current = false;
      }
    }
    
    // Handle click to add relationships
    if (wasClick.current && nodeId) {
      handleNodeClick(nodeId);
    }
  }, [isDragging, handleNodeClick]);

  // Handle pan
  const handleMouseDown = (e) => {
    if (e.target === svgRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || draggedNode) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setPan(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, draggedNode, dragStart]);

  const handleMouseUp = () => {
    if (!draggedNode) {
      setIsDragging(false);
    }
  };

  // Handle zoom
  const handleWheel = useCallback((e) => {
    
    // Get the container's bounding rectangle
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the container
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    // Calculate mouse position relative to the current pan and zoom
    const worldMouseX = (mouseX - pan.x) / zoom;
    const worldMouseY = (mouseY - pan.y) / zoom;
    
    // Calculate zoom factor
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.min(Math.max(zoom * delta, 0.5), 2);
    
    // Calculate new pan to keep the mouse position fixed
    const newPanX = mouseX - worldMouseX * newZoom;
    const newPanY = mouseY - worldMouseY * newZoom;
    
    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  }, [pan, zoom]);

  // Attach non-passive wheel listener so we can preventDefault and avoid page scroll
  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;
    const nativeListener = (event) => {
      // prevent page scroll and then run zoom logic
      event.preventDefault();
      handleWheel(event);
    };
    ref.addEventListener('wheel', nativeListener, { passive: false });
    return () => {
      try {
        ref.removeEventListener('wheel', nativeListener, { passive: false });
      } catch (_) {
        // ignore
      }
    };
  }, [handleWheel]);

  // Focus on character - clears everything and shows just that character
  const focusOnCharacter = (characterId) => {
    // Respect chapter filter to avoid spoilers
    if (characterId) {
      const allowedCharacters = filterCharactersByChapter(charactersData, currentChapter);
      const allowedIds = new Set(allowedCharacters.map(c => c.id));
      if (!allowedIds.has(characterId)) {
        return; // Ignore selection outside allowed range
      }
    }
    // Only clear if we're actually changing focus, not during initial load
    if (focusedCharacter !== characterId) {
      setFocusedCharacter(characterId);
      // Clear all nodes and edges when changing focus
      setNodes([]);
      setEdges([]);
      
      // Center the view on the new character
      setZoom(1);
      // Center the character in the middle of the screen
      // The character will be positioned at (400, 300) in initializeNodes
      // So we need to pan to center it in the container
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const characterX = 400; // This matches the centerX in initializeNodes
        const characterY = 300; // This matches the centerY in initializeNodes
        
        // Calculate pan to center the character
        const newPanX = centerX - characterX;
        const newPanY = centerY - characterY;
        
        setPan({ x: newPanX, y: newPanY });
      }
    }
  };

  // Show all characters and relationships up to current chapter
  const showAllUpToChapter = () => {
    // Expand the current view as if we had clicked every visible node to reveal all
    // characters and relationships up to the selected chapter, without changing focus

    const allowedCharacters = filterCharactersByChapter(charactersData, currentChapter);
    const allowedById = new Map(allowedCharacters.map(c => [c.id, c]));
    const allowedIds = new Set(allowedCharacters.map(c => c.id));
    const filteredRels = filterRelationshipsByChapter(relationshipsData, currentChapter)
      .filter(rel => allowedIds.has(rel.from) && allowedIds.has(rel.to));

    // Build adjacency map
    const adjacency = new Map(); // id -> Set(neighborId)
    filteredRels.forEach(rel => {
      if (!adjacency.has(rel.from)) adjacency.set(rel.from, new Set());
      if (!adjacency.has(rel.to)) adjacency.set(rel.to, new Set());
      adjacency.get(rel.from).add(rel.to);
      adjacency.get(rel.to).add(rel.from);
    });

    // Start from current nodes; if empty, seed with focused character (if any and allowed)
    let updatedNodes = [...nodes];
    let existingIds = new Set(updatedNodes.map(n => n.id));

    const centerX = 400;
    const centerY = 300;

    const addNodeWithPositionNear = (anchorNode, characterId, neighborIndex = 0) => {
      const character = allowedById.get(characterId);
      if (!character) return null;
      const relationshipCount = getRelationshipCount(characterId);
      const importance = calculateCharacterImportance(character);
      const size = scaleSizeByImportance ? getNodeSize(importance, false) : 30;

      // Place around anchor using a spread angle and radius increasing with neighborIndex
      const angle = (neighborIndex * 2 * Math.PI) / Math.max(1, (adjacency.get(anchorNode.id)?.size || 1));
      const radius = 150 + (neighborIndex * 25);
      const x = anchorNode.position.x + radius * Math.cos(angle);
      const y = anchorNode.position.y + radius * Math.sin(angle);

      return {
        id: character.id,
        name: character.name,
        role: character.role,
        group: character.group,
        position: { x, y },
        color: getGroupColor(character.group, relationshipCount),
        relationshipCount,
        importance,
        size,
        isFocused: false
      };
    };

    if (updatedNodes.length === 0) {
      const seedId = (focusedCharacter && allowedIds.has(focusedCharacter))
        ? focusedCharacter
        : (allowedCharacters[0]?.id || null);
      if (seedId) {
        const seedChar = allowedById.get(seedId);
        const relationshipCount = getRelationshipCount(seedId);
        const importance = calculateCharacterImportance(seedChar);
        const size = scaleSizeByImportance ? getNodeSize(importance, true) : 30;
        updatedNodes.push({
          id: seedChar.id,
          name: seedChar.name,
          role: seedChar.role,
          group: seedChar.group,
          position: { x: centerX, y: centerY },
          color: getGroupColor(seedChar.group, relationshipCount),
          relationshipCount,
          importance,
          size,
          isFocused: true
        });
        existingIds.add(seedId);
      }
    }

    // Iteratively add neighbors of all present nodes until closure over allowed set
    let safety = allowedCharacters.length + 5;
    while (safety-- > 0) {
      let addedAny = false;
      // Snapshot current nodes length at each pass
      const snapshotNodes = [...updatedNodes];
      for (let i = 0; i < snapshotNodes.length; i++) {
        const anchor = snapshotNodes[i];
        const neighbors = Array.from(adjacency.get(anchor.id) || []);
        let localIndex = 0;
        for (const neighborId of neighbors) {
          if (!existingIds.has(neighborId) && allowedIds.has(neighborId)) {
            const newNode = addNodeWithPositionNear(anchor, neighborId, localIndex);
            if (newNode) {
              updatedNodes.push(newNode);
              existingIds.add(neighborId);
              addedAny = true;
              localIndex++;
            }
          }
        }
      }
      if (!addedAny) break;
    }

    // Some allowed characters might still be missing (disconnected components). Place them in a circle around center.
    const missingIds = Array.from(allowedIds).filter(id => !existingIds.has(id));
    if (missingIds.length > 0) {
      const radius = 250;
      missingIds.forEach((id, idx) => {
        const character = allowedById.get(id);
        if (!character) return;
        const relationshipCount = getRelationshipCount(id);
        const importance = calculateCharacterImportance(character);
        const size = scaleSizeByImportance ? getNodeSize(importance, false) : 30;
        const angle = (idx * 2 * Math.PI) / missingIds.length;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        updatedNodes.push({
          id: character.id,
          name: character.name,
          role: character.role,
          group: character.group,
          position: { x, y },
          color: getGroupColor(character.group, relationshipCount),
          relationshipCount,
          importance,
          size,
          isFocused: false
        });
      });
    }

    // Commit nodes
    setNodes(updatedNodes);

    // Build edges among all visible nodes
    const visibleIds = new Set(updatedNodes.map(n => n.id));
    const newEdges = filteredRels
      .filter(rel => visibleIds.has(rel.from) && visibleIds.has(rel.to))
      .map((relationship, index) => ({
        id: `${relationship.from}-${relationship.to}-${index}`,
        from: relationship.from,
        to: relationship.to,
        type: relationship.type,
        color: getRelationshipColor(relationship.type),
        label: formatRelationshipType(relationship.type)
      }));

    setEdges(newEdges);
  };

  // Reset view
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    // Don't reset currentChapter - keep the chapter filter active
    setNodes([]);
    setEdges([]);
    setIsAutoArrangeOn(false);
    // Keep the current focused character, don't change it
    // Don't reset full screen mode
    
    // Force re-initialization by calling initializeNodes directly
    // This avoids the flash of all characters
    setTimeout(() => {
      initializeNodes();
      
      // Center the view on the focused character after initialization
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const centerX = containerWidth / 2;
        const centerY = containerHeight / 2;
        const characterX = 400; // This matches the centerX in initializeNodes
        const characterY = 300; // This matches the centerY in initializeNodes
        
        // Calculate pan to center the character
        const newPanX = centerX - characterX;
        const newPanY = centerY - characterY;
        
        setPan({ x: newPanX, y: newPanY });
      }
    }, 0);
  };

  // Clear all local graph state when the book changes
  useEffect(() => {
    if (previousBookKeyRef.current !== currentBookKey) {
      // Reset internal component state related to graph/filters
      setNodes([]);
      setEdges([]);
      // Keep graph empty until user interacts after book change
      suppressAutoFocusRef.current = true;
      setFocusedCharacter(null);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setIsAutoArrangeOn(false);
      setPinnedNodeIds(new Set());
      setAutoPinnedNodeIds(new Set());
      setHoveredNode(null);
      setActiveMode('none');
      setCurrentChapter(null);

      // Stop any ongoing animations
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (sizeAnimationFrameRef.current) {
        cancelAnimationFrame(sizeAnimationFrameRef.current);
        sizeAnimationFrameRef.current = null;
      }
      sizeAnimationActiveRef.current = false;
      sizeAnimationVelocitiesRef.current.clear();

      // Update ref to new book key
      previousBookKeyRef.current = currentBookKey;
    }
  }, [currentBookKey, charactersData]);

  // Add event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleNodeMouseMove(e);
    const handleGlobalMouseUp = (e) => {
      // If we were dragging a node, handle the mouse up on that node
      if (draggedNode) {
        handleNodeMouseUp(e, draggedNode);
      }
      
      if (isDragging) {
        setIsDragging(false);
        setDraggedNode(null);
        
        // Restore auto arrange if it was on before dragging
        if (wasAutoArrangeOn.current) {
          setIsAutoArrangeOn(true);
          wasAutoArrangeOn.current = false;
        }
      }
    };

    // Global wheel event handler to prevent scrolling when over the relationship web
    const handleGlobalWheel = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    // Add global wheel listener with passive: false to ensure preventDefault works
    document.addEventListener('wheel', handleGlobalWheel, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('wheel', handleGlobalWheel);
    };
  }, [isDragging, draggedNode, handleNodeMouseMove, handleNodeMouseUp]);

  // Handle window resize to keep focused character centered
  useEffect(() => {
    let previousContainerWidth = 0;
    let previousContainerHeight = 0;
    
    const handleResize = () => {
      // Only adjust view if we have a focused character and nodes are visible
      if (focusedCharacter && nodes.length > 0 && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // If this is the first resize, just save the dimensions
        if (previousContainerWidth === 0) {
          previousContainerWidth = containerWidth;
          previousContainerHeight = containerHeight;
          return;
        }
        
        // Calculate the difference in container dimensions
        const widthDifference = containerWidth - previousContainerWidth;
        const heightDifference = containerHeight - previousContainerHeight;
        
        // Pan by half the difference to keep the character centered
        setPan(prevPan => ({
          x: prevPan.x + (widthDifference / 2),
          y: prevPan.y + (heightDifference / 2)
        }));
        
        // Update the previous dimensions for next resize
        previousContainerWidth = containerWidth;
        previousContainerHeight = containerHeight;
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [focusedCharacter, nodes.length]);

  return (
    <div 
      className={`relationship-web ${isFullPage ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}
    >
      {!isFullPage && (
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Explore character connections. Drag nodes to rearrange, select a character to focus, and choose a chapter to avoid spoilers.
          </p>
        </div>
      )}

      {/* Controls */}
      <div className={`${isFullPage ? 'p-4' : 'mb-4'} grid grid-cols-1 md:[grid-template-columns:minmax(0,1fr)_auto] gap-4`}>
        <div className="min-w-0">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Focus on Character
          </label>
          <select
            className="w-full min-w-0 p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={focusedCharacter || ''}
            onChange={(e) => focusOnCharacter(e.target.value || null)}
          >
            {filterCharactersByChapter(charactersData, currentChapter).map(character => (
              <option key={character.id} value={character.id}>
                {character.name} ({character.group})
              </option>
            ))}
          </select>
        </div>

        {/* Removed local chapter dropdown – now controlled globally from the tab bar */}


        <div className="flex flex-wrap gap-2 items-end md:w-max md:justify-self-start">
        <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex-shrink-0"
              onClick={showAllUpToChapter}
              title="Show all characters and relationships up to the selected chapter"
            >
              <span className="whitespace-pre leading-tight text-center">{`Show\nAll`}</span>
            </button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex-shrink-0"
            onClick={resetView}
            title="Reset zoom, pan, and focus to defaults"
          >
            <span className="whitespace-pre leading-tight text-center">{`Reset\nView`}</span>
          </button>

          <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex-shrink-0"
              onClick={() => {
                if (nodes.length === 0) return;
                
                // Calculate the bounding box of all current nodes
                const minX = Math.min(...nodes.map(n => n.position.x));
                const maxX = Math.max(...nodes.map(n => n.position.x));
                const minY = Math.min(...nodes.map(n => n.position.y));
                const maxY = Math.max(...nodes.map(n => n.position.y));
                
                // Add some padding around the nodes
                const padding = 100;
                const nodeWidth = maxX - minX + padding * 2;
                const nodeHeight = maxY - minY + padding * 2;
                
                // Get the container dimensions
                const containerWidth = containerRef.current.clientWidth;
                const containerHeight = containerRef.current.clientHeight;
                
                // Calculate the zoom level needed to fit all nodes
                const scaleX = containerWidth / nodeWidth;
                const scaleY = containerHeight / nodeHeight;
                const newZoom = Math.min(scaleX, scaleY, 2); // Cap zoom at 2x
                
                // Calculate the center of the nodes
                const centerX = (minX + maxX) / 2;
                const centerY = (minY + maxY) / 2;
                
                // Calculate the center of the container
                const containerCenterX = containerWidth / 2;
                const containerCenterY = containerHeight / 2;
                
                // Calculate the pan needed to center the nodes
                const newPanX = containerCenterX - centerX * newZoom;
                const newPanY = containerCenterY - centerY * newZoom;
                
                // Apply the new zoom and pan
                setZoom(newZoom);
                setPan({ x: newPanX, y: newPanY });
              }}
              title="Zoom and center so all visible nodes fit in view"
            >
              <span className="whitespace-pre leading-tight text-center">{`Fit to\nView`}</span>
            </button>

          <button
            className={`flex-shrink-0 px-4 py-2 text-white rounded transition-colors ${
              isAutoArrangeOn 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
            onClick={() => setIsAutoArrangeOn(!isAutoArrangeOn)}
            title="Toggle automatic layout of nodes"
          >
            <span className="whitespace-pre leading-tight text-center">{`Auto\narrange`}</span>
          </button>

          <button
            className={`flex-shrink-0 px-4 py-2 text-white rounded transition-colors ${
              isPinMode
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
            onClick={() => setActiveMode(prev => (prev === 'pin' ? 'none' : 'pin'))}
            title="Toggle pin mode (click nodes to pin/unpin)"
          >
            <span className="whitespace-pre leading-tight text-center">{`Pin\nMode`}</span>
          </button>

          {/* Removed Pin Isolated toggle */}

          <button
            className={`flex-shrink-0 px-4 py-2 text-white rounded transition-colors ${
              isRemoveMode 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
            onClick={() => setActiveMode(prev => (prev === 'remove' ? 'none' : 'remove'))}
            title="Toggle remove mode (click nodes to remove)"
          >
            <span className="whitespace-pre leading-tight text-center">{`Remove\nMode`}</span>
          </button>

          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors flex-shrink-0"
            title="Step-by-step tutorial for this page"
            onClick={() => setIsTutorialOpen(true)}
          >
            <span className="whitespace-pre leading-tight text-center">{`Page\nTutorial`}</span>
          </button>

          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors flex-shrink-0"
                  title="How to use the Relationship Web"
                  onClick={() => {
                                         alert(`How to use the Relationship Web:

 • Start by selecting a character to focus on their relationships
 • Choose a chapter to avoid spoilers
 • Drag characters to rearrange, or use "Auto Arrange" for automatic layout
 • Click on any character to view their details and add their relationships
 • Use mouse wheel to zoom, and drag the background to pan
 • Toggle "Remove Mode" to click and remove characters (only the largest connected component will be kept)
 • Use "Fit to View" to see all characters at once
 • Use the full screen button (↗) for maximum viewing area
 • Toggle "Size by Importance" to make important characters larger`);
                  }}
                >
            <span className="whitespace-pre leading-tight text-center">{`ℹ️\nHelp`}</span>
            
                </button>



        </div>
      </div>




      {/* Main Content Area with Left Panel and Map */}
      <div className="flex gap-4">
        {/* Left Panel */}
        <div className="w-48 flex-shrink-0">
          <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 p-4 h-full" style={{ height: isFullPage ? 'calc(100vh - 95px)' : '840px' }}>

            {/* Physics Controls */}
            <div className="mb-6">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-gray-600 dark:text-gray-400">
                      Spring Force
                    </label>
                    <span className="text-xs text-gray-500">{springForce}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="1"
                    value={springForce}
                    onChange={(e) => setSpringForce(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-gray-600 dark:text-gray-400">
                      Repulsion Force
                    </label>
                    <span className="text-xs text-gray-500">{repulsionForce}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="100"
                    value={repulsionForce}
                    onChange={(e) => setRepulsionForce(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* View Options */}
            <div className="mb-6">
              <div>
                <label className="block text-m font-medium text-gray-700 dark:text-gray-300 mb-2">
                  View Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showDescription}
                      onChange={(e) => setShowDescription(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Description</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showRelationship}
                      onChange={(e) => setShowRelationship(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Relationship</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showNumber}
                      onChange={(e) => {
                        setShowNumber(e.target.checked);
                        if (e.target.checked) setShowImportance(false);
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Relationship Count</span>
                  </label>
                                     <label className="flex items-center">
                     <input
                       type="checkbox"
                       checked={showImportance}
                       onChange={(e) => {
                         setShowImportance(e.target.checked);
                         if (e.target.checked) setShowNumber(false);
                       }}
                       className="mr-2"
                     />
                     <span className="text-sm text-gray-700 dark:text-gray-300">Importance Rating</span>
                   </label>
                   <label className="flex items-center">
                     <input
                       type="checkbox"
                       checked={scaleSizeByImportance}
                       onChange={(e) => {
                         setScaleSizeByImportance(e.target.checked);
                         if (nodes && nodes.length > 0) {
                           if (sizeAnimationFrameRef.current) {
                             cancelAnimationFrame(sizeAnimationFrameRef.current);
                             sizeAnimationFrameRef.current = null;
                           }
                           sizeAnimationActiveRef.current = false;
                           sizeAnimationVelocitiesRef.current.clear();
                           setNodes(currentNodes => currentNodes.map(node => {
                             const newTarget = e.target.checked ? getNodeSize(node.importance, node.isFocused) : 30;
                             const currentRendered = node.animatedSize != null ? node.animatedSize : (node.size != null ? node.size : 30);
                             return { ...node, animatedSize: currentRendered, size: newTarget };
                           }));
                           if (typeof window !== 'undefined' && window.requestAnimationFrame) {
                             window.requestAnimationFrame(() => startSizeAnimation());
                           } else {
                             startSizeAnimation();
                           }
                         }
                       }}
                       className="mr-2"
                     />
                     <span className="text-sm text-gray-700 dark:text-gray-300">Size is Importance</span>
                   </label>
                </div>
              </div>
            </div>


            {/* Character Groups Key */}
            <div className="mb-6">

              <label className="block text-m font-medium text-gray-700 dark:text-gray-300 mb-2">
                 Character Groups
              </label>

              <div className="space-y-2">
                {Object.keys(groupColors).map(group => (
                  <div key={group} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: getGroupColor(group) }}
                    ></div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{group}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Relationship Types Key */}
            {relationshipLegendItems.length > 0 && (
              <div className="mb-6">
                <label className="block text-m font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relationship Types
                </label>
                <div className="space-y-2">
                  {relationshipLegendItems.map(item => (
                    <div key={item.label} className="flex items-center">
                      <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Relationship Graph */}
        <div className="flex-1">
          <div 
            ref={containerRef}
            className={`border border-gray-200 dark:border-gray-700 rounded overflow-hidden bg-white dark:bg-gray-800 relative ${
              isFullPage ? 'flex-1' : ''
            }`}
            style={{ 
              height: isFullPage ? 'calc(100vh - 95px)' : '840px'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            // Wheel handled via non-passive native listener to allow preventDefault
          >
            {/* FPS Overlay */}
            {showFps && (
              <div className="absolute left-4 top-4 z-10 px-2 py-1 rounded text-xs font-mono flex items-center gap-2" style={{ background: darkMode ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)', color: darkMode ? '#fff' : '#111', border: darkMode ? '1px solid #444' : '1px solid #ddd' }}>
                <span style={{ minWidth: 16, textAlign: 'right' }}>{fps}</span>
                <svg width="80" height="40" viewBox="0 0 80 20">
                  {
                    (() => {
                      const values = fpsHistory;
                      const maxFps = 60; // assume 60hz cap
                      const barWidth = 2;
                      const gap = 0;
                      const capacity = Math.floor(80 / (barWidth + gap));
                      const recent = values.slice(-capacity);
                      const startX = 80 - recent.length * (barWidth + gap);
                      return recent.map((v, i) => {
                        const clamped = Math.max(0, Math.min(maxFps, v || 0));
                        const h = Math.max(1, Math.round((clamped / maxFps) * 38));
                        const x = startX + i * (barWidth + gap);
                        const y = 30 - h;
                        const fill = darkMode ? '#777788' : '#0ea5e9';
                        return (
                          <rect key={i} x={x} y={y} width={barWidth} height={h} fill={fill} />
                        );
                      });
                    })()
                  }
                </svg>
              </div>
            )}
            {/* Full Screen Button */}
            <button
              className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsFullPage(!isFullPage)}
              title={isFullPage ? 'Exit Full Screen' : 'Enter Full Screen'}
            >
              {isFullPage ? (
                // Exit full screen - arrows pointing inward
                <svg width="20" height="20" viewBox="0 0 330 330" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                  <g>
                  <path d="M 134.897 30.362 C 126.613 30.362 119.897 37.078 119.897 45.362 L 119.897 99.147 L 25.505 4.755 C 19.648 -1.103 10.15 -1.103 4.292 4.755 C -1.566 10.613 -1.566 20.11 4.292 25.968 L 98.682 120.358 L 44.896 120.362 C 36.612 120.362 29.896 127.079 29.897 135.363 C 29.898 143.647 36.614 150.362 44.898 150.362 L 134.898 150.356 C 143.182 150.356 149.897 143.64 149.897 135.356 L 149.897 45.362 C 149.897 37.078 143.181 30.362 134.897 30.362 Z"/>
                  <path d="M 194.665 300.225 C 202.949 300.225 209.665 293.509 209.665 285.225 L 209.665 231.44 L 304.057 325.832 C 306.986 328.761 310.825 330.226 314.663 330.226 C 318.502 330.226 322.341 328.762 325.27 325.832 C 331.128 319.974 331.128 310.477 325.27 304.619 L 230.88 210.229 L 284.666 210.225 C 292.95 210.225 299.666 203.508 299.665 195.224 C 299.664 186.94 292.948 180.225 284.664 180.225 L 194.664 180.231 C 186.38 180.231 179.665 186.947 179.665 195.231 L 179.665 285.225 C 179.665 293.509 186.381 300.225 194.665 300.225 Z"/>
                  <path d="M 303.77 3.972 L 209.38 98.362 L 209.376 44.576 C 209.376 36.292 202.659 29.577 194.375 29.577 C 186.091 29.577 179.376 36.294 179.376 44.578 L 179.382 134.578 C 179.382 142.862 186.098 149.577 194.382 149.577 L 284.376 149.577 C 292.66 149.577 299.376 142.861 299.376 134.577 C 299.376 126.293 292.66 119.577 284.376 119.577 L 230.591 119.577 L 324.983 25.185 C 330.841 19.327 330.841 9.83 324.983 3.972 C 319.125 -1.886 309.627 -1.886 303.77 3.972 Z"/>
                  <path d="M 15.272 330.019 C 19.111 330.019 22.95 328.555 25.878 325.625 L 120.268 231.235 L 120.272 285.023 C 120.273 293.307 126.989 300.023 135.273 300.022 C 143.557 300.021 150.273 293.305 150.272 285.021 L 150.266 195.021 C 150.265 186.737 143.55 180.022 135.266 180.022 L 45.272 180.022 C 36.988 180.022 30.272 186.738 30.272 195.022 C 30.272 203.306 36.988 210.022 45.272 210.022 L 99.056 210.022 L 4.665 304.413 C -1.193 310.271 -1.193 319.768 4.665 325.626 C 7.594 328.555 11.433 330.019 15.272 330.019 Z"/>
                  </g>
                </svg>
              ) : (
                // Enter full screen - arrows pointing outward
                <svg width="20" height="20" viewBox="0 0 330 330" fill="currentColor" className="text-gray-700 dark:text-gray-300">
                  <g>
                 
                  <path d="M315,210c-8.284,0-15,6.716-15,15v53.785l-94.392-94.392c-5.857-5.858-15.355-5.858-21.213,0
		c-5.858,5.858-5.858,15.355,0,21.213l94.39,94.39L224.999,300c-8.284,0-15,6.717-14.999,15.001
		c0.001,8.284,6.717,14.999,15.001,14.999l90-0.006c8.284,0,14.999-6.716,14.999-15V225C330,216.716,323.284,210,315,210z"/>
	<path d="M15,120c8.284,0,15-6.716,15-15V51.215l94.392,94.392c2.929,2.929,6.768,4.394,10.606,4.394
		c3.839,0,7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213l-94.39-94.39L105.001,30c8.284,0,15-6.717,14.999-15.001
		S113.283,0,104.999,0l-90,0.006C6.715,0.006,0,6.722,0,15.006V105C0,113.284,6.716,120,15,120z"/>
	<path d="M124.394,184.395l-94.39,94.39L30,224.999c0-8.284-6.717-14.999-15.001-14.999S0,216.717,0,225.001l0.006,90
		c0,8.284,6.716,14.999,15,14.999H105c8.284,0,15-6.716,15-15s-6.716-15-15-15H51.215l94.392-94.392
		c5.858-5.858,5.858-15.355,0-21.213C139.749,178.537,130.251,178.537,124.394,184.395z"/>
	<path d="M195,149.997c3.839,0,7.678-1.464,10.606-4.394l94.39-94.39L300,105.001c0.001,8.284,6.717,15,15.001,14.999
		c8.284-0.001,15-6.717,14.999-15.001l-0.006-90C329.993,6.715,323.278,0,314.994,0H225c-8.284,0-15,6.716-15,15s6.716,15,15,15
		h53.784l-94.391,94.391c-5.858,5.858-5.858,15.355,0,21.213C187.322,148.533,191.161,149.997,195,149.997z"/>
                  </g>
                </svg>
              )}
            </button>            
            <svg
              ref={svgRef}
              width="100%"
              height="100%"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <defs>
              <marker
                  id="arrow-end"
                  markerWidth="10"
                  markerHeight="8"
                  refX="4"
                  refY="2"
                  orient="auto"
                >
                  <polygon points="0 0, 6 2, 0 4" fill="context-stroke" />
                </marker>
                <marker
                  id="arrow-start"
                  markerWidth="10"
                  markerHeight="8"
                  refX="4"
                  refY="2"
                  orient="auto-start-reverse"
                >
                  <polygon points="0 0, 6 2, 0 4" fill="context-stroke" />
                </marker>
              </defs>
              {/* Transform for zoom and pan */}
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Edges */}
                                 {edges.map((edge) => {
                   const sourceNode = nodes.find(n => n.id === edge.from);
                   const targetNode = nodes.find(n => n.id === edge.to);
                   
                   if (!sourceNode || !targetNode) return null;
                   
                   const sourceRadius = (sourceNode.animatedSize ?? sourceNode.size ?? 30);
                   const targetRadius = (targetNode.animatedSize ?? targetNode.size ?? 30);
                  
                  // Calculate angle between nodes
                  const dx = targetNode.position.x - sourceNode.position.x;
                  const dy = targetNode.position.y - sourceNode.position.y;
                  const angle = Math.atan2(dy, dx);
                  
                   // Calculate start and end points (on the edge of the circles, but inset by 4 pixels becuase of the arrowheads)
                   const startX = sourceNode.position.x + (sourceRadius + 4) * Math.cos(angle);
                   const startY = sourceNode.position.y + (sourceRadius + 4) * Math.sin(angle);
                   const endX = targetNode.position.x - (targetRadius + 4) * Math.cos(angle);
                   const endY = targetNode.position.y - (targetRadius + 4) * Math.sin(angle);

                   
                  // Calculate label position (middle of the line)
                  const labelX = (startX + endX) / 2;
                  const labelY = (startY + endY) / 2;
                  
                  return (
                    <g key={edge.id}>
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke={edge.color}
                        strokeWidth="2"
                        markerEnd="url(#arrow-end)"
                        markerStart="url(#arrow-start)"
                      />
                       {/* Relationship label - show if showRelationship is true OR hovering over either connected node */}
                       {(showRelationship || hoveredNode === edge.from || hoveredNode === edge.to) && (
                        <>
                          {/* Background rectangle with dynamic width - tight to text */}
                          <rect
                            x={labelX - getTextWidth(edge.label) / 2}
                            y={labelY - 8}
                            width={getTextWidth(edge.label)}
                            height="16"
                            fill={darkMode ? "rgb(34, 33, 33)" : "rgba(255, 255, 255, 0.9)"}
                            stroke={edge.color}
                            strokeWidth="1"
                            rx="3"
                          />
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fill={getTextColor(darkMode)}
                            className="select-none font-medium"
                            style={{
                              textShadow: darkMode
                                ? '1px 1px 2px rgba(0,0,0,0.8)'
                                : '1px 1px 2px rgba(255,255,255,0.8)'
                            }}
                          >
                            {edge.label}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {nodes.map(node => (
                  <g key={node.id}>
                                                              <circle
                        cx={node.position.x}
                        cy={node.position.y}
                        r={node.animatedSize ?? node.size ?? 30}
                        fill={node.color}
                        stroke={getNodeStrokeColor(darkMode, node.id)}
                        strokeWidth={2}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      {/* Pin icon overlay if node is pinned */}
                      { (pinnedNodeIds.has(node.id) || autoPinnedNodeIds.has(node.id)) && (
                        <g transform={`translate(${node.position.x + (node.animatedSize ?? node.size ?? 30) * 0.3}, ${node.position.y - (node.animatedSize ?? node.size ?? 30) * 1.0})`} pointerEvents="none">
                          {/* Scale the provided 512x512 SVG to a small overlay relative to node size */}
                          <g transform={`scale(${10 / 256})`}>
                            <path fill="#C0392B" d="M394.6,81.1L161.5,314.3l18.1,18.1l115,115c9.5-30.7,12.6-63,7.1-93.7L445,210.3c22.1,0,45.7-4.7,67-11.8l-99.2-99.2L394.6,81.1z"/>
                            <polygon fill="#BDC3C7" points="161.5,314.3 125.2,350.5 53.6,422.2 18.1,458.4 0,512 36.2,475.8 143.4,368.6 179.6,332.4 "/>
                            <polygon fill="#7F8C8D" points="179.6,332.4 143.4,368.6 71.7,440.3 36.2,475.8 0,512 53.6,493.9 89.8,458.4 161.5,386.8 197.7,350.5 "/>
                            <path fill="#E74C3C" d="M313.5,0c-7.1,21.3-12.6,44.9-11.8,67L157.5,210.3c-29.9-5.5-63-2.4-93.7,7.1l115,115L412,99.2 L313.5,0z"/>
                          </g>
                        </g>
                      )}
                                                                                     {/* Number above node - show relationship count OR importance rating */}
                                          {(showNumber || showImportance || hoveredNode === node.id) && (
                                               <text
                          x={node.position.x}
                          y={node.position.y - (node.animatedSize ?? node.size ?? 30) - 10}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill={getContrastTextColor(node.color, darkMode)}
                          className="select-none pointer-events-none"
                          style={{
                            textShadow: darkMode 
                              ? '1px 1px 2px rgba(0,0,0,0.8)' 
                              : '1px 1px 2px rgba(255,255,255,0.8)'
                          }}
                        >
                          {showImportance ? (node.importance || 0) : (node.relationshipCount || 0)}
                        </text>
                     )}                  
                    
                                         {/* Character name - always show with text wrapping */}
                     <text
                       x={node.position.x}
                       y={node.position.y}
                       textAnchor="middle"
                       dominantBaseline="middle"
                       fontSize="12"
                       fontWeight="bold"
                       fill={getTextColor(darkMode)}
                       className="select-none pointer-events-none"
                       style={{
                         textShadow: darkMode 
                           ? '1px 1px 2px rgba(0,0,0,0.8)' 
                           : '1px 1px 2px rgba(255,255,255,0.8)'
                       }}
                     >
                                             {/* Text wrapping for character names */}
                       {(() => {
                                                   const maxWidth = 60 * 1.2; // slightly larger than diameter
                         const words = node.name.split(' ');
                         const lines = [];
                         let currentLine = '';
                         
                         words.forEach(word => {
                           const testLine = currentLine + (currentLine ? ' ' : '') + word;
                           const testWidth = getTextWidth(testLine, 12);
                           
                           if (testWidth <= maxWidth) {
                             currentLine = testLine;
                           } else {
                             if (currentLine) lines.push(currentLine);
                             currentLine = word;
                           }
                         });
                         
                         if (currentLine) lines.push(currentLine);
                         
                         // Calculate total height of all lines to center them on the node
                         const lineHeight = 14; // Slightly larger than fontSize for spacing
                         const totalHeight = lines.length * lineHeight;
                         const startY = -(totalHeight / 2) + (lineHeight / 2);
                         
                         return lines.map((line, index) => (
                           <tspan key={index} x={node.position.x} dy={index === 0 ? startY : 14}>
                             {line}
                           </tspan>
                         ));
                       })()}
                    </text>
                    
                     {/* Character description - show if showDescription is true OR hovering over this node */}
                     {(showDescription || hoveredNode === node.id) && node.role && (
                      <text
                        x={node.position.x}
                        y={node.position.y}
                        textAnchor="middle"
                        fontSize="10"
                        fill={getTextColor(darkMode)}
                        className="select-none pointer-events-none"
                        style={{
                          textShadow: darkMode
                            ? '1px 1px 2px rgba(0,0,0,0.8)'
                            : '1px 1px 2px rgba(255,255,255,0.8)'
                        }}
                      >
                        {/* Text wrapping for character descriptions */}
                        {(() => {
                                                     const maxWidth = 60 * 2;
                          const words = node.role.split(' ');
                          const lines = [];
                          let currentLine = '';
                          
                          words.forEach(word => {
                            const testLine = currentLine + (currentLine ? ' ' : '') + word;
                            const testWidth = getTextWidth(testLine, 10);
                            
                            if (testWidth <= maxWidth) {
                              currentLine = testLine;
                            } else {
                              if (currentLine) lines.push(currentLine);
                              currentLine = word;
                            }
                          });
                          
                          if (currentLine) lines.push(currentLine);
                          
                           // Calculate total height of all lines and position below the node
                           const lineHeight = 12; // Slightly larger than fontSize for spacing
                           const totalHeight = lines.length * lineHeight;
                           const startY = (node.animatedSize ?? node.size ?? 30) + 15; 
                          
                          return lines.map((line, index) => (
                            <tspan key={index} x={node.position.x} dy={index === 0 ? startY : lineHeight}>
                              {line}
                            </tspan>
                          ));
                        })()}
                      </text>
                    )}
                  </g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Page Tutorial Modal */}
      <PageTutorial
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        title={tutorialTitle}
        steps={tutorialSteps}
        darkMode={darkMode}
      />
    </div>
  );
};

export default RelationshipWeb;
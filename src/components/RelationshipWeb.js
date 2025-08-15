import React, { useState, useEffect, useRef, useCallback } from 'react';

const RelationshipWeb = ({ 
  onCharacterSelect, 
  selectedCharacter,
  charactersData,
  relationshipsData,
  eventsData = [], // Add events data for importance calculation
  chaptersData = [], // Add chapters data for filtering
  darkMode = false // Add darkMode prop for theme-aware colors
}) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [focusedCharacter, setFocusedCharacter] = useState('cynthia_childreth'); // Start with main protagonist
  const [draggedNode, setDraggedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isAutoArrangeOn, setIsAutoArrangeOn] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const [springForce, setSpringForce] = useState(100);
  const [repulsionForce, setRepulsionForce] = useState(100000);
  const [isFullPage, setIsFullPage] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  
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

  // Calculate character importance rating (1-100) based on multiple factors
  const calculateCharacterImportance = useCallback((character) => {
    let score = 0;
    
    // Key scenes count (max 30 points)
    if (character.key_scenes) {
      score += Math.min(character.key_scenes.length * 6, 30);
    }
    
      // Event participation (max 25 points)
  const eventCount = (eventsData || []).filter(event => 
    event.characters.some(char => char.characterId === character.id)
  ).length;
    score += Math.min(eventCount * 2.5, 25);
    
    // Relationship count (max 20 points)
    const relationshipCount = relationshipsData.filter(rel => 
      rel.from === character.id || rel.to === character.id
    ).length;
    score += Math.min(relationshipCount * 2, 20);
    
    // Character group bonus (max 15 points)
    switch (character.group) {
      case 'Protagonists':
        score += 15;
        break;
      case 'Fifth Columnists':
        score += 12;
        break;
      case 'German Connection':
        score += 8;
        break;
      case 'Military':
        score += 10;
        break;
      case 'Historical Figures':
        score += 10;
        break;
      case 'Supporting Characters':
        score += 5;
        break;
      default:
        score += 3;
    }
    
    // Development arc bonus (max 10 points)
    if (character.development) {
      score += Math.min(character.development.length * 2.5, 10);
    }
    
    // Ensure score is between 1 and 100
    return Math.max(1, Math.min(100, Math.round(score)));
  }, [relationshipsData, eventsData]);

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

  // Count relationships for a character
  const getRelationshipCount = useCallback((characterId) => {
    return relationshipsData.filter(rel => 
      rel.from === characterId || rel.to === characterId
    ).length;
  }, [relationshipsData]);

  // Get character group color with brightness based on relationship count
  const getGroupColor = useCallback((group, relationshipCount = 0) => {
    // Base colors for each group
    let baseColor;
    switch (group) {
      case 'Protagonists':
        baseColor = '#3182CE'; // blue
        break;
      case 'Fifth Columnists':
        baseColor = '#E53E3E'; // red
        break;
      case 'German Connection':
        baseColor = '#D69E2E'; // yellow/gold
        break;
      case 'Supporting Characters':
        baseColor = '#38A169'; // green
        break;
      case 'Military':
        baseColor = '#4A5568'; // gray-blue
        break;
      case 'Historical Figures':
        baseColor = '#805AD5'; // purple
        break;
      default:
        baseColor = '#718096'; // gray
    }

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
  }, []);

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
    if (!scaleSizeByImportance) {
      return 30; // All nodes same size
    }
    
    // Scale importance (1-100) to size (10-60)
    // Formula: size = 10 + (importance / 100) * 50
    const baseSize = 10 + (importance / 100) * 50;
        
    return Math.max(baseSize, 15); // Minimum size of 15
  }, [scaleSizeByImportance]);

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

  // Get relationship color
  const getRelationshipColor = useCallback((type) => {
    if (type.includes('spouse')) return '#805AD5'; // purple
    if (type.includes('handler') || type.includes('asset')) return '#3182CE'; // blue
    if (type.includes('conspirator')) return '#E53E3E'; // red
    if (type.includes('colleague') || type.includes('partner')) return '#38A169'; // green
    if (type.includes('superior') || type.includes('subordinate')) return '#DD6B20'; // orange
    if (type.includes('friend')) return '#4299E1'; // light blue
    if (type.includes('informant') || type.includes('double-agent')) return '#D53F8C'; // pink
    if (type.includes('enemy') || type.includes('target') || type.includes('victim')) return '#E53E3E'; // red
    return '#718096'; // gray
  }, []);

  // Format relationship type
  const formatRelationshipType = useCallback((type) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' - ');
  }, []);

  // Filter relationships by chapter
  const filterRelationshipsByChapter = useCallback((relationships, chapterId) => {
    if (!chapterId) return relationships;
    
    const chapterIndex = chaptersData.findIndex(ch => ch.id === chapterId);
    if (chapterIndex === -1) return relationships;
    
    // Filter relationships based on when they are introduced
    return relationships.filter(rel => {
      if (rel.introducedInChapter) {
        const relChapterIndex = chaptersData.findIndex(ch => ch.id === rel.introducedInChapter);
        return relChapterIndex <= chapterIndex;
      }
      // If no chapter info, show the relationship
      return true;
    });
  }, [chaptersData]);

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
      const size = getNodeSize(importance, true);
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
      const size = getNodeSize(importance, false);
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
  }, [charactersData, relationshipsData, focusedCharacter, currentChapter, getRelationshipCount, getGroupColor, calculateCharacterImportance, filterCharactersByChapter]); // Add currentChapter and filterCharactersByChapter dependencies

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

    setEdges(newEdges);
  }, [relationshipsData, currentChapter, nodes, filterRelationshipsByChapter, getRelationshipColor, formatRelationshipType]);

  // Initialize graph when focused character or chapter changes
  useEffect(() => {
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
  }, [initializeNodes, currentChapter]);

  // Initialize edges after nodes are set
  useEffect(() => {
    if (nodes.length > 0) {
      initializeEdges();
    }
  }, [nodes, initializeEdges]);

  // Update node sizes when the sizing option changes (without re-initializing)
  useEffect(() => {
    if (nodes.length > 0) {
      setNodes(currentNodes => 
        currentNodes.map(node => ({
          ...node,
          size: getNodeSize(node.importance, node.isFocused)
        }))
      );
    }
  }, [scaleSizeByImportance, getNodeSize, nodes.length]);

  // Sync with external selectedCharacter prop
  useEffect(() => {
    if (selectedCharacter && selectedCharacter.id !== focusedCharacter) {
      // Clear all nodes and edges when changing focus
      setNodes([]);
      setEdges([]);
      setFocusedCharacter(selectedCharacter.id);
    }
  }, [selectedCharacter]);

       // Auto arrange simulation - runs continuously when enabled
    const runAutoArrange = useCallback(() => {
      if (!isAutoArrangeOn) return;
      
      setNodes(currentNodes => {
        if (currentNodes.length === 0) return currentNodes;
        
        const simulation = {
          nodes: currentNodes.map(node => ({
            ...node,
            velocity: { x: 0, y: 0 },
            force: { x: 0, y: 0 }
          })),
          edges: edges,
          
          // Physics constants - use state values
          repulsionForce: repulsionForce,
          springForce: springForce,
          springLength: 120,
          damping: 0.85,
          maxVelocity: 8,
          
          // Run simulation step
          step: function() {
            // Reset forces
            this.nodes.forEach(node => {
              node.force.x = 0;
              node.force.y = 0;
            });
            
            // Repulsion between all nodes (push them apart)
            for (let i = 0; i < this.nodes.length; i++) {
              for (let j = i + 1; j < this.nodes.length; j++) {
                const node1 = this.nodes[i];
                const node2 = this.nodes[j];
                
                const dx = node2.position.x - node1.position.x;
                const dy = node2.position.y - node1.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                
                // Repulsion force (stronger when closer)
                const force = this.repulsionForce / (distance * distance);
                
                node1.force.x -= (dx / distance) * force;
                node1.force.y -= (dy / distance) * force;
                node2.force.x += (dx / distance) * force;
                node2.force.y += (dy / distance) * force;
              }
            }
            
            // Spring attraction along edges (pull connected nodes together)
            this.edges.forEach(edge => {
              const sourceNode = this.nodes.find(n => n.id === edge.from);
              const targetNode = this.nodes.find(n => n.id === edge.to);
              
              if (sourceNode && targetNode) {
                const dx = targetNode.position.x - sourceNode.position.x;
                const dy = targetNode.position.y - sourceNode.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                
                // Spring force (attraction with ideal length)
                const displacement = distance - this.springLength;
                const force = (this.springForce / 1000) * displacement;
                
                sourceNode.force.x += (dx / distance) * force;
                sourceNode.force.y += (dy / distance) * force;
                targetNode.force.x -= (dx / distance) * force;
                targetNode.force.y -= (dy / distance) * force;
              }
            });
            
            // Apply forces to velocities
            this.nodes.forEach(node => {
              node.velocity.x += node.force.x;
              node.velocity.y += node.force.y;
              
              // Apply damping
              node.velocity.x *= this.damping;
              node.velocity.y *= this.damping;
              
              // Limit velocity
              const speed = Math.sqrt(node.velocity.x * node.velocity.x + node.velocity.y * node.velocity.y);
              if (speed > this.maxVelocity) {
                node.velocity.x = (node.velocity.x / speed) * this.maxVelocity;
                node.velocity.y = (node.velocity.y / speed) * this.maxVelocity;
              }
              
              // Update position
              node.position.x += node.velocity.x;
              node.position.y += node.velocity.y;
            });
          }
        };
        
        // Run one step
        simulation.step();
        
        // Schedule next step if still enabled
        if (isAutoArrangeOn && animationRef.current) {
          animationRef.current = requestAnimationFrame(runAutoArrange);
        }
        
        return simulation.nodes;
      });
    }, [isAutoArrangeOn, edges, springForce, repulsionForce]);
  
           // Run auto arrange when enabled
    useEffect(() => {
      if (isAutoArrangeOn) {
        runAutoArrange();
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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
      setDragStart({ x: e.clientX - node.position.x, y: e.clientY - node.position.y });
      
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
        
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
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
  }, [isDragging, draggedNode, dragStart]);

  // Handle node click - add character's relationships or remove node
  const handleNodeClick = useCallback((nodeId) => {
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
         const size = getNodeSize(importance, false);
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
  }, [isRemoveMode, edges, relationshipsData, charactersData, currentChapter, findLargestConnectedComponent, getRelationshipCount, getGroupColor, filterRelationshipsByChapter, filterCharactersByChapter, getRelationshipColor, formatRelationshipType]);

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
  const handleWheel = (e) => {
    e.preventDefault();
    
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
  };

  // Focus on character - clears everything and shows just that character
  const focusOnCharacter = (characterId) => {
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
    // Clear focused character to show all characters up to current chapter
    setFocusedCharacter(null);
    // Clear current view to force re-initialization
    setNodes([]);
    setEdges([]);
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
      <div className={`${isFullPage ? 'p-4' : 'mb-4'} grid grid-cols-1 md:grid-cols-3 gap-4`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Focus on Character
          </label>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={focusedCharacter || ''}
            onChange={(e) => focusOnCharacter(e.target.value || null)}
          >
            {charactersData.map(character => (
              <option key={character.id} value={character.id}>
                {character.name} ({character.group})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Show Up To Chapter
          </label>
          <div className="flex gap-2">
            <select
              className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              value={currentChapter || ''}
              onChange={(e) => setCurrentChapter(e.target.value || null)}
            >
              <option value="">Show All Relationships</option>
              {chaptersData.map((chapter, index) => (
                <option key={chapter.id} value={chapter.id}>
                  {chapter.title}
                </option>
              ))}
            </select>
            <button
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
              onClick={showAllUpToChapter}
              title="Show all characters and relationships up to the selected chapter"
            >
              Show All
            </button>
          </div>
        </div>


        <div className="flex gap-2 items-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={resetView}
          >
            Reset View
          </button>

          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
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
          >
            Fit to View
          </button>
          <button
            className={`px-4 py-2 text-white rounded transition-colors ${
              isAutoArrangeOn 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={() => setIsAutoArrangeOn(!isAutoArrangeOn)}
          >
            {isAutoArrangeOn ? 'Stop Auto Arrange' : 'Start Auto Arrange'}
          </button>
          <button
            className={`px-4 py-2 text-white rounded transition-colors ${
              isRemoveMode 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
            onClick={() => setIsRemoveMode(!isRemoveMode)}
          >
            {isRemoveMode ? 'Exit Remove Mode' : 'Remove Mode'}
          </button>

        </div>
      </div>




      {/* Main Content Area with Left Panel and Map */}
      <div className="flex gap-4">
        {/* Left Panel */}
        <div className="w-48 flex-shrink-0">
          <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 p-4 h-full" style={{ height: isFullPage ? 'calc(100vh - 140px)' : '800px' }}>

            {/* Action Buttons */}
            <div className="mb-6">
              <div className="space-y-2">

                <button
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-s"
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
                  ℹ️ Help
                </button>
              </div>
            </div>
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
            <div className={`${isFullPage ? 'p-4' : 'mb-4'} flex flex-col gap-2`}>
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
                       onChange={(e) => setScaleSizeByImportance(e.target.checked)}
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
                {['Protagonists', 'Fifth Columnists', 'German Connection', 'Supporting Characters', 'Military', 'Historical Figures'].map(group => (
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
            <div className="mb-6">
              <label className="block text-m font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Relationship Types
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#805AD5' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Spouse</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#3182CE' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Handler/Asset</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#E53E3E' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Conspirator/Enemy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#38A169' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Colleague/Partner</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#DD6B20' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Superior/Subordinate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#4299E1' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Friend</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#D53F8C' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Informant/Double-Agent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 flex-shrink-0" style={{ backgroundColor: '#718096' }}></div>
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate">Other</span>
                </div>
              </div>
            </div>

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
              height: isFullPage ? 'calc(100vh - 140px)' : '800px'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
          >
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
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill={darkMode ? "#ccc" : "#666"} />
                </marker>
              </defs>

              {/* Transform for zoom and pan */}
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Edges */}
                                 {edges.map((edge) => {
                   const sourceNode = nodes.find(n => n.id === edge.from);
                   const targetNode = nodes.find(n => n.id === edge.to);
                   
                   if (!sourceNode || !targetNode) return null;
                   
                   const sourceRadius = sourceNode.size || 30;
                   const targetRadius = targetNode.size || 30;
                  
                  // Calculate angle between nodes
                  const dx = targetNode.position.x - sourceNode.position.x;
                  const dy = targetNode.position.y - sourceNode.position.y;
                  const angle = Math.atan2(dy, dx);
                  
                                     // Calculate start and end points (on the edge of the circles)
                   const startX = sourceNode.position.x + sourceRadius * Math.cos(angle);
                   const startY = sourceNode.position.y + sourceRadius * Math.sin(angle);
                   const endX = targetNode.position.x - targetRadius * Math.cos(angle);
                   const endY = targetNode.position.y - targetRadius * Math.sin(angle);
                  
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
                        markerEnd="url(#arrowhead)"
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
                        r={node.size || 30}
                        fill={node.color}
                        stroke={getNodeStrokeColor(darkMode, node.id)}
                        strokeWidth={2}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                                                                                   {/* Number above node - show relationship count OR importance rating */}
                                          {(showNumber || showImportance || hoveredNode === node.id) && (
                                               <text
                          x={node.position.x}
                          y={node.position.y - (node.size || 30) - 10}
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
                           const startY = (node.size || 30) + 15; 
                          
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

      {/* Instructions */}
      <div className="text-s text-gray-600 dark:text-gray-400 mt-2 text-center">

        <div className="flex gap-2 items-center justify-center">
          <span>Drag nodes to move them</span>
          <span>•</span>
          <span>Click nodes to add their relationships</span>
          <span>•</span>
          <span>Toggle Remove Mode to delete nodes</span>
        </div>
      </div>
    </div>
  );
};

export default RelationshipWeb;
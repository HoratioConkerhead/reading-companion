import React, { useState, useEffect, useRef, useCallback } from 'react';

const RelationshipWeb = ({ 
  onCharacterSelect, 
  selectedCharacter,
  charactersData,
  relationshipsData,
  chaptersData = [] // Add chapters data for filtering
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
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [isAutoArrangeOn, setIsAutoArrangeOn] = useState(false);
  const [springForce, setSpringForce] = useState(0.05);
  const [repulsionForce, setRepulsionForce] = useState(800);
  
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Get character name from ID
  const getCharacterName = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    return character ? character.name : characterId;
  };

  // Get character group color
  const getGroupColor = (group) => {
    switch (group) {
      case 'Protagonists':
        return '#3182CE'; // blue
      case 'Fifth Columnists':
        return '#E53E3E'; // red
      case 'German Connection':
        return '#D69E2E'; // yellow/gold
      case 'Supporting Characters':
        return '#38A169'; // green
      case 'Military':
        return '#4A5568'; // gray-blue
      case 'Historical Figures':
        return '#805AD5'; // purple
      default:
        return '#718096'; // gray
    }
  };

  // Get relationship color
  const getRelationshipColor = (type) => {
    if (type.includes('spouse')) return '#805AD5'; // purple
    if (type.includes('handler') || type.includes('asset')) return '#3182CE'; // blue
    if (type.includes('conspirator')) return '#E53E3E'; // red
    if (type.includes('colleague') || type.includes('partner')) return '#38A169'; // green
    if (type.includes('superior') || type.includes('subordinate')) return '#DD6B20'; // orange
    if (type.includes('friend')) return '#4299E1'; // light blue
    if (type.includes('informant') || type.includes('double-agent')) return '#D53F8C'; // pink
    if (type.includes('enemy') || type.includes('target') || type.includes('victim')) return '#E53E3E'; // red
    return '#718096'; // gray
  };

  // Format relationship type
  const formatRelationshipType = (type) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' - ');
  };

  // Filter relationships by chapter
  const filterRelationshipsByChapter = (relationships, chapterId) => {
    if (!chapterId) return relationships;
    
    const chapterIndex = chaptersData.findIndex(ch => ch.id === chapterId);
    if (chapterIndex === -1) return relationships;
    
    // For now, show all relationships up to the current chapter
    // You can enhance this logic based on when relationships are revealed in the story
    return relationships.filter(rel => {
      // If relationship has a chapter property, use it
      if (rel.chapter) {
        const relChapterIndex = chaptersData.findIndex(ch => ch.id === rel.chapter);
        return relChapterIndex <= chapterIndex;
      }
      // Otherwise, show all relationships (you can customize this logic)
      return true;
    });
  };

  // Simple spring-based layout simulation
  const runForceSimulation = useCallback(() => {
    if (nodes.length === 0) return;
    
    // Reset simulation state and start fresh
    setIsSimulationRunning(true);
    
    const simulation = {
      nodes: nodes.map(node => ({
        ...node,
        velocity: { x: 0, y: 0 },
        force: { x: 0, y: 0 }
      })),
      edges: edges,
      
      // Physics constants - use state values
      repulsionForce: repulsionForce, // Nodes repel each other
      springForce: springForce, // Connected nodes attract (spring)
      springLength: 120, // Ideal distance between connected nodes
      damping: 0.85, // Friction
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
            const force = this.springForce * displacement;
            
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
    
    let frameCount = 0;
    const maxFrames = 180; // 3 seconds at 60fps
    
    // Animation loop
    const animate = () => {
      simulation.step();
      setNodes([...simulation.nodes]);
      frameCount++;
      
      // Continue animation if not reached max frames
      if (frameCount < maxFrames) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSimulationRunning(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };
    
         animationRef.current = requestAnimationFrame(animate);
   }, [nodes, edges, isSimulationRunning, springForce, repulsionForce]);

  // Initialize nodes in a circular layout with focused character in center
  const initializeNodes = useCallback(() => {
    const filteredCharacters = focusedCharacter 
      ? charactersData.filter(char => 
          char.id === focusedCharacter ||
          relationshipsData.some(rel => 
            (rel.from === focusedCharacter && rel.to === char.id) ||
            (rel.to === focusedCharacter && rel.from === char.id)
          )
        )
      : charactersData;

    const centerX = 400;
    const centerY = 300;
    const radius = Math.max(200, filteredCharacters.length * 30); // Increased base radius and multiplier

    const newNodes = filteredCharacters.map((character, index) => {
      if (character.id === focusedCharacter) {
        // Place focused character in center
        return {
          id: character.id,
          name: character.name,
          role: character.role,
          group: character.group,
          position: { x: centerX, y: centerY },
          color: getGroupColor(character.group),
          isFocused: true
        };
      } else {
        // Place other characters in a circle around the focused character
        // Use index - 1 to skip the focused character in the circle calculation
        const circleIndex = index > 0 ? index - 1 : 0;
        const totalInCircle = filteredCharacters.length - 1;
        const angle = (circleIndex * 2 * Math.PI) / totalInCircle;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        return {
          id: character.id,
          name: character.name,
          role: character.role,
          group: character.group,
          position: { x, y },
          color: getGroupColor(character.group),
          isFocused: false
        };
      }
    });

    setNodes(newNodes);
  }, [charactersData, relationshipsData, focusedCharacter]);

  // Initialize edges
  const initializeEdges = useCallback(() => {
    const filteredRelationships = filterRelationshipsByChapter(relationshipsData, currentChapter);
    
    const relevantRelationships = focusedCharacter
      ? filteredRelationships.filter(rel => 
          rel.from === focusedCharacter || rel.to === focusedCharacter ||
          nodes.some(node => 
            (rel.from === node.id && rel.to === focusedCharacter) ||
            (rel.to === node.id && rel.from === focusedCharacter)
          )
        )
      : filteredRelationships;

    const newEdges = relevantRelationships.map((relationship, index) => ({
      id: `${relationship.from}-${relationship.to}-${index}`,
      from: relationship.from,
      to: relationship.to,
      type: relationship.type,
      color: getRelationshipColor(relationship.type),
      label: formatRelationshipType(relationship.type)
    }));

    setEdges(newEdges);
  }, [relationshipsData, focusedCharacter, currentChapter]); // Removed nodes dependency

  // Initialize graph when focused character or chapter changes
  useEffect(() => {
    initializeNodes();
  }, [initializeNodes]);

  useEffect(() => {
    initializeEdges();
  }, [initializeEdges]);

     // Auto arrange simulation - runs continuously when enabled
   const runAutoArrange = useCallback(() => {
     if (!isAutoArrangeOn || nodes.length === 0) return;
     
     const simulation = {
       nodes: nodes.map(node => ({
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
             const force = this.springForce * displacement;
             
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
     setNodes([...simulation.nodes]);
     
           // Schedule next step if still enabled
      if (isAutoArrangeOn && animationRef.current) {
        animationRef.current = requestAnimationFrame(runAutoArrange);
      }
   }, [nodes, edges, isAutoArrangeOn, springForce, repulsionForce]);
  
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
        // Reset simulation state
        setIsSimulationRunning(false);
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
    e.stopPropagation();
    setDraggedNode(nodeId);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    clickStartPos.current = { x: e.clientX, y: e.clientY };
    wasClick.current = true;
  };

     // Handle node drag
   const handleNodeMouseMove = useCallback((e) => {
     if (!isDragging || !draggedNode) return;

     const deltaX = e.clientX - dragStart.x;
     const deltaY = e.clientY - dragStart.y;

     // Check if we've moved enough to consider it a drag (not a click)
     const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
     if (moveDistance > 5) {
       wasClick.current = false;
     }

     // Stop auto arrange when dragging starts
     if (isAutoArrangeOn) {
       setIsAutoArrangeOn(false);
     }

     setNodes(prevNodes => 
       prevNodes.map(node => 
         node.id === draggedNode 
           ? {
               ...node,
               position: {
                 x: node.position.x + deltaX,
                 y: node.position.y + deltaY
               }
             }
           : node
       )
     );

     setDragStart({ x: e.clientX, y: e.clientY });
   }, [isDragging, draggedNode, dragStart, isAutoArrangeOn]);

  // Handle node drag end
  const handleNodeMouseUp = () => {
    // If it was a click (not a drag), add relationships
    if (wasClick.current && draggedNode) {
      handleNodeClick(draggedNode);
    }
    
    setIsDragging(false);
    setDraggedNode(null);
    // No automatic simulation restart
  };

  // Check if it was a click (not a drag)
  const wasClick = useRef(false);
  const clickStartPos = useRef({ x: 0, y: 0 });

  // Handle node click - add character's relationships
  const handleNodeClick = (nodeId) => {
    // Don't call onCharacterSelect - we want to add relationships instead
    
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
    
    // Find new characters to add
    const existingIds = new Set(nodes.map(n => n.id));
    const newCharacters = charactersData.filter(char => 
      connectedCharacterIds.has(char.id) && !existingIds.has(char.id)
    );
    
    if (newCharacters.length === 0) return;
    
    // Position new characters to avoid overlap with existing ones
    const clickedNode = nodes.find(n => n.id === nodeId);
    if (!clickedNode) return;
    
         const newNodes = newCharacters.map((char, index) => {
       // Try to find a good position that doesn't overlap
       let attempts = 0;
       let x, y;
       const minDistance = 120; // Increased minimum distance between nodes
       
       do {
         const angle = (index * 2 * Math.PI) / newCharacters.length + (attempts * 0.3);
         const radius = 150 + (attempts * 25); // Start with larger radius and increase more
         x = clickedNode.position.x + radius * Math.cos(angle);
         y = clickedNode.position.y + radius * Math.sin(angle);
         attempts++;
         
         // Check if this position overlaps with any existing node
         const overlaps = nodes.some(existingNode => {
           const dx = existingNode.position.x - x;
           const dy = existingNode.position.y - y;
           const distance = Math.sqrt(dx * dx + dy * dy);
           return distance < minDistance;
         });
         
         if (!overlaps || attempts > 15) break; // More attempts and stop if no overlap
       } while (attempts <= 15);
       
       return {
         id: char.id,
         name: char.name,
         role: char.role,
         group: char.group,
         position: { x, y },
         color: getGroupColor(char.group),
         isFocused: false
       };
     });
    
    // Calculate what the updated nodes will be
    const updatedNodes = [...nodes, ...newNodes];
    
    // Update both nodes and edges together
    setNodes(updatedNodes);
    
    // Update edges to show ALL relationships between visible characters
    const existingEdgeIds = new Set(edges.map(e => e.id));
    
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
    
    setEdges([...edges, ...newEdges]);
  };

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
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 2));
  };

  // Focus on character - clears everything and shows just that character
  const focusOnCharacter = (characterId) => {
    setFocusedCharacter(characterId);
    // Clear all nodes and edges when changing focus
    setNodes([]);
    setEdges([]);
  };

  // Reset view
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setFocusedCharacter('cynthia_childreth');
    setCurrentChapter(null);
    setNodes([]);
    setEdges([]);
    setIsAutoArrangeOn(false);
  };

  // Add event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleNodeMouseMove(e);
    const handleGlobalMouseUp = () => handleNodeMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleNodeMouseMove]);

  return (
    <div className="relationship-web">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Character Relationship Web</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore character connections. Drag nodes to rearrange, select a character to focus, and choose a chapter to avoid spoilers.
        </p>
      </div>

             {/* Controls */}
       <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Focus on Character
          </label>
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={focusedCharacter || ''}
            onChange={(e) => focusOnCharacter(e.target.value || null)}
          >
            <option value="">Show All Characters</option>
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
          <select
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            value={currentChapter || ''}
            onChange={(e) => setCurrentChapter(e.target.value || null)}
          >
            <option value="">Show All Relationships</option>
            {chaptersData.map((chapter, index) => (
              <option key={chapter.id} value={chapter.id}>
                Chapter {index + 1}: {chapter.title}
              </option>
            ))}
          </select>
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
                // Get all characters that are currently visible or connected to visible characters
                const visibleCharacterIds = new Set(nodes.map(n => n.id));
                
                // Add all characters connected to currently visible ones
                const connectedCharacterIds = new Set();
                relationshipsData.forEach(rel => {
                  if (visibleCharacterIds.has(rel.from) || visibleCharacterIds.has(rel.to)) {
                    connectedCharacterIds.add(rel.from);
                    connectedCharacterIds.add(rel.to);
                  }
                });
                
                // Get all characters that should be visible
                const allVisibleCharacters = charactersData.filter(char => 
                  connectedCharacterIds.has(char.id) || visibleCharacterIds.has(char.id)
                );
                
                                 // Position them to fill the window better with better spacing
                 const centerX = 400;
                 const centerY = 300;
                 const radius = Math.max(200, Math.min(350, allVisibleCharacters.length * 25));
                 
                 const allCharacters = allVisibleCharacters.map((character, index) => {
                   const angle = (index * 2 * Math.PI) / allVisibleCharacters.length;
                   const x = centerX + radius * Math.cos(angle);
                   const y = centerY + radius * Math.sin(angle);
                   
                   return {
                     id: character.id,
                     name: character.name,
                     role: character.role,
                     group: character.group,
                     position: { x, y },
                     color: getGroupColor(character.group),
                     isFocused: character.id === focusedCharacter
                   };
                 });
                setNodes(allCharacters);
              }}
            >
              Auto Fill
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
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              onClick={runForceSimulation}
              disabled={isSimulationRunning}
            >
              {isSimulationRunning ? 'Running...' : 'Quick Arrange'}
            </button>
                  </div>
       </div>

       {/* Physics Controls */}
       <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
             Spring Force
           </label>
           <input
             type="range"
             min="0.0"
             max="0.02"
             step="0.001"
             value={springForce}
             onChange={(e) => setSpringForce(parseFloat(e.target.value))}
             className="w-full"
           />
           <div className="text-xs text-gray-500 mt-1">{springForce.toFixed(2)}</div>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
             Repulsion Force
           </label>
           <input
             type="range"
             min="200"
             max="100000"
             step="100"
             value={repulsionForce}
             onChange={(e) => setRepulsionForce(parseInt(e.target.value))}
             className="w-full"
           />
           <div className="text-xs text-gray-500 mt-1">{repulsionForce}</div>
         </div>
       </div>

       {/* Relationship Graph */}
      <div 
        ref={containerRef}
        className="border border-gray-200 dark:border-gray-700 rounded overflow-hidden bg-white dark:bg-gray-800"
        style={{ height: '600px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
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
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
          </defs>

          {/* Transform for zoom and pan */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Edges */}
            {edges.map(edge => {
              const sourceNode = nodes.find(n => n.id === edge.from);
              const targetNode = nodes.find(n => n.id === edge.to);
              
              if (!sourceNode || !targetNode) return null;

              const dx = targetNode.position.x - sourceNode.position.x;
              const dy = targetNode.position.y - sourceNode.position.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // Calculate edge position (avoiding node center)
              const nodeRadius = 30;
              const angle = Math.atan2(dy, dx);
              const startX = sourceNode.position.x + nodeRadius * Math.cos(angle);
              const startY = sourceNode.position.y + nodeRadius * Math.sin(angle);
              const endX = targetNode.position.x - nodeRadius * Math.cos(angle);
              const endY = targetNode.position.y - nodeRadius * Math.sin(angle);

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
                  {/* Background for label */}
                  <rect
                    x={labelX - 40}
                    y={labelY - 8}
                    width="80"
                    height="16"
                    fill="rgba(255, 255, 255, 0.9)"
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
                    fill="#333"
                    className="select-none font-medium"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(node => (
              <g key={node.id}>
                                 <circle
                   cx={node.position.x}
                   cy={node.position.y}
                   r={node.isFocused ? 35 : 30}
                   fill={node.color}
                   stroke={node.isFocused ? "#000" : "#fff"}
                   strokeWidth={node.isFocused ? 3 : 2}
                   className="cursor-pointer hover:opacity-80 transition-opacity"
                   onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                 />
                <text
                  x={node.position.x}
                  y={node.position.y - 45}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill="#fff"
                  className="select-none pointer-events-none"
                >
                  {node.name}
                </text>
                {node.role && (
                  <text
                    x={node.position.x}
                    y={node.position.y + 45}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#fff"
                    className="select-none pointer-events-none"
                  >
                    {node.role}
                  </text>
                )}
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
        <h3 className="text-sm font-bold mb-3 text-gray-900 dark:text-gray-100">Character Groups</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Protagonists', 'Fifth Columnists', 'German Connection', 'Supporting Characters', 'Military', 'Historical Figures'].map(group => (
            <div key={group} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: getGroupColor(group) }}
              ></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{group}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 p-2 border-t border-gray-200 dark:border-gray-700">
        <p>
          <strong>How to use:</strong> Start by selecting a character to focus on their relationships. 
          Choose a chapter to avoid spoilers. Drag characters to rearrange, or use "Auto Arrange" for automatic layout. 
          Click on any character to view their details. Use mouse wheel to zoom, and drag the background to pan.
        </p>
      </div>
    </div>
  );
};

export default RelationshipWeb;
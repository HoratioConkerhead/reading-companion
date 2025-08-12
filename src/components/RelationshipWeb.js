import React, { useState, useEffect, useRef, useCallback } from 'react';

const RelationshipWeb = ({ 
  onCharacterSelect, 
  selectedCharacter,
  charactersData,
  relationshipsData,
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
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [isAutoArrangeOn, setIsAutoArrangeOn] = useState(false);
  const [springForce, setSpringForce] = useState(10);
  const [repulsionForce, setRepulsionForce] = useState(8000);
  const [isFullPage, setIsFullPage] = useState(false);
  
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const wasClick = useRef(false);
  const clickStartPos = useRef({ x: 0, y: 0 });
  const wasAutoArrangeOn = useRef(false);

  // Get character name from ID
  const getCharacterName = (characterId) => {
    const character = charactersData.find(c => c.id === characterId);
    return character ? character.name : characterId;
  };

  // Count relationships for a character
  const getRelationshipCount = (characterId) => {
    return relationshipsData.filter(rel => 
      rel.from === characterId || rel.to === characterId
    ).length;
  };

  // Get character group color with brightness based on relationship count
  const getGroupColor = (group, relationshipCount = 0) => {
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
  };

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

  // Calculate approximate text width for relationship labels
  const getTextWidth = (text, fontSize = 10) => {
    // Approximate width based on character count and font size
    // This is a rough estimate - for more accuracy, you could use canvas.measureText
    const avgCharWidth = fontSize * 0.6; // Rough estimate
    return text.length * avgCharWidth;
  };

  // Get appropriate stroke color for nodes based on theme
  const getNodeStrokeColor = (isDark = false) => {
    return isDark ? '#ffffff' : '#000000';
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
    const radius = 200; // Fixed radius of 200 pixels

         const newNodes = filteredCharacters.map((character, index) => {
       const relationshipCount = getRelationshipCount(character.id);

       if (character.id === focusedCharacter) {
         // Place focused character in center
         return {
           id: character.id,
           name: character.name,
           role: character.role,
           group: character.group,
           position: { x: centerX, y: centerY },
           color: getGroupColor(character.group, relationshipCount),
           relationshipCount,
           isFocused: true
         };
       } else {
         // Place other characters in a circle around the focused character
         // Use index - 1 to skip the focused character in the circle calculation
         //const circleIndex = index > 0 ? index - 1 : 0;
         const circleIndex = index ;
         const totalInCircle = filteredCharacters.length - 1;
         const angle = (circleIndex * 2 * Math.PI) / totalInCircle;
         const x = centerX + radius * Math.cos(angle);
         const y = centerY + radius * Math.sin(angle);
         console.log("Angle", angle, "Index", index);
         

         return {
           id: character.id,
           name: character.name,
           role: character.role,
           group: character.group,
           position: { x, y },
           color: getGroupColor(character.group, relationshipCount),
           relationshipCount,
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

  // Sync with external selectedCharacter prop
  useEffect(() => {
    if (selectedCharacter && selectedCharacter.id !== focusedCharacter) {
      setFocusedCharacter(selectedCharacter.id);
      // Clear all nodes and edges when changing focus
      setNodes([]);
      setEdges([]);
    }
  }, [selectedCharacter, focusedCharacter]);

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
    e.preventDefault();
    e.stopPropagation();
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
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
  };

  // Handle node drag
  const handleNodeMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    if (isDragging && draggedNode) {
      const node = nodes.find(n => n.id === draggedNode);
      if (!node) return;
      
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
      
      setNodes(prevNodes => 
        prevNodes.map(n => 
          n.id === draggedNode 
            ? { ...n, position: { x: newX, y: newY } }
            : n
        )
      );
    }
  }, [isDragging, draggedNode, dragStart]);

  // Handle node drag end
  const handleNodeMouseUp = (e, nodeId) => {
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
  };

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
       
                const relationshipCount = getRelationshipCount(char.id);
         return {
           id: char.id,
           name: char.name,
           role: char.role,
           group: char.group,
           position: { x, y },
           color: getGroupColor(char.group, relationshipCount),
           relationshipCount,
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
    // Only clear if we're actually changing focus, not during initial load
    if (focusedCharacter !== characterId) {
      setFocusedCharacter(characterId);
      // Clear all nodes and edges when changing focus
      setNodes([]);
      setEdges([]);
    }
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
    setIsFullPage(false);
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

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, draggedNode, handleNodeMouseMove, handleNodeMouseUp]);

  return (
    <div className={`relationship-web ${isFullPage ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
      {!isFullPage && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Character Relationship Web</h2>
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
              className={`px-4 py-2 text-white rounded transition-colors ${
                isFullPage 
                  ? 'bg-gray-500 hover:bg-gray-600' 
                  : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
              onClick={() => setIsFullPage(!isFullPage)}
            >
              {isFullPage ? 'Exit Full Page' : 'Full Page'}
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
                   
                   const relationshipCount = getRelationshipCount(character.id);
                   return {
                     id: character.id,
                     name: character.name,
                     role: character.role,
                     group: character.group,
                     position: { x, y },
                     color: getGroupColor(character.group, relationshipCount),
                     relationshipCount,
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
        <div className={`${isFullPage ? 'px-4' : 'mb-4'} grid grid-cols-1 md:grid-cols-2 gap-4`}>
         <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
             Spring Force
           </label>
                       <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={springForce}
              onChange={(e) => setSpringForce(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">{springForce}</div>
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
         className={`border border-gray-200 dark:border-gray-700 rounded overflow-hidden bg-white dark:bg-gray-800 ${
           isFullPage ? 'flex-1' : ''
         }`}
         style={{ height: isFullPage ? 'calc(100vh - 200px)' : '600px' }}
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
              
              const nodeRadius = sourceNode.isFocused ? 35 : 30;
              const targetRadius = targetNode.isFocused ? 35 : 30;
              
              // Calculate angle between nodes
              const dx = targetNode.position.x - sourceNode.position.x;
              const dy = targetNode.position.y - sourceNode.position.y;
              const angle = Math.atan2(dy, dx);
              
              // Calculate start and end points (on the edge of the circles)
              const startX = sourceNode.position.x + nodeRadius * Math.cos(angle);
              const startY = sourceNode.position.y + nodeRadius * Math.sin(angle);
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
                  {/* Background rectangle with dynamic width */}
                  <rect
                    x={labelX - Math.max(40, getTextWidth(edge.label) / 2 + 5)}
                    y={labelY - 8}
                    width={Math.max(80, getTextWidth(edge.label) + 10)}
                    height="16"
                    fill={darkMode ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)"}
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
                    stroke={node.isFocused ? getNodeStrokeColor(darkMode) : getNodeStrokeColor(darkMode)}
                    strokeWidth={node.isFocused ? 3 : 2}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  />
                 {/* Relationship count in center */}
                 <text
                   x={node.position.x}
                   y={node.position.y}
                   textAnchor="middle"
                   dominantBaseline="middle"
                   fontSize={node.isFocused ? "14" : "12"}
                   fontWeight="bold"
                   fill={getContrastTextColor(node.color, darkMode)}
                   className="select-none pointer-events-none"
                   style={{
                     textShadow: darkMode 
                       ? '1px 1px 2px rgba(0,0,0,0.8)' 
                       : '1px 1px 2px rgba(255,255,255,0.8)'
                   }}
                 >
                   {node.relationshipCount || 0}
                 </text>
                 <text
                   x={node.position.x}
                   y={node.position.y - 45}
                   textAnchor="middle"
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
                   {node.name}
                 </text>
                 {node.role && (
                   <text
                     x={node.position.x}
                     y={node.position.y + 45}
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
                     {/* Simple text wrapping - split by spaces and create multiple lines */}
                     {(() => {
                       const maxWidth = (node.isFocused ? 70 : 60) * 2; // 2x node diameter
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
                       
                       return lines.map((line, index) => (
                         <tspan key={index} x={node.position.x} dy={index === 0 ? 0 : 12}>
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

             {/* Legend */}
       <div className={`${isFullPage ? 'p-4' : 'mt-4 p-4'} border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800`}>
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
       <div className={`${isFullPage ? 'p-4' : 'mt-4'} text-sm text-gray-500 dark:text-gray-400 p-2 border-t border-gray-200 dark:border-gray-700`}>
        <p>
          <strong>How to use:</strong> Start by selecting a character to focus on their relationships. 
          Choose a chapter to avoid spoilers. Drag characters to rearrange, or use "Auto Arrange" for automatic layout. 
          Click on any character to view their details. Use mouse wheel to zoom, and drag the background to pan.
        </p>
      </div>
      {/* Instructions */}
      <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
        <p>Drag nodes to move them • Click nodes to add their relationships • Shift+drag to stretch relationship lines</p>
      </div>
    </div>
  );
};

export default RelationshipWeb;
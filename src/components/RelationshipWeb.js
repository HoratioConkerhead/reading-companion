import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, {
  Handle,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Node component to represent characters
const CharacterNode = ({ data }) => {
  return (
    <div
      className={`p-3 rounded-lg shadow-md border-2 w-48 text-center ${data.style}`}
      style={{ 
        backgroundColor: data.backgroundColor,
        borderColor: data.borderColor,
        transform: data.isSelected ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.2s ease',
        boxShadow: data.isSelected ? '0 0 10px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <div className="font-bold text-base truncate" title={data.label}>
        {data.label}
      </div>
      {data.role && (
        <div className="text-xs text-gray-700 mt-1 truncate" title={data.role}>
          {data.role}
        </div>
      )}
      <Handle 
        type="source" 
        position="right" 
        style={{ 
          background: data.borderColor || '#555',
          border: '2px solid white',
          width: '10px',
          height: '10px'
        }} 
      />
      <Handle 
        type="target" 
        position="left" 
        style={{ 
          background: data.borderColor || '#555',
          border: '2px solid white',
          width: '10px',
          height: '10px'
        }} 
      />
    </div>
  );
};

// Legend component for relationship types
const RelationshipLegend = ({ relationshipTypes }) => {
  const getEdgeColor = (type) => {
    if (type.includes('spouse')) return '#805AD5'; // purple
    if (type.includes('handler') || type.includes('asset')) return '#3182CE'; // blue
    if (type.includes('conspirator')) return '#E53E3E'; // red
    if (type.includes('colleague')) return '#38A169'; // green
    if (type.includes('superior') || type.includes('subordinate')) return '#DD6B20'; // orange
    return '#718096'; // gray
  };
  
  const formatType = (type) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' - ');
  };
  
  // Get unique relationship types for legend
  const uniqueTypes = [
    'spouse', 'handler-asset', 'conspirator', 
    'colleague', 'superior-subordinate', 'friend'
  ];
  
  return (
    <div className="p-3 border rounded bg-white">
      <h3 className="text-sm font-bold mb-2">Relationship Types</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
        {uniqueTypes.map(type => (
          <div key={type} className="flex items-center">
            <div className="w-4 h-1 mr-2" style={{ backgroundColor: getEdgeColor(type) }}></div>
            <span className="text-xs">{formatType(type)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Register custom node type
const nodeTypes = {
  character: CharacterNode,
};

const RelationshipWeb = ({ 
  onCharacterSelect, 
  selectedCharacter,
  charactersData,
  relationshipsData
}) => {
  // Reference to the flow component for fitting view
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // State for the network graph
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [groupFilter, setGroupFilter] = useState('all');
  const [relationshipTypeFilter, setRelationshipTypeFilter] = useState('all');
  const [layouting, setLayouting] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extract unique relationship types for filter dropdown
  const relationshipTypes = Array.from(new Set(relationshipsData.map(rel => rel.type)));
  
  // Helper function to get node style based on character group
  const getNodeStyle = (character) => {
    if (!character.group) return '';
    
    switch (character.group) {
      case 'Protagonists':
        return {
          backgroundColor: '#EBF8FF', // light blue
          borderColor: '#3182CE', // blue
          style: 'border-blue-500'
        };
      case 'Fifth Columnists':
        return {
          backgroundColor: '#FED7D7', // light red
          borderColor: '#E53E3E', // red
          style: 'border-red-500'
        };
      case 'German Connection':
        return {
          backgroundColor: '#FFFBEB', // light yellow
          borderColor: '#D69E2E', // yellow/gold
          style: 'border-yellow-500'
        };
      case 'Supporting Characters':
        return {
          backgroundColor: '#F0FFF4', // light green
          borderColor: '#38A169', // green
          style: 'border-green-500'
        };
      case 'Military':
        return {
          backgroundColor: '#EEF6FF', // light blue-gray
          borderColor: '#4A5568', // gray-blue
          style: 'border-gray-600'
        };
      case 'Historical Figures':
        return {
          backgroundColor: '#FAF5FF', // light purple
          borderColor: '#805AD5', // purple
          style: 'border-purple-500'
        };
      default:
        return {
          backgroundColor: '#E2E8F0', // light gray
          borderColor: '#718096', // gray
          style: 'border-gray-500'
        };
    }
  };
  
  // Handle node click
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    // Find the character data based on node id
    const character = charactersData.find(c => c.id === node.id);
    if (character && onCharacterSelect) {
      onCharacterSelect(character);
    }
  };
  
  // Focus on a character in the graph
  const focusOnCharacter = (characterId) => {
    if (!characterId) return;
    
    const node = nodes.find(n => n.id === characterId);
    if (node) {
      setSelectedNode(node);
    }
  };
  
  // Effect to focus on selected character
  useEffect(() => {
    if (selectedCharacter) {
      focusOnCharacter(selectedCharacter.id);
    }
  }, [selectedCharacter]);
  
  // Format relationship type for display
  const formatRelationshipType = (type) => {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' - ');
  };
  
  // Get edge color based on relationship type
  const getEdgeColor = (type) => {
    // Use specific colors for major relationship types
    if (type.includes('spouse')) return '#805AD5'; // purple
    if (type.includes('handler') || type.includes('asset')) return '#3182CE'; // blue
    if (type.includes('conspirator')) return '#E53E3E'; // red
    if (type.includes('colleague') || type.includes('partner')) return '#38A169'; // green
    if (type.includes('superior') || type.includes('subordinate')) return '#DD6B20'; // orange
    if (type.includes('friend')) return '#4299E1'; // light blue
    if (type.includes('informant') || type.includes('double-agent')) return '#D53F8C'; // pink
    if (type.includes('enemy') || type.includes('target') || type.includes('victim')) return '#E53E3E'; // red
    if (type.includes('surveillance')) return '#718096'; // gray
    
    // Default for other types
    return '#718096'; // gray
  };
  
  // Get view to fit all nodes
  const fitView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  };

  // Apply force-directed layout algorithm
  const applyForceLayout = useCallback(() => {
    setLayouting(true);
    
    // Simple force-directed layout simulation
    // This is a simplified version - a full implementation would use a proper physics engine
    const simulation = {
      alpha: 1.0,
      nodes: [...nodes],
      edges: [...edges],
      
      // Run the simulation for a fixed number of iterations
      run: function() {
        const iterations = 100; // More iterations for better layout
        const repulsionForce = 1500; // Stronger repulsion between nodes
        const attractionForce = 0.07; // Weaker attraction along edges
        const centerForce = 0.01; // Weaker pull toward center
        const nodeDistance = 200; // Desired minimum distance between nodes
        
        // Use the container size for centering
        const centerX = 500;
        const centerY = 300;
        
        // Initialize node positions more randomly if starting from grid
        if (this.nodes.length > 0) {
          const isGrid = this.nodes.every(node => 
            node.position.x % 100 === 0 || node.position.y % 100 === 0
          );
          
          if (isGrid) {
            // Randomize positions a bit to avoid grid patterns
            this.nodes.forEach(node => {
              node.position.x += Math.random() * 400 - 200;
              node.position.y += Math.random() * 400 - 200;
            });
          }
        }
        
        for (let i = 0; i < iterations; i++) {
          // Calculate forces
          const forces = this.nodes.map(() => ({ x: 0, y: 0 }));
          
          // Repulsion between nodes (nodes push each other away)
          for (let j = 0; j < this.nodes.length; j++) {
            for (let k = j + 1; k < this.nodes.length; k++) {
              const node1 = this.nodes[j];
              const node2 = this.nodes[k];
              
              const dx = node2.position.x - node1.position.x;
              const dy = node2.position.y - node1.position.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              
              // Apply stronger repulsion when nodes are closer than desired distance
              const distanceRatio = Math.min(nodeDistance / distance, 5);
              const force = repulsionForce * distanceRatio / (distance * distance);
              
              const fx = (dx / distance) * force;
              const fy = (dy / distance) * force;
              
              forces[j].x -= fx;
              forces[j].y -= fy;
              forces[k].x += fx;
              forces[k].y += fy;
            }
          }
          
          // Attraction along edges (connected nodes pull toward each other)
          for (const edge of this.edges) {
            const sourceNode = this.nodes.find(n => n.id === edge.source);
            const targetNode = this.nodes.find(n => n.id === edge.target);
            
            if (sourceNode && targetNode) {
              const dx = targetNode.position.x - sourceNode.position.x;
              const dy = targetNode.position.y - sourceNode.position.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              
              // Limit attraction force if nodes are too far apart
              const force = Math.min(attractionForce * distance, 10);
              const fx = (dx / distance) * force;
              const fy = (dy / distance) * force;
              
              forces[this.nodes.indexOf(sourceNode)].x += fx;
              forces[this.nodes.indexOf(sourceNode)].y += fy;
              forces[this.nodes.indexOf(targetNode)].x -= fx;
              forces[this.nodes.indexOf(targetNode)].y -= fy;
            }
          }
          
          // Group cohesion - nodes of the same group have a weak attraction
          const groups = {};
          this.nodes.forEach(node => {
            const group = node.data?.group;
            if (group) {
              if (!groups[group]) groups[group] = [];
              groups[group].push(node);
            }
          });
          
          // Apply a weak attraction within groups
          Object.values(groups).forEach(groupNodes => {
            if (groupNodes.length < 2) return;
            
            // Find group centroid
            const centroidX = groupNodes.reduce((sum, n) => sum + n.position.x, 0) / groupNodes.length;
            const centroidY = groupNodes.reduce((sum, n) => sum + n.position.y, 0) / groupNodes.length;
            
            // Apply gentle force toward group centroid
            groupNodes.forEach(node => {
              const idx = this.nodes.indexOf(node);
              const dx = centroidX - node.position.x;
              const dy = centroidY - node.position.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              
              forces[idx].x += dx * 0.005;
              forces[idx].y += dy * 0.005;
            });
          });
          
          // Center gravity force (pulls nodes toward center)
          for (let j = 0; j < this.nodes.length; j++) {
            const node = this.nodes[j];
            const dx = centerX - node.position.x;
            const dy = centerY - node.position.y;
            
            // Apply stronger centering force when nodes are far from center
            const distance = Math.sqrt(dx * dx + dy * dy);
            const distanceFactor = distance > 500 ? 3 : 1;
            
            forces[j].x += dx * centerForce * distanceFactor;
            forces[j].y += dy * centerForce * distanceFactor;
          }
          
          // Apply forces
          const dampingFactor = 0.9; // More damping
          const maxMovement = 20; // Limit max movement per iteration
          
          for (let j = 0; j < this.nodes.length; j++) {
            const node = this.nodes[j];
            
            // Limit maximum movement per iteration for stability
            const forceX = Math.min(Math.max(forces[j].x, -maxMovement), maxMovement);
            const forceY = Math.min(Math.max(forces[j].y, -maxMovement), maxMovement);
            
            // Apply force with damping
            node.position.x += forceX * dampingFactor;
            node.position.y += forceY * dampingFactor;
          }
          
          // Reduce alpha (simulation temperature)
          this.alpha *= 0.95;
          
          // Break early if movement is very small
          if (i > 50 && forces.every(f => Math.abs(f.x) < 0.5 && Math.abs(f.y) < 0.5)) {
            break;
          }
        }
        
        return this.nodes;
      }
    };
    
    // Run the simulation and update node positions
    const layoutedNodes = simulation.run();
    setNodes([...layoutedNodes]);
    
    setTimeout(() => {
      setLayouting(false);
      // Fit view after layout is complete
      if (reactFlowInstance) {
        reactFlowInstance.fitView({ padding: 0.2 });
      }
    }, 100);
  }, [nodes, edges, setNodes, reactFlowInstance]);
  
  // On Flow Initialize
  const onInit = (instance) => {
    setReactFlowInstance(instance);
  };
  
  // Layout effect - apply layout on init and when filters change
  useEffect(() => {
    if (nodes.length > 0) {
      applyForceLayout();
      
      // Fit view after layout completes
      setTimeout(() => {
        fitView();
      }, 100);
    }
  }, [nodes.length, applyForceLayout]);
  
  // Initialize the graph data
  useEffect(() => {
    // Filter characters based on group and search query
    const filteredCharacters = charactersData.filter(char => {
      const matchesGroup = groupFilter === 'all' || char.group === groupFilter;
      const matchesSearch = searchQuery === '' || 
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (char.role && char.role.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGroup && matchesSearch;
    });
    
    // Create nodes from characters
    const characterNodes = filteredCharacters.map((character, index) => {
      const style = getNodeStyle(character);
      const isSelected = selectedCharacter?.id === character.id;
      
      // Layout in a radial pattern initially instead of grid
      const totalNodes = filteredCharacters.length;
      const angleStep = (2 * Math.PI) / totalNodes;
      const radius = Math.min(200, Math.max(100, totalNodes * 15));
      const angle = index * angleStep;
      
      // Position nodes in a circle
      const x = 500 + radius * Math.cos(angle);
      const y = 300 + radius * Math.sin(angle);
      
      return {
        id: character.id,
        type: 'character',
        data: {
          label: character.name,
          role: character.role,
          group: character.group, // Pass group for minimap coloring
          ...style,
          isSelected
        },
        position: { x, y },
        // Don't set inline styles - let the component handle it
      };
    });
    
    // Filter relationships based on the selected characters and relationship type
    let filteredRelationships = relationshipsData;
    
    // Filter by relationship type if selected
    if (relationshipTypeFilter !== 'all') {
      filteredRelationships = filteredRelationships.filter(rel => 
        rel.type.includes(relationshipTypeFilter)
      );
    }
    
    // Filter to only include relationships between nodes that are visible
    filteredRelationships = filteredRelationships.filter(rel => {
      const sourceCharacter = filteredCharacters.find(c => c.id === rel.from);
      const targetCharacter = filteredCharacters.find(c => c.id === rel.to);
      return sourceCharacter && targetCharacter;
    });
    
    // Create edges from relationships
    const relationshipEdges = filteredRelationships.map((relationship) => {
      const edgeColor = getEdgeColor(relationship.type);
      
      return {
        id: `e${relationship.from}-${relationship.to}`,
        source: relationship.from,
        target: relationship.to,
        type: 'smoothstep',
        animated: relationship.type.includes('double-agent'), // Animate special relationships
        label: formatRelationshipType(relationship.type),
        labelStyle: { fill: '#333', fontWeight: 500, fontSize: 10 },
        labelBgStyle: { fill: 'rgba(255, 255, 255, 0.75)' },
        labelBgPadding: [4, 2],
        labelBgBorderRadius: 2,
        style: { stroke: edgeColor, strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColor,
          width: 15,
          height: 15,
        }
      };
    });
    
    // Set nodes and edges
    setNodes(characterNodes);
    setEdges(relationshipEdges);
    
    // If there are nodes and this is initial load, trigger the layout algorithm
    if (characterNodes.length > 0 && nodes.length === 0) {
      // Small timeout to ensure the nodes are rendered first
      setTimeout(() => {
        applyForceLayout();
      }, 50);
    }
  }, [charactersData, relationshipsData, groupFilter, relationshipTypeFilter, selectedCharacter, searchQuery, setNodes, setEdges, nodes.length, applyForceLayout]);

  return (
    <div className="relationship-web">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Character Relationship Web</h2>
        <p className="text-gray-600 mb-4">
          Explore the connections between characters. Drag nodes to rearrange the network and zoom in/out to focus on specific relationships.
        </p>
      </div>
      
      {/* Controls and filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Characters</label>
          <input 
            type="text" 
            placeholder="Search by name or role..." 
            className="w-full p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={applyForceLayout}
          disabled={layouting || nodes.length === 0}
        >
          {layouting ? 'Applying Layout...' : 'Rearrange Network'}
        </button>
        
        <button 
          className="px-4 py-2 bg-gray-200 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
          onClick={fitView}
          disabled={!reactFlowInstance || nodes.length === 0}
        >
          Fit View
        </button>
      </div>
      
      {/* Relationship Graph */}
      <div 
        className="border rounded overflow-hidden" 
        style={{ height: '600px' }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onInit={onInit}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          attributionPosition="bottom-right"
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              switch (node.data?.group) {
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
            }}
            nodeStrokeWidth={3}
            maskColor="rgba(240, 240, 240, 0.6)"
            style={{ backgroundColor: '#f0f4f8' }}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      
      {/* Selected Character Panel */}
      {selectedNode && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-bold mb-2">
            {selectedNode.data.label}
          </h3>
          {selectedNode.data.role && (
            <p className="text-gray-600 mb-2">{selectedNode.data.role}</p>
          )}
          
          <div className="mt-3">
            <h4 className="font-medium text-sm mb-1">Connected Characters:</h4>
            <div className="space-y-2">
              {edges
                .filter(edge => edge.source === selectedNode.id || edge.target === selectedNode.id)
                .map(edge => {
                  const isSource = edge.source === selectedNode.id;
                  const connectedId = isSource ? edge.target : edge.source;
                  const connectedNode = nodes.find(n => n.id === connectedId);
                  if (!connectedNode) return null;
                  
                  return (
                    <div 
                      key={edge.id} 
                      className="flex items-center p-2 bg-white rounded border cursor-pointer hover:bg-blue-50"
                      onClick={() => focusOnCharacter(connectedId)}
                    >
                      <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: edge.style.stroke }}></div>
                      <div>
                        <div className="font-medium">{connectedNode.data.label}</div>
                        <div className="text-xs text-gray-500">
                          {isSource ? `→ ${edge.label}` : `← ${edge.label}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          
          <div className="mt-4">
            <button
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              onClick={() => onCharacterSelect(charactersData.find(c => c.id === selectedNode.id))}
            >
              View Character Details
            </button>
          </div>
        </div>
      )}
      
      {/* Relationship Legend */}
      <div className="mt-4">
        <RelationshipLegend relationshipTypes={relationshipTypes} />
      </div>
      
      <div className="mt-4 text-sm text-gray-500 p-2 border-t">
        <p>This interactive network graph visualizes character relationships in "Stitched Up". Nodes represent characters and edges show relationships between them. Drag nodes to explore the network structure, and use the filters to focus on specific character groups or relationship types.</p>
      </div>
    </div>
  );
};

export default RelationshipWeb;
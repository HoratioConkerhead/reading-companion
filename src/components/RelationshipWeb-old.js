import React, { useState, useEffect, useRef } from 'react';
// import { ForceGraph2D } from 'react-force-graph';
import { charactersData, relationshipsData } from '../data/mockData';

const RelationshipWeb = ({ onCharacterSelect, selectedCharacter }) => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [groupFilter, setGroupFilter] = useState('all');
  const [relationshipTypeFilter, setRelationshipTypeFilter] = useState('all');
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);
  const fgRef = useRef();
  
  // Initialize graph data from our characters and relationships
  useEffect(() => {
    // Filter characters based on group selection
    const filteredCharacters = charactersData.filter(char => {
      if (groupFilter === 'all') return true;
      return char.group === groupFilter;
    });
    
    // Create nodes from filtered characters
    const nodes = filteredCharacters.map(char => ({
      id: char.id,
      name: char.name,
      group: char.group,
      title: char.title || '',
      role: char.role || '',
    }));
    
    // Create a set of character IDs for quick lookup
    const characterIds = new Set(nodes.map(node => node.id));
    
    // Filter relationships based on filters and available nodes
    const filteredRelationships = relationshipsData.filter(rel => {
      // Check if both connected characters are in our filtered node set
      const sourceExists = characterIds.has(rel.from);
      const targetExists = characterIds.has(rel.to);
      
      // Apply relationship type filter
      const matchesType = relationshipTypeFilter === 'all' || rel.type.includes(relationshipTypeFilter);
      
      return sourceExists && targetExists && matchesType;
    });
    
    // Create links from filtered relationships
    const links = filteredRelationships.map(rel => ({
      source: rel.from,
      target: rel.to,
      type: rel.type,
    }));
    
    // Extract relationship types for the filter dropdown
    const relationshipTypes = Array.from(new Set(relationshipsData.map(rel => rel.type)));
    
    setGraphData({ nodes, links, relationshipTypes });
    
    // If a character is selected, center the graph on it
    if (selectedCharacter && fgRef.current) {
      const node = nodes.find(n => n.id === selectedCharacter.id);
      if (node) {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(2, 1000);
      }
    }
  }, [groupFilter, relationshipTypeFilter, selectedCharacter]);
  
  // Handle node hover to highlight connected nodes and links
  const handleNodeHover = node => {
    if (!node) {
      setHoverNode(null);
      setHighlightNodes(new Set());
      setHighlightLinks(new Set());
      return;
    }
    
    setHoverNode(node);
    
    // Get connected nodes and links
    const connectedNodes = new Set();
    const connectedLinks = new Set();
    
    graphData.links.forEach(link => {
      if (link.source.id === node.id || link.target.id === node.id) {
        connectedNodes.add(link.source);
        connectedNodes.add(link.target);
        connectedLinks.add(link);
      }
    });
    
    setHighlightNodes(connectedNodes);
    setHighlightLinks(connectedLinks);
  };
  
  // Handle node click to select character
  const handleNodeClick = node => {
    const character = charactersData.find(c => c.id === node.id);
    if (character) {
      onCharacterSelect(character);
    }
  };
  
  // Get color for a character group
  const getNodeColor = (group) => {
    switch (group) {
      case 'Protagonists':
        return '#3182ce'; // blue
      case 'Fifth Columnists':
        return '#e53e3e'; // red
      case 'German Connection':
        return '#d69e2e'; // yellow
      default:
        return '#718096'; // gray
    }
  };
  
  // Get unique relationship types for filter
  const relationshipTypes = graphData.relationshipTypes || [];
  
  return (
    <div className="relationship-web">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Character Relationship Web</h2>
        <p className="text-gray-600 mb-4">
          Explore the connections between characters in "Stitched Up". Click on nodes to view character details, 
          and hover to highlight their relationships.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        </div>
      </div>
      
      <div className="border rounded" style={{ height: '600px' }}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeRelSize={8}
          nodeId="id"
          nodeLabel={node => node.name}
          nodeColor={node => 
            hoverNode ? 
              (node === hoverNode || highlightNodes.has(node) ? getNodeColor(node.group) : 'rgba(200,200,200,0.3)') : 
              getNodeColor(node.group)
          }
          linkWidth={link => highlightLinks.has(link) ? 3 : 1}
          linkColor={link => highlightLinks.has(link) ? '#333' : '#999'}
          linkDirectionalParticles={link => highlightLinks.has(link) ? 4 : 0}
          linkDirectionalParticleWidth={3}
          linkLabel={link => formatRelationshipType(link.type)}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          linkCurvature={0.25}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = hoverNode ? 
              (node === hoverNode || highlightNodes.has(node) ? getNodeColor(node.group) : 'rgba(200,200,200,0.3)') : 
              getNodeColor(node.group);
            ctx.fill();
            
            // Draw selected node outline if applicable
            if (selectedCharacter && node.id === selectedCharacter.id) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, 7, 0, 2 * Math.PI);
              ctx.strokeStyle = '#000';
              ctx.lineWidth = 2;
              ctx.stroke();
            }
            
            // Only draw labels if zoomed in enough, or if node is highlighted/hovered
            if (globalScale >= 0.8 || node === hoverNode || highlightNodes.has(node) || 
                (selectedCharacter && node.id === selectedCharacter.id)) {
              // Draw text background
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
              
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fillRect(
                node.x - bckgDimensions[0] / 2,
                node.y + 6,
                bckgDimensions[0],
                bckgDimensions[1]
              );
              
              // Draw text
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = '#333';
              ctx.fillText(label, node.x, node.y + 6 + fontSize/2);
            }
          }}
        />
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: '#3182ce' }}></div>
          <span className="text-sm">Protagonists</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: '#e53e3e' }}></div>
          <span className="text-sm">Fifth Columnists</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: '#d69e2e' }}></div>
          <span className="text-sm">German Connection</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: '#718096' }}></div>
          <span className="text-sm">Supporting Characters</span>
        </div>
      </div>
      
      {/* Selected node info */}
      {selectedCharacter && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-bold text-lg">{selectedCharacter.name}</h3>
          <div className="text-sm text-gray-600 mb-2">{selectedCharacter.role}</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <h4 className="font-medium mb-1">Background</h4>
              <p className="text-sm">{selectedCharacter.background || "No background information available."}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Key Relationships</h4>
              {selectedCharacter.relations && selectedCharacter.relations.length > 0 ? (
                <div className="space-y-1">
                  {selectedCharacter.relations.map((relation, index) => {
                    const relatedCharacter = charactersData.find(c => c.id === relation.characterId);
                    return relatedCharacter ? (
                      <div key={index} className="text-sm">
                        <button 
                          className="font-medium hover:underline"
                          onClick={() => onCharacterSelect(relatedCharacter)}
                        >
                          {relatedCharacter.name}
                        </button>
                        <span className="text-gray-600"> - {relation.description || relation.type}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No relationship information available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to format relationship types for display
const formatRelationshipType = (type) => {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' - ');
};

export default RelationshipWeb;


// Pure graph algorithm utilities

/**
 * Find all connected components in a graph using DFS.
 * @param {Array} nodes - Array of node objects with `id`
 * @param {Array} edges - Array of edge objects with `from` and `to`
 * @returns {Array<Array<string>>} Array of components, each an array of node IDs
 */
export const findConnectedComponents = (nodes, edges) => {
  if (!nodes || nodes.length === 0) return [];

  const adjacencyList = new Map();
  nodes.forEach(node => {
    adjacencyList.set(node.id, new Set());
  });

  edges.forEach(edge => {
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

  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      const component = [];
      dfs(node.id, component);
      components.push(component);
    }
  });

  return components;
};

/**
 * Find the largest connected component in a graph.
 * @param {Array} nodes - Array of node objects with `id`
 * @param {Array} edges - Array of edge objects with `from` and `to`
 * @returns {Array<string>} Array of node IDs in the largest component
 */
export const findLargestConnectedComponent = (nodes, edges) => {
  const components = findConnectedComponents(nodes, edges);
  if (components.length === 0) return [];
  return components.reduce((largest, current) =>
    current.length > largest.length ? current : largest
  );
};

/**
 * Create a node object from character data.
 * @param {Object} character - Character object with id, name, role, group
 * @param {Object} position - { x, y } position
 * @param {Object} options - { isFocused, relationshipCount, importance, size, getGroupColor }
 * @returns {Object} Node object for the relationship graph
 */
export const createNode = (character, position, { isFocused, relationshipCount, importance, size, getGroupColor }) => ({
  id: character.id,
  name: character.name,
  role: character.role,
  group: character.group,
  position,
  color: getGroupColor(character.group, relationshipCount),
  relationshipCount,
  importance,
  size,
  isFocused
});

/**
 * Create an edge object from a relationship.
 * @param {Object} relationship - Relationship object with from, to, type
 * @param {string} id - Unique edge ID
 * @param {Function} getRelationshipColor - Function to get color for relationship type
 * @param {Function} formatRelationshipType - Function to format type label
 * @returns {Object} Edge object for the relationship graph
 */
export const createEdge = (relationship, id, getRelationshipColor, formatRelationshipType) => ({
  id,
  from: relationship.from,
  to: relationship.to,
  type: relationship.type,
  color: getRelationshipColor(relationship.type),
  label: formatRelationshipType(relationship.type)
});

/**
 * Wrap text into lines that fit within a max width.
 * @param {string} text - Text to wrap
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} fontSize - Font size for measurement
 * @param {Function} getTextWidth - Function to measure text width
 * @returns {Array<string>} Array of text lines
 */
export const wrapText = (text, maxWidth, fontSize, getTextWidth) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const testWidth = getTextWidth(testLine, fontSize);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
};

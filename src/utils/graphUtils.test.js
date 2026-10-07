import { findConnectedComponents, findLargestConnectedComponent, createEdge, wrapText } from './graphUtils';

const nodes = ['a', 'b', 'c', 'd', 'e'].map(id => ({ id }));
const edges = [
  { from: 'a', to: 'b' },
  { from: 'b', to: 'c' },
  { from: 'd', to: 'e' },
  { from: 'a', to: 'not_visible' }
];

describe('connected components', () => {
  it('groups nodes joined by edges and ignores edges to missing nodes', () => {
    const components = findConnectedComponents(nodes, edges).map(c => [...c].sort());
    expect(components).toEqual([['a', 'b', 'c'], ['d', 'e']]);
  });

  it('finds the largest component', () => {
    expect(findLargestConnectedComponent(nodes, edges).sort()).toEqual(['a', 'b', 'c']);
  });

  it('handles an empty graph', () => {
    expect(findConnectedComponents([], [])).toEqual([]);
    expect(findLargestConnectedComponent([], [])).toEqual([]);
  });
});

describe('createEdge', () => {
  it('builds an edge with colour and label from the relationship type', () => {
    const edge = createEdge({ from: 'a', to: 'b', type: 'handler-asset' }, 'id1', () => '#123456', t => t.toUpperCase());
    expect(edge).toEqual({ id: 'id1', from: 'a', to: 'b', type: 'handler-asset', color: '#123456', label: 'HANDLER-ASSET' });
  });
});

describe('wrapText', () => {
  // 10px per character makes widths easy to reason about
  const width = (text) => text.length * 10;

  it('wraps words onto lines that fit the width', () => {
    expect(wrapText('Wing Commander William Laurie', 150, 12, width)).toEqual(['Wing Commander', 'William Laurie']);
  });

  it('keeps a single over-long word on its own line', () => {
    expect(wrapText('Supercalifragilistic', 50, 12, width)).toEqual(['Supercalifragilistic']);
  });
});

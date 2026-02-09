import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook that encapsulates the force-directed graph physics simulation.
 * Handles repulsion between all node pairs, spring attraction along edges,
 * velocity damping, and FPS monitoring.
 */
export const useForceSimulation = ({
  nodes,
  setNodes,
  edges,
  springForce,
  repulsionForce,
  isAutoArrangeOn,
  pinnedNodeIds,
  autoPinnedNodeIds
}) => {
  const [fps, setFps] = useState(0);
  const [showFps, setShowFps] = useState(false);
  const [fpsHistory, setFpsHistory] = useState([]);

  const animationRef = useRef(null);
  const fpsStatsRef = useRef({ frames: 0, lastReport: 0, lastFps: 0 });

  // Live refs to avoid stale closures in RAF loop
  const springForceRef = useRef(springForce);
  const repulsionForceRef = useRef(repulsionForce);
  const edgesRef = useRef(edges);
  const pinnedNodeIdsRef = useRef(pinnedNodeIds);
  const autoPinnedNodeIdsRef = useRef(autoPinnedNodeIds);

  // Keep refs in sync
  useEffect(() => { springForceRef.current = springForce; }, [springForce]);
  useEffect(() => { repulsionForceRef.current = repulsionForce; }, [repulsionForce]);
  useEffect(() => { edgesRef.current = edges; }, [edges]);
  useEffect(() => { pinnedNodeIdsRef.current = pinnedNodeIds; }, [pinnedNodeIds]);
  useEffect(() => { autoPinnedNodeIdsRef.current = autoPinnedNodeIds; }, [autoPinnedNodeIds]);

  // Initialize FPS stats
  useEffect(() => {
    if (typeof performance !== 'undefined') {
      fpsStatsRef.current.lastReport = performance.now();
      fpsStatsRef.current.frames = 0;
      fpsStatsRef.current.lastFps = 0;
    }
  }, []);

  // Toggle FPS with F10
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F10') {
        e.preventDefault();
        setShowFps(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Core simulation step
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
        repulsionForce: repulsionForceRef.current,
        springForce: springForceRef.current,
        springLength: 120,
        damping: 0.85,
        maxVelocity: 40,

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
            nodes[i].force.x = 0;
            nodes[i].force.y = 0;
          }

          // Precompute pinned flags and id->index map
          const pinnedFlags = new Array(numNodes);
          const idToIndex = new Map();
          for (let i = 0; i < numNodes; i++) {
            idToIndex.set(nodes[i].id, i);
            pinnedFlags[i] = pinnedSet.has(nodes[i].id);
          }

          // Repulsion between all node pairs
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

          // Spring attraction along edges
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

            node.velocity.x *= damping;
            node.velocity.y *= damping;

            const speedSq = node.velocity.x * node.velocity.x + node.velocity.y * node.velocity.y;
            if (speedSq > maxVelocitySq) {
              const speed = Math.sqrt(speedSq);
              const scale = maxVelocity / speed;
              node.velocity.x *= scale;
              node.velocity.y *= scale;
            }

            if (!pinned) {
              node.position.x += node.velocity.x;
              node.position.y += node.velocity.y;
            }
          }
        }
      };

      simulation.step();

      // FPS accounting
      if (typeof performance !== 'undefined') {
        const now = performance.now();
        const stats = fpsStatsRef.current;
        stats.frames += 1;
        const elapsed = now - stats.lastReport;
        if (elapsed >= 500) {
          const currentFps = Math.round((stats.frames * 1000) / elapsed);
          stats.frames = 0;
          stats.lastReport = now;
          setFpsHistory(prev => {
            const next = [...prev, currentFps];
            const MAX = 60;
            return next.length > MAX ? next.slice(next.length - MAX) : next;
          });
          if (currentFps !== stats.lastFps) {
            stats.lastFps = currentFps;
            setFps(currentFps);
          }
        }
      }

      // Schedule next step
      if (isAutoArrangeOn && animationRef.current) {
        animationRef.current = requestAnimationFrame(runAutoArrange);
      }

      return simulation.nodes;
    });
  }, [isAutoArrangeOn, setNodes]);

  // Start/stop animation loop
  useEffect(() => {
    if (isAutoArrangeOn) {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(runAutoArrange);
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [isAutoArrangeOn, runAutoArrange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return { fps, showFps, setShowFps, fpsHistory, animationRef };
};

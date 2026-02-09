import { useEffect, useRef, useCallback, useLayoutEffect } from 'react';

/**
 * Custom hook for spring-based node size animation.
 * Smoothly animates node sizes when the "Size by Importance" toggle changes.
 */
export const useSizeAnimation = (nodes, setNodes) => {
  // Keep a live reference to nodes for the RAF callback
  const nodesRef = useRef(nodes);
  useLayoutEffect(() => { nodesRef.current = nodes; }, [nodes]);

  const velocitiesRef = useRef(new Map());
  const activeRef = useRef(false);
  const lastTimeRef = useRef(null);
  const previousTargetSizesRef = useRef(new Map());
  const frameRef = useRef(null);

  // Ensure each node has an animatedSize initialized
  useEffect(() => {
    setNodes(prev => prev.map(n => ({
      ...n,
      animatedSize: n.animatedSize != null ? n.animatedSize : (n.size != null ? n.size : 30)
    })));
  }, [nodes.length, setNodes]);

  // Spring animation step
  const stepAnimation = useCallback((timestamp) => {
    if (!activeRef.current) {
      frameRef.current = null;
      return;
    }
    const last = lastTimeRef.current;
    lastTimeRef.current = timestamp;
    const dt = Math.min(0.05, last ? (timestamp - last) / 1000 : 0.016);

    const stiffness = 260;
    const damping = 14;
    const velocities = velocitiesRef.current;
    let anyChange = false;

    const currentNodes = nodesRef.current;
    const updatedNodes = currentNodes.map(node => {
      const target = node.size != null ? node.size : 30;
      const current = node.animatedSize != null ? node.animatedSize : target;
      let v = velocities.get(node.id) || 0;

      const displacement = current - target;
      const acceleration = (-stiffness * displacement) - (damping * v);
      v = v + acceleration * dt;
      let next = current + v * dt;

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

    if (anyChange) {
      setNodes(updatedNodes);
      frameRef.current = window.requestAnimationFrame(stepAnimation);
    } else {
      activeRef.current = false;
      frameRef.current = null;
    }
  }, [setNodes]);

  const startAnimation = useCallback(() => {
    activeRef.current = true;
    lastTimeRef.current = null;
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(stepAnimation);
    }
  }, [stepAnimation]);

  // Restart animation whenever any node's target size changes
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
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      activeRef.current = false;
      velocitiesRef.current.clear();
      startAnimation();
    }
  }, [nodes, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const resetAnimation = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    activeRef.current = false;
    velocitiesRef.current.clear();
  }, []);

  return {
    startAnimation,
    resetAnimation,
    frameRef
  };
};

import '@testing-library/jest-dom/vitest';

// jsdom has no canvas: give text measurement a deterministic stand-in
HTMLCanvasElement.prototype.getContext = function getContext() {
  return {
    font: '',
    measureText: (text) => ({ width: String(text).length * 6 })
  };
};

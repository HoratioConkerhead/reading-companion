import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The app is served from https://horatioconkerhead.github.io/reading-companion/
export default defineConfig({
  base: '/reading-companion/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks cache across app deploys
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react';
          if (/[\\/]node_modules[\\/](leaflet|react-leaflet|@react-leaflet)[\\/]/.test(id)) return 'leaflet';
          return undefined;
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    // Browser tests in e2e/ run with Playwright (npm run test:e2e)
    include: ['src/**/*.test.{js,jsx}'],
    globals: true
  }
});

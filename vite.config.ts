import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Enable minification (default, but explicit for clarity)
    minify: 'esbuild',
    // Inline assets smaller than 4KB to reduce HTTP requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Manual chunk splitting: separate vendor code from app code
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});

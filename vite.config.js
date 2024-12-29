import { defineConfig } from 'vite';

export default defineConfig({
  base: '/paste/',  // Changed from /paste/ to match your GitHub Pages URL
  build: {
    outDir: 'dist'
  }
});

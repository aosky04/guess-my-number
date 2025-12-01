import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/guess-my-number/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [tailwindcss()],
});

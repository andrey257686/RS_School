import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  plugins: [tsconfigPaths()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});

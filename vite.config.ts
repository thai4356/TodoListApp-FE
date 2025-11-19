import react from '@vitejs/plugin-react-swc';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const absolutePathAliases: { [key: string]: string } = {};
// Root resources folder
const srcPath = resolve('./src/');
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.ts){1}(x?)/, ''),
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = join(srcPath, directory);
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['crypto', 'stream'],
    }),
  ],

  server: {
    host: true,
  },

  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },
});

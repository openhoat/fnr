import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import viteReact from '@vitejs/plugin-react-swc'
import { defineConfig, splitVendorChunkPlugin } from 'vite'

const baseDir = dirname(fileURLToPath(new URL(import.meta.url)))
const outDir = resolve(baseDir, 'dist', 'client')
const rootDir = resolve(baseDir, 'src', 'frontend', 'main')

/** @type {import('vite').PluginOption} */
const plugins = [viteReact(/*{ jsxRuntime: 'classic' }*/), splitVendorChunkPlugin()]

/** @type {import('vite').BuildOptions} */
const build = {
  outDir,
  chunkSizeWarningLimit: 1024 * 2,
  rollupOptions: {
    input: 'src/frontend/main/index.html',
  },
  sourcemap: 'inline',
}

export default defineConfig({
  build,
  plugins,
  base: '/app',
  root: rootDir,
})

import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import viteReact from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

const baseDir = dirname(fileURLToPath(new URL(import.meta.url)))
const rootDir = resolve(baseDir, 'src', 'frontend', 'main')

/** @type {import('vite').PluginOption} */
const plugins = [viteReact({ jsxRuntime: 'classic' })]

/** @type {import('vite').BuildOptions} */
const build = {
  chunkSizeWarningLimit: 1024 * 2,
  outDir: relative(rootDir, resolve(baseDir, 'dist', 'client')),
  sourcemap: 'inline',
}

export default defineConfig({
  build,
  plugins,
  base: '/app',
  root: rootDir,
})

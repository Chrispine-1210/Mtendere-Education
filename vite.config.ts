import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root: path.resolve(__dirname, 'client'),
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@components': path.resolve(__dirname, 'client/src/components'),
      '@hooks': path.resolve(__dirname, 'client/src/hooks'),
      '@pages': path.resolve(__dirname, 'client/src/pages'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ['**/node_modules/**'],
    },
  },
})

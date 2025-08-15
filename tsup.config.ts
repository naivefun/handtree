import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: true,
  treeshake: true,
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.scss': 'css',
    }
  },
})
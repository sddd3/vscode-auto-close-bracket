import { build } from 'esbuild';

await build({
  platform: 'node',
  target: 'esnext',
  entryPoints: ['src/extension.ts'],
  outdir: 'dist',
  minify: true,
  treeShaking: true,
  bundle: true,
  external: ['vscode'],
  logLevel: 'error',
});

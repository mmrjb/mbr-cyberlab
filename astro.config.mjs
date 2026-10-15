import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mmrjb.github.io',
  base: '/mbr-cyberlab',
  output: 'static',
  trailingSlash: 'always',
  markdown: { shikiConfig: { theme: 'github-dark' } },
});

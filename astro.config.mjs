import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pages address. The repo must be named insyirahdyn.github.io so the site is served from the root.
  site: 'https://insyirahdyn.github.io',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});

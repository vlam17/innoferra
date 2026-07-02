// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// `site` and `base` are overridden automatically by withastro/action on
// GitHub Pages (project path or custom domain). For local project-path
// testing you can run: BASE_PATH=/repo-name npm run build
export default defineConfig({
  site: process.env.SITE ?? 'https://innoferra.ai',
  base: process.env.BASE_PATH ?? '/',
  vite: {
    plugins: [tailwindcss()]
  }
});

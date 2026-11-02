import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Public site URL for canonical links, og:url and absolute share images.
// Set VITE_SITE_URL explicitly, or let Vercel's production domain fill it in.
const siteUrl =
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '');

export default defineConfig(({ isSsrBuild, isPreview }) => ({
  plugins: [react(), tailwindcss()],
  // `vite preview` serves each prerendered page's own HTML (like Vercel) instead of
  // falling back to the home page; the dev server keeps its single-page fallback.
  appType: isPreview ? 'mpa' : 'spa',
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl.replace(/\/$/, '')),
  },
  build: {
    // The server bundle only renders HTML at build time; it needs no static assets.
    copyPublicDir: !isSsrBuild,
    // The client manifest tells the prerenderer which chunk each page needs (see scripts/prerender.mjs).
    manifest: !isSsrBuild,
    // Pages load as separate chunks (src/routes.tsx). Group everything else into two long-lived
    // chunks, libraries and shared site code, so each page costs four script requests, not a dozen.
    rolldownOptions: isSsrBuild
      ? undefined
      : {
          output: {
            codeSplitting: {
              groups: [
                { name: 'vendor', test: /node_modules/ },
                // Only code used by two or more chunks; page-only components (the contact forms) stay with their page.
                { name: 'shared', test: /[\\/]src[\\/](components|data|config|lib|hooks)[\\/]/, minShareCount: 2 },
              ],
            },
          },
        },
  },
}));

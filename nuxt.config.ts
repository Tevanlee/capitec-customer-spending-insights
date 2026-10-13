import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/styles/main.scss'],
  modules: ['@nuxt/fonts'],

  alias: {
    '~types': fileURLToPath(new URL('./types', import.meta.url)),
  },

  vite: {
    logLevel: 'info',
    clearScreen: false,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:3000',
    },
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  fonts: {
    families: [{ name: 'Outfit', provider: 'google', global: true }],
  },
});

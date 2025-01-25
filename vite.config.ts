import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html',
        suppressWarnings: true,
      },
      manifest: {
        name: 'EZ Copy',
        short_name: 'EZ Copy',
        theme_color: '#181818',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: 'https://ez-clipboard.vercel.app/',
        icons: [
          {
            purpose: 'maskable',
            src: '/icons/copy-72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            purpose: 'any',
            src: '/icons/copy-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            purpose: 'any',
            src: '/icons/copy-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/images/screenshot-mobile.png',
            sizes: '720x1440',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /someInterface/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'interface-cache',
            },
          },
          {
            urlPattern: /(.*?)\.(js|css|ts)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'js-css-cache',
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
            },
          },
        ],
      },
    }),
  ],
});

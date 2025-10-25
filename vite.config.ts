import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: '0.0.0.0',
    hmr: {
      port: 3000,
    },
  },
})

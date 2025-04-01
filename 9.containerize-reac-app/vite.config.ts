import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Permite conexiones externas (Docker)
    port: 5173,
    strictPort: true, // Evita que Vite cambie el puerto si está en uso
    watch: {
      usePolling: true, // Corrige problemas de hot reload en Docker
    },
  }
})

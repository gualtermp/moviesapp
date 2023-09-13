import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/movies": {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

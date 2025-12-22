import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  //   server: {
  //   proxy: {
  //     "/api-proxy": {
  //       target: "http://202.4.125.191",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api-proxy/, ""),
  //     },
  //   },
  // },
})

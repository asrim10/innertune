import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import envCompatile from 'vite-plugin-env-compatible'

// https://vite.dev/config/
export default defineConfig({

  envPrefix : "REACT_APP_",
  plugins: [react(),
    envCompatile(), tailwindcss()],
  
})

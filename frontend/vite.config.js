import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // Har doim nisbiy yo'ldan foydalanish uchun
  plugins: [react(), tailwindcss()],
})
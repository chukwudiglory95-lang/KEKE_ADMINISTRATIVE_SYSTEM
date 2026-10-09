import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: '/KEKE_ADMINISTRATIVE_SYSTEM/',
  plugins: [
    react(),
    tailwindcss(),
  ],
});
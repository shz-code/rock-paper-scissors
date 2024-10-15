import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // This allows Vite to listen on all available network interfaces
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Add an alias for the src folder if needed
    },
  },
});

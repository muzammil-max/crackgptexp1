import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@google/generative-ai"], // Exclude the package to prevent issues
  },
  build: {
    rollupOptions: {
      external: ["fs"], // Ignore fs module to avoid errors
    },
  },
});

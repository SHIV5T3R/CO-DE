/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/tests/setup.tsx",
  },
});

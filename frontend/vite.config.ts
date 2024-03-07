/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/tests/setup.tsx",
  },
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "./src/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`,
      config: `${path.resolve(__dirname, "./src/config/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      styles: `${path.resolve(__dirname, "./src/styles/")}`,
      store: `${path.resolve(__dirname, "./src/store/")}`,
      services: `${path.resolve(__dirname, "./src/services/")}`,
      shadcn: `${path.resolve(__dirname, "./src/shadcn/components/")}`,
      lib: `${path.resolve(__dirname, "./src/lib/")}`,
      mocks: `${path.resolve(__dirname, "./src/mocks/")}`,
    },
  },
});

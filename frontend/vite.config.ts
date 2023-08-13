/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/tests/setup.tsx",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shadcn": path.resolve(__dirname, "./src/shadcn/components"), // alias for shadcn primitive components
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@/components/*": "./src/components/*",
      "@/components/ui/*": "./src/components/ui/*",
      "@/components/layout/*": "./src/components/layout/*",
      "@/hooks/*": "./src/hooks/*",
      "@/pages/*": "./src/pages/*",
      "@/types/*": "./types/*",
      "@/config/*": "./src/config/*",
      "@/styles/*": "./src/styles/*",
      "@/utils/*": "./src/utils/*",
      "@/assets/*": "./src/assets/*",
      "@/public/*": "./public/*",
      "@/store/*": "./src/store/*",
      "@/services/*": "./src/services/*"
    },
  },
});

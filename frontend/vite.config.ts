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
      "@/components/*": "./src/components/*",
      "@/components/ui/*": "./src/components/ui/*",
      "@/components/layout/*": "./src/components/layout/*",
      "@/lib/*": "./src/lib/*",
      "@/hooks/*": "./src/hooks/*",
      "@/pages/*": "./src/pages/*",
      "@/types/*": "./types/*",
      "@/config/*": "./src/config/*",
      "@/styles/*": "./src/styles/*",
      "@/utils/*": "./src/utils/*",
      "@/assets/*": "./src/assets/*",
      "@/public/*": "./public/*",
      "@/store/*": "./src/store/*",
      "@/services/*": "./src/services/*",
      "@/*": "./*",
    },
  },
});

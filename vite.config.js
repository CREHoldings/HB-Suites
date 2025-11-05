import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Performance optimizations
  build: {
    // Enable source maps for production debugging
    sourcemap: false,

    // Optimize chunk size
    chunkSizeWarningLimit: 1000,

    // Rollup options for better tree-shaking
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "gsap-vendor": ["gsap"],
          utils: ["lucide-react"],
        },

        // Optimize asset filenames for better caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },

    // Minification (using esbuild - default, faster)
    minify: "esbuild",

    // CSS code splitting
    cssCodeSplit: true,

    // Target modern browsers for smaller bundle
    // ES2015 ensures compatibility with Chrome, Safari, Edge, Firefox (last 2 versions)
    target: "es2015",

    // Polyfills for older browsers (uncomment if needed)
    // polyfillDynamicImport: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "gsap", "lucide-react"],
  },
});

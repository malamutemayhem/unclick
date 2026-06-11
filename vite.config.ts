import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Stamps a fresh build date into index.html (replaces __UC_BUILD_DATE__).
// Keeps the visible "Last updated" line and the WebSite/dateModified JSON-LD
// truthful on every deploy instead of relying on a hand-edited date.
function htmlBuildDate(): Plugin {
  const buildDate = new Date().toISOString().slice(0, 10);
  return {
    name: "uc-html-build-date",
    transformIndexHtml(html) {
      return html.split("__UC_BUILD_DATE__").join(buildDate);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), htmlBuildDate()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@jobsmith": path.resolve(__dirname, "./apps/jobsmith/src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

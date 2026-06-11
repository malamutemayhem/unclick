import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "fs";

// Stamps a fresh build date into index.html (replaces __UC_BUILD_DATE__) and
// the MEASURED catalog counts (replaces __UC_TOOL_COUNT__ / __UC_APP_COUNT__).
// Keeps the visible copy and the JSON-LD truthful on every deploy instead of
// relying on hand-edited numbers that drift from reality.
function htmlBuildStamp(): Plugin {
  const buildDate = new Date().toISOString().slice(0, 10);
  const catalog = JSON.parse(
    readFileSync(path.resolve(__dirname, "src/data/app-catalog.generated.json"), "utf8"),
  ) as { appCount: number; toolCount: number };
  const toolCount = `${catalog.toolCount.toLocaleString("en-US")}+`;
  const appCount = `${catalog.appCount}+`;
  return {
    name: "uc-html-build-stamp",
    transformIndexHtml(html) {
      return html
        .split("__UC_BUILD_DATE__").join(buildDate)
        .split("__UC_TOOL_COUNT_RAW__").join(String(catalog.toolCount))
        .split("__UC_TOOL_COUNT__").join(toolCount)
        .split("__UC_APP_COUNT__").join(appCount);
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
  plugins: [react(), htmlBuildStamp()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@jobsmith": path.resolve(__dirname, "./apps/jobsmith/src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

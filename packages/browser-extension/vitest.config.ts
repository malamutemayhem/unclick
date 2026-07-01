import { defineConfig } from "vitest/config";

// Standalone config so the package tests run in a plain Node environment,
// independent of the root web-app vitest config.
export default defineConfig({
  test: {
    include: ["src/**/*.{test,spec}.ts"],
    environment: "node",
  },
});

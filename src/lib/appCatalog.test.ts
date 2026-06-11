import { describe, expect, it } from "vitest";
import { APP_CATALOG, APP_CATEGORIES, APP_COUNT, TOOL_COUNT, getApp } from "./appCatalog";

// Integrity guard for the generated app catalog. Runs in the main vitest gate so
// a stale or malformed src/data/app-catalog.generated.json is caught in CI.
// Regenerate with: node scripts/generate-app-catalog.mjs
describe("app catalog integrity", () => {
  it("matches its own counts", () => {
    expect(APP_CATALOG.length).toBe(APP_COUNT);
    expect(APP_CATALOG.reduce((n, a) => n + a.toolCount, 0)).toBe(TOOL_COUNT);
  });

  it("every app has the fields the UI relies on", () => {
    for (const app of APP_CATALOG) {
      expect(app.slug, `slug for ${app.name}`).toBeTruthy();
      expect(app.name, `name for ${app.slug}`).toBeTruthy();
      expect(app.category, `category for ${app.slug}`).toBeTruthy();
      expect(app.blurb, `blurb for ${app.slug}`).toBeTruthy();
      expect(app.toolCount, `toolCount for ${app.slug}`).toBe(app.tools.length);
      expect(["offline", "online", "hybrid"], `network for ${app.slug}`).toContain(app.network);
    }
  });

  it("never ships the internal 'local' marker as a domain (it breaks the icon)", () => {
    const bad = APP_CATALOG.filter((a) => a.domain === "local").map((a) => a.slug);
    expect(bad, `apps with domain "local": ${bad.join(", ")}`).toEqual([]);
  });

  it("keeps the offline bucket honest: offline apps have no brand domain", () => {
    const suspicious = APP_CATALOG.filter((a) => a.network === "offline" && a.domain).map((a) => a.slug);
    expect(suspicious, `offline apps with a domain: ${suspicious.join(", ")}`).toEqual([]);
  });

  it("classifies every app into a real, user-facing category (none fall to Other)", () => {
    const others = APP_CATALOG.filter((a) => a.category === "Other").map((a) => a.slug);
    expect(others, `uncategorized apps: ${others.join(", ")}`).toEqual([]);
  });

  it("exposes the distinct category list the filter chips use", () => {
    const distinct = [...new Set(APP_CATALOG.map((a) => a.category))].sort();
    expect(APP_CATEGORIES).toEqual(distinct);
  });

  it("can look up an app by slug", () => {
    expect(getApp("github")?.name).toBe("GitHub");
    expect(getApp("not-a-real-app")).toBeUndefined();
  });
});

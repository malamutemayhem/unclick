import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Regression guard for Web Cache Deception (reported 2026-06).
 *
 * The SPA fallback rewrite in vercel.json must NOT rewrite asset-looking
 * paths (anything containing a file extension) to /index.html. If it does,
 * a request such as /admin/dashboard/x.css returns 200 text/html (the SPA
 * shell) instead of a 404, which a CDN can cache under a "static asset"
 * rule -- the precondition for cache deception.
 *
 * The fix scopes the catch-all to extensionless paths only:
 *   { "source": "/((?!.*\\.).*)", "destination": "/index.html" }
 * so deep links keep working while asset-looking paths fall through to the
 * filesystem (real files) or a hard 404 (non-existent).
 */

interface Rewrite {
  source: string;
  destination: string;
}

function loadSpaFallback(): Rewrite {
  const config = JSON.parse(readFileSync("vercel.json", "utf8")) as {
    rewrites?: Rewrite[];
  };
  const fallback = (config.rewrites ?? []).filter(
    (r) => r.destination === "/index.html",
  );
  // There should be exactly one SPA fallback rewrite.
  expect(fallback).toHaveLength(1);
  return fallback[0];
}

// Compile a vercel.json `source` the way Vercel anchors it: a full-path
// match with an optional trailing slash, case-insensitive. The catch-all
// source is plain regex (no path-to-regexp `:params`), so this is faithful.
function compile(source: string): RegExp {
  return new RegExp(`^${source}\\/?$`, "i");
}

describe("SPA fallback rewrite (web cache deception guard)", () => {
  it("is not the unscoped /(.*) catch-all", () => {
    const fallback = loadSpaFallback();
    expect(fallback.source).not.toBe("/(.*)");
  });

  it("serves the SPA shell for real (extensionless) deep links", () => {
    const re = compile(loadSpaFallback().source);
    const spaRoutes = [
      "/",
      "/docs",
      "/admin",
      "/admin/dashboard",
      "/admin/testpass/runs/abc-123",
      "/connect/xero",
      "/apps/coingecko",
      "/memory/setup-guide",
      "/auth/callback",
      "/i",
    ];
    for (const path of spaRoutes) {
      expect(re.test(path), `${path} should serve index.html`).toBe(true);
    }
  });

  it("does NOT serve the SPA shell for asset-looking paths", () => {
    const re = compile(loadSpaFallback().source);
    const assetLike = [
      "/style.css",
      "/dashboard/notreal.css",
      "/admin/dashboard/x.js",
      "/assets/index-abc123.js",
      "/og-image.png",
      "/favicon.svg",
      "/robots.txt",
      "/enterprise/latest.html",
      "/dogfood/latest.json",
    ];
    for (const path of assetLike) {
      expect(
        re.test(path),
        `${path} must fall through, not return the HTML shell`,
      ).toBe(false);
    }
  });
});

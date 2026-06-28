import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const config = JSON.parse(fs.readFileSync(path.join(repoRoot, "vercel.json"), "utf8"));

function headerValuesFor(source) {
  const rule = config.headers.find((entry) => entry.source === source);
  assert.ok(rule, `missing headers rule for ${source}`);
  return Object.fromEntries(rule.headers.map((header) => [header.key.toLowerCase(), header.value]));
}

test("SPA app-shell responses are explicitly non-cacheable at browser and CDN layers", () => {
  const headers = headerValuesFor("/((?!.*\\.).*)");

  assert.equal(headers["cache-control"], "private, no-store, max-age=0, must-revalidate");
  assert.equal(headers["cdn-cache-control"], "no-store");
  assert.equal(headers["vercel-cdn-cache-control"], "no-store");
});

test("SPA fallback excludes extension-looking paths", () => {
  const indexRewrites = config.rewrites.filter((rewrite) => rewrite.destination === "/index.html");

  assert.deepEqual(indexRewrites, [
    { source: "/((?!.*\\.).*)", destination: "/index.html" },
  ]);
});

test("SPA fallback pattern keeps real app routes and rejects fake static extensions", () => {
  const fallbackPattern = /^\/((?!.*\.).*)$/;

  assert.equal(fallbackPattern.test("/"), true);
  assert.equal(fallbackPattern.test("/admin"), true);
  assert.equal(fallbackPattern.test("/admin/agents/heartbeat"), true);
  assert.equal(fallbackPattern.test("/admin/testpass/runs/abc-123"), true);
  assert.equal(fallbackPattern.test("/connect/xero"), true);
  assert.equal(fallbackPattern.test("/memory/setup-guide"), true);
  assert.equal(fallbackPattern.test("/tools/link-in-bio"), true);
  assert.equal(fallbackPattern.test("/admin.css"), false);
  assert.equal(fallbackPattern.test("/admin/agents/heartbeat.css"), false);
  assert.equal(fallbackPattern.test("/favicon.png"), false);
  assert.equal(fallbackPattern.test("/robots.txt"), false);
  assert.equal(fallbackPattern.test("/llms.txt"), false);
  assert.equal(fallbackPattern.test("/dogfood/latest.json"), false);
  assert.equal(fallbackPattern.test("/vibe-coding/CLAUDE.md"), false);
  assert.equal(fallbackPattern.test("/sitemap.xml"), false);
});

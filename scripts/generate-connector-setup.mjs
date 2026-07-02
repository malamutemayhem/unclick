// Generates src/data/connector-setup.generated.json from the canonical
// connector setup registry (packages/mcp-server/src/connector-setup.ts).
// The frontend connect wizard reads this to show, per app, what credential is
// needed, where to get it, and any extra setup note - without importing the
// MCP package into browser code.
//
// Run:        node scripts/generate-connector-setup.mjs
// Verify CI:  node scripts/generate-connector-setup.mjs --check

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "packages/mcp-server/src/connector-setup.ts");
const OUT = path.join(ROOT, "src/data/connector-setup.generated.json");

const FIELDS = ["displayName", "credential", "arg", "envVar", "setupUrl", "note"];

function parse(source) {
  const start = source.indexOf("export const CONNECTOR_SETUP");
  if (start === -1) throw new Error("CONNECTOR_SETUP not found in connector-setup.ts");
  const body = source.slice(start);

  // One row looks like:  slug: { displayName: "...", credential: "...", ... },
  // Keys may be quoted ("npm-registry"). Field values are one-line strings.
  const rowRe = /^\s{2}(?:"([a-z0-9-]+)"|([a-z0-9-]+)):\s*\{([\s\S]*?)^\s{2}\},/gm;
  const fieldRe = /(\w+):\s*"((?:[^"\\]|\\.)*)"/g;

  const connectors = {};
  for (const m of body.matchAll(rowRe)) {
    const slug = m[1] ?? m[2];
    const chunk = m[3];
    const row = {};
    for (const f of chunk.matchAll(fieldRe)) {
      const [, key, raw] = f;
      if (!FIELDS.includes(key)) continue;
      row[key] = raw.replace(/\\"/g, '"');
    }
    if (Object.keys(row).length > 0) connectors[slug] = row;
  }
  return connectors;
}

const connectors = parse(fs.readFileSync(SOURCE, "utf8"));
const json = JSON.stringify(
  { generatedAt: "static", count: Object.keys(connectors).length, connectors },
  null,
  2,
) + "\n";

if (process.argv.includes("--check")) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current !== json) {
    console.error("connector setup data is stale. Run: node scripts/generate-connector-setup.mjs");
    process.exit(1);
  }
  console.log(`connector setup data up to date (${Object.keys(connectors).length} connectors).`);
} else {
  fs.writeFileSync(OUT, json);
  console.log(`Wrote ${path.relative(ROOT, OUT)} (${Object.keys(connectors).length} connectors).`);
}

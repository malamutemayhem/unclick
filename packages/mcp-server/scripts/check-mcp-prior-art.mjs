// check-mcp-prior-art.mjs
// For each UnClick integration, check whether prior-art MCP servers already
// exist, querying the two registries with no tight rate limits:
//   - npm registry search (registry.npmjs.org)
//   - official MCP registry (registry.modelcontextprotocol.io)
//
// GitHub / Smithery / mcp.so are noisier and rate-limited; query those by hand
// for anything that looks contested here.
//
// Usage: node scripts/check-mcp-prior-art.mjs

const NICHE = [
  ["amber",         "amber electric"],
  ["ptv",           "public transport victoria"],
  ["thelott",       "the lott lottery"],
  ["australiapost", "australia post tracking"],
  ["domain",        "domain.com.au property"],
  ["abn",           "abn lookup business"],
  ["ipaustralia",   "ip australia trademark"],
  ["tab",           "tab betting odds"],
  ["willyweather",  "willyweather"],
  ["sendle",        "sendle shipping"],
  ["ebird",         "ebird birds"],
  ["untappd",       "untappd beer"],
  ["bgg",           "boardgamegeek"],
  ["speedrun",      "speedrun.com"],
  ["setlistfm",     "setlist.fm"],
  ["openf1",        "openf1 formula 1"],
  // controls: known to have official/mature MCPs
  ["stripe",        "stripe payments"],
  ["github",        "github"],
  ["notion",        "notion"],
];

async function npmHits(q) {
  const url = `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(q + " mcp")}&size=5`;
  const r = await fetch(url);
  if (!r.ok) return { n: "?", top: [] };
  const d = await r.json();
  const objs = (d.objects || []).filter((o) => /mcp|model.?context/i.test((o.package.name + " " + (o.package.description || ""))));
  return { n: objs.length, top: objs.slice(0, 2).map((o) => o.package.name) };
}

async function mcpRegistryHits(q) {
  const url = `https://registry.modelcontextprotocol.io/v0/servers?search=${encodeURIComponent(q)}&limit=5`;
  const r = await fetch(url);
  if (!r.ok) return { n: "?", top: [] };
  const d = await r.json();
  const servers = (d.servers || []).map((s) => s.server?.name).filter(Boolean);
  // registry search is fuzzy; keep names that share a token with the query
  const tokens = q.toLowerCase().split(/\W+/).filter((t) => t.length > 3);
  const rel = servers.filter((n) => tokens.some((t) => n.toLowerCase().includes(t)));
  return { n: rel.length, top: rel.slice(0, 2) };
}

console.log("integration".padEnd(16), "npm".padStart(4), "registry".padStart(9), "  prior art (top hits)");
console.log("-".repeat(80));
for (const [slug, q] of NICHE) {
  const [npm, reg] = await Promise.all([npmHits(q), mcpRegistryHits(q)]);
  const hits = [...npm.top, ...reg.top].slice(0, 3).join(", ") || "(none found)";
  console.log(slug.padEnd(16), String(npm.n).padStart(4), String(reg.n).padStart(9), "  " + hits);
}

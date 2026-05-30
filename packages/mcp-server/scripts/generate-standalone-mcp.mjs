// generate-standalone-mcp.mjs
// Turns an existing UnClick connector (src/<slug>-tool.ts + its wiring) into a
// self-contained, publishable standalone MCP server. This is the automation
// behind the "plant a flag per niche" strategy: each standalone is discoverable
// for its own search term and funnels back to the full UnClick bundle.
//
// What it does, per connector:
//   1. Reads the connector's tool definitions from ADDITIONAL_TOOLS and its
//      tool->function handler map from ADDITIONAL_HANDLERS in tool-wiring.ts.
//   2. Copies src/<slug>-tool.ts verbatim (these niche connectors are
//      self-contained: native fetch + env/args, no shared imports).
//   3. Emits packages/standalone/<slug>-mcp/ with package.json, tsconfig,
//      server.json (registry manifest under our namespace), a generated
//      MCP stdio index.ts, README, and LICENSE.
//
// Usage: node scripts/generate-standalone-mcp.mjs            (generates all configured)
//        node scripts/generate-standalone-mcp.mjs amber ptv  (only these slugs)
//
// It does NOT publish. Publishing (npm + MCP registry) is a deliberate,
// owner-authorised step done separately.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG = path.resolve(__dirname, "..");          // packages/mcp-server
const SRC = path.join(PKG, "src");
const OUT_ROOT = path.resolve(PKG, "../standalone"); // packages/standalone
const NAMESPACE = "io.github.malamutemayhem";        // verified registry namespace
const VERSION = "0.1.0";
const FUNNEL = "By UnClick. 180+ tools plus persistent agent memory in one install: https://unclick.world";
const ICON = "https://unclick.world/favicon.png";

// ─── The top-10 must-have standalones (open niches, we are first) ──────────────
// keywords feed the registry/README so the server is found for its own term.

const CONFIG = {
  amber:         { title: "Amber Electric MCP",  blurb: "Real-time Australian electricity spot prices and renewables data from Amber Electric.", keywords: ["amber", "electricity", "energy", "australia"] },
  willyweather:  { title: "WillyWeather MCP",    blurb: "Australian weather, surf, and tide forecasts from WillyWeather.", keywords: ["willyweather", "weather", "surf", "tide", "australia"] },
  domain:        { title: "Domain MCP",          blurb: "Australian property listings, prices, and suburb stats from Domain.", keywords: ["domain", "property", "real-estate", "australia"] },
  ipaustralia:   { title: "IP Australia MCP",    blurb: "Australian trademark and patent search via IP Australia.", keywords: ["ip-australia", "trademark", "patent", "australia"] },
  ptv:           { title: "PTV MCP",             blurb: "Melbourne / Victoria public transport timetables, departures, and disruptions (PTV).", keywords: ["ptv", "public-transport", "melbourne", "victoria", "australia"] },
  thelott:       { title: "The Lott MCP",        blurb: "Australian lottery results and jackpots from The Lott.", keywords: ["the-lott", "lottery", "lotto", "australia"] },
  australiapost: { title: "Australia Post MCP",  blurb: "Australia Post parcel tracking, postcode lookup, and delivery times.", keywords: ["australia-post", "auspost", "parcel-tracking", "shipping", "australia"] },
  sendle:        { title: "Sendle MCP",          blurb: "Sendle shipping quotes, orders, and parcel tracking.", keywords: ["sendle", "shipping", "parcel", "australia"] },
  untappd:       { title: "Untappd MCP",         blurb: "Untappd beer and brewery search, details, and activity.", keywords: ["untappd", "beer", "brewery"] },
  bgg:           { title: "BoardGameGeek MCP",   blurb: "BoardGameGeek search, game details, rankings, and collections.", keywords: ["boardgamegeek", "bgg", "board-games"] },
  // ── popular batch ──
  openmeteo:     { title: "Open-Meteo Weather MCP", blurb: "Free global weather: current conditions, hourly and daily forecasts from Open-Meteo. No API key.", keywords: ["weather", "forecast", "open-meteo", "climate"] },
  coingecko:     { title: "CoinGecko MCP",       blurb: "Live cryptocurrency prices, market data, history, and trending coins from CoinGecko. No API key.", keywords: ["crypto", "coingecko", "bitcoin", "prices"] },
  hackernews:    { title: "Hacker News MCP",     blurb: "Search and read Hacker News stories, comments, users, Ask HN and Show HN. No API key.", keywords: ["hacker-news", "hn", "tech-news"] },
  tmdb:          { title: "TMDB MCP",            blurb: "Search movies and TV, with details, trending, now-playing, and recommendations from The Movie Database.", keywords: ["tmdb", "movies", "tv", "film"] },
  nasa:          { title: "NASA MCP",            blurb: "NASA imagery and data: astronomy picture of the day, Mars rover photos, asteroids, and Earth imagery.", keywords: ["nasa", "space", "astronomy", "mars"] },
  restcountries: { title: "REST Countries MCP",  blurb: "Country data: flags, currencies, languages, regions, capitals, and more. No API key.", keywords: ["countries", "geography", "restcountries"] },
  openlibrary:   { title: "Open Library MCP",    blurb: "Search books, authors, and editions, with trending titles, from Open Library. No API key.", keywords: ["books", "openlibrary", "library", "authors"] },
  spotify:       { title: "Spotify MCP",         blurb: "Search Spotify for tracks, artists, albums, and playlists, with audio features and recommendations.", keywords: ["spotify", "music", "playlists", "tracks"] },
  youtube:       { title: "YouTube MCP",         blurb: "Search YouTube and get video, channel, playlist, and caption details.", keywords: ["youtube", "video", "search", "captions"] },
  reddit:        { title: "Reddit MCP",          blurb: "Search, read, and post across Reddit: posts, comments, subreddits, and users.", keywords: ["reddit", "social", "forums", "subreddit"] },
  // ── batch 3 ──
  espn:          { title: "ESPN Sports MCP",     blurb: "Live scores, news, and team info across NFL, NBA, MLB, NHL, and soccer from ESPN. No API key.", keywords: ["sports", "scores", "espn", "nfl", "nba"] },
  trivia:        { title: "Trivia MCP",          blurb: "Trivia questions across categories and difficulties from the Open Trivia Database. No API key.", keywords: ["trivia", "quiz", "questions"] },
  meal:          { title: "Recipes MCP",         blurb: "Search recipes by name, ingredient, category, or area, with full instructions, from TheMealDB. No API key.", keywords: ["recipes", "meals", "cooking", "food"] },
  musicbrainz:   { title: "MusicBrainz MCP",     blurb: "Open music metadata: artists, releases, and recordings from MusicBrainz. No API key.", keywords: ["music", "musicbrainz", "metadata"] },
  lastfm:        { title: "Last.fm MCP",         blurb: "Music charts, artist info, similar artists, and top tracks from Last.fm.", keywords: ["lastfm", "music", "charts"] },
  usgs:          { title: "USGS Earthquakes MCP", blurb: "Recent earthquakes worldwide and by region, with detail, from USGS. No API key.", keywords: ["earthquakes", "usgs", "seismic"] },
  openaq:        { title: "OpenAQ Air Quality MCP", blurb: "Global air quality measurements by location and country from OpenAQ. No API key.", keywords: ["air-quality", "openaq", "pollution"] },
  omdb:          { title: "OMDb Movies MCP",     blurb: "Search movies and shows and get details by title or IMDb ID from the Open Movie Database.", keywords: ["movies", "omdb", "imdb", "film"] },
  exchangerate:  { title: "Exchange Rates MCP",  blurb: "Currency conversion plus latest and historical exchange rates.", keywords: ["currency", "forex", "exchange-rate"] },
  rawg:          { title: "RAWG Games MCP",      blurb: "Search video games with detail, screenshots, genres, and upcoming releases from RAWG.", keywords: ["games", "rawg", "video-games"] },
  igdb:          { title: "IGDB Games MCP",      blurb: "Video game database: search games, companies, genres, and platforms via IGDB.", keywords: ["games", "igdb", "video-games"] },
  genius:        { title: "Genius Lyrics MCP",   blurb: "Search songs and artists and get song and artist detail from Genius.", keywords: ["genius", "lyrics", "songs", "music"] },
};

// ─── Parse tool-wiring.ts ──────────────────────────────────────────────────────

const wiring = fs.readFileSync(path.join(SRC, "tool-wiring.ts"), "utf8");

function section(marker, openTok) {
  const start = wiring.indexOf(marker);
  if (start < 0) throw new Error(`marker not found: ${marker}`);
  const open = wiring.indexOf(openTok, start) + openTok.length;
  // find matching close by scanning for the section's closing "];" or "};"
  const close = wiring.indexOf(openTok === "[" ? "\n];" : "\n};", open);
  return wiring.slice(open, close);
}

const toolsBody = section("export const ADDITIONAL_TOOLS", "[");
const handlersBody = section("export const ADDITIONAL_HANDLERS", "{");

// tool definitions for a connector: text between its `// ── <slug>-tool.ts ──`
// header and the next `// ──` header.
function toolDefsFor(slug) {
  const re = new RegExp(`//\\s*[─-]+\\s*${slug}-tool\\.ts\\s*[─-]*`, "g");
  const m = re.exec(toolsBody);
  if (!m) return null;
  const from = m.index + m[0].length;
  const nextHeader = /\n\s*\/\/\s*[─-]{2,}\s*[a-z0-9_-]+-tool\.ts/g;
  nextHeader.lastIndex = from;
  const nm = nextHeader.exec(toolsBody);
  const to = nm ? nm.index : toolsBody.length;
  return toolsBody.slice(from, to).replace(/^\s*\n/, "").replace(/,?\s*$/, "");
}

// handler map entries for a connector: lines under `// <slug>-tool.ts` header.
function handlersFor(slug) {
  const re = new RegExp(`//\\s*${slug}-tool\\.ts`, "g");
  const m = re.exec(handlersBody);
  if (!m) return null;
  const from = m.index + m[0].length;
  const nextHeader = /\n\s*\/\/\s*[a-z0-9_-]+-tool\.ts/g;
  nextHeader.lastIndex = from;
  const nm = nextHeader.exec(handlersBody);
  const to = nm ? nm.index : handlersBody.length;
  const chunk = handlersBody.slice(from, to);
  const entries = [...chunk.matchAll(/^\s*([a-z0-9_]+):\s*\(args\)\s*=>\s*([a-zA-Z0-9_]+)\(/gm)]
    .map((x) => ({ tool: x[1], fn: x[2] }));
  return entries.length ? entries : null;
}

// ─── Emit a standalone package ─────────────────────────────────────────────────

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function generate(slug) {
  const cfg = CONFIG[slug];
  if (!cfg) throw new Error(`no config for slug: ${slug}`);
  const srcFile = path.join(SRC, `${slug}-tool.ts`);
  if (!fs.existsSync(srcFile)) throw new Error(`missing source: ${srcFile}`);

  const defs = toolDefsFor(slug);
  const handlers = handlersFor(slug);
  if (!defs || !handlers) throw new Error(`could not parse wiring for ${slug} (defs:${!!defs} handlers:${!!handlers})`);

  const src = fs.readFileSync(srcFile, "utf8");
  const fns = [...new Set(handlers.map((h) => h.fn))];
  // detect external npm deps used by the connector source
  const extraDeps = {};
  if (/from\s+"fast-xml-parser"/.test(src)) extraDeps["fast-xml-parser"] = "^5.8.0";

  const outDir = path.join(OUT_ROOT, `${slug}-mcp`);
  const regName = `${NAMESPACE}/${slug}`;
  const pkgName = `@unclick/${slug}-mcp`;

  // index.ts — a minimal MCP stdio server exposing just this connector
  const index = `#!/usr/bin/env node
// ${cfg.title}. Standalone MCP server by UnClick.
// ${FUNNEL}
//
// Generated from the UnClick connector by scripts/generate-standalone-mcp.mjs.
// Edit the connector in the UnClick monorepo, not here.

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  ${fns.join(",\n  ")},
} from "./${slug}-tool.js";

const TOOLS = [
${defs}
];

const HANDLERS: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
${handlers.map((h) => `  ${h.tool}: (args) => ${h.fn}(args as unknown as Parameters<typeof ${h.fn}>[0]),`).join("\n")}
};

const server = new Server(
  { name: ${JSON.stringify(regName)}, version: ${JSON.stringify(VERSION)} },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = HANDLERS[req.params.name];
  if (!handler) {
    return { content: [{ type: "text", text: \`Unknown tool: \${req.params.name}\` }], isError: true };
  }
  try {
    const result = await handler((req.params.arguments ?? {}) as Record<string, unknown>);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { content: [{ type: "text", text: message }], isError: true };
  }
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(\`[${slug}-mcp] fatal: \${err instanceof Error ? err.message : String(err)}\\n\`);
  process.exit(1);
});
`;

  const pkg = {
    name: pkgName,
    version: VERSION,
    mcpName: regName,
    description: `${cfg.blurb} By UnClick (https://unclick.world).`,
    keywords: ["mcp", "model-context-protocol", "unclick", ...cfg.keywords],
    author: "UnClick (https://unclick.world)",
    type: "module",
    bin: { [`${slug}-mcp`]: "./dist/index.js" },
    main: "./dist/index.js",
    files: ["dist", "README.md", "server.json"],
    scripts: { build: "tsc", start: "node dist/index.js", prepublishOnly: "npm run build" },
    dependencies: { "@modelcontextprotocol/sdk": "^1.15.1", ...extraDeps },
    devDependencies: { typescript: "^5.6.0", "@types/node": "^22.0.0" },
    license: "Apache-2.0",
    repository: { type: "git", url: "https://github.com/malamutemayhem/unclick.git", directory: `packages/standalone/${slug}-mcp` },
    homepage: "https://unclick.world",
  };

  const tsconfig = {
    compilerOptions: {
      target: "ES2022", module: "NodeNext", moduleResolution: "NodeNext",
      outDir: "dist", rootDir: "src", strict: true, esModuleInterop: true,
      skipLibCheck: true, declaration: false, sourceMap: false,
    },
    include: ["src/**/*"],
  };

  const serverJson = {
    $schema: "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: regName,
    title: `${cfg.title} by UnClick`,
    description: `${cfg.blurb} By UnClick (https://unclick.world).`,
    version: VERSION,
    websiteUrl: "https://unclick.world",
    icons: [{ src: ICON, mimeType: "image/png", sizes: ["512x512"] }],
    repository: { url: "https://github.com/malamutemayhem/unclick.git", source: "github", subfolder: `packages/standalone/${slug}-mcp` },
    packages: [{
      registryType: "npm",
      identifier: pkgName,
      version: VERSION,
      runtimeHint: "npx",
      transport: { type: "stdio" },
    }],
  };

  const tarballUrl = `https://github.com/malamutemayhem/unclick/releases/download/standalone-mcps-latest/${slug}.tgz`;
  const readme = `# ${cfg.title} by UnClick

${cfg.blurb}

> ${FUNNEL}

## Install

Installs straight from GitHub, no npm account needed.

\`\`\`json
{
  "mcpServers": {
    "${slug}": {
      "command": "npx",
      "args": ["-y", "${tarballUrl}"]
    }
  }
}
\`\`\`

## Tools

${handlers.map((h) => `- \`${h.tool}\``).join("\n")}

## Want the rest?

This is one connector. [UnClick](https://unclick.world) bundles 180+ tools plus
persistent cross-session agent memory in a single install.

## License

Apache-2.0
`;

  const license = `Apache License 2.0

Copyright (c) ${new Date().getFullYear()} UnClick / malamutemayhem

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
`;

  write(path.join(outDir, "src", `${slug}-tool.ts`), src);
  write(path.join(outDir, "src", "index.ts"), index);
  write(path.join(outDir, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
  write(path.join(outDir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2) + "\n");
  write(path.join(outDir, "server.json"), JSON.stringify(serverJson, null, 2) + "\n");
  write(path.join(outDir, "README.md"), readme);
  write(path.join(outDir, "LICENSE"), license);

  return { slug, regName, pkgName, tools: handlers.length, deps: Object.keys(extraDeps) };
}

const requested = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const slugs = requested.length ? requested : Object.keys(CONFIG);

console.log(`Generating ${slugs.length} standalone MCP server(s) into ${path.relative(process.cwd(), OUT_ROOT)}/\n`);
const results = [];
for (const slug of slugs) {
  try {
    const r = generate(slug);
    results.push(r);
    console.log(`  ✓ ${r.pkgName.padEnd(26)} ${String(r.tools).padStart(2)} tools  ->  ${r.regName}${r.deps.length ? `  (+${r.deps.join(",")})` : ""}`);
  } catch (err) {
    console.log(`  ✗ ${slug}: ${err.message}`);
  }
}
console.log(`\nGenerated ${results.length}/${slugs.length}. Not published — run the publish step when ready.`);

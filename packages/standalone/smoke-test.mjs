// smoke-test.mjs
// Drives the built standalone MCP servers over the real MCP protocol and makes
// live tool calls, to prove they actually work end to end (not just compile).
// Designed for CI, where the runner has open internet (unlike dev sandboxes).
//
// Spawns each server via stdio, does the MCP handshake, calls one real tool, and
// reports the live result. Set STANDALONE_DIR to the packages/standalone path.

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "node:path";
import fs from "node:fs";

const BASE = process.env.STANDALONE_DIR || path.resolve("packages/standalone");

// Keyless servers plus PTV (ships with a public-data dev key), so this runs
// with no secrets configured.
const CASES = [
  { dir: "openmeteo-mcp",     label: "Melbourne weather",      tool: "weather_current", args: { latitude: -37.81, longitude: 144.96 } },
  { dir: "coingecko-mcp",     label: "Bitcoin price (USD)",    tool: "crypto_price",    args: { ids: "bitcoin", vs_currencies: "usd" } },
  { dir: "restcountries-mcp", label: "Country lookup",         tool: "country_by_name", args: { name: "australia" } },
  { dir: "hackernews-mcp",    label: "Hacker News top story",  tool: "hn_top_stories",  args: { limit: 1 } },
  { dir: "ptv-mcp",           label: "PTV: Brighton Beach",    tool: "ptv_search",      args: { query: "Brighton Beach", route_type: 0 } },
];

const rows = [];
let failures = 0;

for (const c of CASES) {
  const cwd = path.join(BASE, c.dir);
  if (!fs.existsSync(path.join(cwd, "dist/index.js"))) {
    rows.push(`⏭️ **${c.label}** — \`${c.dir}\` not built, skipped`);
    continue;
  }
  const transport = new StdioClientTransport({ command: "node", args: ["dist/index.js"], cwd });
  const client = new Client({ name: "smoke", version: "1.0.0" }, { capabilities: {} });
  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    const res = await client.callTool({ name: c.tool, arguments: c.args });
    const text = String(res.content?.[0]?.text ?? "");
    const failed = res.isError === true || /^\s*\{?\s*"?error"?/i.test(text) || /fetch failed/i.test(text);
    const snippet = text.replace(/\s+/g, " ").slice(0, 220);
    rows.push(`${failed ? "❌" : "✅"} **${c.label}** — \`${c.dir}\` (${tools.length} tools)\n    \`${c.tool}\` → ${snippet}`);
    if (failed) failures++;
  } catch (e) {
    rows.push(`❌ **${c.label}** — ${e.message}`);
    failures++;
  } finally {
    try { await client.close(); } catch { /* ignore */ }
  }
}

const md = [
  "### 🔌 Standalone MCP live smoke test",
  "",
  "Real servers, real MCP protocol, real live API calls (run on a CI runner with open internet):",
  "",
  ...rows,
  "",
  failures === 0 ? "**✅ All live calls returned data.**" : `**❌ ${failures} call(s) failed.**`,
].join("\n");

console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");
fs.writeFileSync(path.resolve(process.env.RESULT_FILE || "smoke-result.md"), md + "\n");
// Don't fail the job; the point is to surface live results, not gate merges.
process.exit(0);

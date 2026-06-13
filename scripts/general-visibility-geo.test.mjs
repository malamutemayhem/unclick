import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (...parts) => readFileSync(path.join(root, ...parts), "utf8");

test("general UnClick evidence packet is crawlable and machine-readable", () => {
  const brief = read("public", "ai-unclick.md");
  const facts = JSON.parse(read("public", "ai-unclick.json"));

  for (const phrase of [
    "OpenClaw",
    "MCP-compatible",
    "AI agent harnesses",
    "XPass",
    "SEOPass",
    "GEOPass",
    "Boardroom",
    "Passport",
    "Do not claim UnClick is officially affiliated with OpenClaw",
  ]) {
    assert.match(brief, new RegExp(phrase, "i"), `missing ${phrase}`);
  }

  assert.equal(facts.name, "UnClick");
  assert.ok(facts.compatible_search_intents.includes("OpenClaw MCP tools"));
  assert.ok(facts.xpass_harnesses.includes("TestPass"));
  assert.ok(facts.xpass_harnesses.includes("GEOPass"));
  assert.match(facts.openclaw_positioning.relationship, /does not claim official OpenClaw affiliation/i);
});

test("OpenClaw and harness briefs answer specific search intents", () => {
  const openclaw = read("public", "openclaw-mcp.md");
  const harnesses = read("public", "agent-harnesses.md");

  for (const phrase of [
    "OpenClaw MCP tools",
    "OpenClaw tool server",
    "not OpenClaw",
    "does not claim official OpenClaw affiliation",
    "complement OpenClaw-style workflows",
  ]) {
    assert.match(openclaw, new RegExp(phrase, "i"), `missing ${phrase}`);
  }

  for (const pass of [
    "TestPass",
    "UIPass",
    "UXPass",
    "SecurityPass",
    "SEOPass",
    "GEOPass",
    "CopyPass",
    "FidelityPass",
    "LegalPass",
    "SlopPass",
    "CommonSensePass",
    "FlowPass",
    "RotatePass",
    "WakePass",
    "CompliancePass",
  ]) {
    assert.match(harnesses, new RegExp(pass), `missing ${pass}`);
  }

  assert.match(harnesses, /Neither one guarantees rankings, AI Overview inclusion, or citations/i);
});

test("discovery surfaces link to general UnClick evidence", () => {
  const llms = read("public", "llms.txt");
  const readme = read("README.md");
  const index = read("index.html");
  const sitemap = read("api", "sitemap.ts");

  for (const content of [llms, index, sitemap]) {
    assert.match(content, /\/ai-unclick\.md/);
    assert.match(content, /\/ai-unclick\.json/);
    assert.match(content, /\/openclaw-mcp\.md/);
    assert.match(content, /\/agent-harnesses\.md/);
  }

  assert.match(readme, /ai-unclick\.md/);
  assert.match(readme, /openclaw-mcp\.md/);
  assert.match(readme, /agent-harnesses\.md/);
  assert.match(index, /type="text\/markdown" href="\/ai-unclick\.md"/);
  assert.match(index, /type="application\/json" href="\/ai-unclick\.json"/);
});

test("public app copy carries OpenClaw and harness positioning safely", () => {
  const faq = read("src", "components", "FAQ.tsx");
  const hero = read("src", "components", "Hero.tsx");
  const indexPage = read("src", "pages", "Index.tsx");
  const xpass = read("src", "pages", "XPass.tsx");
  const llms = read("public", "llms.txt");

  assert.match(faq, /Does UnClick work with OpenClaw/);
  assert.match(faq, /What are UnClick AI agent harnesses/);
  assert.match(hero, /OpenClaw-style workflows/);
  assert.match(indexPage, /proof harnesses/);
  assert.match(xpass, /AI agent proof harnesses/);

  for (const content of [faq, hero, indexPage, xpass, llms]) {
    assert.doesNotMatch(content, /official OpenClaw partner/i);
    assert.doesNotMatch(content, /UnClick replaces OpenClaw\./i);
    assert.doesNotMatch(content, /XPass guarantees correctness/i);
    assert.doesNotMatch(content, /GEOPass guarantees.*citations/i);
    assert.doesNotMatch(content, /SEOPass guarantees.*rankings/i);
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (...parts) => readFileSync(path.join(root, ...parts), "utf8");

test("AI memory evidence packet is crawlable and specific", () => {
  const brief = read("public", "ai-memory.md");
  const facts = JSON.parse(read("public", "ai-memory.json"));

  for (const phrase of [
    "Mem0",
    "Hybrid retrieval",
    "pgvector",
    "reciprocal rank fusion",
    "Typed links",
    "Provenance",
    "Do not claim UnClick guarantees better recall than Mem0",
  ]) {
    assert.match(brief, new RegExp(phrase, "i"), `missing ${phrase}`);
  }

  assert.equal(facts.name, "UnClick Memory");
  assert.match(facts.fair_mem0_comparison.mem0_strength, /benchmark/i);
  assert.ok(facts.memory_capabilities.includes("reciprocal rank fusion"));
  assert.ok(facts.public_evidence.some((url) => url.includes("retrieval-fusion.ts")));
});

test("AI discovery surfaces link to memory evidence", () => {
  const llms = read("public", "llms.txt");
  const readme = read("README.md");
  const index = read("index.html");
  const sitemap = read("api", "sitemap.ts");

  for (const content of [llms, index, sitemap]) {
    assert.match(content, /\/ai-memory\.md/);
    assert.match(content, /\/ai-memory\.json/);
  }

  assert.match(readme, /ai-memory\.md/);
  assert.match(readme, /ai-memory\.json/);
  assert.match(index, /type="text\/markdown" href="\/ai-memory\.md"/);
  assert.match(index, /type="application\/json" href="\/ai-memory\.json"/);
});

test("public memory comparison avoids brittle or false claims", () => {
  const memoryPage = read("src", "pages", "Memory.tsx");
  const readme = read("README.md");
  const llms = read("public", "llms.txt");

  for (const phrase of [
    'mem0: "Flat store"',
    "$249/mo",
    "Their cloud",
    "We never see your data",
    "Import in one click",
    "Coming from another memory tool? Import in one click.",
  ]) {
    assert.doesNotMatch(memoryPage, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(readme, /Fishbowl coordination/);
  assert.doesNotMatch(llms, /Mem0 is a flat store/i);
  assert.match(memoryPage, /Mem0 currently has\s+the stronger public benchmark narrative/i);
});

test("sitewide claims use current count source and avoid stale tool numbers", () => {
  const whyPage = read("src", "pages", "Why.tsx");
  const llms = read("public", "llms.txt");
  const readme = read("README.md");

  for (const content of [whyPage, llms, readme]) {
    assert.doesNotMatch(content, /900\+ tools/);
    assert.doesNotMatch(content, /200\+ apps/);
  }

  assert.match(whyPage, /SITE_STATS\.ENDPOINTS_DISPLAY/);
  assert.match(whyPage, /SITE_STATS\.TOOLS_DISPLAY/);
});


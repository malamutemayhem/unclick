import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { MOCK_AGENTS } from "@/data/mockAgents";

// The skill-seed migration must cover the entire roster: every agent the
// website advertises gets a real seed_prompt with skills and a challenge
// line, so no Council seat ever falls back to a bare "You are {name}."

const MIGRATION_PATH = join(
  process.cwd(),
  "supabase/migrations/20260611100000_agent_skill_seed_prompts.sql",
);

function parseSeedRows(sql: string): Array<{ slug: string; challenge: string; skills: string[] }> {
  const rows: Array<{ slug: string; challenge: string; skills: string[] }> = [];
  const rowPattern = /\('([a-z0-9-]+)',\s*'((?:[^']|'')+)',\s*ARRAY\[((?:[^\]])+)\]\)/g;
  for (const match of sql.matchAll(rowPattern)) {
    const skills = [...match[3].matchAll(/'((?:[^']|'')+)'/g)].map((skill) => skill[1]);
    rows.push({ slug: match[1], challenge: match[2], skills });
  }
  return rows;
}

describe("crew agent skill seed migration", () => {
  const sql = readFileSync(MIGRATION_PATH, "utf8");
  const rows = parseSeedRows(sql);

  it("covers every roster agent exactly once", () => {
    const seedSlugs = rows.map((row) => row.slug).sort();
    const rosterSlugs = MOCK_AGENTS.map((agent) => agent.slug).sort();
    expect(seedSlugs).toEqual(rosterSlugs);
  });

  it("gives every agent a substantive skill set and challenge line", () => {
    for (const row of rows) {
      expect(row.skills.length, `${row.slug} skills`).toBeGreaterThanOrEqual(4);
      expect(row.skills.length, `${row.slug} skills`).toBeLessThanOrEqual(6);
      expect(row.challenge.length, `${row.slug} challenge`).toBeGreaterThan(30);
    }
  });

  it("bakes the anti yes-man Council rules into the composed prompt", () => {
    expect(sql).toMatch(/never agree just to agree/);
    expect(sql).toMatch(/strongest objection or the most important clarifying question/);
    expect(sql).toMatch(/api_key_hash IS NULL/);
  });
});

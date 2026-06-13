import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  resolve(process.cwd(), "supabase/migrations/20260602080000_seat_identity_and_posted_at.sql"),
  "utf8",
);
const memoryAdmin = readFileSync(resolve(process.cwd(), "api/memory-admin.ts"), "utf8");

const compactSql = migration.replace(/\s+/g, " ").toLowerCase();

function handlerCase(name: string, nextName: string): string {
  const start = memoryAdmin.indexOf(`case "${name}"`);
  const end = memoryAdmin.indexOf(`case "${nextName}"`, start + 1);

  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);

  return memoryAdmin.slice(start, end);
}

describe("seat identity schema columns", () => {
  it("adds nullable public identity fields without private key storage", () => {
    expect(compactSql).toContain("alter table mc_agents add column if not exists did text");
    expect(compactSql).toContain("add column if not exists public_key text");
    expect(compactSql).toContain("add column if not exists backstage_pass_id uuid");
    expect(compactSql).toContain("references user_credentials(id) on delete set null");
    expect(compactSql).toContain("idx_mc_agents_did");
    expect(compactSql).toContain("idx_mc_agents_backstage_pass_id");
    expect(compactSql).not.toContain("private_key");
  });

  it("adds last_posted_at for profile cleanup queries", () => {
    expect(compactSql).toContain("alter table mc_fishbowl_profiles add column if not exists last_posted_at timestamptz");
    expect(compactSql).toContain("idx_mc_fishbowl_profiles_last_posted");
    expect(compactSql).toContain("on mc_fishbowl_profiles(api_key_hash, last_posted_at desc)");
    expect(compactSql).toContain("notify pgrst, 'reload schema'");
  });
});

describe("Boardroom profile post cadence", () => {
  it("updates last_posted_at only from the post handler", () => {
    const postCase = handlerCase("fishbowl_post", "fishbowl_read");

    expect(postCase).toContain("last_posted_at: postedAtIso");
    expect(postCase).toContain("last_seen_at: postedAtIso");
  });

  it("keeps passive reads from changing last_posted_at", () => {
    const readCase = handlerCase("fishbowl_read", "orchestrator_context_read");

    expect(readCase).toContain(".update({ last_seen_at: new Date().toISOString() })");
    expect(readCase).not.toContain("last_posted_at");
  });
});

import { describe, expect, it } from "vitest";
import { guardMigrationSql, isReadOnlySql, stripNonCode } from "./supabase-migration-guard.js";

// Real fixtures from PR #1586's migrations - both are additive and must pass.
const ADDITIVE_LANE = `
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS lane_hash TEXT;
UPDATE api_keys SET lane_hash = key_hash WHERE lane_hash IS NULL AND key_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_api_keys_lane_hash ON api_keys(lane_hash);
COMMENT ON COLUMN api_keys.lane_hash IS 'Stable per-account memory lane; do not DROP on rotate.';
`;

const CONSOLIDATE = `
WITH canonical AS (
  SELECT DISTINCT ON (user_id) user_id, lane_hash AS canon_lane
  FROM api_keys WHERE user_id IS NOT NULL AND is_active = TRUE AND lane_hash IS NOT NULL
  ORDER BY user_id, last_used_at DESC NULLS LAST, created_at DESC NULLS LAST
)
UPDATE api_keys k SET lane_hash = c.canon_lane
FROM canonical c
WHERE k.user_id = c.user_id AND k.lane_hash IS DISTINCT FROM c.canon_lane;
`;

describe("guardMigrationSql", () => {
  it("refuses empty input", () => {
    expect(guardMigrationSql("").ok).toBe(false);
    expect(guardMigrationSql("   \n  ").risk).toBe("empty");
  });

  it("allows additive forward migrations", () => {
    expect(guardMigrationSql(ADDITIVE_LANE)).toMatchObject({ ok: true, risk: "additive" });
    expect(guardMigrationSql(CONSOLIDATE)).toMatchObject({ ok: true, risk: "additive" });
    expect(guardMigrationSql("CREATE TABLE x (id uuid);").ok).toBe(true);
  });

  it("refuses destructive statements by default", () => {
    expect(guardMigrationSql("DROP TABLE api_keys;")).toMatchObject({ ok: false, risk: "destructive", matched: ["DROP"] });
    expect(guardMigrationSql("TRUNCATE mc_extracted_facts;").ok).toBe(false);
    expect(guardMigrationSql("DELETE FROM api_keys WHERE id = '1';").ok).toBe(false);
    expect(guardMigrationSql("ALTER TABLE x DROP COLUMN y;").matched).toContain("DROP");
  });

  it("allows destructive only with explicit opt-in", () => {
    const r = guardMigrationSql("DROP TABLE scratch;", { allowDestructive: true });
    expect(r.ok).toBe(true);
    expect(r.risk).toBe("destructive");
  });

  it("does not trip on keywords inside comments or strings", () => {
    expect(guardMigrationSql("-- DROP TABLE x is the rollback\nCREATE TABLE x (id int);").ok).toBe(true);
    expect(guardMigrationSql("/* TRUNCATE later */ CREATE INDEX i ON x(id);").ok).toBe(true);
    expect(guardMigrationSql("INSERT INTO notes(body) VALUES ('remember to DELETE old rows');").ok).toBe(true);
    expect(guardMigrationSql("CREATE FUNCTION f() RETURNS void AS $$ BEGIN DROP TABLE t; END $$ LANGUAGE plpgsql;").ok).toBe(true);
  });
});

describe("isReadOnlySql", () => {
  it("treats pure selects as read-only", () => {
    expect(isReadOnlySql("select 1;")).toBe(true);
    expect(isReadOnlySql("select count(*) as missing from api_keys where lane_hash is null;")).toBe(true);
    expect(isReadOnlySql("-- update later\nselect * from api_keys;")).toBe(true);
  });

  it("treats writes/DDL as not read-only", () => {
    expect(isReadOnlySql("update api_keys set lane_hash = key_hash;")).toBe(false);
    expect(isReadOnlySql("create index i on x(id);")).toBe(false);
    expect(isReadOnlySql("")).toBe(false);
  });
});

describe("stripNonCode", () => {
  it("removes comments and literals", () => {
    expect(stripNonCode("select 1 -- drop table x").includes("drop")).toBe(false);
    expect(stripNonCode("/* drop */ select 1").includes("drop")).toBe(false);
    expect(stripNonCode("select 'drop table x'").includes("drop")).toBe(false);
  });
});

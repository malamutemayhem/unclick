import { describe, expect, it } from "vitest";
import { inspectSql, executeSupabaseSql, applySupabaseMigration } from "./supabase-write-tool.js";

// The destructive-statement guard is the safety core: it must flag anything
// that can destroy or expose data, and pass plain reads / additive DDL.
describe("inspectSql guard", () => {
  it("flags DROP TABLE", () => {
    expect(inspectSql("DROP TABLE users;").destructive).toBe(true);
  });

  it("flags TRUNCATE", () => {
    expect(inspectSql("truncate table events").destructive).toBe(true);
  });

  it("flags DELETE without WHERE", () => {
    expect(inspectSql("DELETE FROM accounts;").destructive).toBe(true);
  });

  it("allows DELETE with a WHERE clause", () => {
    expect(inspectSql("DELETE FROM accounts WHERE id = 1;").destructive).toBe(false);
  });

  it("flags UPDATE without WHERE", () => {
    expect(inspectSql("UPDATE accounts SET active = false;").destructive).toBe(true);
  });

  it("allows UPDATE with a WHERE clause", () => {
    expect(inspectSql("UPDATE accounts SET active = false WHERE id = 1;").destructive).toBe(false);
  });

  it("flags GRANT / REVOKE", () => {
    expect(inspectSql("GRANT ALL ON users TO anon;").destructive).toBe(true);
    expect(inspectSql("REVOKE SELECT ON users FROM anon;").destructive).toBe(true);
  });

  it("flags ALTER TABLE DROP COLUMN", () => {
    expect(inspectSql("ALTER TABLE users DROP COLUMN email;").destructive).toBe(true);
  });

  it("passes additive DDL and plain reads", () => {
    expect(inspectSql("CREATE TABLE IF NOT EXISTS t (id int);").destructive).toBe(false);
    expect(inspectSql("INSERT INTO t (id) VALUES (1);").destructive).toBe(false);
    expect(inspectSql("SELECT * FROM t;").destructive).toBe(false);
  });
});

describe("executeSupabaseSql validation + guard", () => {
  it("requires project_ref", async () => {
    const r = await executeSupabaseSql({ sql: "SELECT 1" }) as Record<string, unknown>;
    expect(String(r.error)).toMatch(/project_ref/i);
  });

  it("requires sql", async () => {
    const r = await executeSupabaseSql({ project_ref: "abcdefghijklmn" }) as Record<string, unknown>;
    expect(String(r.error)).toMatch(/sql is required/i);
  });

  it("blocks destructive SQL unless confirmed", async () => {
    const r = await executeSupabaseSql({
      project_ref: "abcdefghijklmn", sql: "DROP TABLE users;",
    }) as Record<string, unknown>;
    expect(String(r.error)).toMatch(/destructive/i);
    expect(Array.isArray(r.reasons)).toBe(true);
  });

  it("lets confirmed destructive SQL past the guard (then needs a credential)", async () => {
    const r = await executeSupabaseSql({
      project_ref: "abcdefghijklmn", sql: "DROP TABLE users;", confirm: true,
    }) as Record<string, unknown>;
    // Guard passed; without a connected token it falls through to the
    // not-connected card rather than the destructive block.
    expect(String(r.error)).not.toMatch(/destructive/i);
  });
});

describe("applySupabaseMigration validation", () => {
  it("requires a 14-digit version", async () => {
    const r = await applySupabaseMigration({
      project_ref: "abcdefghijklmn", version: "123", sql: "SELECT 1",
    }) as Record<string, unknown>;
    expect(String(r.error)).toMatch(/14-digit/);
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const schema = readFileSync(new URL("../../schema.sql", import.meta.url), "utf8");

function getStartupContextSql(): string {
  const match = schema.match(
    /CREATE OR REPLACE FUNCTION get_startup_context[\s\S]*?END;\s*\$\$ LANGUAGE plpgsql;/,
  );
  if (!match) throw new Error("get_startup_context function not found in memory-mcp schema.sql");
  return match[0];
}

describe("memory-mcp get_startup_context schema parity", () => {
  it("keeps active_facts on the live-row predicate", () => {
    const sql = getStartupContextSql();

    expect(sql).toContain("WHERE status = 'active' AND decay_tier = 'hot'");
    expect(sql).toContain("invalidated_at IS NULL");
    expect(sql).toContain("valid_from <= now()");
    expect(sql).toContain("(valid_to IS NULL OR valid_to > now())");
    expect(sql).toContain("COALESCE(startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')");
  });

  it("touches access counts only for the same visible startup facts", () => {
    const sql = getStartupContextSql();
    const updateBlock = sql.slice(sql.indexOf("UPDATE extracted_facts"));

    expect(updateBlock).toContain("WHERE status = 'active' AND decay_tier = 'hot'");
    expect(updateBlock).toContain("invalidated_at IS NULL");
    expect(updateBlock).toContain("valid_from <= now()");
    expect(updateBlock).toContain("(valid_to IS NULL OR valid_to > now())");
    expect(updateBlock).toContain("COALESCE(startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')");
  });
});

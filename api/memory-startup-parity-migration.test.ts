import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(
  resolve(process.cwd(), "supabase/migrations/20260528000000_memory_active_facts_startup_parity.sql"),
  "utf8",
);
const hybridMigration = readFileSync(
  resolve(process.cwd(), "supabase/migrations/20260528010000_memory_hybrid_recall_visibility.sql"),
  "utf8",
);

describe("memory startup parity migration", () => {
  it("centralizes startup eligibility in security-invoker views", () => {
    expect(migration).toContain("CREATE OR REPLACE VIEW mc_active_facts_startup_v1");
    expect(migration).toContain("CREATE OR REPLACE VIEW active_facts_startup_v1");
    expect(migration).toContain("WITH (security_invoker = true)");
    expect(migration).toContain("COALESCE(startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')");
    expect(migration).toContain("REVOKE ALL ON TABLE mc_active_facts_startup_v1 FROM anon, authenticated");
  });

  it("makes startup functions read the shared views and touch only surfaced ids", () => {
    expect(migration).toContain("FROM mc_active_facts_startup_v1");
    expect(migration).toContain("FROM active_facts_startup_v1");
    expect(migration).toContain("id = ANY(fact_ids)");
  });

  it("keeps direct fact search out of future and expired facts", () => {
    expect(migration).toMatch(/CREATE OR REPLACE FUNCTION mc_search_facts[\s\S]+ef\.valid_from <= now\(\)/);
    expect(migration).toMatch(/CREATE OR REPLACE FUNCTION search_facts[\s\S]+ef\.valid_from <= now\(\)/);
    expect(migration).toContain("(ef.valid_to IS NULL OR ef.valid_to > now())");
  });

  it("keeps direct fact search out of operational facts", () => {
    expect(migration).toMatch(
      /CREATE OR REPLACE FUNCTION mc_search_facts[\s\S]+COALESCE\(ef\.startup_fact_kind, 'legacy_unspecified'\) NOT IN \('operational', 'excluded'\)/,
    );
    expect(migration).toMatch(
      /CREATE OR REPLACE FUNCTION search_facts[\s\S]+COALESCE\(ef\.startup_fact_kind, 'legacy_unspecified'\) NOT IN \('operational', 'excluded'\)/,
    );
    expect(migration).toContain("LIKE '%heartbeat%'");
    expect(migration).toContain("LIKE '%self-report%'");
  });

  it("keeps hybrid search RPCs on the same recall-visible predicate", () => {
    expect(hybridMigration).toContain("CREATE OR REPLACE FUNCTION memory_fact_is_recall_visible_v1");
    expect(hybridMigration).toContain("CREATE OR REPLACE FUNCTION mc_search_memory_hybrid");
    expect(hybridMigration).toContain("CREATE OR REPLACE FUNCTION search_memory_hybrid");
    expect(hybridMigration).toContain("COALESCE(p_startup_fact_kind, 'legacy_unspecified') NOT IN ('operational', 'excluded')");
    expect(hybridMigration).toContain("ss.created_at <= as_of_ts");
  });
});

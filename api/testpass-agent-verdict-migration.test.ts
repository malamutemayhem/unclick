import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("TestPass agent verdict migration", () => {
  it("allows agent_verdict evidence rows", () => {
    const migration = readFileSync(
      resolve(process.cwd(), "supabase/migrations/20260527090000_testpass_agent_verdict_evidence_kind.sql"),
      "utf8",
    );

    expect(migration).toContain("agent_verdict");
    expect(migration).toContain("testpass_evidence_kind_check");
    expect(migration).toContain("drop constraint");
  });
});

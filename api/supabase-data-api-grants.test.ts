import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function readRepoFile(repoPath: string): string {
  return readFileSync(join(process.cwd(), repoPath), "utf8");
}

describe("Supabase Data API grants audit guardrails", () => {
  it("keeps public demo rate-limit writes on the server-only Supabase key", () => {
    const source = readRepoFile("api/tools/demo.ts");

    expect(source).toContain("process.env.SUPABASE_SERVICE_ROLE_KEY");
    expect(source).not.toContain("process.env.VITE_SUPABASE_ANON_KEY");
  });

  it("does not fall back to anon for tenant settings reads", () => {
    const source = readRepoFile("packages/mcp-server/src/memory/tenant-settings.ts");

    expect(source).toContain("process.env.SUPABASE_SERVICE_ROLE_KEY");
    expect(source).not.toContain("process.env.SUPABASE_ANON_KEY");
  });

  it("adds explicit service-only grants for audited server-controlled tables", () => {
    const migration = readRepoFile("supabase/migrations/20260514000000_data_api_service_only_grants.sql");
    const tables = [
      "build_tasks",
      "build_workers",
      "build_dispatch_events",
      "memory_load_events",
      "conflict_detections",
      "tool_detections",
      "tenant_settings",
      "demo_rate_limits",
    ];

    for (const table of tables) {
      expect(migration).toContain(`'${table}'`);
    }
    expect(migration).toContain("ENABLE ROW LEVEL SECURITY");
    expect(migration).toContain("REVOKE ALL ON TABLE public.%I FROM anon, authenticated");
    expect(migration).toContain("GRANT ALL ON TABLE public.%I TO service_role");
  });
});

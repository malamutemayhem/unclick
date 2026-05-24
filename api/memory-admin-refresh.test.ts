import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  buildAdminLibraryRefreshPayload,
  parseAdminLibraryRefreshOptions,
} from "./memory-admin";

describe("admin library taxonomy refresh safety", () => {
  it("defaults refresh requests to dry-run mode", () => {
    const parsed = parseAdminLibraryRefreshOptions({}, {});

    expect(parsed.error).toBeUndefined();
    expect(parsed.commit).toBe(false);
    expect(parsed.options).toMatchObject({
      dry_run: true,
      max_sources: 80,
      max_snapshots: 12,
      max_sources_per_snapshot: 8,
    });
  });

  it("requires explicit commit before writes", () => {
    const parsed = parseAdminLibraryRefreshOptions({ dry_run: false }, {});

    expect(parsed.error).toBe("commit=true is required when dry_run=false");
  });

  it("treats commit=true as the explicit write path", () => {
    const parsed = parseAdminLibraryRefreshOptions(
      { commit: true, max_sources: 999, max_snapshots: 40, max_sources_per_snapshot: 100 },
      {},
    );

    expect(parsed.error).toBeUndefined();
    expect(parsed.commit).toBe(true);
    expect(parsed.options).toMatchObject({
      dry_run: false,
      max_sources: 250,
      max_snapshots: 30,
      max_sources_per_snapshot: 25,
    });
  });

  it("rejects conflicting commit and dry-run inputs", () => {
    const parsed = parseAdminLibraryRefreshOptions({ commit: "true", dry_run: "true" }, {});

    expect(parsed.error).toBe("commit=true conflicts with dry_run=true");
  });

  it("adds receipt counts without exposing snapshot content", () => {
    const payload = buildAdminLibraryRefreshPayload(
      {
        dry_run: false,
        generated_at: "2026-05-21T15:00:00.000Z",
        source_count: 5,
        snapshot_count: 2,
        written_count: 2,
        snapshots: [
          {
            slug: "memory-taxonomy-15-data-and-memory",
            title: "Data memory snapshot",
            primary_category: "15 Data & Memory",
            source_ids: ["fact-1"],
            source_receipts: [
              {
                memory_id: "fact:fact-1",
                source_kind: "fact",
                source_uri: "/admin/memory?tab=facts",
                redaction_state: "clean",
              },
            ],
          },
        ],
        written: [
          {
            slug: "memory-taxonomy-15-data-and-memory",
            title: "Data memory snapshot",
            message: "Library doc updated",
          },
        ],
      },
      1,
    );

    expect(payload.planned_snapshot_count).toBe(2);
    expect(payload.skipped_secret_count).toBe(1);
    expect(JSON.stringify(payload)).not.toContain("content");
  });

  it("keeps Orchestrator AutoPilot scoreboard reads unfiltered by search q", () => {
    const source = readFileSync("api/memory-admin.ts", "utf8");
    const ledgerQueryBlock = source.match(/let autopilotEventsQuery[\s\S]*?const \[/)?.[0] ?? "";

    expect(ledgerQueryBlock).toContain('.from("mc_autopilot_events")');
    expect(ledgerQueryBlock).toContain("The zero-touch scoreboard is a safety surface");
    expect(ledgerQueryBlock).not.toMatch(/autopilotEventsQuery\s*=\s*autopilotEventsQuery\.or/);
  });
});

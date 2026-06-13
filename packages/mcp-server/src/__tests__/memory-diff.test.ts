/**
 * Memory Time Machine: bi-temporal memory diff.
 *
 * Covers the pure window/bucket logic in src/memory/diff.ts and the
 * LocalBackend integration (memory_diff over a real local store). Runs under
 * vitest, so it needs no entry in the node:test script line.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  buildMemoryDiffReport,
  normalizeMemoryDiffBucketLimit,
  resolveMemoryDiffWindow,
  MEMORY_DIFF_DEFAULT_BUCKET_LIMIT,
  MEMORY_DIFF_MAX_BUCKET_LIMIT,
} from "../memory/diff.js";

const NOW = "2026-06-11T12:00:00.000Z";

describe("resolveMemoryDiffWindow", () => {
  it("defaults to the last 7 days", () => {
    const window = resolveMemoryDiffWindow(undefined, undefined, NOW);
    expect(window.to).toBe(NOW);
    expect(window.from).toBe("2026-06-04T12:00:00.000Z");
  });

  it("accepts relative durations for from and to", () => {
    const window = resolveMemoryDiffWindow("2d", "1d", NOW);
    expect(window.from).toBe("2026-06-09T12:00:00.000Z");
    expect(window.to).toBe("2026-06-10T12:00:00.000Z");
  });

  it("accepts ISO timestamps", () => {
    const window = resolveMemoryDiffWindow("2026-06-01T00:00:00.000Z", "2026-06-02T00:00:00.000Z", NOW);
    expect(window.from).toBe("2026-06-01T00:00:00.000Z");
    expect(window.to).toBe("2026-06-02T00:00:00.000Z");
  });

  it("swaps a reversed window instead of failing", () => {
    const window = resolveMemoryDiffWindow("1d", "5d", NOW);
    expect(window.from).toBe("2026-06-06T12:00:00.000Z");
    expect(window.to).toBe("2026-06-10T12:00:00.000Z");
  });

  it("anchors the default from to 7 days before an explicit past to", () => {
    const window = resolveMemoryDiffWindow(undefined, "2025-06-01T00:00:00.000Z", NOW);
    expect(window.from).toBe("2025-05-25T00:00:00.000Z");
    expect(window.to).toBe("2025-06-01T00:00:00.000Z");
  });

  it("rejects garbage points with an actionable error", () => {
    expect(() => resolveMemoryDiffWindow("not-a-time", undefined, NOW)).toThrow(/invalid 'from'/);
    expect(() => resolveMemoryDiffWindow("1d", "soonish", NOW)).toThrow(/invalid 'to'/);
  });

  it("rejects bare numbers, which Date.parse would treat as a year", () => {
    expect(() => resolveMemoryDiffWindow("7", undefined, NOW)).toThrow(/invalid 'from'/);
    expect(() => resolveMemoryDiffWindow("7d", "30", NOW)).toThrow(/invalid 'to'/);
  });
});

describe("normalizeMemoryDiffBucketLimit", () => {
  it("defaults and clamps", () => {
    expect(normalizeMemoryDiffBucketLimit(undefined)).toBe(MEMORY_DIFF_DEFAULT_BUCKET_LIMIT);
    expect(normalizeMemoryDiffBucketLimit(0)).toBe(1);
    expect(normalizeMemoryDiffBucketLimit(7.9)).toBe(7);
    expect(normalizeMemoryDiffBucketLimit(10_000)).toBe(MEMORY_DIFF_MAX_BUCKET_LIMIT);
  });
});

describe("buildMemoryDiffReport", () => {
  const window = { from: "2026-06-04T12:00:00.000Z", to: NOW };

  it("buckets added, superseded, invalidated, and archived facts", () => {
    const report = buildMemoryDiffReport({
      window,
      sessions: [],
      facts: [
        {
          id: "added-1",
          fact: "User adopted the memory time machine.",
          category: "decision",
          confidence: 0.95,
          status: "active",
          created_at: "2026-06-10T09:00:00.000Z",
        },
        {
          id: "old-tz",
          fact: "Timezone is PST.",
          category: "identity",
          status: "superseded",
          created_at: "2026-05-01T00:00:00.000Z",
          valid_to: "2026-06-09T08:00:00.000Z",
          superseded_by: "new-tz",
        },
        {
          id: "stale-1",
          fact: "This fact was wrong.",
          category: "technical",
          status: "active",
          created_at: "2026-05-20T00:00:00.000Z",
          invalidated_at: "2026-06-08T07:00:00.000Z",
          invalidation_reason: "user correction",
        },
        {
          id: "binned-1",
          fact: "Old experiment notes.",
          category: "project",
          status: "archived",
          created_at: "2026-05-02T00:00:00.000Z",
          archived_at: "2026-06-07T06:00:00.000Z",
          decay_reason: "recycle-bin:user_archive",
        },
        {
          id: "outside-1",
          fact: "Created before the window.",
          category: "general",
          status: "active",
          created_at: "2026-05-01T00:00:00.000Z",
        },
      ],
    });

    expect(report.counts).toEqual({
      facts_added: 1,
      facts_superseded: 1,
      facts_invalidated: 1,
      facts_archived: 1,
      sessions_saved: 0,
    });
    expect(report.facts_added[0]).toMatchObject({ id: "added-1", category: "decision" });
    expect(report.facts_superseded[0]).toMatchObject({ id: "old-tz", superseded_by: "new-tz" });
    expect(report.facts_invalidated[0]).toMatchObject({ id: "stale-1", reason: "user correction" });
    expect(report.facts_archived[0]).toMatchObject({ id: "binned-1", reason: "recycle-bin:user_archive" });
    expect(report.headline).toContain("1 fact added");
    expect(report.headline).toContain("1 superseded");
    expect(report.headline).toContain("1 invalidated");
    expect(report.headline).toContain("1 archived");
  });

  it("does not double-count a superseded fact as invalidated", () => {
    const report = buildMemoryDiffReport({
      window,
      sessions: [],
      facts: [
        {
          id: "both-stamps",
          fact: "Superseded facts also carry close stamps.",
          category: "technical",
          status: "superseded",
          created_at: "2026-05-01T00:00:00.000Z",
          valid_to: "2026-06-09T08:00:00.000Z",
          invalidated_at: "2026-06-09T08:00:00.000Z",
          superseded_by: "next-id",
        },
      ],
    });
    expect(report.counts.facts_superseded).toBe(1);
    expect(report.counts.facts_invalidated).toBe(0);
  });

  it("reports sessions saved in the window and honors include_sessions=false", () => {
    const sessions = [
      {
        session_id: "s-1",
        platform: "claude-code",
        summary: "Shipped the diff chip.",
        topics: ["memory"],
        decisions: ["build memory_diff"],
        created_at: "2026-06-10T10:00:00.000Z",
      },
      {
        session_id: "s-old",
        platform: "claude-code",
        summary: "Before the window.",
        topics: [],
        decisions: [],
        created_at: "2026-05-01T00:00:00.000Z",
      },
    ];
    const withSessions = buildMemoryDiffReport({ window, facts: [], sessions });
    expect(withSessions.counts.sessions_saved).toBe(1);
    expect(withSessions.sessions_saved[0]).toMatchObject({ session_id: "s-1" });

    const withoutSessions = buildMemoryDiffReport({
      window,
      facts: [],
      sessions,
      include_sessions: false,
    });
    expect(withoutSessions.counts.sessions_saved).toBe(0);
    expect(withoutSessions.sessions_saved).toEqual([]);
  });

  it("caps buckets at the limit, keeps exact counts, and flags truncation", () => {
    const facts = Array.from({ length: 5 }, (_, i) => ({
      id: `fact-${i}`,
      fact: `Fact number ${i}`,
      category: "general",
      status: "active",
      created_at: `2026-06-10T0${i}:00:00.000Z`,
    }));
    const report = buildMemoryDiffReport({ window, facts, sessions: [], limit: 2 });
    expect(report.counts.facts_added).toBe(5);
    expect(report.facts_added).toHaveLength(2);
    expect(report.facts_added[0].id).toBe("fact-4");
    expect(report.response_bounds.truncated_buckets).toContain("facts_added");
  });

  it("dedupes rows by id and writes a quiet headline when nothing changed", () => {
    const row = {
      id: "dup-1",
      fact: "Same row fetched by two window queries.",
      category: "general",
      status: "active",
      created_at: "2026-06-10T09:00:00.000Z",
    };
    const report = buildMemoryDiffReport({ window, facts: [row, { ...row }], sessions: [] });
    expect(report.counts.facts_added).toBe(1);

    const quiet = buildMemoryDiffReport({ window, facts: [], sessions: [] });
    expect(quiet.headline).toMatch(/Nothing changed in memory/);
  });

  it("honors exact count overrides and flags truncation from them", () => {
    const report = buildMemoryDiffReport({
      window,
      sessions: [],
      facts: Array.from({ length: 3 }, (_, i) => ({
        id: `capped-${i}`,
        fact: `Capped fetch row ${i}`,
        category: "general",
        status: "active",
        created_at: "2026-06-10T09:00:00.000Z",
      })),
      limit: 2,
      exact_counts: { facts_added: 500 },
    });
    expect(report.counts.facts_added).toBe(500);
    expect(report.facts_added).toHaveLength(2);
    expect(report.headline).toContain("500 facts added");
    expect(report.response_bounds.truncated_buckets).toContain("facts_added");
  });

  it("passes unavailable buckets through to response_bounds", () => {
    const report = buildMemoryDiffReport({
      window,
      facts: [],
      sessions: [],
      unavailable_buckets: ["facts_invalidated", "facts_invalidated"],
    });
    expect(report.response_bounds.unavailable_buckets).toEqual(["facts_invalidated"]);
  });

  it("caps long fact text in entries", () => {
    const longFact = "x".repeat(500);
    const report = buildMemoryDiffReport({
      window,
      sessions: [],
      facts: [
        {
          id: "long-1",
          fact: longFact,
          category: "general",
          status: "active",
          created_at: "2026-06-10T09:00:00.000Z",
        },
      ],
    });
    expect(report.facts_added[0].fact.length).toBeLessThan(longFact.length);
    expect(report.facts_added[0].fact.endsWith("...")).toBe(true);
  });
});

describe("LocalBackend memoryDiff integration", () => {
  let tempDir = "";

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "unclick-memory-diff-"));
    process.env.MEMORY_LOCAL_DATA_DIR = tempDir;
  });

  afterEach(() => {
    delete process.env.MEMORY_LOCAL_DATA_DIR;
    if (tempDir) fs.rmSync(tempDir, { recursive: true, force: true });
    tempDir = "";
  });

  it("reports adds, supersedes, invalidations, archives, and sessions from a real local store", async () => {
    const { LocalBackend } = await import("../memory/local.js");
    const backend = new LocalBackend();

    const kept = await backend.addFact({
      fact: "User shipped the memory time machine chip.",
      category: "project",
      confidence: 0.95,
    });
    const toInvalidate = await backend.addFact({
      fact: "This fact will be invalidated.",
      category: "technical",
      confidence: 0.9,
    });
    const toSupersede = await backend.addFact({
      fact: "Timezone is PST.",
      category: "identity",
      confidence: 0.9,
    });
    const toArchive = await backend.addFact({
      fact: "This fact heads to the recycle bin.",
      category: "general",
      confidence: 0.8,
    });

    await backend.invalidateFact({ fact_id: toInvalidate.id, reason: "diff test" });
    const newId = await backend.supersedeFact(toSupersede.id, "Timezone is AEST.");
    await backend.archiveFact({ fact_id: toArchive.id, reason: "diff test archive" });
    await backend.writeSessionSummary({
      session_id: "diff-session",
      platform: "test",
      summary: "Built and verified memory_diff.",
      topics: ["memory", "diff"],
      open_loops: [],
      decisions: ["ship it"],
    });

    const report = await backend.memoryDiff({ from: "1h" });

    const addedIds = report.facts_added.map((row) => row.id);
    expect(addedIds).toContain(kept.id);
    expect(addedIds).toContain(newId);
    expect(report.facts_superseded.map((row) => row.id)).toContain(toSupersede.id);
    expect(report.facts_superseded[0].superseded_by).toBe(newId);
    expect(report.facts_invalidated.map((row) => row.id)).toContain(toInvalidate.id);
    expect(report.facts_archived.map((row) => row.id)).toContain(toArchive.id);
    expect(report.sessions_saved.map((row) => row.session_id)).toContain("diff-session");
    expect(report.headline).not.toMatch(/Nothing changed/);
  });

  it("returns a quiet report for a window before any writes", async () => {
    const { LocalBackend } = await import("../memory/local.js");
    const backend = new LocalBackend();
    await backend.addFact({ fact: "Written now.", category: "general", confidence: 0.9 });

    const report = await backend.memoryDiff({
      from: "2020-01-01T00:00:00.000Z",
      to: "2020-01-02T00:00:00.000Z",
    });
    expect(report.headline).toMatch(/Nothing changed in memory/);
    expect(report.counts.facts_added).toBe(0);
  });

  it("hides quarantined and out-of-scope facts when scopes are enabled", async () => {
    const { LocalBackend } = await import("../memory/local.js");
    const backend = new LocalBackend();

    process.env.MEMORY_SCOPES_ENABLED = "1";
    try {
      const visible = await backend.addFact({
        fact: "User-global fact stays visible.",
        category: "general",
        confidence: 0.9,
      });
      await backend.addFact({
        fact: "Credential-derived fact to quarantine.",
        category: "technical",
        confidence: 0.9,
        visibility: "user-global",
        credential_scope: "stripe",
      });
      await backend.quarantineCredentialMemory("stripe");
      const report = await backend.memoryDiff({ from: "1h" });
      const ids = report.facts_added.map((row) => row.id);
      expect(ids).toContain(visible.id);
      expect(report.facts_added.some((row) => row.fact.includes("quarantine"))).toBe(false);
      expect(report.counts.facts_added).toBe(1);
    } finally {
      delete process.env.MEMORY_SCOPES_ENABLED;
    }
  });

  it("is reachable through the MEMORY_HANDLERS dispatcher as memory_diff", async () => {
    const { LocalBackend } = await import("../memory/local.js");
    const backend = new LocalBackend();
    await backend.addFact({ fact: "Dispatcher-visible fact.", category: "general", confidence: 0.9 });

    const { MEMORY_HANDLERS } = await import("../memory/handlers.js");
    expect(typeof MEMORY_HANDLERS.memory_diff).toBe("function");
    const report = (await MEMORY_HANDLERS.memory_diff({ from: "1h" })) as {
      counts: { facts_added: number };
      window: { from: string; to: string };
    };
    expect(report.counts.facts_added).toBeGreaterThanOrEqual(1);
    expect(Date.parse(report.window.from)).toBeLessThan(Date.parse(report.window.to));
  });
});

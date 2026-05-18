import { describe, expect, it } from "vitest";
import {
  memoryLibraryRefreshSources,
  parseMemoryLibraryRefreshOptions,
  runMemoryLibraryRefresh,
} from "./lib/memory-library-refresh";

describe("memory library refresh helper", () => {
  describe("parseMemoryLibraryRefreshOptions", () => {
    it("defaults to dry_run when commit is missing or falsy", () => {
      expect(parseMemoryLibraryRefreshOptions(undefined)).toMatchObject({
        commit: false,
        dry_run: true,
        max_sources: 80,
        max_snapshots: 12,
        max_sources_per_snapshot: 8,
      });
      expect(parseMemoryLibraryRefreshOptions({ commit: false }).dry_run).toBe(true);
      expect(parseMemoryLibraryRefreshOptions({ commit: "true" }).commit).toBe(true);
      expect(parseMemoryLibraryRefreshOptions({ commit: "true" }).dry_run).toBe(false);
    });

    it("clamps numeric limits into safe bounds", () => {
      const opts = parseMemoryLibraryRefreshOptions({
        max_sources: 99999,
        max_snapshots: -5,
        max_sources_per_snapshot: 100,
      });
      expect(opts.max_sources).toBe(250);
      expect(opts.max_snapshots).toBe(1);
      expect(opts.max_sources_per_snapshot).toBe(20);
    });

    it("ignores non-numeric input and keeps defaults", () => {
      const opts = parseMemoryLibraryRefreshOptions({
        max_sources: "not-a-number",
        max_snapshots: null,
        max_sources_per_snapshot: undefined,
      });
      expect(opts.max_sources).toBe(80);
      expect(opts.max_snapshots).toBe(12);
      expect(opts.max_sources_per_snapshot).toBe(8);
    });
  });

  describe("memoryLibraryRefreshSources", () => {
    it("maps fact rows and session rows into snapshot sources without losing ids", () => {
      const sources = memoryLibraryRefreshSources({
        facts: [
          {
            id: "fact-1",
            fact: "UnClick is an agent-native platform",
            category: "preference",
            confidence: 0.9,
            updated_at: "2026-05-10T00:00:00.000Z",
          },
        ],
        sessions: [
          {
            id: "session-1",
            summary: "Routed Phase 1 false-green cleanup work",
            topics: ["proof-integrity", "false-green"],
            created_at: "2026-05-11T00:00:00.000Z",
          },
        ],
      });
      expect(sources).toHaveLength(2);
      expect(sources[0]).toMatchObject({ id: "fact-1", kind: "fact", category: "preference" });
      expect(sources[1]).toMatchObject({
        id: "session-1",
        kind: "session",
        category: "proof-integrity false-green",
      });
    });

    it("falls back to a stable 'session' category when topics are empty", () => {
      const sources = memoryLibraryRefreshSources({
        facts: [],
        sessions: [{ id: "session-bare", summary: "no topics here", topics: [] }],
      });
      expect(sources[0].category).toBe("session");
    });

    it("handles empty inputs without throwing", () => {
      expect(memoryLibraryRefreshSources({ facts: [], sessions: [] })).toEqual([]);
    });
  });

  describe("runMemoryLibraryRefresh", () => {
    const fixtures = {
      facts: [
        {
          id: "fact-tech",
          fact: "Memory snapshots should keep source pointers for audit",
          category: "memory",
          confidence: 0.88,
          updated_at: "2026-05-10T10:00:00.000Z",
        },
      ],
      sessions: [
        {
          id: "session-1",
          summary: "Routed Phase 1 false-green cleanup",
          topics: ["proof-integrity"],
          created_at: "2026-05-12T00:00:00.000Z",
        },
      ],
    };

    it("dry_run never invokes the upsert function", async () => {
      const calls: string[] = [];
      const result = await runMemoryLibraryRefresh({
        facts: fixtures.facts,
        sessions: fixtures.sessions,
        options: parseMemoryLibraryRefreshOptions({ commit: false }),
        upsertLibraryDoc: async (doc) => {
          calls.push(doc.slug);
          return "should not be called";
        },
        generatedAt: "2026-05-12T01:00:00.000Z",
      });
      expect(calls).toEqual([]);
      expect(result.commit).toBe(false);
      expect(result.dry_run).toBe(true);
      expect(result.written_count).toBe(0);
      expect(result.snapshot_count).toBeGreaterThan(0);
      expect(result.fact_count).toBe(1);
      expect(result.session_count).toBe(1);
    });

    it("commit=true invokes upsert once per planned snapshot and reports written rows", async () => {
      const writes: string[] = [];
      const result = await runMemoryLibraryRefresh({
        facts: fixtures.facts,
        sessions: fixtures.sessions,
        options: parseMemoryLibraryRefreshOptions({ commit: true }),
        upsertLibraryDoc: async (doc) => {
          writes.push(doc.slug);
          return `Library doc created: "${doc.title}" (v1)`;
        },
        generatedAt: "2026-05-12T01:00:00.000Z",
      });
      expect(result.commit).toBe(true);
      expect(result.dry_run).toBe(false);
      expect(result.written_count).toBe(writes.length);
      expect(result.snapshot_count).toBe(writes.length);
      expect(writes.length).toBeGreaterThan(0);
      expect(new Set(writes).size).toBe(writes.length);
    });

    it("filters secret-shaped sources before writing", async () => {
      const writes: string[] = [];
      const result = await runMemoryLibraryRefresh({
        facts: [
          {
            id: "fact-secret",
            fact: "The Stripe billing token is sk_live_example",
            category: "billing",
            confidence: 1,
          },
          {
            id: "fact-safe",
            fact: "Memory snapshots should keep compact source pointers",
            category: "technical",
            confidence: 0.8,
          },
        ],
        sessions: [],
        options: parseMemoryLibraryRefreshOptions({ commit: true }),
        upsertLibraryDoc: async (doc) => {
          writes.push(doc.content);
          return "ok";
        },
      });
      expect(result.fact_count).toBe(2);
      expect(result.snapshot_count).toBe(1);
      const everyWriteIsClean = writes.every((content) => !content.includes("sk_live_example"));
      expect(everyWriteIsClean).toBe(true);
    });

    it("returns an empty result without throwing when there are no sources", async () => {
      const result = await runMemoryLibraryRefresh({
        facts: [],
        sessions: [],
        options: parseMemoryLibraryRefreshOptions({ commit: true }),
        upsertLibraryDoc: async () => {
          throw new Error("should not be called");
        },
      });
      expect(result.source_count).toBe(0);
      expect(result.snapshot_count).toBe(0);
      expect(result.written_count).toBe(0);
      expect(result.commit).toBe(true);
    });

    it("propagates upsert errors without losing the planned snapshot summary", async () => {
      await expect(
        runMemoryLibraryRefresh({
          facts: fixtures.facts,
          sessions: fixtures.sessions,
          options: parseMemoryLibraryRefreshOptions({ commit: true }),
          upsertLibraryDoc: async () => {
            throw new Error("schema_unavailable");
          },
        })
      ).rejects.toThrow(/schema_unavailable/);
    });
  });
});

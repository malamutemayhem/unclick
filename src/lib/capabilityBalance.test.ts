import { describe, expect, it } from "vitest";
import {
  DEFAULT_CAPABILITY_REGISTRY,
  labelForCapabilityKey,
  normalizeCapabilityKey,
  summarizeCapabilityBalance,
} from "./capabilityBalance";

const periodStart = "2026-06-01T00:00:00.000Z";
const periodEnd = "2026-07-01T00:00:00.000Z";

describe("capability balance summary", () => {
  it("marks expected-but-unused capabilities as should_use", () => {
    const summary = summarizeCapabilityBalance({
      periodStart,
      periodEnd,
      generatedAt: "2026-06-18T00:00:00.000Z",
      events: [
        { capability: "copyroom", source: "boardroom_keyword", kind: "expected", count: 3 },
        { capability: "copyroom", source: "boardroom_keyword", kind: "missed", count: 1 },
      ],
    });

    const copyroom = summary.rows.find((row) => row.key === "copyroom");
    expect(copyroom).toMatchObject({
      state: "should_use",
      expectedUses: 3,
      actualUses: 0,
      missedUses: 1,
    });
    expect(summary.totals.shouldUse).toBeGreaterThan(0);
    expect(summary.attention[0]?.key).toBe("copyroom");
  });

  it("marks high-volume capabilities as hot when usage clears the target", () => {
    const summary = summarizeCapabilityBalance({
      periodStart,
      periodEnd,
      events: [
        { capability: "testpass", source: "testpass_runs", kind: "actual", count: 11, success: true },
      ],
    });

    expect(summary.rows.find((row) => row.key === "testpass")).toMatchObject({
      state: "hot",
      actualUses: 11,
      successRate: 100,
    });
  });

  it("promotes repeated failures above quiet cold rows", () => {
    const summary = summarizeCapabilityBalance({
      periodStart,
      periodEnd,
      events: [
        { capability: "keychain", source: "connection_tests", kind: "failure", count: 3, success: false },
      ],
    });

    expect(summary.rows[0]).toMatchObject({
      key: "keychain",
      state: "broken",
      failures: 3,
      successRate: 0,
    });
  });

  it("creates watch rows for dynamic connector capabilities", () => {
    const summary = summarizeCapabilityBalance({
      periodStart,
      periodEnd,
      events: [
        { capability: "connector:github", source: "metering_events", kind: "actual", count: 4, success: true },
      ],
    });

    expect(labelForCapabilityKey("connector:github")).toBe("Github connector");
    expect(summary.rows.find((row) => row.key === "connector:github")).toMatchObject({
      label: "Github connector",
      category: "connector",
      ownerSurface: "Connections",
      actualUses: 4,
      state: "healthy",
    });
  });

  it("keeps redundant registry rows visible", () => {
    const summary = summarizeCapabilityBalance({
      periodStart,
      periodEnd,
      registry: [
        ...DEFAULT_CAPABILITY_REGISTRY,
        {
          key: "old-worker",
          label: "Old Worker",
          category: "worker",
          ownerSurface: "Workers",
          lifecycle: "redundant",
          targetMonthlyUses: 0,
          expectedSignals: [],
        },
      ],
      events: [],
    });

    expect(summary.rows.find((row) => row.key === "old-worker")).toMatchObject({
      state: "redundant",
      reason: "Marked redundant and quiet.",
    });
  });

  it("normalizes noisy keys and carries source gaps into totals", () => {
    const summary = summarizeCapabilityBalance({
      periodStart,
      periodEnd,
      events: [
        { capability: "Copy Room!!", source: "manual", kind: "actual", count: 1 },
      ],
      sourceGaps: ["native_analytics_events: relation missing"],
    });

    expect(normalizeCapabilityKey("Copy Room!!")).toBe("copy-room");
    expect(summary.rows.find((row) => row.key === "copy-room")).toMatchObject({
      label: "Copy Room",
      actualUses: 1,
    });
    expect(summary.totals.sourceGaps).toBe(1);
  });
});

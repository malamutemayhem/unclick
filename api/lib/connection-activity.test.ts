import { describe, expect, it } from "vitest";
import { deriveConnectionActivity } from "./connection-activity";

describe("deriveConnectionActivity", () => {
  it("treats an authenticated API heartbeat as connected without a memory config", () => {
    expect(deriveConnectionActivity({ apiKeyLastUsedAt: "2026-09-12T01:45:38.000Z" })).toEqual({
      connected: true,
      lastUsedAt: "2026-09-12T01:45:38.000Z",
    });
  });

  it("uses the newest durable signal and ignores malformed timestamps", () => {
    expect(deriveConnectionActivity({
      apiKeyLastUsedAt: "invalid",
      memoryLastUsedAt: "2026-09-12T01:00:00.000Z",
      lastSessionAt: "2026-09-12T02:00:00.000Z",
      lastMemoryWriteAt: "2026-09-12T01:30:00.000Z",
    })).toEqual({ connected: true, lastUsedAt: "2026-09-12T02:00:00.000Z" });
  });

  it("treats a completed public pairing as connected before the first memory call", () => {
    expect(deriveConnectionActivity({
      lastPairedAt: "2026-09-12T02:06:25.000Z",
    })).toEqual({ connected: true, lastUsedAt: "2026-09-12T02:06:25.000Z" });
  });
});

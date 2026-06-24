import { describe, expect, it } from "vitest";
import {
  badgeText,
  summarizeConnections,
  summarizeSignals,
} from "./status.js";

describe("summarizeConnections", () => {
  it("counts connected and needs-attention from mixed shapes", () => {
    const summary = summarizeConnections([
      { platform: "github", status: "connected" },
      { platform: "gmail", connected: true },
      { platform: "stripe", status: "expired" },
      { platform: "notion", healthy: false },
    ]);
    expect(summary.total).toBe(4);
    expect(summary.connected).toBe(2);
    expect(summary.needsAttention).toBe(2);
  });

  it("tolerates an empty list", () => {
    expect(summarizeConnections([])).toEqual({ total: 0, connected: 0, needsAttention: 0 });
  });
});

describe("summarizeSignals", () => {
  it("reads count, then unread, then items length", () => {
    expect(summarizeSignals({ count: 5 }).count).toBe(5);
    expect(summarizeSignals({ unread: 3 }).count).toBe(3);
    expect(summarizeSignals({ items: [1, 2] }).count).toBe(2);
  });
});

describe("badgeText", () => {
  it("shows signal count, capped at 99+", () => {
    expect(badgeText({ total: 1, connected: 1, needsAttention: 0 }, { count: 7 })).toBe("7");
    expect(badgeText({ total: 1, connected: 1, needsAttention: 0 }, { count: 250 })).toBe("99+");
  });

  it("shows ! when a connection needs attention and no signals", () => {
    expect(badgeText({ total: 2, connected: 1, needsAttention: 1 }, { count: 0 })).toBe("!");
  });

  it("is empty when all healthy and no signals", () => {
    expect(badgeText({ total: 2, connected: 2, needsAttention: 0 }, { count: 0 })).toBe("");
  });
});

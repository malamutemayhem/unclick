import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { relativeTime } from "./relativeTime";

const NOW = new Date("2026-06-11T12:00:00Z");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

function ago(ms: number): string {
  return new Date(NOW.getTime() - ms).toISOString();
}

describe("relativeTime", () => {
  it("formats short-form ranges", () => {
    expect(relativeTime(ago(5_000))).toBe("5s ago");
    expect(relativeTime(ago(3 * 60_000))).toBe("3m ago");
    expect(relativeTime(ago(2 * 3_600_000))).toBe("2h ago");
    expect(relativeTime(ago(3 * 86_400_000))).toBe("3d ago");
  });

  it("formats long-form ranges with singular and plural units", () => {
    expect(relativeTime(ago(1_000), { longForm: true })).toBe("1 second ago");
    expect(relativeTime(ago(2 * 60_000), { longForm: true })).toBe("2 minutes ago");
    expect(relativeTime(ago(60_000), { longForm: true })).toBe("1 minute ago");
  });

  it("falls back to a plain date after maxDays", () => {
    const old = ago(20 * 86_400_000);
    expect(relativeTime(old)).toBe(new Date(old).toLocaleDateString());
    expect(relativeTime(ago(8 * 86_400_000), { maxDays: 7 })).toBe(
      new Date(ago(8 * 86_400_000)).toLocaleDateString(),
    );
    expect(relativeTime(ago(8 * 86_400_000))).toBe("8d ago");
  });

  it("shows just now under a minute when asked", () => {
    expect(relativeTime(ago(5_000), { justNow: true })).toBe("just now");
    expect(relativeTime(ago(2 * 60_000), { justNow: true })).toBe("2m ago");
  });

  it("handles missing and invalid timestamps honestly", () => {
    expect(relativeTime(null)).toBe("never");
    expect(relativeTime(undefined, { emptyLabel: "No check-in yet" })).toBe("No check-in yet");
    expect(relativeTime("not-a-date")).toBe("unknown");
  });

  it("never returns a future-looking value for clock skew", () => {
    expect(relativeTime(new Date(NOW.getTime() + 60_000).toISOString())).toBe("1s ago");
  });
});

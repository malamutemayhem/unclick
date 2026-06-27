import { describe, it, expect, vi } from "vitest";
import { LogOnce } from "../log-once.js";

describe("LogOnce", () => {
  it("logs first occurrence", () => {
    const logs: string[] = [];
    const lo = new LogOnce((msg) => logs.push(msg));
    lo.warn("deprecation", "Feature X is deprecated");
    expect(logs).toEqual(["Feature X is deprecated"]);
  });

  it("suppresses repeated warnings", () => {
    const logs: string[] = [];
    const lo = new LogOnce((msg) => logs.push(msg));
    lo.warn("key");
    lo.warn("key");
    lo.warn("key");
    expect(logs).toHaveLength(1);
  });

  it("returns true on first call, false after", () => {
    const lo = new LogOnce(() => {});
    expect(lo.warn("key")).toBe(true);
    expect(lo.warn("key")).toBe(false);
  });

  it("tracks different keys separately", () => {
    const logs: string[] = [];
    const lo = new LogOnce((msg) => logs.push(msg));
    lo.warn("a", "Warning A");
    lo.warn("b", "Warning B");
    lo.warn("a", "Warning A again");
    expect(logs).toEqual(["Warning A", "Warning B"]);
  });

  it("hasSeen checks if key was logged", () => {
    const lo = new LogOnce(() => {});
    expect(lo.hasSeen("x")).toBe(false);
    lo.warn("x");
    expect(lo.hasSeen("x")).toBe(true);
  });

  it("getCount tracks total occurrences", () => {
    const lo = new LogOnce(() => {});
    lo.warn("x");
    lo.warn("x");
    lo.warn("x");
    expect(lo.getCount("x")).toBe(3);
    expect(lo.getCount("unknown")).toBe(0);
  });

  it("getSuppressedCounts reports suppressed messages", () => {
    const lo = new LogOnce(() => {});
    lo.warn("a");
    lo.warn("a");
    lo.warn("a");
    lo.warn("b");
    const suppressed = lo.getSuppressedCounts();
    expect(suppressed).toEqual([{ key: "a", count: 2 }]);
  });

  it("reset clears a specific key", () => {
    const lo = new LogOnce(() => {});
    lo.warn("x");
    lo.reset("x");
    expect(lo.hasSeen("x")).toBe(false);
  });

  it("flush returns summary and clears", () => {
    const lo = new LogOnce(() => {});
    lo.warn("a");
    lo.warn("a");
    lo.warn("a");
    const summaries = lo.flush();
    expect(summaries).toHaveLength(1);
    expect(summaries[0]).toContain("2 more time(s)");
    expect(lo.hasSeen("a")).toBe(false);
  });
});

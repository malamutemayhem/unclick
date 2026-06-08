import { describe, it, expect } from "vitest";
import { ContextWindow, estimateTokens } from "../context-window.js";

describe("ContextWindow", () => {
  it("adds entries within budget", () => {
    const cw = new ContextWindow(100);
    expect(cw.add({ id: "a", content: "hello", tokens: 50, priority: 1 })).toBe(true);
    expect(cw.used).toBe(50);
    expect(cw.available).toBe(50);
  });

  it("evicts low priority to make room", () => {
    const cw = new ContextWindow(100);
    cw.add({ id: "low", content: "x", tokens: 60, priority: 1 });
    cw.add({ id: "high", content: "y", tokens: 60, priority: 10 });
    expect(cw.size).toBe(1);
    expect(cw.getContents()[0].id).toBe("high");
  });

  it("rejects entry too large for window", () => {
    const cw = new ContextWindow(10);
    expect(cw.add({ id: "big", content: "x", tokens: 20, priority: 1 })).toBe(false);
  });

  it("removes by id", () => {
    const cw = new ContextWindow(100);
    cw.add({ id: "a", content: "x", tokens: 30, priority: 1 });
    expect(cw.remove("a")).toBe(true);
    expect(cw.used).toBe(0);
  });

  it("renders ordered by priority", () => {
    const cw = new ContextWindow(100);
    cw.add({ id: "b", content: "second", tokens: 10, priority: 1 });
    cw.add({ id: "a", content: "first", tokens: 10, priority: 10 });
    expect(cw.render()).toBe("first\n\nsecond");
  });

  it("tracks utilization", () => {
    const cw = new ContextWindow(100);
    cw.add({ id: "a", content: "x", tokens: 50, priority: 1 });
    expect(cw.utilization).toBe(0.5);
  });

  it("clear resets", () => {
    const cw = new ContextWindow(100);
    cw.add({ id: "a", content: "x", tokens: 50, priority: 1 });
    cw.clear();
    expect(cw.size).toBe(0);
    expect(cw.used).toBe(0);
  });
});

describe("estimateTokens", () => {
  it("estimates roughly 4 chars per token", () => {
    expect(estimateTokens("hello world")).toBe(3);
    expect(estimateTokens("")).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { Timer, Stopwatch } from "../timer.js";

describe("Timer", () => {
  it("starts and stops", async () => {
    const t = new Timer();
    t.start();
    await new Promise((r) => setTimeout(r, 50));
    const elapsed = t.stop();
    expect(elapsed).toBeGreaterThanOrEqual(40);
    expect(t.isRunning).toBe(false);
  });

  it("accumulates across start/stop", async () => {
    const t = new Timer();
    t.start();
    await new Promise((r) => setTimeout(r, 30));
    t.stop();
    t.start();
    await new Promise((r) => setTimeout(r, 30));
    t.stop();
    expect(t.getElapsed()).toBeGreaterThanOrEqual(50);
  });

  it("reset clears elapsed", () => {
    const t = new Timer();
    t.start();
    t.stop();
    t.reset();
    expect(t.getElapsed()).toBe(0);
  });

  it("records laps", async () => {
    const t = new Timer();
    t.start();
    await new Promise((r) => setTimeout(r, 20));
    t.lap();
    await new Promise((r) => setTimeout(r, 20));
    t.lap();
    const laps = t.getLaps();
    expect(laps).toHaveLength(2);
    expect(laps.every((l) => l > 0)).toBe(true);
  });
});

describe("Stopwatch", () => {
  it("marks timestamps", async () => {
    const sw = new Stopwatch();
    await new Promise((r) => setTimeout(r, 20));
    sw.mark("a");
    await new Promise((r) => setTimeout(r, 20));
    sw.mark("b");
    expect(sw.getMark("a")).toBeGreaterThan(0);
    expect(sw.getMark("b")!).toBeGreaterThan(sw.getMark("a")!);
  });

  it("measures between marks", async () => {
    const sw = new Stopwatch();
    sw.mark("start");
    await new Promise((r) => setTimeout(r, 30));
    sw.mark("end");
    const diff = sw.between("start", "end");
    expect(diff).toBeGreaterThanOrEqual(20);
  });

  it("allMarks returns all", () => {
    const sw = new Stopwatch();
    sw.mark("a");
    sw.mark("b");
    const marks = sw.allMarks();
    expect(Object.keys(marks)).toEqual(["a", "b"]);
  });

  it("reset clears marks", () => {
    const sw = new Stopwatch();
    sw.mark("x");
    sw.reset();
    expect(sw.getMark("x")).toBeUndefined();
  });
});

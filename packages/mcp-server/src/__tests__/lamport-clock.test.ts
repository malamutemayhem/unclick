import { describe, it, expect } from "vitest";
import { LamportClock, VectorClockProcess, HybridLogicalClock } from "../lamport-clock.js";

describe("LamportClock", () => {
  it("tick increments", () => {
    const c = new LamportClock("p1");
    expect(c.tick()).toBe(1);
    expect(c.tick()).toBe(2);
    expect(c.time).toBe(2);
  });

  it("send returns incremented time", () => {
    const c = new LamportClock("p1");
    expect(c.send()).toBe(1);
  });

  it("receive takes max + 1", () => {
    const c = new LamportClock("p1");
    c.tick();
    const t = c.receive(10);
    expect(t).toBe(11);
  });

  it("receive with lower remote", () => {
    const c = new LamportClock("p1", 5);
    const t = c.receive(3);
    expect(t).toBe(6);
  });

  it("happensBefore", () => {
    expect(LamportClock.happensBefore(1, 2)).toBe(true);
    expect(LamportClock.happensBefore(2, 1)).toBe(false);
  });

  it("concurrent", () => {
    expect(LamportClock.concurrent(3, 3)).toBe(true);
    expect(LamportClock.concurrent(3, 4)).toBe(false);
  });

  it("processId", () => {
    const c = new LamportClock("node-1");
    expect(c.processId).toBe("node-1");
  });
});

describe("VectorClockProcess", () => {
  it("tick increments own component", () => {
    const p = new VectorClockProcess("A");
    const ts = p.tick();
    expect(ts["A"]).toBe(1);
  });

  it("send returns incremented timestamp", () => {
    const p = new VectorClockProcess("A");
    const ts = p.send();
    expect(ts["A"]).toBe(1);
  });

  it("receive merges and increments", () => {
    const a = new VectorClockProcess("A");
    const b = new VectorClockProcess("B");
    a.tick();
    a.tick();
    b.receive(a.timestamp);
    const ts = b.timestamp;
    expect(ts["A"]).toBe(2);
    expect(ts["B"]).toBe(1);
  });

  it("happensBefore detects causal order", () => {
    expect(VectorClockProcess.happensBefore({ A: 1 }, { A: 2, B: 1 })).toBe(true);
    expect(VectorClockProcess.happensBefore({ A: 2 }, { A: 1 })).toBe(false);
  });

  it("concurrent detects independent events", () => {
    expect(VectorClockProcess.concurrent({ A: 1 }, { B: 1 })).toBe(true);
    expect(VectorClockProcess.concurrent({ A: 1 }, { A: 2 })).toBe(false);
  });

  it("merge combines timestamps", () => {
    const merged = VectorClockProcess.merge({ A: 2, B: 1 }, { A: 1, B: 3, C: 1 });
    expect(merged).toEqual({ A: 2, B: 3, C: 1 });
  });
});

describe("HybridLogicalClock", () => {
  it("now advances with physical time", () => {
    const hlc = new HybridLogicalClock("p1");
    const t1 = hlc.now(100);
    expect(t1.logical).toBe(100);
    expect(t1.counter).toBe(0);
  });

  it("now increments counter for same physical time", () => {
    const hlc = new HybridLogicalClock("p1");
    hlc.now(100);
    const t2 = hlc.now(100);
    expect(t2.logical).toBe(100);
    expect(t2.counter).toBe(1);
  });

  it("receive handles remote timestamp", () => {
    const hlc = new HybridLogicalClock("p1");
    const t = hlc.receive(200, 5, 100);
    expect(t.logical).toBe(200);
    expect(t.counter).toBe(6);
  });

  it("compare orders timestamps", () => {
    expect(HybridLogicalClock.compare({ logical: 100, counter: 0 }, { logical: 200, counter: 0 })).toBeLessThan(0);
    expect(HybridLogicalClock.compare({ logical: 100, counter: 1 }, { logical: 100, counter: 0 })).toBeGreaterThan(0);
    expect(HybridLogicalClock.compare({ logical: 100, counter: 0 }, { logical: 100, counter: 0 })).toBe(0);
  });

  it("time getter", () => {
    const hlc = new HybridLogicalClock("p1");
    hlc.now(50);
    expect(hlc.time).toEqual({ logical: 50, counter: 0 });
  });
});

import { describe, it, expect } from "vitest";
import { PhiAccrualDetector, MultiDetector } from "../phi-accrual.js";

describe("PhiAccrualDetector", () => {
  it("phi is 0 with no heartbeats", () => {
    const d = new PhiAccrualDetector();
    expect(d.phi(1000)).toBe(0);
  });

  it("phi is low with regular heartbeats", () => {
    const d = new PhiAccrualDetector();
    for (let t = 0; t <= 100; t += 10) d.heartbeat(t);
    expect(d.phi(110)).toBeLessThan(3);
  });

  it("phi increases with missed heartbeats", () => {
    const d = new PhiAccrualDetector();
    const times = [0, 10, 21, 30, 41, 50, 61, 70, 81, 90, 100];
    for (const t of times) d.heartbeat(t);
    const phi1 = d.phi(115);
    const phi2 = d.phi(200);
    expect(phi2).toBeGreaterThan(phi1);
  });

  it("isAvailable with regular heartbeats", () => {
    const d = new PhiAccrualDetector(8);
    for (let t = 0; t <= 100; t += 10) d.heartbeat(t);
    expect(d.isAvailable(110)).toBe(true);
  });

  it("not available after long gap", () => {
    const d = new PhiAccrualDetector(8);
    for (let t = 0; t <= 100; t += 10) d.heartbeat(t);
    expect(d.isAvailable(500)).toBe(false);
  });

  it("sampleCount tracks intervals", () => {
    const d = new PhiAccrualDetector();
    expect(d.sampleCount).toBe(0);
    d.heartbeat(0);
    expect(d.sampleCount).toBe(0);
    d.heartbeat(10);
    expect(d.sampleCount).toBe(1);
    d.heartbeat(20);
    expect(d.sampleCount).toBe(2);
  });

  it("lastSeen tracks latest heartbeat", () => {
    const d = new PhiAccrualDetector();
    expect(d.lastSeen).toBeNull();
    d.heartbeat(42);
    expect(d.lastSeen).toBe(42);
  });

  it("threshold get/set", () => {
    const d = new PhiAccrualDetector(10);
    expect(d.getThreshold()).toBe(10);
    d.setThreshold(5);
    expect(d.getThreshold()).toBe(5);
  });

  it("stats returns mean and stddev", () => {
    const d = new PhiAccrualDetector();
    for (let t = 0; t <= 50; t += 10) d.heartbeat(t);
    const s = d.stats();
    expect(s.mean).toBe(10);
    expect(s.samples).toBe(5);
  });

  it("reset clears state", () => {
    const d = new PhiAccrualDetector();
    d.heartbeat(0);
    d.heartbeat(10);
    d.reset();
    expect(d.sampleCount).toBe(0);
    expect(d.lastSeen).toBeNull();
  });

  it("maxSamples limits window", () => {
    const d = new PhiAccrualDetector(8, 5);
    for (let t = 0; t <= 100; t += 10) d.heartbeat(t);
    expect(d.sampleCount).toBe(5);
  });
});

describe("MultiDetector", () => {
  it("tracks multiple nodes", () => {
    const md = new MultiDetector();
    for (let t = 0; t <= 50; t += 10) {
      md.heartbeat("a", t);
      md.heartbeat("b", t);
    }
    expect(md.nodeCount).toBe(2);
  });

  it("phi per node", () => {
    const md = new MultiDetector();
    for (let t = 0; t <= 50; t += 10) md.heartbeat("a", t);
    expect(md.phi("a", 60)).toBeLessThan(5);
    expect(md.phi("unknown", 60)).toBe(Infinity);
  });

  it("availableNodes filters correctly", () => {
    const md = new MultiDetector(8);
    for (let t = 0; t <= 50; t += 10) {
      md.heartbeat("a", t);
      md.heartbeat("b", t);
    }
    const available = md.availableNodes(60);
    expect(available).toContain("a");
    expect(available).toContain("b");
  });

  it("isAvailable for unknown is false", () => {
    const md = new MultiDetector();
    expect(md.isAvailable("x", 0)).toBe(false);
  });

  it("remove deletes node", () => {
    const md = new MultiDetector();
    md.heartbeat("a", 0);
    md.remove("a");
    expect(md.nodeCount).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { RhythmPattern } from "../rhythm-pattern.js";

describe("RhythmPattern", () => {
  it("addBeat increases beat count", () => {
    const rp = new RhythmPattern();
    rp.addBeat(0, 0.25);
    rp.addBeat(0.5, 0.25);
    expect(rp.beatCount()).toBe(2);
  });

  it("fromString parses pattern", () => {
    const rp = RhythmPattern.fromString("x.x.x...");
    expect(rp.beatCount()).toBe(3);
  });

  it("toString produces pattern string", () => {
    const rp = RhythmPattern.fromString("x.x.x");
    const s = rp.toString();
    expect(s).toBe("x.x.x");
  });

  it("euclidean generates correct number of pulses", () => {
    const rp = new RhythmPattern();
    rp.euclidean(3, 8);
    expect(rp.beatCount()).toBe(3);
  });

  it("totalDuration computes length", () => {
    const rp = new RhythmPattern();
    rp.addBeat(0, 0.5);
    rp.addBeat(1, 0.5);
    expect(rp.totalDuration()).toBe(1.5);
  });

  it("merge combines two patterns", () => {
    const a = new RhythmPattern();
    a.addBeat(0, 0.25);
    const b = new RhythmPattern();
    b.addBeat(0.5, 0.25);
    const merged = a.merge(b);
    expect(merged.beatCount()).toBe(2);
  });

  it("repeat duplicates pattern", () => {
    const rp = new RhythmPattern();
    rp.addBeat(0, 0.5);
    const repeated = rp.repeat(3);
    expect(repeated.beatCount()).toBe(3);
  });

  it("density returns ratio", () => {
    const rp = new RhythmPattern();
    rp.addBeat(0, 0.25);
    rp.addBeat(0.25, 0.25);
    rp.addBeat(0.5, 0.25);
    rp.addBeat(0.75, 0.25);
    expect(rp.density()).toBe(1);
  });
});

import { describe, it, expect } from "vitest";
import { LineSweep } from "../line-sweep.js";

describe("LineSweep", () => {
  it("findIntersections detects crossing segments", () => {
    const segs = [
      { x1: 0, y1: 0, x2: 10, y2: 10 },
      { x1: 0, y1: 10, x2: 10, y2: 0 },
    ];
    const ints = LineSweep.findIntersections(segs);
    expect(ints.length).toBe(1);
    expect(ints[0].x).toBeCloseTo(5);
    expect(ints[0].y).toBeCloseTo(5);
  });

  it("findIntersections returns empty for non-crossing segments", () => {
    const segs = [
      { x1: 0, y1: 0, x2: 5, y2: 0 },
      { x1: 0, y1: 5, x2: 5, y2: 5 },
    ];
    expect(LineSweep.findIntersections(segs)).toEqual([]);
  });

  it("segmentIntersection returns null for parallel segments", () => {
    expect(LineSweep.segmentIntersection(
      { x1: 0, y1: 0, x2: 10, y2: 0 },
      { x1: 0, y1: 5, x2: 10, y2: 5 }
    )).toBeNull();
  });

  it("closestPair finds nearest points", () => {
    const points = [
      { x: 0, y: 0 }, { x: 10, y: 10 }, { x: 1, y: 0 },
    ];
    const result = LineSweep.closestPair(points);
    expect(result.dist).toBeCloseTo(1);
    expect(result.i).toBe(0);
    expect(result.j).toBe(2);
  });

  it("activeSegments returns segments spanning sweepX", () => {
    const segs = [
      { x1: 0, y1: 0, x2: 10, y2: 0 },
      { x1: 5, y1: 5, x2: 15, y2: 5 },
      { x1: 20, y1: 0, x2: 30, y2: 0 },
    ];
    const active = LineSweep.activeSegments(segs, 7);
    expect(active).toEqual([0, 1]);
  });

  it("events generates sorted start/end events", () => {
    const segs = [{ x1: 2, y1: 0, x2: 8, y2: 0 }];
    const evts = LineSweep.events(segs);
    expect(evts.length).toBe(2);
    expect(evts[0].type).toBe("start");
    expect(evts[1].type).toBe("end");
  });

  it("hasAnyIntersection checks quickly", () => {
    const segs = [
      { x1: 0, y1: 0, x2: 10, y2: 10 },
      { x1: 0, y1: 10, x2: 10, y2: 0 },
    ];
    expect(LineSweep.hasAnyIntersection(segs)).toBe(true);
  });
});

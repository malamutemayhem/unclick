import { describe, it, expect } from "vitest";
import { GestureRecognizer } from "../gesture-recognizer.js";

describe("GestureRecognizer", () => {
  it("distance computes euclidean distance", () => {
    expect(GestureRecognizer.distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it("pathLength sums segment distances", () => {
    const points = [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 4 }];
    expect(GestureRecognizer.pathLength(points)).toBe(7);
  });

  it("boundingBox computes rect", () => {
    const points = [{ x: 1, y: 2 }, { x: 5, y: 8 }, { x: 3, y: 5 }];
    const bb = GestureRecognizer.boundingBox(points);
    expect(bb.x).toBe(1);
    expect(bb.y).toBe(2);
    expect(bb.width).toBe(4);
    expect(bb.height).toBe(6);
  });

  it("centroid computes center", () => {
    const c = GestureRecognizer.centroid([{ x: 0, y: 0 }, { x: 10, y: 10 }]);
    expect(c.x).toBe(5);
    expect(c.y).toBe(5);
  });

  it("direction detects rightward swipe", () => {
    expect(GestureRecognizer.direction({ x: 0, y: 0 }, { x: 100, y: 0 })).toBe("right");
  });

  it("direction detects upward swipe", () => {
    expect(GestureRecognizer.direction({ x: 0, y: 0 }, { x: 0, y: -100 })).toBe("up");
  });

  it("classify detects tap for small movement", () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    expect(GestureRecognizer.classify(points)).toBe("tap");
  });

  it("classify detects swipe for large horizontal movement", () => {
    const points = [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 100, y: 0 }];
    expect(GestureRecognizer.classify(points)).toContain("swipe");
  });

  it("resample produces correct number of points", () => {
    const points = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }];
    const resampled = GestureRecognizer.resample(points, 5);
    expect(resampled.length).toBe(5);
  });

  it("velocity computes speed with timestamps", () => {
    const points = [
      { x: 0, y: 0, t: 0 },
      { x: 100, y: 0, t: 1000 },
    ];
    const v = GestureRecognizer.velocity(points);
    expect(v).toBeCloseTo(0.1, 1);
  });
});

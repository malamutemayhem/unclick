import { describe, it, expect } from "vitest";
import { CollisionDetection } from "../collision-detection.js";

describe("CollisionDetection", () => {
  it("aabbOverlap detects overlapping boxes", () => {
    const a = { minX: 0, minY: 0, maxX: 2, maxY: 2 };
    const b = { minX: 1, minY: 1, maxX: 3, maxY: 3 };
    expect(CollisionDetection.aabbOverlap(a, b)).toBe(true);
  });

  it("aabbOverlap returns false for separated boxes", () => {
    const a = { minX: 0, minY: 0, maxX: 1, maxY: 1 };
    const b = { minX: 5, minY: 5, maxX: 6, maxY: 6 };
    expect(CollisionDetection.aabbOverlap(a, b)).toBe(false);
  });

  it("aabbContains detects point inside box", () => {
    const box = { minX: 0, minY: 0, maxX: 10, maxY: 10 };
    expect(CollisionDetection.aabbContains(box, 5, 5)).toBe(true);
    expect(CollisionDetection.aabbContains(box, 15, 5)).toBe(false);
  });

  it("circleOverlap detects overlapping circles", () => {
    const a = { x: 0, y: 0, radius: 2 };
    const b = { x: 3, y: 0, radius: 2 };
    expect(CollisionDetection.circleOverlap(a, b)).toBe(true);
  });

  it("circleOverlap returns false for separated circles", () => {
    const a = { x: 0, y: 0, radius: 1 };
    const b = { x: 10, y: 0, radius: 1 };
    expect(CollisionDetection.circleOverlap(a, b)).toBe(false);
  });

  it("circleContains detects point inside circle", () => {
    const c = { x: 5, y: 5, radius: 3 };
    expect(CollisionDetection.circleContains(c, 5, 5)).toBe(true);
    expect(CollisionDetection.circleContains(c, 20, 20)).toBe(false);
  });

  it("circleAABBOverlap detects circle-box intersection", () => {
    const circle = { x: 0, y: 0, radius: 2 };
    const box = { minX: 1, minY: 1, maxX: 5, maxY: 5 };
    expect(CollisionDetection.circleAABBOverlap(circle, box)).toBe(true);
  });

  it("lineIntersect finds crossing point", () => {
    const result = CollisionDetection.lineIntersect(0, 0, 10, 10, 0, 10, 10, 0);
    expect(result).not.toBeNull();
    expect(result!.x).toBeCloseTo(5, 2);
    expect(result!.y).toBeCloseTo(5, 2);
  });

  it("lineIntersect returns null for parallel lines", () => {
    const result = CollisionDetection.lineIntersect(0, 0, 10, 0, 0, 5, 10, 5);
    expect(result).toBeNull();
  });

  it("pointInPolygon detects point inside triangle", () => {
    const tri = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 10 }];
    expect(CollisionDetection.pointInPolygon(tri, 5, 3)).toBe(true);
    expect(CollisionDetection.pointInPolygon(tri, 20, 20)).toBe(false);
  });

  it("separatingAxis detects overlapping convex polygons", () => {
    const sq1 = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }];
    const sq2 = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 }];
    expect(CollisionDetection.separatingAxis(sq1, sq2)).toBe(true);
  });

  it("separatingAxis returns false for separated polygons", () => {
    const sq1 = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }];
    const sq2 = [{ x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 5, y: 6 }];
    expect(CollisionDetection.separatingAxis(sq1, sq2)).toBe(false);
  });

  it("sweepAABB finds all overlapping pairs", () => {
    const boxes = [
      { minX: 0, minY: 0, maxX: 2, maxY: 2 },
      { minX: 1, minY: 1, maxX: 3, maxY: 3 },
      { minX: 10, minY: 10, maxX: 12, maxY: 12 },
    ];
    const pairs = CollisionDetection.sweepAABB(boxes);
    expect(pairs.length).toBe(1);
    expect(pairs[0]).toEqual([0, 1]);
  });
});

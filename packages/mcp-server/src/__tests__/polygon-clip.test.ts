import { describe, it, expect } from "vitest";
import { PolygonClip } from "../polygon-clip.js";

describe("PolygonClip", () => {
  const square = [
    { x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 },
  ];

  it("sutherlandHodgman clips polygon to window", () => {
    const subject = [
      { x: -5, y: 5 }, { x: 5, y: 5 }, { x: 5, y: 15 }, { x: -5, y: 15 },
    ];
    const clipped = PolygonClip.sutherlandHodgman(subject, square);
    expect(clipped.length).toBeGreaterThan(0);
    for (const p of clipped) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(10);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(10);
    }
  });

  it("sutherlandHodgman returns empty for non-overlapping", () => {
    const subject = [
      { x: 20, y: 20 }, { x: 30, y: 20 }, { x: 30, y: 30 }, { x: 20, y: 30 },
    ];
    const clipped = PolygonClip.sutherlandHodgman(subject, square);
    expect(clipped.length).toBe(0);
  });

  it("area computes polygon area", () => {
    expect(PolygonClip.area(square)).toBeCloseTo(100);
  });

  it("centroid computes center of mass", () => {
    const c = PolygonClip.centroid(square);
    expect(c.x).toBeCloseTo(5);
    expect(c.y).toBeCloseTo(5);
  });

  it("perimeter computes total edge length", () => {
    expect(PolygonClip.perimeter(square)).toBeCloseTo(40);
  });

  it("pointInPolygon detects inside points", () => {
    expect(PolygonClip.pointInPolygon({ x: 5, y: 5 }, square)).toBe(true);
    expect(PolygonClip.pointInPolygon({ x: 15, y: 5 }, square)).toBe(false);
  });

  it("area of triangle is correct", () => {
    const tri = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }];
    expect(PolygonClip.area(tri)).toBeCloseTo(6);
  });

  it("clipping fully contained polygon returns same shape", () => {
    const inner = [
      { x: 2, y: 2 }, { x: 8, y: 2 }, { x: 8, y: 8 }, { x: 2, y: 8 },
    ];
    const clipped = PolygonClip.sutherlandHodgman(inner, square);
    expect(clipped.length).toBe(4);
    expect(PolygonClip.area(clipped)).toBeCloseTo(36);
  });
});

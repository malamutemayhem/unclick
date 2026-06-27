import { describe, it, expect } from "vitest";
import { distance, midpoint, angle, rotate, lineLength, pointInRect, pointInCircle, rectOverlap, circleOverlap, triangleArea, polygonArea } from "../geometry.js";

describe("geometry", () => {
  it("distance between points", () => {
    expect(distance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it("midpoint", () => {
    expect(midpoint({ x: 0, y: 0 }, { x: 10, y: 10 })).toEqual({ x: 5, y: 5 });
  });

  it("angle", () => {
    expect(angle({ x: 0, y: 0 }, { x: 1, y: 0 })).toBe(0);
    expect(angle({ x: 0, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(Math.PI / 2);
  });

  it("rotate 90 degrees", () => {
    const rotated = rotate({ x: 1, y: 0 }, { x: 0, y: 0 }, Math.PI / 2);
    expect(rotated.x).toBeCloseTo(0);
    expect(rotated.y).toBeCloseTo(1);
  });

  it("lineLength", () => {
    expect(lineLength({ p1: { x: 0, y: 0 }, p2: { x: 3, y: 4 } })).toBe(5);
  });

  it("pointInRect", () => {
    const rect = { x: 0, y: 0, width: 10, height: 10 };
    expect(pointInRect({ x: 5, y: 5 }, rect)).toBe(true);
    expect(pointInRect({ x: 15, y: 5 }, rect)).toBe(false);
  });

  it("pointInCircle", () => {
    const circle = { center: { x: 0, y: 0 }, radius: 5 };
    expect(pointInCircle({ x: 3, y: 4 }, circle)).toBe(true);
    expect(pointInCircle({ x: 4, y: 4 }, circle)).toBe(false);
  });

  it("rectOverlap", () => {
    expect(rectOverlap({ x: 0, y: 0, width: 10, height: 10 }, { x: 5, y: 5, width: 10, height: 10 })).toBe(true);
    expect(rectOverlap({ x: 0, y: 0, width: 5, height: 5 }, { x: 10, y: 10, width: 5, height: 5 })).toBe(false);
  });

  it("circleOverlap", () => {
    expect(circleOverlap({ center: { x: 0, y: 0 }, radius: 5 }, { center: { x: 8, y: 0 }, radius: 5 })).toBe(true);
    expect(circleOverlap({ center: { x: 0, y: 0 }, radius: 3 }, { center: { x: 10, y: 0 }, radius: 3 })).toBe(false);
  });

  it("triangleArea", () => {
    expect(triangleArea({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 })).toBe(6);
  });

  it("polygonArea (square)", () => {
    expect(polygonArea([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }])).toBe(16);
  });
});

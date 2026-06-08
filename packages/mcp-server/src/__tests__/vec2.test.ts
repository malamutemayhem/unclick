import { describe, it, expect } from "vitest";
import { Vec2 } from "../vec2.js";

describe("Vec2", () => {
  it("add", () => {
    const result = new Vec2(1, 2).add(new Vec2(3, 4));
    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  it("subtract", () => {
    const result = new Vec2(5, 3).subtract(new Vec2(2, 1));
    expect(result.x).toBe(3);
    expect(result.y).toBe(2);
  });

  it("scale", () => {
    const result = new Vec2(2, 3).scale(3);
    expect(result.x).toBe(6);
    expect(result.y).toBe(9);
  });

  it("dot product", () => {
    expect(new Vec2(1, 0).dot(new Vec2(0, 1))).toBe(0);
    expect(new Vec2(2, 3).dot(new Vec2(4, 5))).toBe(23);
  });

  it("cross product", () => {
    expect(new Vec2(1, 0).cross(new Vec2(0, 1))).toBe(1);
  });

  it("length", () => {
    expect(new Vec2(3, 4).length).toBe(5);
  });

  it("normalize", () => {
    const n = new Vec2(3, 4).normalize();
    expect(n.length).toBeCloseTo(1, 5);
  });

  it("normalize zero vector", () => {
    const n = new Vec2(0, 0).normalize();
    expect(n.x).toBe(0);
    expect(n.y).toBe(0);
  });

  it("rotate 90 degrees", () => {
    const rotated = new Vec2(1, 0).rotate(Math.PI / 2);
    expect(rotated.x).toBeCloseTo(0, 5);
    expect(rotated.y).toBeCloseTo(1, 5);
  });

  it("distanceTo", () => {
    expect(new Vec2(0, 0).distanceTo(new Vec2(3, 4))).toBe(5);
  });

  it("lerp", () => {
    const result = new Vec2(0, 0).lerp(new Vec2(10, 10), 0.5);
    expect(result.x).toBe(5);
    expect(result.y).toBe(5);
  });

  it("negate", () => {
    const result = new Vec2(3, -4).negate();
    expect(result.x).toBe(-3);
    expect(result.y).toBe(4);
  });

  it("equals", () => {
    expect(new Vec2(1, 2).equals(new Vec2(1, 2))).toBe(true);
    expect(new Vec2(1, 2).equals(new Vec2(2, 1))).toBe(false);
  });

  it("toString", () => {
    expect(new Vec2(1, 2).toString()).toBe("(1, 2)");
  });

  it("static factories", () => {
    expect(Vec2.zero().equals(new Vec2(0, 0))).toBe(true);
    expect(Vec2.one().equals(new Vec2(1, 1))).toBe(true);
  });
});

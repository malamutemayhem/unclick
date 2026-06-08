import { describe, it, expect } from "vitest";
import { RayMarcher } from "../ray-marcher.js";

describe("RayMarcher", () => {
  it("sphere SDF returns negative inside", () => {
    const sdf = RayMarcher.sphere({ x: 0, y: 0, z: 0 }, 5);
    expect(sdf({ x: 0, y: 0, z: 0 })).toBe(-5);
  });

  it("sphere SDF returns positive outside", () => {
    const sdf = RayMarcher.sphere({ x: 0, y: 0, z: 0 }, 1);
    expect(sdf({ x: 5, y: 0, z: 0 })).toBeCloseTo(4, 3);
  });

  it("box SDF returns negative inside", () => {
    const sdf = RayMarcher.box({ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
    expect(sdf({ x: 0, y: 0, z: 0 })).toBeLessThan(0);
  });

  it("march hits a sphere", () => {
    const scene = RayMarcher.sphere({ x: 0, y: 0, z: 10 }, 2);
    const result = RayMarcher.march(
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 },
      scene,
    );
    expect(result.hit).toBe(true);
    expect(result.distance).toBeCloseTo(8, 0);
  });

  it("march misses when direction is away", () => {
    const scene = RayMarcher.sphere({ x: 0, y: 0, z: 10 }, 1);
    const result = RayMarcher.march(
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: -1 },
      scene,
    );
    expect(result.hit).toBe(false);
  });

  it("union combines two SDFs", () => {
    const a = RayMarcher.sphere({ x: -3, y: 0, z: 0 }, 1);
    const b = RayMarcher.sphere({ x: 3, y: 0, z: 0 }, 1);
    const combined = RayMarcher.union(a, b);
    expect(combined({ x: -3, y: 0, z: 0 })).toBe(-1);
    expect(combined({ x: 3, y: 0, z: 0 })).toBe(-1);
  });

  it("difference subtracts SDF", () => {
    const a = RayMarcher.sphere({ x: 0, y: 0, z: 0 }, 5);
    const b = RayMarcher.sphere({ x: 0, y: 0, z: 0 }, 3);
    const diff = RayMarcher.difference(a, b);
    expect(diff({ x: 0, y: 0, z: 0 })).toBeGreaterThan(0);
  });

  it("normal on sphere surface points outward", () => {
    const scene = RayMarcher.sphere({ x: 0, y: 0, z: 0 }, 1);
    const n = RayMarcher.normal(scene, { x: 1, y: 0, z: 0 });
    expect(n.x).toBeCloseTo(1, 1);
    expect(n.y).toBeCloseTo(0, 1);
    expect(n.z).toBeCloseTo(0, 1);
  });

  it("smoothUnion blends two shapes", () => {
    const a = RayMarcher.sphere({ x: -1, y: 0, z: 0 }, 1);
    const b = RayMarcher.sphere({ x: 1, y: 0, z: 0 }, 1);
    const smooth = RayMarcher.smoothUnion(a, b, 0.5);
    const sharp = RayMarcher.union(a, b);
    expect(smooth({ x: 0, y: 0, z: 0 })).toBeLessThanOrEqual(sharp({ x: 0, y: 0, z: 0 }));
  });

  it("plane SDF is correct", () => {
    const sdf = RayMarcher.plane({ x: 0, y: 1, z: 0 }, 0);
    expect(sdf({ x: 0, y: 5, z: 0 })).toBeCloseTo(5, 3);
    expect(sdf({ x: 0, y: -3, z: 0 })).toBeCloseTo(-3, 3);
  });
});

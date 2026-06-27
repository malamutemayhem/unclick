import { describe, it, expect } from "vitest";
import {
  createBoid, createFlock, stepBoid, stepFlock, runFlock,
  flockCenter, flockSpread, averageSpeed, averageHeading,
  DEFAULT_CONFIG,
} from "../boids.js";

describe("createBoid", () => {
  it("creates boid with position and velocity", () => {
    const b = createBoid(10, 20, 1, -1);
    expect(b.position.x).toBe(10);
    expect(b.position.y).toBe(20);
    expect(b.velocity.x).toBe(1);
    expect(b.velocity.y).toBe(-1);
  });
});

describe("createFlock", () => {
  it("creates specified number of boids", () => {
    const flock = createFlock(20);
    expect(flock.length).toBe(20);
  });

  it("is deterministic with same seed", () => {
    const a = createFlock(10, DEFAULT_CONFIG, 42);
    const b = createFlock(10, DEFAULT_CONFIG, 42);
    expect(a[0].position.x).toBe(b[0].position.x);
  });

  it("boids are within bounds", () => {
    const flock = createFlock(50);
    for (const b of flock) {
      expect(b.position.x).toBeGreaterThanOrEqual(0);
      expect(b.position.x).toBeLessThan(DEFAULT_CONFIG.width);
    }
  });
});

describe("stepBoid", () => {
  it("moves boid forward", () => {
    const b = createBoid(50, 50, 2, 0);
    const flock = [b];
    const next = stepBoid(b, flock, DEFAULT_CONFIG);
    expect(next.position.x).toBeGreaterThan(50);
  });
});

describe("stepFlock", () => {
  it("advances all boids", () => {
    const flock = createFlock(10);
    const next = stepFlock(flock);
    expect(next.length).toBe(10);
    const moved = next.some((b, i) =>
      b.position.x !== flock[i].position.x || b.position.y !== flock[i].position.y
    );
    expect(moved).toBe(true);
  });
});

describe("runFlock", () => {
  it("produces history", () => {
    const flock = createFlock(5);
    const history = runFlock(flock, 10);
    expect(history.length).toBe(11);
  });
});

describe("flockCenter", () => {
  it("computes center of mass", () => {
    const flock = [
      createBoid(0, 0, 0, 0),
      createBoid(10, 10, 0, 0),
    ];
    const center = flockCenter(flock);
    expect(center.x).toBe(5);
    expect(center.y).toBe(5);
  });
});

describe("flockSpread", () => {
  it("returns 0 for single boid", () => {
    const flock = [createBoid(5, 5, 0, 0)];
    expect(flockSpread(flock)).toBe(0);
  });

  it("increases with distance", () => {
    const tight = [createBoid(0, 0, 0, 0), createBoid(1, 0, 0, 0)];
    const wide = [createBoid(0, 0, 0, 0), createBoid(100, 0, 0, 0)];
    expect(flockSpread(wide)).toBeGreaterThan(flockSpread(tight));
  });
});

describe("averageSpeed", () => {
  it("computes mean speed", () => {
    const flock = [
      createBoid(0, 0, 3, 4),
      createBoid(0, 0, 0, 0),
    ];
    expect(averageSpeed(flock)).toBeCloseTo(2.5);
  });
});

describe("averageHeading", () => {
  it("returns angle", () => {
    const flock = [createBoid(0, 0, 1, 0), createBoid(0, 0, 1, 0)];
    expect(averageHeading(flock)).toBeCloseTo(0);
  });
});

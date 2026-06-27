import { describe, it, expect } from "vitest";
import {
  createCloth, step, run, pinPoint, unpinPoint,
  tearConstraint, applyForce, getPointAt,
  totalLength, maxStrain,
} from "../cloth-sim.js";

describe("createCloth", () => {
  it("creates grid of points", () => {
    const c = createCloth(4, 3, 10);
    expect(c.points.length).toBe(12);
    expect(c.cols).toBe(4);
    expect(c.rows).toBe(3);
  });

  it("pins top row", () => {
    const c = createCloth(3, 3, 10);
    expect(c.points[0].pinned).toBe(true);
    expect(c.points[1].pinned).toBe(true);
    expect(c.points[2].pinned).toBe(true);
    expect(c.points[3].pinned).toBe(false);
  });

  it("creates constraints", () => {
    const c = createCloth(3, 3, 10);
    expect(c.constraints.length).toBe(12);
  });
});

describe("step", () => {
  it("gravity pulls unpinned points down", () => {
    const c = createCloth(3, 2, 10);
    const result = step(c);
    const bottomPt = result.points[3];
    expect(bottomPt.y).toBeGreaterThan(10);
  });

  it("pinned points stay put", () => {
    const c = createCloth(3, 2, 10);
    const result = step(c);
    expect(result.points[0].x).toBe(0);
    expect(result.points[0].y).toBe(0);
  });
});

describe("run", () => {
  it("runs multiple steps", () => {
    const c = createCloth(3, 3, 10);
    const result = run(c, 10);
    expect(result.points[6].y).toBeGreaterThan(20);
  });
});

describe("pinPoint / unpinPoint", () => {
  it("pins and unpins", () => {
    let c = createCloth(3, 2, 10);
    expect(c.points[3].pinned).toBe(false);
    c = pinPoint(c, 3);
    expect(c.points[3].pinned).toBe(true);
    c = unpinPoint(c, 3);
    expect(c.points[3].pinned).toBe(false);
  });
});

describe("tearConstraint", () => {
  it("removes constraint", () => {
    const c = createCloth(3, 2, 10);
    const count = c.constraints.length;
    const torn = tearConstraint(c, 0);
    expect(torn.constraints.length).toBe(count - 1);
  });
});

describe("applyForce", () => {
  it("moves unpinned point", () => {
    const c = createCloth(3, 2, 10);
    const pushed = applyForce(c, 3, 5, 0);
    expect(pushed.points[3].x).toBeGreaterThan(c.points[3].x);
  });

  it("does not move pinned point", () => {
    const c = createCloth(3, 2, 10);
    const pushed = applyForce(c, 0, 5, 0);
    expect(pushed.points[0].x).toBe(c.points[0].x);
  });
});

describe("getPointAt", () => {
  it("gets point by row/col", () => {
    const c = createCloth(3, 3, 10);
    const pt = getPointAt(c, 1, 2);
    expect(pt).not.toBeNull();
    expect(pt!.x).toBe(20);
    expect(pt!.y).toBe(10);
  });

  it("returns null for out of bounds", () => {
    const c = createCloth(3, 3, 10);
    expect(getPointAt(c, -1, 0)).toBeNull();
    expect(getPointAt(c, 5, 0)).toBeNull();
  });
});

describe("totalLength", () => {
  it("computes total constraint length", () => {
    const c = createCloth(3, 2, 10);
    const len = totalLength(c);
    expect(len).toBeGreaterThan(0);
  });
});

describe("maxStrain", () => {
  it("starts near zero", () => {
    const c = createCloth(3, 2, 10);
    expect(maxStrain(c)).toBeCloseTo(0, 5);
  });

  it("increases after simulation", () => {
    const c = createCloth(3, 3, 10);
    const result = run(c, 20);
    expect(maxStrain(result)).toBeGreaterThan(0);
  });
});

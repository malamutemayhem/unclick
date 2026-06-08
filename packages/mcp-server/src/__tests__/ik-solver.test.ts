import { describe, it, expect } from "vitest";
import { IKSolver } from "../ik-solver.js";

describe("IKSolver", () => {
  it("forward computes end effector position", () => {
    const joints = [
      { x: 0, y: 0, angle: 0, length: 1 },
      { x: 0, y: 0, angle: 0, length: 1 },
    ];
    const positions = IKSolver.forward(joints);
    expect(positions.length).toBe(3);
    expect(positions[2].x).toBeCloseTo(2, 3);
    expect(positions[2].y).toBeCloseTo(0, 3);
  });

  it("endEffector returns last position", () => {
    const joints = [
      { x: 0, y: 0, angle: Math.PI / 2, length: 1 },
    ];
    const end = IKSolver.endEffector(joints);
    expect(end.x).toBeCloseTo(0, 2);
    expect(end.y).toBeCloseTo(1, 2);
  });

  it("fabrik reaches target within range", () => {
    const joints = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
    const lengths = [1, 1];
    const target = { x: 1.5, y: 1 };
    const result = IKSolver.fabrik(joints, lengths, target, 50);
    const end = result[result.length - 1];
    const dist = Math.sqrt((end.x - target.x) ** 2 + (end.y - target.y) ** 2);
    expect(dist).toBeLessThan(0.1);
  });

  it("fabrik preserves base position", () => {
    const joints = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }];
    const lengths = [1, 1];
    const result = IKSolver.fabrik(joints, lengths, { x: 1, y: 1 });
    expect(result[0].x).toBeCloseTo(0, 3);
    expect(result[0].y).toBeCloseTo(0, 3);
  });

  it("ccd adjusts angles toward target", () => {
    const joints = [
      { x: 0, y: 0, angle: 0, length: 1 },
      { x: 0, y: 0, angle: 0, length: 1 },
    ];
    const result = IKSolver.ccd(joints, { x: 0, y: 2 }, 50);
    const end = IKSolver.endEffector(result);
    const dist = Math.sqrt(end.x ** 2 + (end.y - 2) ** 2);
    expect(dist).toBeLessThan(0.1);
  });

  it("reachable returns true for in-range target", () => {
    const joints = [
      { x: 0, y: 0, angle: 0, length: 2 },
      { x: 0, y: 0, angle: 0, length: 2 },
    ];
    expect(IKSolver.reachable(joints, { x: 3, y: 0 })).toBe(true);
  });

  it("reachable returns false for out-of-range target", () => {
    const joints = [
      { x: 0, y: 0, angle: 0, length: 1 },
      { x: 0, y: 0, angle: 0, length: 1 },
    ];
    expect(IKSolver.reachable(joints, { x: 10, y: 0 })).toBe(false);
  });

  it("totalLength sums joint lengths", () => {
    const joints = [
      { x: 0, y: 0, angle: 0, length: 1.5 },
      { x: 0, y: 0, angle: 0, length: 2.5 },
    ];
    expect(IKSolver.totalLength(joints)).toBeCloseTo(4, 3);
  });
});

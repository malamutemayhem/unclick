import { describe, it, expect } from "vitest";
import { ProjectileSimulator, BallisticTable } from "../projectile-motion.js";

describe("ProjectileSimulator", () => {
  it("launches and returns trajectory", () => {
    const sim = new ProjectileSimulator();
    const traj = sim.launch(10, 45);
    expect(traj.length).toBeGreaterThan(2);
    expect(traj[0].x).toBe(0);
    expect(traj[0].y).toBe(0);
  });

  it("projectile lands at y <= 0", () => {
    const sim = new ProjectileSimulator();
    const traj = sim.launch(20, 60);
    const last = traj[traj.length - 1];
    expect(last.y).toBeLessThanOrEqual(0);
  });

  it("launches from height", () => {
    const sim = new ProjectileSimulator();
    const traj = sim.launch(10, 45, 10);
    expect(traj[0].y).toBe(10);
  });

  it("drag reduces range", () => {
    const noDrag = new ProjectileSimulator(9.81, 0);
    const withDrag = new ProjectileSimulator(9.81, 0.01);
    const t1 = noDrag.launch(20, 45);
    const t2 = withDrag.launch(20, 45);
    const range1 = t1[t1.length - 1].x;
    const range2 = t2[t2.length - 1].x;
    expect(range2).toBeLessThan(range1);
  });

  it("computes analytical range", () => {
    const r = ProjectileSimulator.range(10, 45);
    expect(r).toBeCloseTo(10 * 10 / 9.81, 0);
  });

  it("computes max height", () => {
    const h = ProjectileSimulator.maxHeight(10, 90);
    expect(h).toBeCloseTo(100 / (2 * 9.81), 0);
  });

  it("computes time of flight", () => {
    const t = ProjectileSimulator.timeOfFlight(10, 90);
    expect(t).toBeCloseTo(2 * 10 / 9.81, 0);
  });

  it("optimal angle is 45", () => {
    expect(ProjectileSimulator.optimalAngle()).toBe(45);
  });

  it("computes max range", () => {
    expect(ProjectileSimulator.maxRange(10)).toBeCloseTo(100 / 9.81, 0);
  });
});

describe("BallisticTable", () => {
  it("generates table of angles", () => {
    const table = new BallisticTable();
    const rows = table.generate(20, 10, 80, 10);
    expect(rows.length).toBe(8);
    expect(rows[0].angle).toBe(10);
  });

  it("finds angle for range", () => {
    const table = new BallisticTable();
    const angle = table.findAngleForRange(20, 30);
    expect(angle).not.toBeNull();
    expect(angle!).toBeGreaterThan(0);
    expect(angle!).toBeLessThan(90);
  });

  it("returns null for impossible range", () => {
    const table = new BallisticTable();
    expect(table.findAngleForRange(10, 1000)).toBeNull();
  });

  it("finds angle for target height", () => {
    const table = new BallisticTable();
    const angle = table.findAngleForHeight(20, 5);
    expect(angle).not.toBeNull();
    expect(angle!).toBeGreaterThan(0);
  });
});

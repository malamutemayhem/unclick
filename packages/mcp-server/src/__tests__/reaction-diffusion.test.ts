import { describe, it, expect } from "vitest";
import { ReactionDiffusion } from "../reaction-diffusion.js";

describe("ReactionDiffusion", () => {
  it("initializes with A=1, B=0", () => {
    const rd = new ReactionDiffusion({ width: 8, height: 8 });
    expect(rd.getA(0, 0)).toBe(1.0);
    expect(rd.getB(0, 0)).toBe(0.0);
  });

  it("seed creates B concentration", () => {
    const rd = new ReactionDiffusion({ width: 16, height: 16 });
    rd.seed(8, 8, 3);
    expect(rd.getB(8, 8)).toBe(1.0);
    expect(rd.getB(0, 0)).toBe(0.0);
  });

  it("step advances simulation", () => {
    const rd = new ReactionDiffusion({ width: 8, height: 8 });
    rd.seed(4, 4, 2);
    rd.step();
    expect(rd.steps).toBe(1);
  });

  it("run executes multiple steps", () => {
    const rd = new ReactionDiffusion({ width: 8, height: 8 });
    rd.seed(4, 4, 2);
    rd.run(10);
    expect(rd.steps).toBe(10);
  });

  it("concentrations stay bounded [0, 1]", () => {
    const rd = new ReactionDiffusion({ width: 8, height: 8 });
    rd.seed(4, 4, 2);
    rd.run(20);
    const gridA = rd.getGridA();
    const gridB = rd.getGridB();
    for (let i = 0; i < gridA.length; i++) {
      expect(gridA[i]).toBeGreaterThanOrEqual(0);
      expect(gridA[i]).toBeLessThanOrEqual(1);
      expect(gridB[i]).toBeGreaterThanOrEqual(0);
      expect(gridB[i]).toBeLessThanOrEqual(1);
    }
  });

  it("B diffuses from seed over time", () => {
    const rd = new ReactionDiffusion({ width: 16, height: 16 });
    rd.seed(8, 8, 1);
    const initialB = rd.getB(9, 8);
    rd.run(5);
    const laterB = rd.getB(9, 8);
    expect(laterB).toBeGreaterThan(initialB);
  });

  it("getGridA and getGridB return copies", () => {
    const rd = new ReactionDiffusion({ width: 4, height: 4 });
    const gridA = rd.getGridA();
    gridA[0] = 999;
    expect(rd.getA(0, 0)).toBe(1.0);
  });

  it("width and height accessors", () => {
    const rd = new ReactionDiffusion({ width: 32, height: 16 });
    expect(rd.width).toBe(32);
    expect(rd.height).toBe(16);
  });

  it("stats returns averages and max", () => {
    const rd = new ReactionDiffusion({ width: 8, height: 8 });
    const s = rd.stats();
    expect(s.avgA).toBe(1.0);
    expect(s.avgB).toBe(0.0);
    expect(s.maxB).toBe(0.0);
  });

  it("stats after seeding shows B", () => {
    const rd = new ReactionDiffusion({ width: 8, height: 8 });
    rd.seed(4, 4, 2);
    const s = rd.stats();
    expect(s.maxB).toBe(1.0);
    expect(s.avgB).toBeGreaterThan(0);
  });

  it("reset restores initial state", () => {
    const rd = new ReactionDiffusion({ width: 8, height: 8 });
    rd.seed(4, 4, 2);
    rd.run(10);
    rd.reset();
    expect(rd.steps).toBe(0);
    expect(rd.getA(0, 0)).toBe(1.0);
    expect(rd.getB(4, 4)).toBe(0.0);
  });
});

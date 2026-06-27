import { describe, it, expect } from "vitest";
import { AntColony, distanceMatrix } from "../ant-colony.js";

describe("AntColony", () => {
  const cities = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
  ];
  const distances = distanceMatrix(cities);

  it("finds a valid tour", () => {
    const aco = new AntColony(distances, { antCount: 10, iterations: 10 });
    const result = aco.solve(10);
    expect(result.bestPath.length).toBe(cities.length + 1);
    expect(result.bestPath[0]).toBe(result.bestPath[result.bestPath.length - 1]);
  });

  it("visits all cities exactly once", () => {
    const aco = new AntColony(distances, { antCount: 10, iterations: 10 });
    const result = aco.solve(10);
    const interior = result.bestPath.slice(0, -1);
    const unique = new Set(interior);
    expect(unique.size).toBe(cities.length);
  });

  it("returns a finite distance", () => {
    const aco = new AntColony(distances, { antCount: 10, iterations: 10 });
    const result = aco.solve(10);
    expect(result.bestDistance).toBeGreaterThan(0);
    expect(Number.isFinite(result.bestDistance)).toBe(true);
  });

  it("finds near-optimal tour for square", () => {
    const aco = new AntColony(distances, { antCount: 20, iterations: 50 });
    const result = aco.solve(50);
    // Optimal tour of unit square is 4 (perimeter)
    expect(result.bestDistance).toBeLessThan(5);
    expect(result.bestDistance).toBeGreaterThanOrEqual(4 - 0.001);
  });

  it("respects config parameters", () => {
    const aco = new AntColony(distances, {
      antCount: 5,
      iterations: 5,
      alpha: 2,
      beta: 3,
      evaporationRate: 0.3,
      q: 50,
    });
    const result = aco.solve(5);
    expect(result.bestPath.length).toBeGreaterThan(0);
  });

  it("reports correct iteration count", () => {
    const aco = new AntColony(distances, { antCount: 5, iterations: 10 });
    const result = aco.solve(7);
    expect(result.iteration).toBe(7);
  });
});

describe("distanceMatrix", () => {
  it("computes correct distances", () => {
    const pts = [
      { x: 0, y: 0 },
      { x: 3, y: 4 },
    ];
    const m = distanceMatrix(pts);
    expect(m[0][1]).toBeCloseTo(5);
    expect(m[1][0]).toBeCloseTo(5);
    expect(m[0][0]).toBe(0);
    expect(m[1][1]).toBe(0);
  });

  it("is symmetric", () => {
    const pts = [
      { x: 1, y: 2 },
      { x: 4, y: 6 },
      { x: 7, y: 1 },
    ];
    const m = distanceMatrix(pts);
    for (let i = 0; i < pts.length; i++) {
      for (let j = 0; j < pts.length; j++) {
        expect(m[i][j]).toBeCloseTo(m[j][i]);
      }
    }
  });
});

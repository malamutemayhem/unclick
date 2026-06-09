import { describe, it, expect } from "vitest";
import {
  createBody, createState, step, stepLeapfrog, run,
  kineticEnergy, potentialEnergy, totalEnergy,
  centerOfMass, momentum, angularMomentum, distance,
  createTwoBody, createFigureEight,
} from "../n-body.js";

describe("createBody", () => {
  it("creates body with properties", () => {
    const b = createBody(1, 2, 0.5, -0.5, 10);
    expect(b.x).toBe(1);
    expect(b.mass).toBe(10);
  });
});

describe("createState", () => {
  it("creates simulation state", () => {
    const s = createState([createBody(0, 0, 0, 0, 1)]);
    expect(s.bodies.length).toBe(1);
    expect(s.time).toBe(0);
  });
});

describe("step", () => {
  it("moves bodies", () => {
    const s = createState([
      createBody(-1, 0, 0, 0, 1),
      createBody(1, 0, 0, 0, 1),
    ]);
    const next = step(s);
    expect(next.bodies[0].x).toBeGreaterThan(-1);
    expect(next.bodies[1].x).toBeLessThan(1);
  });

  it("single body stays put", () => {
    const s = createState([createBody(0, 0, 0, 0, 1)]);
    const next = step(s);
    expect(next.bodies[0].x).toBeCloseTo(0);
  });
});

describe("stepLeapfrog", () => {
  it("advances simulation", () => {
    const s = createState([
      createBody(-1, 0, 0, 0.5, 1),
      createBody(1, 0, 0, -0.5, 1),
    ]);
    const next = stepLeapfrog(s);
    expect(next.time).toBeGreaterThan(0);
  });
});

describe("run", () => {
  it("runs multiple steps", () => {
    const s = createState([
      createBody(-1, 0, 0, 0, 1),
      createBody(1, 0, 0, 0, 1),
    ]);
    const result = run(s, 100);
    expect(result.time).toBeCloseTo(1, 0);
  });
});

describe("energy", () => {
  it("kinetic energy of moving body", () => {
    const s = createState([createBody(0, 0, 3, 4, 2)]);
    expect(kineticEnergy(s)).toBeCloseTo(25);
  });

  it("potential energy of pair", () => {
    const s = createState([
      createBody(0, 0, 0, 0, 1),
      createBody(1, 0, 0, 0, 1),
    ]);
    expect(potentialEnergy(s)).toBeLessThan(0);
  });

  it("total energy is sum", () => {
    const s = createState([
      createBody(0, 0, 1, 0, 1),
      createBody(2, 0, -1, 0, 1),
    ]);
    const total = totalEnergy(s);
    expect(total).toBe(kineticEnergy(s) + potentialEnergy(s));
  });
});

describe("centerOfMass", () => {
  it("computes weighted center", () => {
    const s = createState([
      createBody(0, 0, 0, 0, 1),
      createBody(10, 0, 0, 0, 1),
    ]);
    const com = centerOfMass(s);
    expect(com.x).toBeCloseTo(5);
    expect(com.mass).toBe(2);
  });
});

describe("momentum", () => {
  it("conserves in symmetric system", () => {
    const s = createState([
      createBody(-1, 0, 1, 0, 1),
      createBody(1, 0, -1, 0, 1),
    ]);
    const p = momentum(s);
    expect(p.px).toBeCloseTo(0);
    expect(p.py).toBeCloseTo(0);
  });
});

describe("angularMomentum", () => {
  it("computes angular momentum", () => {
    const s = createState([createBody(1, 0, 0, 1, 1)]);
    expect(angularMomentum(s)).toBeCloseTo(1);
  });
});

describe("distance", () => {
  it("computes distance between bodies", () => {
    const a = createBody(0, 0, 0, 0, 1);
    const b = createBody(3, 4, 0, 0, 1);
    expect(distance(a, b)).toBeCloseTo(5);
  });
});

describe("createTwoBody", () => {
  it("creates orbiting pair", () => {
    const s = createTwoBody(1, 1, 2);
    expect(s.bodies.length).toBe(2);
    const p = momentum(s);
    expect(p.px).toBeCloseTo(0, 5);
    expect(p.py).toBeCloseTo(0, 5);
  });
});

describe("createFigureEight", () => {
  it("creates three-body figure eight", () => {
    const s = createFigureEight();
    expect(s.bodies.length).toBe(3);
  });
});

import { describe, it, expect } from "vitest";
import {
  createParticle, createSpring, createState, step, run,
  kineticEnergy, potentialEnergy, gravitationalPE,
  springLength, springStrain,
  createChain, createGrid, createPendulum,
} from "../spring-mass.js";

describe("createParticle", () => {
  it("creates particle with defaults", () => {
    const p = createParticle(1, 2);
    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
    expect(p.mass).toBe(1);
    expect(p.fixed).toBe(false);
  });
});

describe("createSpring", () => {
  it("creates spring between particles", () => {
    const s = createSpring(0, 1, 5);
    expect(s.a).toBe(0);
    expect(s.b).toBe(1);
    expect(s.restLength).toBe(5);
  });
});

describe("step", () => {
  it("fixed particle stays put", () => {
    const state = createState(
      [createParticle(0, 0, 1, true), createParticle(5, 0)],
      [createSpring(0, 1, 3)],
      0
    );
    const next = step(state);
    expect(next.particles[0].x).toBe(0);
    expect(next.particles[0].y).toBe(0);
  });

  it("stretched spring pulls particle", () => {
    const state = createState(
      [createParticle(0, 0, 1, true), createParticle(5, 0)],
      [createSpring(0, 1, 3, 100, 0)],
      0
    );
    const result = run(state, 100, 0.001);
    expect(result.particles[1].x).toBeLessThan(5);
  });

  it("gravity pulls particles down", () => {
    const state = createState(
      [createParticle(0, 0)],
      [],
      9.8
    );
    const result = step(state);
    expect(result.particles[0].vy).toBeGreaterThan(0);
  });
});

describe("run", () => {
  it("advances time", () => {
    const state = createState(
      [createParticle(0, 0, 1, true), createParticle(2, 0)],
      [createSpring(0, 1, 1)],
      0
    );
    const result = run(state, 1000);
    expect(result.time).toBeGreaterThan(0);
  });
});

describe("energy", () => {
  it("kinetic energy from velocity", () => {
    const state = createState(
      [createParticle(0, 0)],
      [], 0
    );
    state.particles[0].vx = 10;
    expect(kineticEnergy(state)).toBeCloseTo(50);
  });

  it("potential energy from stretch", () => {
    const state = createState(
      [createParticle(0, 0, 1, true), createParticle(3, 0)],
      [createSpring(0, 1, 1, 100)],
      0
    );
    expect(potentialEnergy(state)).toBeCloseTo(200);
  });

  it("gravitational PE", () => {
    const state = createState([createParticle(0, 10)], [], 9.8);
    expect(gravitationalPE(state)).toBeCloseTo(98);
  });
});

describe("springLength / springStrain", () => {
  it("measures spring length", () => {
    const state = createState(
      [createParticle(0, 0), createParticle(5, 0)],
      [createSpring(0, 1, 3)],
      0
    );
    expect(springLength(state, 0)).toBeCloseTo(5);
  });

  it("measures spring strain", () => {
    const state = createState(
      [createParticle(0, 0), createParticle(6, 0)],
      [createSpring(0, 1, 3)],
      0
    );
    expect(springStrain(state, 0)).toBeCloseTo(1);
  });
});

describe("createChain", () => {
  it("creates chain of particles", () => {
    const state = createChain(0, 0, 5, 1);
    expect(state.particles.length).toBe(5);
    expect(state.springs.length).toBe(4);
    expect(state.particles[0].fixed).toBe(true);
  });
});

describe("createGrid", () => {
  it("creates grid of particles", () => {
    const state = createGrid(0, 0, 3, 3, 1);
    expect(state.particles.length).toBe(9);
    expect(state.springs.length).toBe(12);
  });

  it("top row is fixed", () => {
    const state = createGrid(0, 0, 3, 3, 1);
    expect(state.particles[0].fixed).toBe(true);
    expect(state.particles[1].fixed).toBe(true);
    expect(state.particles[2].fixed).toBe(true);
    expect(state.particles[3].fixed).toBe(false);
  });
});

describe("createPendulum", () => {
  it("creates pendulum", () => {
    const state = createPendulum(1, 0.5);
    expect(state.particles.length).toBe(2);
    expect(state.springs.length).toBe(1);
    expect(state.particles[0].fixed).toBe(true);
  });

  it("bob position depends on angle", () => {
    const state = createPendulum(1, Math.PI / 2);
    expect(state.particles[1].x).toBeCloseTo(1);
    expect(state.particles[1].y).toBeCloseTo(0, 5);
  });
});

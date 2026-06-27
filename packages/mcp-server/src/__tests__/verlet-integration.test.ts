import { describe, it, expect } from "vitest";
import {
  createParticle, createConstraint, createSystem,
  addParticle, addConstraint, autoConstraint,
  step, run, applyForce, distance, velocity,
  totalKineticEnergy, createRope, createBridge,
} from "../verlet-integration.js";

describe("createParticle", () => {
  it("creates with position", () => {
    const p = createParticle(10, 20);
    expect(p.x).toBe(10);
    expect(p.y).toBe(20);
    expect(p.pinned).toBe(false);
  });

  it("can be pinned", () => {
    const p = createParticle(0, 0, 5, true);
    expect(p.pinned).toBe(true);
  });
});

describe("createSystem", () => {
  it("creates empty system", () => {
    const s = createSystem();
    expect(s.particles.length).toBe(0);
    expect(s.constraints.length).toBe(0);
  });

  it("creates with particles and constraints", () => {
    const s = createSystem(
      [createParticle(0, 0), createParticle(10, 0)],
      [createConstraint(0, 1, 10)]
    );
    expect(s.particles.length).toBe(2);
    expect(s.constraints.length).toBe(1);
  });
});

describe("addParticle / addConstraint", () => {
  it("adds to system", () => {
    const s = createSystem();
    const idx = addParticle(s, createParticle(5, 5));
    expect(idx).toBe(0);
    addParticle(s, createParticle(15, 5));
    addConstraint(s, createConstraint(0, 1, 10));
    expect(s.particles.length).toBe(2);
    expect(s.constraints.length).toBe(1);
  });
});

describe("autoConstraint", () => {
  it("computes length automatically", () => {
    const s = createSystem([
      createParticle(0, 0),
      createParticle(3, 4),
    ]);
    autoConstraint(s, 0, 1);
    expect(s.constraints[0].length).toBeCloseTo(5);
  });
});

describe("step", () => {
  it("gravity pulls particles down", () => {
    const s = createSystem([createParticle(100, 100)]);
    const next = step(s);
    expect(next.particles[0].y).toBeGreaterThan(100);
  });

  it("pinned particles stay put", () => {
    const s = createSystem([createParticle(100, 100, 5, true)]);
    const next = step(s);
    expect(next.particles[0].x).toBe(100);
    expect(next.particles[0].y).toBe(100);
  });

  it("constraints maintain approximate length", () => {
    const s = createSystem(
      [createParticle(100, 100, 5, true), createParticle(110, 100)],
      [createConstraint(0, 1, 10)]
    );
    const result = run(s, 50);
    const d = distance(result, 0, 1);
    expect(d).toBeCloseTo(10, 0);
  });
});

describe("run", () => {
  it("runs multiple steps", () => {
    const s = createSystem([createParticle(100, 100)]);
    const result = run(s, 10);
    expect(result.particles[0].y).toBeGreaterThan(100);
  });
});

describe("applyForce", () => {
  it("accelerates particle", () => {
    const s = createSystem([createParticle(100, 100)], [], 0);
    applyForce(s, 0, 10, 0);
    const next = step(s);
    expect(next.particles[0].x).toBeGreaterThan(100);
  });
});

describe("velocity", () => {
  it("starts at zero", () => {
    const p = createParticle(10, 10);
    const v = velocity(p);
    expect(v.speed).toBe(0);
  });

  it("nonzero after stepping", () => {
    const s = createSystem([createParticle(100, 100)]);
    const next = step(s);
    const v = velocity(next.particles[0]);
    expect(v.speed).toBeGreaterThan(0);
  });
});

describe("totalKineticEnergy", () => {
  it("starts at zero", () => {
    const s = createSystem([createParticle(100, 100)]);
    expect(totalKineticEnergy(s)).toBe(0);
  });

  it("nonzero after stepping", () => {
    const s = createSystem([createParticle(100, 100)]);
    const next = step(s);
    expect(totalKineticEnergy(next)).toBeGreaterThan(0);
  });
});

describe("createRope", () => {
  it("creates rope with segments", () => {
    const rope = createRope(50, 50, 150, 50, 10);
    expect(rope.particles.length).toBe(11);
    expect(rope.constraints.length).toBe(10);
    expect(rope.particles[0].pinned).toBe(true);
    expect(rope.particles[10].pinned).toBe(false);
  });
});

describe("createBridge", () => {
  it("pins both ends", () => {
    const bridge = createBridge(0, 100, 200, 100, 8);
    expect(bridge.particles[0].pinned).toBe(true);
    expect(bridge.particles[8].pinned).toBe(true);
  });

  it("middle sags under gravity", () => {
    const bridge = createBridge(0, 100, 200, 100, 8);
    const result = run(bridge, 100);
    const mid = result.particles[4];
    expect(mid.y).toBeGreaterThan(100);
  });
});

import { describe, it, expect } from "vitest";
import {
  launch, step, simulate, range, maxHeight, timeOfFlight,
  optimalAngle, landingPosition, trajectoryAtTime,
  speedAtTime, angleAtTime, energyAtHeight,
  DEFAULT_CONFIG,
} from "../projectile-sim.js";

describe("launch", () => {
  it("creates projectile at angle", () => {
    const p = launch(10, 45);
    expect(p.vx).toBeCloseTo(10 * Math.cos(Math.PI / 4));
    expect(p.vy).toBeCloseTo(10 * Math.sin(Math.PI / 4));
    expect(p.x).toBe(0);
    expect(p.y).toBe(0);
  });

  it("horizontal launch", () => {
    const p = launch(10, 0);
    expect(p.vx).toBeCloseTo(10);
    expect(p.vy).toBeCloseTo(0);
  });
});

describe("step", () => {
  it("gravity reduces vertical velocity", () => {
    const p = launch(10, 90);
    const next = step(p, 0.1);
    expect(next.vy).toBeLessThan(p.vy);
  });

  it("advances time", () => {
    const p = launch(10, 45);
    const next = step(p, 0.1);
    expect(next.time).toBeCloseTo(0.1);
  });
});

describe("simulate", () => {
  it("stops when projectile hits ground", () => {
    const traj = simulate(launch(10, 45));
    const last = traj[traj.length - 1];
    expect(last.y).toBeLessThanOrEqual(0);
  });

  it("trajectory goes up then down", () => {
    const traj = simulate(launch(10, 60));
    const maxY = Math.max(...traj.map(s => s.y));
    expect(maxY).toBeGreaterThan(0);
  });
});

describe("range", () => {
  it("45 degrees gives maximum range", () => {
    const r45 = range(10, 45);
    const r30 = range(10, 30);
    expect(r45).toBeGreaterThan(r30);
  });

  it("complementary angles give same range", () => {
    expect(range(10, 30)).toBeCloseTo(range(10, 60), 5);
  });
});

describe("maxHeight", () => {
  it("90 degrees gives max possible height", () => {
    const h = maxHeight(10, 90);
    expect(h).toBeCloseTo(10 * 10 / (2 * 9.81));
  });

  it("0 degrees gives 0 height", () => {
    expect(maxHeight(10, 0)).toBeCloseTo(0);
  });
});

describe("timeOfFlight", () => {
  it("higher angle means longer flight", () => {
    expect(timeOfFlight(10, 60)).toBeGreaterThan(timeOfFlight(10, 30));
  });
});

describe("optimalAngle", () => {
  it("returns 45", () => {
    expect(optimalAngle()).toBe(45);
  });
});

describe("landingPosition", () => {
  it("matches analytical range", () => {
    const landing = landingPosition(20, 45, 0.001, { ...DEFAULT_CONFIG, drag: 0, windX: 0, windY: 0 });
    const analytical = range(20, 45);
    expect(landing.x).toBeCloseTo(analytical, 0);
  });
});

describe("trajectoryAtTime", () => {
  it("starts at origin", () => {
    const pos = trajectoryAtTime(10, 45, 0);
    expect(pos.x).toBeCloseTo(0);
    expect(pos.y).toBeCloseTo(0);
  });

  it("position matches physics", () => {
    const pos = trajectoryAtTime(10, 90, 1);
    expect(pos.x).toBeCloseTo(0, 5);
    expect(pos.y).toBeCloseTo(10 - 0.5 * 9.81);
  });
});

describe("speedAtTime", () => {
  it("starts at launch speed", () => {
    expect(speedAtTime(10, 45, 0)).toBeCloseTo(10);
  });
});

describe("angleAtTime", () => {
  it("starts at launch angle", () => {
    expect(angleAtTime(10, 45, 0)).toBeCloseTo(45);
  });

  it("decreases over time", () => {
    expect(angleAtTime(10, 45, 0.5)).toBeLessThan(45);
  });
});

describe("energyAtHeight", () => {
  it("total equals initial KE", () => {
    const e = energyAtHeight(10, 0, 1);
    expect(e.total).toBeCloseTo(50);
    expect(e.kinetic).toBeCloseTo(50);
    expect(e.potential).toBeCloseTo(0);
  });

  it("kinetic decreases with height", () => {
    const e = energyAtHeight(10, 2, 1);
    expect(e.kinetic).toBeLessThan(50);
    expect(e.potential).toBeCloseTo(2 * 9.81);
  });
});

import { describe, it, expect } from "vitest";
import { SpringSystem, DampedOscillator } from "../spring-system.js";

describe("SpringSystem", () => {
  it("adds nodes and springs", () => {
    const sys = new SpringSystem();
    const a = sys.addNode(0, 0);
    const b = sys.addNode(5, 0);
    sys.addSpring(a, b, 3, 100, 1);
    expect(sys.nodeCount()).toBe(2);
    expect(sys.springCount()).toBe(1);
  });

  it("stretched spring pulls nodes together", () => {
    const sys = new SpringSystem();
    const a = sys.addNode(0, 0, 1, true);
    const b = sys.addNode(10, 0);
    sys.addSpring(a, b, 5, 200, 1);
    sys.step(0.01);
    const node = sys.getNode(b)!;
    expect(node.x).toBeLessThan(10);
  });

  it("compressed spring pushes nodes apart", () => {
    const sys = new SpringSystem();
    const a = sys.addNode(0, 0, 1, true);
    const b = sys.addNode(1, 0);
    sys.addSpring(a, b, 5, 200, 1);
    sys.step(0.01);
    const node = sys.getNode(b)!;
    expect(node.x).toBeGreaterThan(1);
  });

  it("fixed nodes do not move", () => {
    const sys = new SpringSystem();
    const a = sys.addNode(0, 0, 1, true);
    sys.addNode(10, 0);
    sys.addSpring(a, 1, 5, 100, 1);
    sys.step(0.1);
    expect(sys.getNode(a)!.x).toBe(0);
  });

  it("computes total energy", () => {
    const sys = new SpringSystem();
    const a = sys.addNode(0, 0, 1, true);
    const b = sys.addNode(10, 0);
    sys.addSpring(a, b, 5, 100, 0);
    expect(sys.totalEnergy()).toBeGreaterThan(0);
  });

  it("computes spring stress", () => {
    const sys = new SpringSystem();
    sys.addNode(0, 0);
    sys.addNode(10, 0);
    sys.addSpring(0, 1, 5, 100, 0);
    expect(sys.springStress(0)).toBeCloseTo(1, 1);
  });

  it("resets velocities", () => {
    const sys = new SpringSystem();
    sys.addNode(0, 0);
    sys.addNode(10, 0);
    sys.addSpring(0, 1, 5, 100, 0);
    sys.step(0.1);
    sys.reset();
    expect(sys.getNode(0)!.vx).toBe(0);
    expect(sys.getNode(1)!.vx).toBe(0);
  });
});

describe("DampedOscillator", () => {
  it("oscillates when displaced", () => {
    const osc = new DampedOscillator(1, 100, 0.5);
    osc.displace(1);
    const positions: number[] = [];
    for (let i = 0; i < 100; i++) {
      osc.step(0.01);
      positions.push(osc.position);
    }
    const crossings = positions.filter((_, i) => i > 0 && positions[i - 1] * positions[i] < 0);
    expect(crossings.length).toBeGreaterThan(0);
  });

  it("responds to kick", () => {
    const osc = new DampedOscillator(1, 100, 0.5);
    osc.kick(5);
    expect(osc.velocity).toBe(5);
  });

  it("computes natural frequency", () => {
    const osc = new DampedOscillator(1, 100, 0.5);
    expect(osc.naturalFrequency()).toBeCloseTo(10 / (2 * Math.PI), 1);
  });

  it("classifies damping", () => {
    const under = new DampedOscillator(1, 100, 1);
    expect(under.isUnderdamped()).toBe(true);
    const critical = new DampedOscillator(1, 100, 20);
    expect(critical.isCriticallyDamped()).toBe(true);
    const over = new DampedOscillator(1, 100, 30);
    expect(over.isOverdamped()).toBe(true);
  });

  it("tracks energy", () => {
    const osc = new DampedOscillator(1, 100, 0.5);
    osc.displace(1);
    const initial = osc.energy();
    for (let i = 0; i < 100; i++) osc.step(0.01);
    expect(osc.energy()).toBeLessThan(initial);
  });
});

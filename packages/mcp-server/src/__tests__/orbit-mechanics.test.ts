import { describe, it, expect } from "vitest";
import { OrbitMechanics } from "../orbit-mechanics.js";

describe("OrbitMechanics", () => {
  it("orbitalPeriod computes for Earth around Sun", () => {
    const period = OrbitMechanics.orbitalPeriod(1.496e11, 1.989e30);
    expect(period).toBeGreaterThan(3e7);
    expect(period).toBeLessThan(4e7);
  });

  it("orbitalVelocity computes circular velocity", () => {
    const v = OrbitMechanics.orbitalVelocity(1.496e11, 1.989e30);
    expect(v).toBeGreaterThan(2e4);
    expect(v).toBeLessThan(4e4);
  });

  it("escapeVelocity is sqrt(2) times orbital velocity", () => {
    const r = 1e7;
    const m = 1e24;
    const vOrb = OrbitMechanics.orbitalVelocity(r, m);
    const vEsc = OrbitMechanics.escapeVelocity(r, m);
    expect(vEsc / vOrb).toBeCloseTo(Math.sqrt(2), 3);
  });

  it("elements computes from periapsis and apoapsis", () => {
    const el = OrbitMechanics.elements(1e7, 2e7, 1e24);
    expect(el.semiMajorAxis).toBeCloseTo(1.5e7, -4);
    expect(el.eccentricity).toBeCloseTo(1 / 3, 3);
    expect(el.periapsis).toBeCloseTo(1e7, -4);
    expect(el.apoapsis).toBeCloseTo(2e7, -4);
    expect(el.period).toBeGreaterThan(0);
  });

  it("position at angle 0 gives periapsis distance", () => {
    const a = 1e7;
    const e = 0.5;
    const pos = OrbitMechanics.position(a, e, 0);
    const expectedR = a * (1 - e * e) / (1 + e);
    expect(pos.x).toBeCloseTo(expectedR, -2);
    expect(pos.y).toBeCloseTo(0, -2);
  });

  it("hohmannTransfer computes delta-v values", () => {
    const result = OrbitMechanics.hohmannTransfer(7e6, 4.2e7, 5.972e24);
    expect(result.deltaV1).toBeGreaterThan(0);
    expect(result.deltaV2).toBeGreaterThan(0);
    expect(result.totalDeltaV).toBeCloseTo(result.deltaV1 + result.deltaV2, 2);
    expect(result.transferTime).toBeGreaterThan(0);
  });

  it("gravitationalParameter is G times mass", () => {
    const mu = OrbitMechanics.gravitationalParameter(1e24);
    expect(mu).toBeCloseTo(6.674e-11 * 1e24, -4);
  });

  it("hillSphere computes influence radius", () => {
    const rH = OrbitMechanics.hillSphere(1.496e11, 5.972e24, 1.989e30);
    expect(rH).toBeGreaterThan(1e9);
    expect(rH).toBeLessThan(2e9);
  });

  it("orbitPath returns correct number of samples", () => {
    const path = OrbitMechanics.orbitPath(1e7, 0.3, 50);
    expect(path.length).toBe(51);
    for (const p of path) {
      expect(typeof p.x).toBe("number");
      expect(typeof p.y).toBe("number");
    }
  });

  it("circular orbit has constant radius", () => {
    const path = OrbitMechanics.orbitPath(1e7, 0, 20);
    for (const p of path) {
      const r = Math.sqrt(p.x * p.x + p.y * p.y);
      expect(r).toBeCloseTo(1e7, -2);
    }
  });
});

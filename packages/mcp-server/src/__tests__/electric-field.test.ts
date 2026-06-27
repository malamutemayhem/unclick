import { describe, it, expect } from "vitest";
import {
  createCharge, electricField, potential, fieldMagnitude,
  fieldDirection, force, fieldGrid, fieldLine,
  dipoleMoment, capacitorField, energyDensity,
} from "../electric-field.js";

describe("createCharge", () => {
  it("creates point charge", () => {
    const c = createCharge(1, 2, 3e-6);
    expect(c.position).toEqual({ x: 1, y: 2 });
    expect(c.charge).toBe(3e-6);
  });
});

describe("electricField", () => {
  it("points away from positive charge", () => {
    const charges = [createCharge(0, 0, 1e-6)];
    const e = electricField(charges, { x: 1, y: 0 });
    expect(e.x).toBeGreaterThan(0);
  });

  it("points toward negative charge", () => {
    const charges = [createCharge(0, 0, -1e-6)];
    const e = electricField(charges, { x: 1, y: 0 });
    expect(e.x).toBeLessThan(0);
  });

  it("superposition of two charges", () => {
    const charges = [
      createCharge(-1, 0, 1e-6),
      createCharge(1, 0, 1e-6),
    ];
    const e = electricField(charges, { x: 0, y: 1 });
    expect(Math.abs(e.x)).toBeLessThan(1);
    expect(e.y).toBeGreaterThan(0);
  });
});

describe("potential", () => {
  it("positive for positive charge", () => {
    const charges = [createCharge(0, 0, 1e-6)];
    expect(potential(charges, { x: 1, y: 0 })).toBeGreaterThan(0);
  });

  it("negative for negative charge", () => {
    const charges = [createCharge(0, 0, -1e-6)];
    expect(potential(charges, { x: 1, y: 0 })).toBeLessThan(0);
  });
});

describe("fieldMagnitude", () => {
  it("computes magnitude", () => {
    expect(fieldMagnitude({ x: 3, y: 4 })).toBeCloseTo(5);
  });
});

describe("fieldDirection", () => {
  it("computes angle in degrees", () => {
    expect(fieldDirection({ x: 1, y: 0 })).toBeCloseTo(0);
    expect(fieldDirection({ x: 0, y: 1 })).toBeCloseTo(90);
  });
});

describe("force", () => {
  it("scales field by charge", () => {
    const f = force(2e-6, { x: 100, y: 200 });
    expect(f.x).toBeCloseTo(2e-6 * 100);
    expect(f.y).toBeCloseTo(2e-6 * 200);
  });
});

describe("fieldGrid", () => {
  it("generates grid of field values", () => {
    const charges = [createCharge(0, 0, 1e-6)];
    const grid = fieldGrid(charges, -1, 1, -1, 1, 5);
    expect(grid.length).toBe(36);
  });
});

describe("fieldLine", () => {
  it("traces field line from positive charge", () => {
    const charges = [createCharge(0, 0, 1e-6)];
    const line = fieldLine(charges, { x: 0.1, y: 0 }, 10, 0.1);
    expect(line.length).toBeGreaterThan(1);
    expect(line[line.length - 1].x).toBeGreaterThan(0.1);
  });
});

describe("dipoleMoment", () => {
  it("computes dipole moment", () => {
    const pos = createCharge(1, 0, 1e-6);
    const neg = createCharge(-1, 0, -1e-6);
    const p = dipoleMoment(pos, neg);
    expect(p.x).toBeCloseTo(2e-6);
    expect(p.y).toBeCloseTo(0);
  });
});

describe("capacitorField", () => {
  it("computes uniform field", () => {
    expect(capacitorField(0.01, 100)).toBeCloseTo(10000);
  });
});

describe("energyDensity", () => {
  it("computes energy density", () => {
    const u = energyDensity(1000);
    expect(u).toBeGreaterThan(0);
  });
});

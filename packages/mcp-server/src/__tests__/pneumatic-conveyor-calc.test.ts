import { describe, it, expect } from "vitest";
import {
  capacity, distance, gentleness, energy,
  pcCost, dustFree, forAbrasive, velocity,
  bestUse, pneumaticConveyorTypes,
} from "../pneumatic-conveyor-calc.js";

describe("capacity", () => {
  it("dense phase highest capacity", () => {
    expect(capacity("dense_phase_pressure")).toBeGreaterThan(capacity("dilute_phase_vacuum"));
  });
});

describe("distance", () => {
  it("dense phase longest distance", () => {
    expect(distance("dense_phase_pressure")).toBeGreaterThan(distance("dilute_phase_vacuum"));
  });
});

describe("gentleness", () => {
  it("dense phase most gentle", () => {
    expect(gentleness("dense_phase_pressure")).toBeGreaterThan(gentleness("dilute_phase_positive"));
  });
});

describe("energy", () => {
  it("dense phase most energy efficient", () => {
    expect(energy("dense_phase_pressure")).toBeGreaterThan(energy("dilute_phase_positive"));
  });
});

describe("pcCost", () => {
  it("dense phase most expensive", () => {
    expect(pcCost("dense_phase_pressure")).toBeGreaterThan(pcCost("dilute_phase_vacuum"));
  });
});

describe("dustFree", () => {
  it("all are dust free", () => {
    expect(dustFree("dilute_phase_positive")).toBe(true);
  });
  it("dense phase dust free", () => {
    expect(dustFree("dense_phase_pressure")).toBe(true);
  });
});

describe("forAbrasive", () => {
  it("dense phase for abrasive", () => {
    expect(forAbrasive("dense_phase_pressure")).toBe(true);
  });
  it("dilute positive not abrasive", () => {
    expect(forAbrasive("dilute_phase_positive")).toBe(false);
  });
});

describe("velocity", () => {
  it("combined uses vacuum pickup", () => {
    expect(velocity("combined_push_pull")).toBe("vacuum_pickup_pressure_delivery");
  });
});

describe("bestUse", () => {
  it("dense phase for fragile long distance", () => {
    expect(bestUse("dense_phase_pressure")).toBe("fragile_abrasive_long_distance");
  });
});

describe("pneumaticConveyorTypes", () => {
  it("returns 5 types", () => {
    expect(pneumaticConveyorTypes()).toHaveLength(5);
  });
});

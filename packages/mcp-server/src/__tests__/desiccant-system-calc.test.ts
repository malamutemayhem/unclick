import { describe, it, expect } from "vitest";
import {
  dehumidify, efficiency, capacity, maintenance,
  dsCost, regenerative, forProcess, medium,
  bestUse, desiccantSystemTypes,
} from "../desiccant-system-calc.js";

describe("dehumidify", () => {
  it("liquid best dehumidify", () => {
    expect(dehumidify("liquid_desiccant_spray")).toBeGreaterThan(dehumidify("solid_packed_tower"));
  });
});

describe("efficiency", () => {
  it("solar most efficient", () => {
    expect(efficiency("solar_regenerated_wheel")).toBeGreaterThan(efficiency("solid_packed_tower"));
  });
});

describe("capacity", () => {
  it("liquid highest capacity", () => {
    expect(capacity("liquid_desiccant_spray")).toBeGreaterThan(capacity("solid_packed_tower"));
  });
});

describe("maintenance", () => {
  it("solid lowest maintenance", () => {
    expect(maintenance("solid_packed_tower")).toBeGreaterThan(maintenance("liquid_desiccant_spray"));
  });
});

describe("dsCost", () => {
  it("liquid most expensive", () => {
    expect(dsCost("liquid_desiccant_spray")).toBeGreaterThan(dsCost("solid_packed_tower"));
  });
});

describe("regenerative", () => {
  it("rotary wheel is regenerative", () => {
    expect(regenerative("rotary_wheel_silica_gel")).toBe(true);
  });
  it("solid packed not regenerative", () => {
    expect(regenerative("solid_packed_tower")).toBe(false);
  });
});

describe("forProcess", () => {
  it("rotary for process", () => {
    expect(forProcess("rotary_wheel_silica_gel")).toBe(true);
  });
  it("hybrid not process", () => {
    expect(forProcess("hybrid_desiccant_dx")).toBe(false);
  });
});

describe("medium", () => {
  it("solar uses solar thermal regen", () => {
    expect(medium("solar_regenerated_wheel")).toBe("solar_thermal_regen_silica_wheel");
  });
});

describe("bestUse", () => {
  it("liquid for large ahu tropical", () => {
    expect(bestUse("liquid_desiccant_spray")).toBe("large_ahu_tropical_climate");
  });
});

describe("desiccantSystemTypes", () => {
  it("returns 5 types", () => {
    expect(desiccantSystemTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  compressiveStrengthMpa, workability, costPerCubicMeter,
  durability, densityKgM3, requiresVibration,
  crackResistant, bestApplication, curingTimeDays, concreteTypes,
} from "../concrete-type-calc.js";

describe("compressiveStrengthMpa", () => {
  it("high_strength strongest", () => {
    expect(compressiveStrengthMpa("high_strength")).toBeGreaterThan(
      compressiveStrengthMpa("normal")
    );
  });
});

describe("workability", () => {
  it("self_compacting most workable", () => {
    expect(workability("self_compacting")).toBeGreaterThan(
      workability("fiber_reinforced")
    );
  });
});

describe("costPerCubicMeter", () => {
  it("fiber_reinforced most expensive", () => {
    expect(costPerCubicMeter("fiber_reinforced")).toBeGreaterThan(
      costPerCubicMeter("normal")
    );
  });
});

describe("durability", () => {
  it("fiber_reinforced most durable", () => {
    expect(durability("fiber_reinforced")).toBeGreaterThan(
      durability("lightweight")
    );
  });
});

describe("densityKgM3", () => {
  it("lightweight least dense", () => {
    expect(densityKgM3("lightweight")).toBeLessThan(
      densityKgM3("normal")
    );
  });
});

describe("requiresVibration", () => {
  it("normal requires vibration", () => {
    expect(requiresVibration("normal")).toBe(true);
  });
  it("self_compacting does not", () => {
    expect(requiresVibration("self_compacting")).toBe(false);
  });
});

describe("crackResistant", () => {
  it("fiber_reinforced is crack resistant", () => {
    expect(crackResistant("fiber_reinforced")).toBe(true);
  });
  it("normal is not", () => {
    expect(crackResistant("normal")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("self_compacting for complex formwork", () => {
    expect(bestApplication("self_compacting")).toBe("complex_formwork");
  });
});

describe("curingTimeDays", () => {
  it("normal is 28 day standard", () => {
    expect(curingTimeDays("normal")).toBe("28_standard");
  });
});

describe("concreteTypes", () => {
  it("returns 5 types", () => {
    expect(concreteTypes()).toHaveLength(5);
  });
});

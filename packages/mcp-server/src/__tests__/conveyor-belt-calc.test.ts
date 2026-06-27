import { describe, it, expect } from "vitest";
import {
  throughput, maxIncline, materialVersatility, cleanability,
  energyConsumption, enclosedSystem, foodGradeAvailable,
  bestApplication, beltMaterial, conveyorBelts,
} from "../conveyor-belt-calc.js";

describe("throughput", () => {
  it("flat highest throughput", () => {
    expect(throughput("flat")).toBeGreaterThan(throughput("screw"));
  });
});

describe("maxIncline", () => {
  it("inclined handles steepest angles", () => {
    expect(maxIncline("inclined")).toBeGreaterThan(maxIncline("flat"));
  });
});

describe("materialVersatility", () => {
  it("flat most versatile", () => {
    expect(materialVersatility("flat")).toBeGreaterThan(materialVersatility("pneumatic"));
  });
});

describe("cleanability", () => {
  it("pneumatic easiest to clean", () => {
    expect(cleanability("pneumatic")).toBeGreaterThan(cleanability("screw"));
  });
});

describe("energyConsumption", () => {
  it("pneumatic uses most energy", () => {
    expect(energyConsumption("pneumatic")).toBeGreaterThan(energyConsumption("roller"));
  });
});

describe("enclosedSystem", () => {
  it("pneumatic is enclosed", () => {
    expect(enclosedSystem("pneumatic")).toBe(true);
  });
  it("flat is not enclosed", () => {
    expect(enclosedSystem("flat")).toBe(false);
  });
});

describe("foodGradeAvailable", () => {
  it("all have food grade options", () => {
    for (const c of conveyorBelts()) {
      expect(foodGradeAvailable(c)).toBe(true);
    }
  });
});

describe("bestApplication", () => {
  it("roller for box handling", () => {
    expect(bestApplication("roller")).toBe("box_parcel_handling");
  });
});

describe("beltMaterial", () => {
  it("screw uses steel auger", () => {
    expect(beltMaterial("screw")).toBe("steel_auger_trough");
  });
});

describe("conveyorBelts", () => {
  it("returns 5 types", () => {
    expect(conveyorBelts()).toHaveLength(5);
  });
});

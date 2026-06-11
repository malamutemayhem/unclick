import { describe, it, expect } from "vitest";
import {
  surfaceFinish, throughput, porosity, wallThickness,
  prCost, highPressure, forStructural, casterConfig,
  bestUse, pressureCasterTypes,
} from "../pressure-caster-calc.js";

describe("surfaceFinish", () => {
  it("squeeze cast best surface finish", () => {
    expect(surfaceFinish("squeeze_cast")).toBeGreaterThan(surfaceFinish("gravity_tilt"));
  });
});

describe("throughput", () => {
  it("high pressure die highest throughput", () => {
    expect(throughput("high_pressure_die")).toBeGreaterThan(throughput("gravity_tilt"));
  });
});

describe("porosity", () => {
  it("squeeze cast best porosity control", () => {
    expect(porosity("squeeze_cast")).toBeGreaterThan(porosity("high_pressure_die"));
  });
});

describe("wallThickness", () => {
  it("high pressure die best wall thickness", () => {
    expect(wallThickness("high_pressure_die")).toBeGreaterThan(wallThickness("gravity_tilt"));
  });
});

describe("prCost", () => {
  it("squeeze cast most expensive", () => {
    expect(prCost("squeeze_cast")).toBeGreaterThan(prCost("gravity_tilt"));
  });
});

describe("highPressure", () => {
  it("high pressure die is high pressure", () => {
    expect(highPressure("high_pressure_die")).toBe(true);
  });
  it("low pressure die not high pressure", () => {
    expect(highPressure("low_pressure_die")).toBe(false);
  });
});

describe("forStructural", () => {
  it("squeeze cast for structural", () => {
    expect(forStructural("squeeze_cast")).toBe(true);
  });
  it("high pressure die not for structural", () => {
    expect(forStructural("high_pressure_die")).toBe(false);
  });
});

describe("casterConfig", () => {
  it("vacuum die uses evacuate cavity porosity free heat treatable", () => {
    expect(casterConfig("vacuum_die")).toBe("vacuum_die_caster_evacuate_cavity_porosity_free_heat_treatable");
  });
});

describe("bestUse", () => {
  it("squeeze cast for suspension arm forge quality dense structural", () => {
    expect(bestUse("squeeze_cast")).toBe("suspension_arm_squeeze_caster_forge_quality_dense_structural");
  });
});

describe("pressureCasterTypes", () => {
  it("returns 5 types", () => {
    expect(pressureCasterTypes()).toHaveLength(5);
  });
});

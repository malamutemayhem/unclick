import { describe, it, expect } from "vitest";
import {
  density, temperature, speed, precision,
  spCost_, pressureAssist, forPowderMetal, atmosphere,
  bestUse, sinterProcessTypes,
} from "../sinter-process-calc.js";

describe("density", () => {
  it("spark plasma highest density", () => {
    expect(density("spark_plasma_sps")).toBeGreaterThan(density("conventional_strand_ore"));
  });
});

describe("temperature", () => {
  it("spark plasma highest temperature", () => {
    expect(temperature("spark_plasma_sps")).toBeGreaterThan(temperature("microwave_sinter"));
  });
});

describe("speed", () => {
  it("spark plasma fastest", () => {
    expect(speed("spark_plasma_sps")).toBeGreaterThan(speed("hot_isostatic_hip"));
  });
});

describe("precision", () => {
  it("selective laser best precision", () => {
    expect(precision("selective_laser_sls")).toBeGreaterThan(precision("conventional_strand_ore"));
  });
});

describe("spCost_", () => {
  it("spark plasma most expensive", () => {
    expect(spCost_("spark_plasma_sps")).toBeGreaterThan(spCost_("conventional_strand_ore"));
  });
});

describe("pressureAssist", () => {
  it("hot isostatic uses pressure", () => {
    expect(pressureAssist("hot_isostatic_hip")).toBe(true);
  });
  it("microwave no pressure assist", () => {
    expect(pressureAssist("microwave_sinter")).toBe(false);
  });
});

describe("forPowderMetal", () => {
  it("spark plasma for powder metal", () => {
    expect(forPowderMetal("spark_plasma_sps")).toBe(true);
  });
  it("conventional strand not for powder metal", () => {
    expect(forPowderMetal("conventional_strand_ore")).toBe(false);
  });
});

describe("atmosphere", () => {
  it("hot isostatic uses argon high pressure", () => {
    expect(atmosphere("hot_isostatic_hip")).toBe("argon_high_pressure_vessel_uniform");
  });
});

describe("bestUse", () => {
  it("conventional strand for iron ore sinter", () => {
    expect(bestUse("conventional_strand_ore")).toBe("iron_ore_sinter_blast_furnace_feed");
  });
});

describe("sinterProcessTypes", () => {
  it("returns 5 types", () => {
    expect(sinterProcessTypes()).toHaveLength(5);
  });
});

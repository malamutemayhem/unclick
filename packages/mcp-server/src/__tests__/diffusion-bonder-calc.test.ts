import { describe, it, expect } from "vitest";
import {
  bondStrength, throughput, interfaceQuality, temperatureRange,
  dbCost, pressureAssist, forDissimilar, bonderConfig,
  bestUse, diffusionBonderTypes,
} from "../diffusion-bonder-calc.js";

describe("bondStrength", () => {
  it("hip bond best bond strength", () => {
    expect(bondStrength("hip_bond")).toBeGreaterThan(bondStrength("hot_press_bond"));
  });
});

describe("throughput", () => {
  it("hot press bond highest throughput", () => {
    expect(throughput("hot_press_bond")).toBeGreaterThan(throughput("hip_bond"));
  });
});

describe("interfaceQuality", () => {
  it("hip bond best interface quality", () => {
    expect(interfaceQuality("hip_bond")).toBeGreaterThan(interfaceQuality("hot_press_bond"));
  });
});

describe("temperatureRange", () => {
  it("hip bond best temperature range", () => {
    expect(temperatureRange("hip_bond")).toBeGreaterThan(temperatureRange("hot_press_bond"));
  });
});

describe("dbCost", () => {
  it("hip bond most expensive", () => {
    expect(dbCost("hip_bond")).toBeGreaterThan(dbCost("hot_press_bond"));
  });
});

describe("pressureAssist", () => {
  it("hip bond is pressure assist", () => {
    expect(pressureAssist("hip_bond")).toBe(true);
  });
  it("transient liquid not pressure assist", () => {
    expect(pressureAssist("transient_liquid")).toBe(false);
  });
});

describe("forDissimilar", () => {
  it("spark plasma for dissimilar", () => {
    expect(forDissimilar("spark_plasma")).toBe(true);
  });
  it("hot press bond not for dissimilar", () => {
    expect(forDissimilar("hot_press_bond")).toBe(false);
  });
});

describe("bonderConfig", () => {
  it("spark plasma uses pulsed dc rapid heat sinter bond", () => {
    expect(bonderConfig("spark_plasma")).toBe("spark_plasma_diffusion_bonder_pulsed_dc_rapid_heat_sinter_bond");
  });
});

describe("bestUse", () => {
  it("hip bond for superalloy repair isostatic pressure bond", () => {
    expect(bestUse("hip_bond")).toBe("superalloy_repair_hip_diffusion_bonder_isostatic_pressure_bond");
  });
});

describe("diffusionBonderTypes", () => {
  it("returns 5 types", () => {
    expect(diffusionBonderTypes()).toHaveLength(5);
  });
});

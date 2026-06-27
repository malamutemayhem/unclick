import { describe, it, expect } from "vitest";
import {
  cutQuality, speed, thickness, precision,
  lcCost, reflectiveSafe, forTube, source,
  bestUse, laserCutTypes,
} from "../laser-cut-calc.js";

describe("cutQuality", () => {
  it("ultrafast femto best cut quality", () => {
    expect(cutQuality("ultrafast_femto_micro")).toBeGreaterThan(cutQuality("tube_laser_rotary"));
  });
});

describe("speed", () => {
  it("fiber flatbed fastest", () => {
    expect(speed("fiber_flatbed_metal")).toBeGreaterThan(speed("ultrafast_femto_micro"));
  });
});

describe("thickness", () => {
  it("fiber flatbed thickest capacity", () => {
    expect(thickness("fiber_flatbed_metal")).toBeGreaterThan(thickness("ultrafast_femto_micro"));
  });
});

describe("precision", () => {
  it("ultrafast femto most precise", () => {
    expect(precision("ultrafast_femto_micro")).toBeGreaterThan(precision("co2_flatbed_sheet"));
  });
});

describe("lcCost", () => {
  it("ultrafast femto most expensive", () => {
    expect(lcCost("ultrafast_femto_micro")).toBeGreaterThan(lcCost("co2_flatbed_sheet"));
  });
});

describe("reflectiveSafe", () => {
  it("fiber flatbed is reflective safe", () => {
    expect(reflectiveSafe("fiber_flatbed_metal")).toBe(true);
  });
  it("CO2 flatbed not reflective safe", () => {
    expect(reflectiveSafe("co2_flatbed_sheet")).toBe(false);
  });
});

describe("forTube", () => {
  it("tube laser for tubes", () => {
    expect(forTube("tube_laser_rotary")).toBe(true);
  });
  it("fiber flatbed not for tubes", () => {
    expect(forTube("fiber_flatbed_metal")).toBe(false);
  });
});

describe("source", () => {
  it("ultrafast uses femtosecond pulse", () => {
    expect(source("ultrafast_femto_micro")).toBe("femtosecond_ultrashort_pulse");
  });
});

describe("bestUse", () => {
  it("tube laser for tube profile frame joint", () => {
    expect(bestUse("tube_laser_rotary")).toBe("tube_profile_section_frame_joint");
  });
});

describe("laserCutTypes", () => {
  it("returns 5 types", () => {
    expect(laserCutTypes()).toHaveLength(5);
  });
});

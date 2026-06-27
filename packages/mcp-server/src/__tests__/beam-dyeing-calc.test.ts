import { describe, it, expect } from "vitest";
import {
  dyePenetration, bathCirculation, yarnTension, colorEvenness,
  bdCost, pressurized, forWarp, beamConfig,
  bestUse, beamDyeingTypes,
} from "../beam-dyeing-calc.js";

describe("dyePenetration", () => {
  it("high pressure beam best dye penetration", () => {
    expect(dyePenetration("high_pressure_beam")).toBeGreaterThan(dyePenetration("space_dyeing_beam"));
  });
});

describe("bathCirculation", () => {
  it("high pressure beam best bath circulation", () => {
    expect(bathCirculation("high_pressure_beam")).toBeGreaterThan(bathCirculation("space_dyeing_beam"));
  });
});

describe("yarnTension", () => {
  it("high pressure beam highest yarn tension control", () => {
    expect(yarnTension("high_pressure_beam")).toBeGreaterThan(yarnTension("space_dyeing_beam"));
  });
});

describe("colorEvenness", () => {
  it("high pressure beam best color evenness", () => {
    expect(colorEvenness("high_pressure_beam")).toBeGreaterThan(colorEvenness("space_dyeing_beam"));
  });
});

describe("bdCost", () => {
  it("high pressure beam most expensive", () => {
    expect(bdCost("high_pressure_beam")).toBeGreaterThan(bdCost("warp_beam_standard"));
  });
});

describe("pressurized", () => {
  it("high pressure beam is pressurized", () => {
    expect(pressurized("high_pressure_beam")).toBe(true);
  });
  it("warp beam standard not pressurized", () => {
    expect(pressurized("warp_beam_standard")).toBe(false);
  });
});

describe("forWarp", () => {
  it("warp beam standard for warp", () => {
    expect(forWarp("warp_beam_standard")).toBe(true);
  });
  it("space dyeing beam not for warp", () => {
    expect(forWarp("space_dyeing_beam")).toBe(false);
  });
});

describe("beamConfig", () => {
  it("package beam uses perforated tube radial flow", () => {
    expect(beamConfig("package_beam")).toBe("yarn_package_on_perforated_tube_radial_flow_cheese_cone_dye");
  });
});

describe("bestUse", () => {
  it("sectional beam for multi color warp stripe", () => {
    expect(bestUse("sectional_beam")).toBe("multi_color_warp_sectional_stripe_pattern_yarn_dyed_shirting");
  });
});

describe("beamDyeingTypes", () => {
  it("returns 5 types", () => {
    expect(beamDyeingTypes()).toHaveLength(5);
  });
});

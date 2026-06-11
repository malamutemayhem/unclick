import { describe, it, expect } from "vitest";
import {
  flameIntensity, fabricSpeed, fiberRemoval, heatUniformity,
  sbCost, adjustable, forKnit, burnerConfig,
  bestUse, singeingBurnerTypes,
} from "../singeing-burner-calc.js";

describe("flameIntensity", () => {
  it("dual face highest flame intensity", () => {
    expect(flameIntensity("dual_face")).toBeGreaterThan(flameIntensity("infrared_radiant"));
  });
});

describe("fabricSpeed", () => {
  it("dual face fastest fabric speed", () => {
    expect(fabricSpeed("dual_face")).toBeGreaterThan(fabricSpeed("plate_contact"));
  });
});

describe("fiberRemoval", () => {
  it("dual face best fiber removal", () => {
    expect(fiberRemoval("dual_face")).toBeGreaterThan(fiberRemoval("infrared_radiant"));
  });
});

describe("heatUniformity", () => {
  it("infrared radiant best heat uniformity", () => {
    expect(heatUniformity("infrared_radiant")).toBeGreaterThan(heatUniformity("gas_flame_direct"));
  });
});

describe("sbCost", () => {
  it("dual face most expensive", () => {
    expect(sbCost("dual_face")).toBeGreaterThan(sbCost("plate_contact"));
  });
});

describe("adjustable", () => {
  it("gas flame direct is adjustable", () => {
    expect(adjustable("gas_flame_direct")).toBe(true);
  });
  it("plate contact not adjustable", () => {
    expect(adjustable("plate_contact")).toBe(false);
  });
});

describe("forKnit", () => {
  it("plate contact for knit", () => {
    expect(forKnit("plate_contact")).toBe(true);
  });
  it("gas flame direct not for knit", () => {
    expect(forKnit("gas_flame_direct")).toBe(false);
  });
});

describe("burnerConfig", () => {
  it("rotary cylinder uses heated drum", () => {
    expect(burnerConfig("rotary_cylinder")).toBe("rotating_heated_cylinder_wrap_fabric_around_drum_even_singe");
  });
});

describe("bestUse", () => {
  it("infrared radiant for synthetic microfiber", () => {
    expect(bestUse("infrared_radiant")).toBe("synthetic_microfiber_technical_textile_precision_heat_control");
  });
});

describe("singeingBurnerTypes", () => {
  it("returns 5 types", () => {
    expect(singeingBurnerTypes()).toHaveLength(5);
  });
});

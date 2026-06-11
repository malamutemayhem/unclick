import { describe, it, expect } from "vitest";
import {
  speed, cuttingHeight, productivity, automation,
  lsCost, selfAdvancing, forThickSeam, cutting,
  bestUse, longwallShearerTypes,
} from "../longwall-shearer-calc.js";

describe("speed", () => {
  it("plow system fastest", () => {
    expect(speed("plow_system")).toBeGreaterThan(speed("thin_seam"));
  });
});

describe("cuttingHeight", () => {
  it("ranging arm tallest cutting height", () => {
    expect(cuttingHeight("ranging_arm")).toBeGreaterThan(cuttingHeight("thin_seam"));
  });
});

describe("productivity", () => {
  it("double drum highest productivity", () => {
    expect(productivity("double_drum")).toBeGreaterThan(productivity("thin_seam"));
  });
});

describe("automation", () => {
  it("plow system most automated", () => {
    expect(automation("plow_system")).toBeGreaterThan(automation("single_drum"));
  });
});

describe("lsCost", () => {
  it("double drum most expensive", () => {
    expect(lsCost("double_drum")).toBeGreaterThan(lsCost("thin_seam"));
  });
});

describe("selfAdvancing", () => {
  it("all longwall shearers are self advancing", () => {
    expect(selfAdvancing("double_drum")).toBe(true);
    expect(selfAdvancing("plow_system")).toBe(true);
  });
});

describe("forThickSeam", () => {
  it("double drum for thick seam", () => {
    expect(forThickSeam("double_drum")).toBe(true);
  });
  it("thin seam not for thick seam", () => {
    expect(forThickSeam("thin_seam")).toBe(false);
  });
});

describe("cutting", () => {
  it("plow system uses chain drawn plow blade", () => {
    expect(cutting("plow_system")).toBe("chain_drawn_plow_blade_shear_thin_slice_high_speed_pass");
  });
});

describe("bestUse", () => {
  it("double drum for high production longwall", () => {
    expect(bestUse("double_drum")).toBe("high_production_longwall_coal_thick_seam_full_extraction");
  });
});

describe("longwallShearerTypes", () => {
  it("returns 5 types", () => {
    expect(longwallShearerTypes()).toHaveLength(5);
  });
});

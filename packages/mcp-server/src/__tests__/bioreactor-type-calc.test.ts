import { describe, it, expect } from "vitest";
import {
  scaleUp, mixing, oxygenTransfer, shearStress,
  brCost, singleUse, forMab, agitation,
  bestUse, bioreactorTypes,
} from "../bioreactor-type-calc.js";

describe("scaleUp", () => {
  it("stirred tank best scale up", () => {
    expect(scaleUp("stirred_tank_cstr")).toBeGreaterThan(scaleUp("wave_bag_rocking"));
  });
});

describe("mixing", () => {
  it("stirred tank best mixing", () => {
    expect(mixing("stirred_tank_cstr")).toBeGreaterThan(mixing("fixed_bed_packed"));
  });
});

describe("oxygenTransfer", () => {
  it("airlift best oxygen transfer", () => {
    expect(oxygenTransfer("airlift_bubble_column")).toBeGreaterThan(oxygenTransfer("wave_bag_rocking"));
  });
});

describe("shearStress", () => {
  it("fixed bed lowest shear stress", () => {
    expect(shearStress("fixed_bed_packed")).toBeGreaterThan(shearStress("stirred_tank_cstr"));
  });
});

describe("brCost", () => {
  it("hollow fiber most expensive", () => {
    expect(brCost("hollow_fiber_perfusion")).toBeGreaterThan(brCost("airlift_bubble_column"));
  });
});

describe("singleUse", () => {
  it("wave bag is single use", () => {
    expect(singleUse("wave_bag_rocking")).toBe(true);
  });
  it("stirred tank not single use", () => {
    expect(singleUse("stirred_tank_cstr")).toBe(false);
  });
});

describe("forMab", () => {
  it("stirred tank for mab", () => {
    expect(forMab("stirred_tank_cstr")).toBe(true);
  });
  it("airlift not for mab", () => {
    expect(forMab("airlift_bubble_column")).toBe(false);
  });
});

describe("agitation", () => {
  it("wave bag uses rocking platform wave motion", () => {
    expect(agitation("wave_bag_rocking")).toBe("rocking_platform_wave_motion");
  });
});

describe("bestUse", () => {
  it("hollow fiber best for continuous perfusion", () => {
    expect(bestUse("hollow_fiber_perfusion")).toBe("continuous_perfusion_high_density");
  });
});

describe("bioreactorTypes", () => {
  it("returns 5 types", () => {
    expect(bioreactorTypes()).toHaveLength(5);
  });
});

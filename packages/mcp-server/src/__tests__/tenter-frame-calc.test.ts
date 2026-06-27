import { describe, it, expect } from "vitest";
import {
  fabricSpeed, widthControl, temperatureRange, fabricDamage,
  tfCost, heated, forKnit, holdingMethod,
  bestUse, tenterFrameTypes,
} from "../tenter-frame-calc.js";

describe("fabricSpeed", () => {
  it("clip chain fastest fabric speed", () => {
    expect(fabricSpeed("clip_chain")).toBeGreaterThan(fabricSpeed("biaxial_stretching"));
  });
});

describe("widthControl", () => {
  it("biaxial stretching best width control", () => {
    expect(widthControl("biaxial_stretching")).toBeGreaterThan(widthControl("relaxation_dryer"));
  });
});

describe("temperatureRange", () => {
  it("pin chain and clip chain widest temp range", () => {
    expect(temperatureRange("pin_chain")).toBeGreaterThan(temperatureRange("biaxial_stretching"));
  });
});

describe("fabricDamage", () => {
  it("relaxation dryer least fabric damage", () => {
    expect(fabricDamage("relaxation_dryer")).toBeGreaterThan(fabricDamage("biaxial_stretching"));
  });
});

describe("tfCost", () => {
  it("biaxial stretching most expensive", () => {
    expect(tfCost("biaxial_stretching")).toBeGreaterThan(tfCost("relaxation_dryer"));
  });
});

describe("heated", () => {
  it("all types are heated", () => {
    expect(heated("pin_chain")).toBe(true);
    expect(heated("relaxation_dryer")).toBe(true);
  });
});

describe("forKnit", () => {
  it("pin chain for knit fabric", () => {
    expect(forKnit("pin_chain")).toBe(true);
  });
  it("clip chain not for knit", () => {
    expect(forKnit("clip_chain")).toBe(false);
  });
});

describe("holdingMethod", () => {
  it("biaxial stretching uses diverging clip chain", () => {
    expect(holdingMethod("biaxial_stretching")).toBe("diverging_clip_chain_stretch_md_td_simultaneously_orient");
  });
});

describe("bestUse", () => {
  it("relaxation dryer for knit shrinkage control", () => {
    expect(bestUse("relaxation_dryer")).toBe("knit_fabric_shrinkage_control_tumble_dry_relaxation_finish");
  });
});

describe("tenterFrameTypes", () => {
  it("returns 5 types", () => {
    expect(tenterFrameTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  clarityFinal, speedFinish, controlEven, gritRange,
  polishCost, powered, sprayApply, abrasiveType,
  bestUse, resinPolishs,
} from "../resin-polish-calc.js";

describe("clarityFinal", () => {
  it("micro mesh pad best clarity", () => {
    expect(clarityFinal("micro_mesh_pad")).toBeGreaterThan(clarityFinal("uv_topcoat_spray"));
  });
});

describe("speedFinish", () => {
  it("buffing wheel power fastest finish", () => {
    expect(speedFinish("buffing_wheel_power")).toBeGreaterThan(speedFinish("wet_sand_progressive"));
  });
});

describe("controlEven", () => {
  it("micro mesh pad most even control", () => {
    expect(controlEven("micro_mesh_pad")).toBeGreaterThan(controlEven("buffing_wheel_power"));
  });
});

describe("gritRange", () => {
  it("micro mesh pad widest grit range", () => {
    expect(gritRange("micro_mesh_pad")).toBeGreaterThan(gritRange("uv_topcoat_spray"));
  });
});

describe("polishCost", () => {
  it("buffing wheel power most expensive", () => {
    expect(polishCost("buffing_wheel_power")).toBeGreaterThan(polishCost("wet_sand_progressive"));
  });
});

describe("powered", () => {
  it("buffing wheel power is powered", () => {
    expect(powered("buffing_wheel_power")).toBe(true);
  });
  it("micro mesh pad not powered", () => {
    expect(powered("micro_mesh_pad")).toBe(false);
  });
});

describe("sprayApply", () => {
  it("uv topcoat spray is spray apply", () => {
    expect(sprayApply("uv_topcoat_spray")).toBe(true);
  });
  it("polishing compound cream not spray apply", () => {
    expect(sprayApply("polishing_compound_cream")).toBe(false);
  });
});

describe("abrasiveType", () => {
  it("polishing compound cream uses alumina oxide cream", () => {
    expect(abrasiveType("polishing_compound_cream")).toBe("alumina_oxide_cream");
  });
});

describe("bestUse", () => {
  it("wet sand progressive best for general surface smooth", () => {
    expect(bestUse("wet_sand_progressive")).toBe("general_surface_smooth");
  });
});

describe("resinPolishs", () => {
  it("returns 5 types", () => {
    expect(resinPolishs()).toHaveLength(5);
  });
});

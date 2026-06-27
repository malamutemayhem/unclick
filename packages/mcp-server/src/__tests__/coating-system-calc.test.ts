import { describe, it, expect } from "vitest";
import {
  corrosionProtect, abrasionResist, chemicalResist, uvStability,
  csCost, multiCoat, forImmersion, system,
  bestUse, coatingSystemTypes,
} from "../coating-system-calc.js";

describe("corrosionProtect", () => {
  it("zinc rich primer best corrosion protection", () => {
    expect(corrosionProtect("zinc_rich_primer")).toBeGreaterThanOrEqual(corrosionProtect("fusion_bonded_epoxy"));
  });
});

describe("abrasionResist", () => {
  it("polyurethane best abrasion resistance", () => {
    expect(abrasionResist("polyurethane_topcoat")).toBeGreaterThan(abrasionResist("zinc_rich_primer"));
  });
});

describe("chemicalResist", () => {
  it("epoxy two part best chemical resistance", () => {
    expect(chemicalResist("epoxy_two_part")).toBeGreaterThan(chemicalResist("zinc_rich_primer"));
  });
});

describe("uvStability", () => {
  it("polyurethane best uv stability", () => {
    expect(uvStability("polyurethane_topcoat")).toBeGreaterThan(uvStability("epoxy_two_part"));
  });
});

describe("csCost", () => {
  it("fusion bonded epoxy most expensive", () => {
    expect(csCost("fusion_bonded_epoxy")).toBeGreaterThan(csCost("zinc_rich_primer"));
  });
});

describe("multiCoat", () => {
  it("epoxy is multi coat", () => {
    expect(multiCoat("epoxy_two_part")).toBe(true);
  });
  it("zinc rich primer not multi coat", () => {
    expect(multiCoat("zinc_rich_primer")).toBe(false);
  });
});

describe("forImmersion", () => {
  it("epoxy for immersion", () => {
    expect(forImmersion("epoxy_two_part")).toBe(true);
  });
  it("polyurethane not for immersion", () => {
    expect(forImmersion("polyurethane_topcoat")).toBe(false);
  });
});

describe("system", () => {
  it("thermal ceramic uses microsphere barrier", () => {
    expect(system("thermal_ceramic_coat")).toBe("ceramic_microsphere_insulating_barrier_coat");
  });
});

describe("bestUse", () => {
  it("fusion bonded epoxy for buried pipeline", () => {
    expect(bestUse("fusion_bonded_epoxy")).toBe("buried_pipeline_rebar_factory_applied_coat");
  });
});

describe("coatingSystemTypes", () => {
  it("returns 5 types", () => {
    expect(coatingSystemTypes()).toHaveLength(5);
  });
});

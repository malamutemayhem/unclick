import { describe, it, expect } from "vitest";
import {
  cutProtect, nonStick, heatResist, durability,
  matCost, hasGrid, washable, matSurface,
  bestUse, craftMats,
} from "../craft-mat-calc.js";

describe("cutProtect", () => {
  it("self heal cut grid best cut protect", () => {
    expect(cutProtect("self_heal_cut_grid")).toBeGreaterThan(cutProtect("foam_stamp_cushion"));
  });
});

describe("nonStick", () => {
  it("teflon non stick most non stick", () => {
    expect(nonStick("teflon_non_stick")).toBeGreaterThan(nonStick("self_heal_cut_grid"));
  });
});

describe("heatResist", () => {
  it("silicone heat safe best heat resist", () => {
    expect(heatResist("silicone_heat_safe")).toBeGreaterThan(heatResist("foam_stamp_cushion"));
  });
});

describe("durability", () => {
  it("glass media smooth most durable", () => {
    expect(durability("glass_media_smooth")).toBeGreaterThan(durability("foam_stamp_cushion"));
  });
});

describe("matCost", () => {
  it("glass media smooth most expensive", () => {
    expect(matCost("glass_media_smooth")).toBeGreaterThan(matCost("foam_stamp_cushion"));
  });
});

describe("hasGrid", () => {
  it("self heal cut grid has grid", () => {
    expect(hasGrid("self_heal_cut_grid")).toBe(true);
  });
  it("teflon non stick no grid", () => {
    expect(hasGrid("teflon_non_stick")).toBe(false);
  });
});

describe("washable", () => {
  it("teflon non stick is washable", () => {
    expect(washable("teflon_non_stick")).toBe(true);
  });
  it("self heal cut grid not washable", () => {
    expect(washable("self_heal_cut_grid")).toBe(false);
  });
});

describe("matSurface", () => {
  it("self heal cut grid uses pvc self healing", () => {
    expect(matSurface("self_heal_cut_grid")).toBe("pvc_self_healing");
  });
});

describe("bestUse", () => {
  it("silicone heat safe best for heat emboss protect", () => {
    expect(bestUse("silicone_heat_safe")).toBe("heat_emboss_protect");
  });
});

describe("craftMats", () => {
  it("returns 5 types", () => {
    expect(craftMats()).toHaveLength(5);
  });
});

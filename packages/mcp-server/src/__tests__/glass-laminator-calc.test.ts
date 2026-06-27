import { describe, it, expect } from "vitest";
import {
  bondStrength, opticalClarity, throughput, interlayerRange,
  glCost, autoclave, forSafety, laminatorConfig,
  bestUse, glassLaminatorTypes,
} from "../glass-laminator-calc.js";

describe("bondStrength", () => {
  it("sgp ionoplast strongest bond", () => {
    expect(bondStrength("sgp_ionoplast")).toBeGreaterThan(bondStrength("vacuum_bag"));
  });
});

describe("opticalClarity", () => {
  it("sgp ionoplast best optical clarity", () => {
    expect(opticalClarity("sgp_ionoplast")).toBeGreaterThan(opticalClarity("vacuum_bag"));
  });
});

describe("throughput", () => {
  it("nip roll highest throughput", () => {
    expect(throughput("nip_roll")).toBeGreaterThan(throughput("vacuum_bag"));
  });
});

describe("interlayerRange", () => {
  it("vacuum bag widest interlayer range", () => {
    expect(interlayerRange("vacuum_bag")).toBeGreaterThan(interlayerRange("sgp_ionoplast"));
  });
});

describe("glCost", () => {
  it("sgp ionoplast most expensive", () => {
    expect(glCost("sgp_ionoplast")).toBeGreaterThan(glCost("vacuum_bag"));
  });
});

describe("autoclave", () => {
  it("autoclave pvb uses autoclave", () => {
    expect(autoclave("autoclave_pvb")).toBe(true);
  });
  it("vacuum bag no autoclave", () => {
    expect(autoclave("vacuum_bag")).toBe(false);
  });
});

describe("forSafety", () => {
  it("sgp ionoplast for safety", () => {
    expect(forSafety("sgp_ionoplast")).toBe(true);
  });
  it("eva film not for safety", () => {
    expect(forSafety("eva_film")).toBe(false);
  });
});

describe("laminatorConfig", () => {
  it("eva film uses vacuum heat press decorative", () => {
    expect(laminatorConfig("eva_film")).toBe("eva_film_vacuum_heat_press_decorative_solar_panel_laminate");
  });
});

describe("bestUse", () => {
  it("sgp ionoplast for structural glass floor balustrade", () => {
    expect(bestUse("sgp_ionoplast")).toBe("structural_glass_floor_balustrade_hurricane_sgp_ionoplast_bond");
  });
});

describe("glassLaminatorTypes", () => {
  it("returns 5 types", () => {
    expect(glassLaminatorTypes()).toHaveLength(5);
  });
});

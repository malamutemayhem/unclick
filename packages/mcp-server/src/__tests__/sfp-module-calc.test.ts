import { describe, it, expect } from "vitest";
import {
  dataRate, reachDistance, powerDraw, compatibility,
  moduleCost, fiberRequired, hotSwap, formFactor,
  bestUse, sfpModules,
} from "../sfp-module-calc.js";

describe("dataRate", () => {
  it("sfp28 25g highest data rate", () => {
    expect(dataRate("sfp28_25g_sr")).toBeGreaterThan(dataRate("sfp_1g_copper_rj45"));
  });
});

describe("reachDistance", () => {
  it("sfp plus 10g lr longest reach", () => {
    expect(reachDistance("sfp_plus_10g_lr")).toBeGreaterThan(reachDistance("sfp28_25g_sr"));
  });
});

describe("powerDraw", () => {
  it("sfp28 draws more power", () => {
    expect(powerDraw("sfp28_25g_sr")).toBeGreaterThan(powerDraw("sfp_1g_sx_multimode"));
  });
});

describe("compatibility", () => {
  it("sfp 1g copper most compatible", () => {
    expect(compatibility("sfp_1g_copper_rj45")).toBeGreaterThan(compatibility("sfp28_25g_sr"));
  });
});

describe("moduleCost", () => {
  it("sfp28 most expensive", () => {
    expect(moduleCost("sfp28_25g_sr")).toBeGreaterThan(moduleCost("sfp_1g_copper_rj45"));
  });
});

describe("fiberRequired", () => {
  it("sfp plus 10g sr requires fiber", () => {
    expect(fiberRequired("sfp_plus_10g_sr")).toBe(true);
  });
  it("sfp 1g copper does not require fiber", () => {
    expect(fiberRequired("sfp_1g_copper_rj45")).toBe(false);
  });
});

describe("hotSwap", () => {
  it("all sfp modules are hot swap", () => {
    expect(hotSwap("sfp_1g_copper_rj45")).toBe(true);
  });
});

describe("formFactor", () => {
  it("sfp28 uses sfp28 lc mm", () => {
    expect(formFactor("sfp28_25g_sr")).toBe("sfp28_lc_mm");
  });
});

describe("bestUse", () => {
  it("sfp plus 10g lr best for campus long haul", () => {
    expect(bestUse("sfp_plus_10g_lr")).toBe("campus_10g_long_haul");
  });
});

describe("sfpModules", () => {
  it("returns 5 types", () => {
    expect(sfpModules()).toHaveLength(5);
  });
});

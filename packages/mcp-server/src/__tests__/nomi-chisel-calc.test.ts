import { describe, it, expect } from "vitest";
import {
  cutClean, controlFine, powerStrike, edgeHold,
  chiselCost, forMortise, cranked, grindProfile,
  bestUse, nomiChisels,
} from "../nomi-chisel-calc.js";

describe("cutClean", () => {
  it("shinogi nomi paring cleanest cut", () => {
    expect(cutClean("shinogi_nomi_paring")).toBeGreaterThan(cutClean("mukoumachi_mortise"));
  });
});

describe("controlFine", () => {
  it("shinogi nomi paring finest control", () => {
    expect(controlFine("shinogi_nomi_paring")).toBeGreaterThan(controlFine("tataki_nomi_strike"));
  });
});

describe("powerStrike", () => {
  it("tataki nomi strike strongest strike", () => {
    expect(powerStrike("tataki_nomi_strike")).toBeGreaterThan(powerStrike("shinogi_nomi_paring"));
  });
});

describe("edgeHold", () => {
  it("mukoumachi mortise best edge hold", () => {
    expect(edgeHold("mukoumachi_mortise")).toBeGreaterThan(edgeHold("shinogi_nomi_paring"));
  });
});

describe("chiselCost", () => {
  it("kote nomi cranked most expensive", () => {
    expect(chiselCost("kote_nomi_cranked")).toBeGreaterThan(chiselCost("tataki_nomi_strike"));
  });
});

describe("forMortise", () => {
  it("mukoumachi mortise is for mortise", () => {
    expect(forMortise("mukoumachi_mortise")).toBe(true);
  });
  it("oire nomi bench not for mortise", () => {
    expect(forMortise("oire_nomi_bench")).toBe(false);
  });
});

describe("cranked", () => {
  it("kote nomi cranked is cranked", () => {
    expect(cranked("kote_nomi_cranked")).toBe(true);
  });
  it("oire nomi bench not cranked", () => {
    expect(cranked("oire_nomi_bench")).toBe(false);
  });
});

describe("grindProfile", () => {
  it("tataki nomi strike uses heavy duty bevel", () => {
    expect(grindProfile("tataki_nomi_strike")).toBe("heavy_duty_bevel");
  });
});

describe("bestUse", () => {
  it("oire nomi bench best for general bench work", () => {
    expect(bestUse("oire_nomi_bench")).toBe("general_bench_work");
  });
});

describe("nomiChisels", () => {
  it("returns 5 types", () => {
    expect(nomiChisels()).toHaveLength(5);
  });
});

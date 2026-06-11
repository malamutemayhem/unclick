import { describe, it, expect } from "vitest";
import {
  speed, cuttingForce, selectivity, mobility,
  cmCost__, underground, forCoal, cutting,
  bestUse, continuousMinerTypes,
} from "../continuous-miner-calc.js";

describe("speed", () => {
  it("boring type fastest", () => {
    expect(speed("boring_type")).toBeGreaterThan(speed("roadheader"));
  });
});

describe("cuttingForce", () => {
  it("roadheader highest cutting force", () => {
    expect(cuttingForce("roadheader")).toBeGreaterThan(cuttingForce("auger_miner"));
  });
});

describe("selectivity", () => {
  it("roadheader most selective", () => {
    expect(selectivity("roadheader")).toBeGreaterThan(selectivity("auger_miner"));
  });
});

describe("mobility", () => {
  it("surface miner most mobile", () => {
    expect(mobility("surface_miner")).toBeGreaterThan(mobility("boring_type"));
  });
});

describe("cmCost__", () => {
  it("surface miner most expensive", () => {
    expect(cmCost__("surface_miner")).toBeGreaterThan(cmCost__("auger_miner"));
  });
});

describe("underground", () => {
  it("drum type is underground", () => {
    expect(underground("drum_type")).toBe(true);
  });
  it("surface miner not underground", () => {
    expect(underground("surface_miner")).toBe(false);
  });
});

describe("forCoal", () => {
  it("drum type for coal", () => {
    expect(forCoal("drum_type")).toBe(true);
  });
  it("roadheader not for coal", () => {
    expect(forCoal("roadheader")).toBe(false);
  });
});

describe("cutting", () => {
  it("roadheader uses boom mounted cutterhead", () => {
    expect(cutting("roadheader")).toBe("boom_mounted_rotating_cutterhead_selective_profile_cut");
  });
});

describe("bestUse", () => {
  it("surface miner for limestone gypsum", () => {
    expect(bestUse("surface_miner")).toBe("limestone_gypsum_coal_surface_selective_mining_no_blasting");
  });
});

describe("continuousMinerTypes", () => {
  it("returns 5 types", () => {
    expect(continuousMinerTypes()).toHaveLength(5);
  });
});

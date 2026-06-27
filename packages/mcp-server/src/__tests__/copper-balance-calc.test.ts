import { describe, it, expect } from "vitest";
import {
  balanceQuality, etchUniformity, thermalRelief, routingImpact,
  balanceCost, automated, forMultilayer, fillPattern,
  bestUse, copperBalances,
} from "../copper-balance-calc.js";

describe("balanceQuality", () => {
  it("solid plane mirror best balance quality", () => {
    expect(balanceQuality("solid_plane_mirror")).toBeGreaterThan(balanceQuality("dummy_trace_balance"));
  });
});

describe("etchUniformity", () => {
  it("solid plane mirror best etch uniformity", () => {
    expect(etchUniformity("solid_plane_mirror")).toBeGreaterThan(etchUniformity("dummy_trace_balance"));
  });
});

describe("thermalRelief", () => {
  it("crosshatch partial best thermal relief", () => {
    expect(thermalRelief("crosshatch_partial")).toBeGreaterThan(thermalRelief("solid_plane_mirror"));
  });
});

describe("routingImpact", () => {
  it("dummy trace balance least routing impact", () => {
    expect(routingImpact("dummy_trace_balance")).toBeGreaterThan(routingImpact("solid_plane_mirror"));
  });
});

describe("balanceCost", () => {
  it("solid plane mirror most expensive", () => {
    expect(balanceCost("solid_plane_mirror")).toBeGreaterThan(balanceCost("ground_pour_flood"));
  });
});

describe("automated", () => {
  it("thieving pattern fill is automated", () => {
    expect(automated("thieving_pattern_fill")).toBe(true);
  });
  it("dummy trace balance not automated", () => {
    expect(automated("dummy_trace_balance")).toBe(false);
  });
});

describe("forMultilayer", () => {
  it("thieving pattern fill is for multilayer", () => {
    expect(forMultilayer("thieving_pattern_fill")).toBe(true);
  });
  it("crosshatch partial not for multilayer", () => {
    expect(forMultilayer("crosshatch_partial")).toBe(false);
  });
});

describe("fillPattern", () => {
  it("ground pour flood uses solid copper fill", () => {
    expect(fillPattern("ground_pour_flood")).toBe("solid_copper_fill");
  });
});

describe("bestUse", () => {
  it("thieving pattern fill best for outer layer etch balance", () => {
    expect(bestUse("thieving_pattern_fill")).toBe("outer_layer_etch_balance");
  });
});

describe("copperBalances", () => {
  it("returns 5 types", () => {
    expect(copperBalances()).toHaveLength(5);
  });
});

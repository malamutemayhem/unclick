import { describe, it, expect } from "vitest";
import {
  uniformity, throughput, heatTransfer, gentleness,
  fbCost, continuous, forPharma, gasFlow,
  bestUse, fluidBedDryTypes,
} from "../fluid-bed-dry-calc.js";

describe("uniformity", () => {
  it("continuous vibrating most uniform", () => {
    expect(uniformity("continuous_vibrating")).toBeGreaterThan(uniformity("spouted_bed_coarse"));
  });
});

describe("throughput", () => {
  it("continuous vibrating highest throughput", () => {
    expect(throughput("continuous_vibrating")).toBeGreaterThan(throughput("batch_static_bed"));
  });
});

describe("heatTransfer", () => {
  it("inert carrier best heat transfer", () => {
    expect(heatTransfer("inert_carrier_paste")).toBeGreaterThan(heatTransfer("pulsed_intermittent"));
  });
});

describe("gentleness", () => {
  it("pulsed intermittent gentlest", () => {
    expect(gentleness("pulsed_intermittent")).toBeGreaterThan(gentleness("spouted_bed_coarse"));
  });
});

describe("fbCost", () => {
  it("inert carrier most expensive", () => {
    expect(fbCost("inert_carrier_paste")).toBeGreaterThan(fbCost("batch_static_bed"));
  });
});

describe("continuous", () => {
  it("continuous vibrating is continuous", () => {
    expect(continuous("continuous_vibrating")).toBe(true);
  });
  it("batch static not continuous", () => {
    expect(continuous("batch_static_bed")).toBe(false);
  });
});

describe("forPharma", () => {
  it("batch static for pharma", () => {
    expect(forPharma("batch_static_bed")).toBe(true);
  });
  it("continuous vibrating not for pharma", () => {
    expect(forPharma("continuous_vibrating")).toBe(false);
  });
});

describe("gasFlow", () => {
  it("spouted bed uses central spout jet", () => {
    expect(gasFlow("spouted_bed_coarse")).toBe("central_spout_jet_annular_return");
  });
});

describe("bestUse", () => {
  it("inert carrier for slurry paste sludge", () => {
    expect(bestUse("inert_carrier_paste")).toBe("slurry_paste_sludge_sticky_feed");
  });
});

describe("fluidBedDryTypes", () => {
  it("returns 5 types", () => {
    expect(fluidBedDryTypes()).toHaveLength(5);
  });
});

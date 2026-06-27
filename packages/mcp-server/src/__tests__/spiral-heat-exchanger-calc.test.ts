import { describe, it, expect } from "vitest";
import {
  heatTransfer, selfCleaning, compactness, foulingResist,
  shCost, singleChannel, forSlurry, flowPattern,
  bestUse, spiralHeatExchangerTypes,
} from "../spiral-heat-exchanger-calc.js";

describe("heatTransfer", () => {
  it("micro spiral best heat transfer", () => {
    expect(heatTransfer("micro_spiral_compact")).toBeGreaterThan(heatTransfer("type_iii_spiral_coil"));
  });
});

describe("selfCleaning", () => {
  it("welded spiral best self cleaning", () => {
    expect(selfCleaning("welded_spiral_plate")).toBeGreaterThan(selfCleaning("micro_spiral_compact"));
  });
});

describe("compactness", () => {
  it("micro spiral most compact", () => {
    expect(compactness("micro_spiral_compact")).toBeGreaterThan(compactness("type_iii_spiral_coil"));
  });
});

describe("foulingResist", () => {
  it("welded spiral best fouling resistance", () => {
    expect(foulingResist("welded_spiral_plate")).toBeGreaterThan(foulingResist("micro_spiral_compact"));
  });
});

describe("shCost", () => {
  it("micro spiral most expensive", () => {
    expect(shCost("micro_spiral_compact")).toBeGreaterThan(shCost("type_iii_spiral_coil"));
  });
});

describe("singleChannel", () => {
  it("type i is single channel", () => {
    expect(singleChannel("type_i_both_spiral")).toBe(true);
  });
  it("type ii not single channel", () => {
    expect(singleChannel("type_ii_spiral_cross")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("welded spiral for slurry", () => {
    expect(forSlurry("welded_spiral_plate")).toBe(true);
  });
  it("micro spiral not for slurry", () => {
    expect(forSlurry("micro_spiral_compact")).toBe(false);
  });
});

describe("flowPattern", () => {
  it("type i uses counter current spiral", () => {
    expect(flowPattern("type_i_both_spiral")).toBe("counter_current_both_channels_spiral_flow");
  });
});

describe("bestUse", () => {
  it("welded spiral for wastewater", () => {
    expect(bestUse("welded_spiral_plate")).toBe("wastewater_treatment_digestate_heavy_slurry");
  });
});

describe("spiralHeatExchangerTypes", () => {
  it("returns 5 types", () => {
    expect(spiralHeatExchangerTypes()).toHaveLength(5);
  });
});

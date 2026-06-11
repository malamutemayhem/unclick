import { describe, it, expect } from "vitest";
import {
  removalEfficiency, throughput, bubbleSize, sludgeConcentration,
  dafCost, pressurized, forOilRemoval, flotationConfig,
  bestUse, dissolvedAirTypes,
} from "../dissolved-air-calc.js";

describe("removalEfficiency", () => {
  it("nano bubble best removal efficiency", () => {
    expect(removalEfficiency("nano_bubble_daf")).toBeGreaterThan(removalEfficiency("induced_air_daf"));
  });
});

describe("throughput", () => {
  it("induced air highest throughput", () => {
    expect(throughput("induced_air_daf")).toBeGreaterThan(throughput("nano_bubble_daf"));
  });
});

describe("bubbleSize", () => {
  it("nano bubble best bubble size", () => {
    expect(bubbleSize("nano_bubble_daf")).toBeGreaterThan(bubbleSize("induced_air_daf"));
  });
});

describe("sludgeConcentration", () => {
  it("nano bubble best sludge concentration", () => {
    expect(sludgeConcentration("nano_bubble_daf")).toBeGreaterThan(sludgeConcentration("induced_air_daf"));
  });
});

describe("dafCost", () => {
  it("nano bubble most expensive", () => {
    expect(dafCost("nano_bubble_daf")).toBeGreaterThan(dafCost("induced_air_daf"));
  });
});

describe("pressurized", () => {
  it("recycle flow is pressurized", () => {
    expect(pressurized("recycle_flow_daf")).toBe(true);
  });
  it("induced air not pressurized", () => {
    expect(pressurized("induced_air_daf")).toBe(false);
  });
});

describe("forOilRemoval", () => {
  it("induced air for oil removal", () => {
    expect(forOilRemoval("induced_air_daf")).toBe(true);
  });
  it("nano bubble not for oil removal", () => {
    expect(forOilRemoval("nano_bubble_daf")).toBe(false);
  });
});

describe("flotationConfig", () => {
  it("recycle flow uses pressurize clarified recycle gentle no floc break", () => {
    expect(flotationConfig("recycle_flow_daf")).toBe("recycle_flow_daf_pressurize_clarified_recycle_gentle_no_floc_break");
  });
});

describe("bestUse", () => {
  it("nano bubble for algae harvest sub micron high surface area attach", () => {
    expect(bestUse("nano_bubble_daf")).toBe("algae_harvest_nano_bubble_daf_sub_micron_high_surface_area_attach");
  });
});

describe("dissolvedAirTypes", () => {
  it("returns 5 types", () => {
    expect(dissolvedAirTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  removalRate, throughput, energyEfficiency, bubbleSize,
  dafCost, pressurized, forOilRemoval, process,
  bestUse, dissolvedAirFlotationTypes,
} from "../dissolved-air-flotation-calc.js";

describe("removalRate", () => {
  it("recycle flow highest removal rate", () => {
    expect(removalRate("recycle_flow")).toBeGreaterThan(removalRate("induced_air"));
  });
});

describe("throughput", () => {
  it("induced air highest throughput", () => {
    expect(throughput("induced_air")).toBeGreaterThan(throughput("dissolved_nitrogen"));
  });
});

describe("energyEfficiency", () => {
  it("induced air most energy efficient", () => {
    expect(energyEfficiency("induced_air")).toBeGreaterThan(energyEfficiency("full_flow_pressurized"));
  });
});

describe("bubbleSize", () => {
  it("dissolved nitrogen finest bubbles", () => {
    expect(bubbleSize("dissolved_nitrogen")).toBeGreaterThan(bubbleSize("induced_air"));
  });
});

describe("dafCost", () => {
  it("dissolved nitrogen most expensive", () => {
    expect(dafCost("dissolved_nitrogen")).toBeGreaterThan(dafCost("induced_air"));
  });
});

describe("pressurized", () => {
  it("recycle flow is pressurized", () => {
    expect(pressurized("recycle_flow")).toBe(true);
  });
  it("induced air not pressurized", () => {
    expect(pressurized("induced_air")).toBe(false);
  });
});

describe("forOilRemoval", () => {
  it("induced air for oil removal", () => {
    expect(forOilRemoval("induced_air")).toBe(true);
  });
  it("dissolved nitrogen not for oil removal", () => {
    expect(forOilRemoval("dissolved_nitrogen")).toBe(false);
  });
});

describe("process", () => {
  it("recycle flow uses treated effluent recycle", () => {
    expect(process("recycle_flow")).toBe("treated_effluent_recycle_pressurize_clean_water_saturation");
  });
});

describe("bestUse", () => {
  it("induced air for oilfield produced water", () => {
    expect(bestUse("induced_air")).toBe("oilfield_produced_water_refinery_simple_oil_skim_removal");
  });
});

describe("dissolvedAirFlotationTypes", () => {
  it("returns 5 types", () => {
    expect(dissolvedAirFlotationTypes()).toHaveLength(5);
  });
});

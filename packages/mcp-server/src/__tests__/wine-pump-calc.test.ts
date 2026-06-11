import { describe, it, expect } from "vitest";
import {
  gentleness, flowRate, selfPriming, cleanability,
  wpCost_, canRunDry, forMust, pumpConfig,
  bestUse, winePumpTypes,
} from "../wine-pump-calc.js";

describe("gentleness", () => {
  it("peristaltic hose gentlest", () => {
    expect(gentleness("peristaltic_hose")).toBeGreaterThan(gentleness("centrifugal_sanitary"));
  });
});

describe("flowRate", () => {
  it("centrifugal sanitary highest flow rate", () => {
    expect(flowRate("centrifugal_sanitary")).toBeGreaterThan(flowRate("peristaltic_hose"));
  });
});

describe("selfPriming", () => {
  it("peristaltic hose best self priming", () => {
    expect(selfPriming("peristaltic_hose")).toBeGreaterThan(selfPriming("centrifugal_sanitary"));
  });
});

describe("cleanability", () => {
  it("centrifugal sanitary best cleanability", () => {
    expect(cleanability("centrifugal_sanitary")).toBeGreaterThan(cleanability("progressive_cavity"));
  });
});

describe("wpCost_", () => {
  it("lobe rotary most expensive", () => {
    expect(wpCost_("lobe_rotary")).toBeGreaterThan(wpCost_("diaphragm_air"));
  });
});

describe("canRunDry", () => {
  it("peristaltic hose can run dry", () => {
    expect(canRunDry("peristaltic_hose")).toBe(true);
  });
  it("centrifugal sanitary cannot run dry", () => {
    expect(canRunDry("centrifugal_sanitary")).toBe(false);
  });
});

describe("forMust", () => {
  it("progressive cavity for must", () => {
    expect(forMust("progressive_cavity")).toBe(true);
  });
  it("centrifugal sanitary not for must", () => {
    expect(forMust("centrifugal_sanitary")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("diaphragm air uses double membrane pulse flow", () => {
    expect(pumpConfig("diaphragm_air")).toBe("diaphragm_air_operated_wine_pump_double_membrane_pulse_flow_safe");
  });
});

describe("bestUse", () => {
  it("lobe rotary for automated winery precise flow", () => {
    expect(bestUse("lobe_rotary")).toBe("automated_winery_lobe_rotary_pump_precise_flow_metering_dosing");
  });
});

describe("winePumpTypes", () => {
  it("returns 5 types", () => {
    expect(winePumpTypes()).toHaveLength(5);
  });
});

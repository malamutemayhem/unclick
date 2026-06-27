import { describe, it, expect } from "vitest";
import {
  flow, combustion, cooling, compactness,
  chCost, multiValve, forPerformance, chamber,
  bestUse, cylinderHeadTypes,
} from "../cylinder-head-type-calc.js";

describe("flow", () => {
  it("pentroof best flow", () => {
    expect(flow("pentroof_four_valve_dohc")).toBeGreaterThan(flow("flathead_sidevalve_l"));
  });
});

describe("combustion", () => {
  it("pentroof best combustion", () => {
    expect(combustion("pentroof_four_valve_dohc")).toBeGreaterThan(combustion("flathead_sidevalve_l"));
  });
});

describe("cooling", () => {
  it("crossflow best cooling", () => {
    expect(cooling("crossflow_intake_exhaust_opp")).toBeGreaterThan(cooling("flathead_sidevalve_l"));
  });
});

describe("compactness", () => {
  it("flathead most compact", () => {
    expect(compactness("flathead_sidevalve_l")).toBeGreaterThan(compactness("hemispherical_hemi_dome"));
  });
});

describe("chCost", () => {
  it("pentroof most expensive", () => {
    expect(chCost("pentroof_four_valve_dohc")).toBeGreaterThan(chCost("flathead_sidevalve_l"));
  });
});

describe("multiValve", () => {
  it("pentroof is multi valve", () => {
    expect(multiValve("pentroof_four_valve_dohc")).toBe(true);
  });
  it("hemi not multi valve", () => {
    expect(multiValve("hemispherical_hemi_dome")).toBe(false);
  });
});

describe("forPerformance", () => {
  it("hemi for performance", () => {
    expect(forPerformance("hemispherical_hemi_dome")).toBe(true);
  });
  it("flathead not for performance", () => {
    expect(forPerformance("flathead_sidevalve_l")).toBe(false);
  });
});

describe("chamber", () => {
  it("pentroof uses pent roof central spark", () => {
    expect(chamber("pentroof_four_valve_dohc")).toBe("pent_roof_central_spark_4valve");
  });
});

describe("bestUse", () => {
  it("flathead for vintage engine", () => {
    expect(bestUse("flathead_sidevalve_l")).toBe("vintage_engine_simple_low_cost");
  });
});

describe("cylinderHeadTypes", () => {
  it("returns 5 types", () => {
    expect(cylinderHeadTypes()).toHaveLength(5);
  });
});

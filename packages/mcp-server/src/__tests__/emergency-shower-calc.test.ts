import { describe, it, expect } from "vitest";
import {
  flowRate, activationSpeed, coverageArea, waterTemperature,
  esCost, plumbed, forAcidSplash, delivery,
  bestUse, emergencyShowerTypes,
} from "../emergency-shower-calc.js";

describe("flowRate", () => {
  it("combination drench and freeze protected highest flow", () => {
    expect(flowRate("combination_drench")).toBeGreaterThan(flowRate("drench_hose"));
    expect(flowRate("freeze_protected_heated")).toBeGreaterThan(flowRate("drench_hose"));
  });
});

describe("activationSpeed", () => {
  it("eyewash pedestal fastest activation", () => {
    expect(activationSpeed("eyewash_pedestal")).toBeGreaterThan(activationSpeed("drench_hose"));
  });
});

describe("coverageArea", () => {
  it("combination drench widest coverage", () => {
    expect(coverageArea("combination_drench")).toBeGreaterThan(coverageArea("eyewash_pedestal"));
  });
});

describe("waterTemperature", () => {
  it("freeze protected heated best temperature control", () => {
    expect(waterTemperature("freeze_protected_heated")).toBeGreaterThan(waterTemperature("combination_drench"));
  });
});

describe("esCost", () => {
  it("freeze protected heated most expensive", () => {
    expect(esCost("freeze_protected_heated")).toBeGreaterThan(esCost("drench_hose"));
  });
});

describe("plumbed", () => {
  it("combination drench is plumbed", () => {
    expect(plumbed("combination_drench")).toBe(true);
  });
  it("recirculating eyewash not plumbed", () => {
    expect(plumbed("recirculating_eyewash")).toBe(false);
  });
});

describe("forAcidSplash", () => {
  it("eyewash pedestal for acid splash", () => {
    expect(forAcidSplash("eyewash_pedestal")).toBe(true);
  });
  it("recirculating eyewash not for acid splash", () => {
    expect(forAcidSplash("recirculating_eyewash")).toBe(false);
  });
});

describe("delivery", () => {
  it("recirculating uses sealed tank", () => {
    expect(delivery("recirculating_eyewash")).toBe("sealed_tank_tempered_fluid_battery_powered_pump_portable");
  });
});

describe("bestUse", () => {
  it("freeze protected heated for outdoor cold climate", () => {
    expect(bestUse("freeze_protected_heated")).toBe("outdoor_plant_cold_climate_mining_refinery_freeze_protect");
  });
});

describe("emergencyShowerTypes", () => {
  it("returns 5 types", () => {
    expect(emergencyShowerTypes()).toHaveLength(5);
  });
});

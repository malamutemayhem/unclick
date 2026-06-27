import { describe, it, expect } from "vitest";
import {
  flowRate, filterLifespan, packSize, groupCapacity,
  filterCost, removesViruses, needsBattery, mechanism,
  bestScenario, waterFilters,
} from "../water-filter-calc.js";

describe("flowRate", () => {
  it("uv purifier fastest flow rate", () => {
    expect(flowRate("uv_purifier")).toBeGreaterThan(flowRate("straw_personal"));
  });
});

describe("filterLifespan", () => {
  it("pump mechanical longest lifespan", () => {
    expect(filterLifespan("pump_mechanical")).toBeGreaterThan(filterLifespan("uv_purifier"));
  });
});

describe("packSize", () => {
  it("straw personal smallest pack size", () => {
    expect(packSize("straw_personal")).toBeGreaterThan(packSize("pump_mechanical"));
  });
});

describe("groupCapacity", () => {
  it("gravity bag best group capacity", () => {
    expect(groupCapacity("gravity_bag")).toBeGreaterThan(groupCapacity("straw_personal"));
  });
});

describe("filterCost", () => {
  it("uv purifier most expensive", () => {
    expect(filterCost("uv_purifier")).toBeGreaterThan(filterCost("straw_personal"));
  });
});

describe("removesViruses", () => {
  it("uv purifier removes viruses", () => {
    expect(removesViruses("uv_purifier")).toBe(true);
  });
  it("pump mechanical does not", () => {
    expect(removesViruses("pump_mechanical")).toBe(false);
  });
});

describe("needsBattery", () => {
  it("uv purifier needs battery", () => {
    expect(needsBattery("uv_purifier")).toBe(true);
  });
  it("gravity bag does not", () => {
    expect(needsBattery("gravity_bag")).toBe(false);
  });
});

describe("mechanism", () => {
  it("uv purifier uses ultraviolet light sterilize", () => {
    expect(mechanism("uv_purifier")).toBe("ultraviolet_light_sterilize");
  });
});

describe("bestScenario", () => {
  it("gravity bag for group camp hands free", () => {
    expect(bestScenario("gravity_bag")).toBe("group_camp_hands_free");
  });
});

describe("waterFilters", () => {
  it("returns 5 types", () => {
    expect(waterFilters()).toHaveLength(5);
  });
});

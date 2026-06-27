import { describe, it, expect } from "vitest";
import {
  dryness, throughput, automation, washability,
  fpCost, continuous, forMining, mechanism,
  bestUse, filterPressTypes,
} from "../filter-press-calc.js";

describe("dryness", () => {
  it("membrane squeeze driest cake", () => {
    expect(dryness("membrane_squeeze_high")).toBeGreaterThan(dryness("belt_filter_continuous"));
  });
});

describe("throughput", () => {
  it("belt filter highest throughput", () => {
    expect(throughput("belt_filter_continuous")).toBeGreaterThan(throughput("plate_frame_polypropylene"));
  });
});

describe("automation", () => {
  it("tower press most automated", () => {
    expect(automation("tower_press_automatic")).toBeGreaterThan(automation("plate_frame_polypropylene"));
  });
});

describe("washability", () => {
  it("plate frame best washability", () => {
    expect(washability("plate_frame_polypropylene")).toBeGreaterThan(washability("belt_filter_continuous"));
  });
});

describe("fpCost", () => {
  it("tower press most expensive", () => {
    expect(fpCost("tower_press_automatic")).toBeGreaterThan(fpCost("plate_frame_polypropylene"));
  });
});

describe("continuous", () => {
  it("belt filter is continuous", () => {
    expect(continuous("belt_filter_continuous")).toBe(true);
  });
  it("recessed plate not continuous", () => {
    expect(continuous("recessed_plate_standard")).toBe(false);
  });
});

describe("forMining", () => {
  it("recessed plate for mining", () => {
    expect(forMining("recessed_plate_standard")).toBe(true);
  });
  it("plate frame not for mining", () => {
    expect(forMining("plate_frame_polypropylene")).toBe(false);
  });
});

describe("mechanism", () => {
  it("membrane uses diaphragm air squeeze", () => {
    expect(mechanism("membrane_squeeze_high")).toBe("membrane_diaphragm_air_squeeze");
  });
});

describe("bestUse", () => {
  it("belt filter for wastewater sludge", () => {
    expect(bestUse("belt_filter_continuous")).toBe("wastewater_sludge_continuous_flow");
  });
});

describe("filterPressTypes", () => {
  it("returns 5 types", () => {
    expect(filterPressTypes()).toHaveLength(5);
  });
});

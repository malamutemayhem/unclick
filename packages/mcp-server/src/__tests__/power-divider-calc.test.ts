import { describe, it, expect } from "vitest";
import {
  bandwidth, isolation, insertionLoss, powerHandling,
  divCost, equalSplit, forArray, topology,
  bestUse, powerDividers,
} from "../power-divider-calc.js";

describe("bandwidth", () => {
  it("resistive broadband widest bandwidth", () => {
    expect(bandwidth("resistive_broadband")).toBeGreaterThan(bandwidth("branchline_90deg"));
  });
});

describe("isolation", () => {
  it("wilkinson 2way best isolation", () => {
    expect(isolation("wilkinson_2way")).toBeGreaterThan(isolation("resistive_broadband"));
  });
});

describe("insertionLoss", () => {
  it("wilkinson 2way lowest insertion loss", () => {
    expect(insertionLoss("wilkinson_2way")).toBeGreaterThan(insertionLoss("resistive_broadband"));
  });
});

describe("powerHandling", () => {
  it("gysel high power best power handling", () => {
    expect(powerHandling("gysel_high_power")).toBeGreaterThan(powerHandling("resistive_broadband"));
  });
});

describe("divCost", () => {
  it("gysel high power most expensive", () => {
    expect(divCost("gysel_high_power")).toBeGreaterThan(divCost("resistive_broadband"));
  });
});

describe("equalSplit", () => {
  it("wilkinson 2way is equal split", () => {
    expect(equalSplit("wilkinson_2way")).toBe(true);
  });
});

describe("forArray", () => {
  it("wilkinson 2way is for array", () => {
    expect(forArray("wilkinson_2way")).toBe(true);
  });
  it("gysel high power not for array", () => {
    expect(forArray("gysel_high_power")).toBe(false);
  });
});

describe("topology", () => {
  it("wilkinson 2way uses quarter wave resistor", () => {
    expect(topology("wilkinson_2way")).toBe("quarter_wave_resistor");
  });
});

describe("bestUse", () => {
  it("gysel high power best for base station combiner", () => {
    expect(bestUse("gysel_high_power")).toBe("base_station_combiner");
  });
});

describe("powerDividers", () => {
  it("returns 5 types", () => {
    expect(powerDividers()).toHaveLength(5);
  });
});

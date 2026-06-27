import { describe, it, expect } from "vitest";
import {
  neckSupport, packability, breathability, privacyFactor,
  pillowCost, machineWash, adjustFirmness, fillMaterial,
  bestTravel, travelPillows,
} from "../travel-pillow-calc.js";

describe("neckSupport", () => {
  it("chin support j best neck support", () => {
    expect(neckSupport("chin_support_j")).toBeGreaterThan(neckSupport("scarf_wrap"));
  });
});

describe("packability", () => {
  it("inflatable compact most packable", () => {
    expect(packability("inflatable_compact")).toBeGreaterThan(packability("memory_foam_u"));
  });
});

describe("breathability", () => {
  it("scarf wrap most breathable", () => {
    expect(breathability("scarf_wrap")).toBeGreaterThan(breathability("hooded_privacy"));
  });
});

describe("privacyFactor", () => {
  it("hooded privacy highest privacy", () => {
    expect(privacyFactor("hooded_privacy")).toBeGreaterThan(privacyFactor("memory_foam_u"));
  });
});

describe("pillowCost", () => {
  it("chin support j most expensive", () => {
    expect(pillowCost("chin_support_j")).toBeGreaterThan(pillowCost("inflatable_compact"));
  });
});

describe("machineWash", () => {
  it("scarf wrap is machine washable", () => {
    expect(machineWash("scarf_wrap")).toBe(true);
  });
  it("memory foam u is not", () => {
    expect(machineWash("memory_foam_u")).toBe(false);
  });
});

describe("adjustFirmness", () => {
  it("inflatable compact adjusts firmness", () => {
    expect(adjustFirmness("inflatable_compact")).toBe(true);
  });
  it("memory foam u does not", () => {
    expect(adjustFirmness("memory_foam_u")).toBe(false);
  });
});

describe("fillMaterial", () => {
  it("hooded privacy uses memory foam hood combo", () => {
    expect(fillMaterial("hooded_privacy")).toBe("memory_foam_hood_combo");
  });
});

describe("bestTravel", () => {
  it("inflatable compact for backpacking light travel", () => {
    expect(bestTravel("inflatable_compact")).toBe("backpacking_light_travel");
  });
});

describe("travelPillows", () => {
  it("returns 5 types", () => {
    expect(travelPillows()).toHaveLength(5);
  });
});

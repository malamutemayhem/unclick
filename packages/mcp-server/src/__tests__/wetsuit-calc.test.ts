import { describe, it, expect } from "vitest";
import {
  warmth, flexibility, entryEase, dryTime,
  suitCost, sealedSeams, builtInHood, neopreneTech,
  bestWater, wetsuits,
} from "../wetsuit-calc.js";

describe("warmth", () => {
  it("hooded 5 4 warmest", () => {
    expect(warmth("hooded_5_4")).toBeGreaterThan(warmth("spring_suit_2mm"));
  });
});

describe("flexibility", () => {
  it("spring suit 2mm most flexible", () => {
    expect(flexibility("spring_suit_2mm")).toBeGreaterThan(flexibility("drysuit_sealed"));
  });
});

describe("entryEase", () => {
  it("spring suit 2mm easiest entry", () => {
    expect(entryEase("spring_suit_2mm")).toBeGreaterThan(entryEase("hooded_5_4"));
  });
});

describe("dryTime", () => {
  it("spring suit 2mm dries fastest", () => {
    expect(dryTime("spring_suit_2mm")).toBeGreaterThan(dryTime("hooded_5_4"));
  });
});

describe("suitCost", () => {
  it("drysuit sealed most expensive", () => {
    expect(suitCost("drysuit_sealed")).toBeGreaterThan(suitCost("spring_suit_2mm"));
  });
});

describe("sealedSeams", () => {
  it("full suit 3 2 has sealed seams", () => {
    expect(sealedSeams("full_suit_3_2")).toBe(true);
  });
  it("spring suit 2mm does not", () => {
    expect(sealedSeams("spring_suit_2mm")).toBe(false);
  });
});

describe("builtInHood", () => {
  it("hooded 5 4 has built in hood", () => {
    expect(builtInHood("hooded_5_4")).toBe(true);
  });
  it("full suit 3 2 does not", () => {
    expect(builtInHood("full_suit_3_2")).toBe(false);
  });
});

describe("neopreneTech", () => {
  it("hooded 5 4 uses thermal lined fireline", () => {
    expect(neopreneTech("hooded_5_4")).toBe("thermal_lined_fireline");
  });
});

describe("bestWater", () => {
  it("drysuit sealed for ice water rescue", () => {
    expect(bestWater("drysuit_sealed")).toBe("ice_water_rescue");
  });
});

describe("wetsuits", () => {
  it("returns 5 types", () => {
    expect(wetsuits()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  vesselVolume, headspace, idealHeadspace, airlockBubbles,
  temperatureControl, cleaningVolume, sanitizerAmount,
  oxygenExposure, rackingLoss, samplingVolume, weightFull,
  stackable, vesselTypes,
} from "../fermentation-vessel.js";

describe("vesselVolume", () => {
  it("barrel is 225L", () => {
    expect(vesselVolume("barrel")).toBe(225);
  });
  it("carboy is 23L", () => {
    expect(vesselVolume("carboy")).toBe(23);
  });
});

describe("headspace", () => {
  it("20L in 25L = 20%", () => {
    expect(headspace(20, 25)).toBe(20);
  });
});

describe("idealHeadspace", () => {
  it("primary = 25%", () => {
    expect(idealHeadspace("primary")).toBe(25);
  });
  it("secondary = 5%", () => {
    expect(idealHeadspace("secondary")).toBe(5);
  });
});

describe("airlockBubbles", () => {
  it("peak on peak day", () => {
    expect(airlockBubbles(3, 3)).toBe(60);
  });
  it("fewer before peak", () => {
    expect(airlockBubbles(0, 3)).toBeLessThan(airlockBubbles(3, 3));
  });
});

describe("temperatureControl", () => {
  it("stainless is excellent", () => {
    expect(temperatureControl("stainless")).toContain("excellent");
  });
  it("plastic is fair", () => {
    expect(temperatureControl("plastic")).toContain("fair");
  });
});

describe("cleaningVolume", () => {
  it("10% of vessel", () => {
    expect(cleaningVolume(25)).toBe(2.5);
  });
});

describe("sanitizerAmount", () => {
  it("positive ml", () => {
    expect(sanitizerAmount(25)).toBeGreaterThan(0);
  });
});

describe("oxygenExposure", () => {
  it("glass is none", () => {
    expect(oxygenExposure("glass")).toBe("none");
  });
  it("oak is micro-oxygenation", () => {
    expect(oxygenExposure("oak")).toBe("micro-oxygenation");
  });
});

describe("rackingLoss", () => {
  it("more rackings = more loss", () => {
    expect(rackingLoss(25, 3)).toBeGreaterThan(rackingLoss(25, 1));
  });
});

describe("samplingVolume", () => {
  it("positive liters", () => {
    expect(samplingVolume(10)).toBeGreaterThan(0);
  });
});

describe("weightFull", () => {
  it("heavier than empty", () => {
    expect(weightFull(25, 5)).toBeGreaterThan(5);
  });
});

describe("stackable", () => {
  it("bucket is stackable", () => {
    expect(stackable("bucket")).toBe(true);
  });
  it("carboy is not stackable", () => {
    expect(stackable("carboy")).toBe(false);
  });
});

describe("vesselTypes", () => {
  it("returns 6 types", () => {
    expect(vesselTypes()).toHaveLength(6);
  });
});

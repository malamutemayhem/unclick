import { describe, it, expect } from "vitest";
import {
  sensitivity, noiseRejection, frequencyResponse, durabilityScore,
  micCost, needsPhantomPower, selfPowered, polarPattern,
  bestUse, micTypes,
} from "../mic-type-calc.js";

describe("sensitivity", () => {
  it("large diaphragm condenser most sensitive", () => {
    expect(sensitivity("large_diaphragm_condenser")).toBeGreaterThan(sensitivity("dynamic_cardioid"));
  });
});

describe("noiseRejection", () => {
  it("dynamic cardioid best noise rejection", () => {
    expect(noiseRejection("dynamic_cardioid")).toBeGreaterThan(noiseRejection("ribbon_bidirectional"));
  });
});

describe("frequencyResponse", () => {
  it("large diaphragm condenser widest frequency response", () => {
    expect(frequencyResponse("large_diaphragm_condenser")).toBeGreaterThan(frequencyResponse("usb_desktop"));
  });
});

describe("durabilityScore", () => {
  it("dynamic cardioid most durable", () => {
    expect(durabilityScore("dynamic_cardioid")).toBeGreaterThan(durabilityScore("ribbon_bidirectional"));
  });
});

describe("micCost", () => {
  it("ribbon bidirectional most expensive", () => {
    expect(micCost("ribbon_bidirectional")).toBeGreaterThan(micCost("usb_desktop"));
  });
});

describe("needsPhantomPower", () => {
  it("large diaphragm condenser needs phantom power", () => {
    expect(needsPhantomPower("large_diaphragm_condenser")).toBe(true);
  });
  it("dynamic cardioid does not", () => {
    expect(needsPhantomPower("dynamic_cardioid")).toBe(false);
  });
});

describe("selfPowered", () => {
  it("usb desktop is self powered", () => {
    expect(selfPowered("usb_desktop")).toBe(true);
  });
  it("dynamic cardioid is not", () => {
    expect(selfPowered("dynamic_cardioid")).toBe(false);
  });
});

describe("polarPattern", () => {
  it("ribbon bidirectional uses figure eight natural", () => {
    expect(polarPattern("ribbon_bidirectional")).toBe("figure_eight_natural");
  });
});

describe("bestUse", () => {
  it("usb desktop for podcast streaming video call", () => {
    expect(bestUse("usb_desktop")).toBe("podcast_streaming_video_call");
  });
});

describe("micTypes", () => {
  it("returns 5 types", () => {
    expect(micTypes()).toHaveLength(5);
  });
});

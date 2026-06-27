import { describe, it, expect } from "vitest";
import {
  sensitivity, bandwidth, darkCurrent, dynamicRange,
  detectorCost, internalGain, forTelecom, spectralRange,
  bestUse, photodetectorTypes,
} from "../photodetector-type-calc.js";

describe("sensitivity", () => {
  it("mppc sipm most sensitive", () => {
    expect(sensitivity("mppc_sipm")).toBeGreaterThan(sensitivity("pin_silicon"));
  });
});

describe("bandwidth", () => {
  it("ingaas swir highest bandwidth", () => {
    expect(bandwidth("ingaas_swir")).toBeGreaterThan(bandwidth("photomultiplier_tube"));
  });
});

describe("darkCurrent", () => {
  it("pin silicon lowest dark current", () => {
    expect(darkCurrent("pin_silicon")).toBeGreaterThan(darkCurrent("mppc_sipm"));
  });
});

describe("dynamicRange", () => {
  it("photomultiplier tube best dynamic range", () => {
    expect(dynamicRange("photomultiplier_tube")).toBeGreaterThan(dynamicRange("mppc_sipm"));
  });
});

describe("detectorCost", () => {
  it("photomultiplier tube most expensive", () => {
    expect(detectorCost("photomultiplier_tube")).toBeGreaterThan(detectorCost("pin_silicon"));
  });
});

describe("internalGain", () => {
  it("apd avalanche has internal gain", () => {
    expect(internalGain("apd_avalanche")).toBe(true);
  });
  it("pin silicon no internal gain", () => {
    expect(internalGain("pin_silicon")).toBe(false);
  });
});

describe("forTelecom", () => {
  it("apd avalanche is for telecom", () => {
    expect(forTelecom("apd_avalanche")).toBe(true);
  });
  it("mppc sipm not for telecom", () => {
    expect(forTelecom("mppc_sipm")).toBe(false);
  });
});

describe("spectralRange", () => {
  it("ingaas swir uses swir 900 2600nm", () => {
    expect(spectralRange("ingaas_swir")).toBe("swir_900_2600nm");
  });
});

describe("bestUse", () => {
  it("mppc sipm best for pet scanner scintillator", () => {
    expect(bestUse("mppc_sipm")).toBe("pet_scanner_scintillator");
  });
});

describe("photodetectorTypes", () => {
  it("returns 5 types", () => {
    expect(photodetectorTypes()).toHaveLength(5);
  });
});

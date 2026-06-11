import { describe, it, expect } from "vitest";
import {
  responsivity, bandwidth, sensitivity, dynamicRange,
  pdCost, internalGain, forTelecom, material,
  bestUse, photodetectors,
} from "../photodetector-calc.js";

describe("responsivity", () => {
  it("spad single photon highest responsivity", () => {
    expect(responsivity("spad_single_photon")).toBeGreaterThan(responsivity("pin_silicon"));
  });
});

describe("bandwidth", () => {
  it("balanced coherent widest bandwidth", () => {
    expect(bandwidth("balanced_coherent")).toBeGreaterThan(bandwidth("spad_single_photon"));
  });
});

describe("sensitivity", () => {
  it("spad single photon most sensitive", () => {
    expect(sensitivity("spad_single_photon")).toBeGreaterThan(sensitivity("pin_silicon"));
  });
});

describe("dynamicRange", () => {
  it("pin silicon widest dynamic range", () => {
    expect(dynamicRange("pin_silicon")).toBeGreaterThan(dynamicRange("spad_single_photon"));
  });
});

describe("pdCost", () => {
  it("balanced coherent most expensive", () => {
    expect(pdCost("balanced_coherent")).toBeGreaterThan(pdCost("pin_silicon"));
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
  it("ingaas swir for telecom", () => {
    expect(forTelecom("ingaas_swir")).toBe(true);
  });
  it("spad single photon not for telecom", () => {
    expect(forTelecom("spad_single_photon")).toBe(false);
  });
});

describe("material", () => {
  it("spad single photon uses silicon geiger mode", () => {
    expect(material("spad_single_photon")).toBe("silicon_geiger_mode");
  });
});

describe("bestUse", () => {
  it("balanced coherent best for coherent qpsk detection", () => {
    expect(bestUse("balanced_coherent")).toBe("coherent_qpsk_detection");
  });
});

describe("photodetectors", () => {
  it("returns 5 types", () => {
    expect(photodetectors()).toHaveLength(5);
  });
});

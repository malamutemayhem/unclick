import { describe, it, expect } from "vitest";
import {
  radiusCm, areaCm2, glazingBarCount, glazingBarLengthCm,
  leadCameLengthCm, lightTransmission, paneCount,
  frameMaterialKg, uValueWPerM2K, restorationCost, fanlightPatterns,
} from "../fanlight-calc.js";

describe("radiusCm", () => {
  it("half of door width", () => {
    expect(radiusCm(100)).toBe(50);
  });
});

describe("areaCm2", () => {
  it("positive area", () => {
    expect(areaCm2(50)).toBeGreaterThan(0);
  });
});

describe("glazingBarCount", () => {
  it("spiderweb most", () => {
    expect(glazingBarCount("spiderweb")).toBeGreaterThan(glazingBarCount("gothic"));
  });
  it("plain = 0", () => {
    expect(glazingBarCount("plain")).toBe(0);
  });
});

describe("glazingBarLengthCm", () => {
  it("positive length", () => {
    expect(glazingBarLengthCm(50, 13)).toBeGreaterThan(0);
  });
});

describe("leadCameLengthCm", () => {
  it("positive length", () => {
    expect(leadCameLengthCm(157, 650)).toBeGreaterThan(0);
  });
});

describe("lightTransmission", () => {
  it("positive transmission", () => {
    expect(lightTransmission(3927, 10)).toBeGreaterThan(0);
  });
});

describe("paneCount", () => {
  it("spiderweb most panes", () => {
    expect(paneCount("spiderweb")).toBeGreaterThan(paneCount("plain"));
  });
});

describe("frameMaterialKg", () => {
  it("positive weight", () => {
    expect(frameMaterialKg(157, 0.05)).toBeGreaterThan(0);
  });
});

describe("uValueWPerM2K", () => {
  it("double glazed better", () => {
    expect(uValueWPerM2K(true)).toBeLessThan(uValueWPerM2K(false));
  });
});

describe("restorationCost", () => {
  it("positive cost", () => {
    expect(restorationCost(13, 50, 13, 30)).toBeGreaterThan(0);
  });
});

describe("fanlightPatterns", () => {
  it("returns 5 patterns", () => {
    expect(fanlightPatterns()).toHaveLength(5);
  });
});

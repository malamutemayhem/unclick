import { describe, it, expect } from "vitest";
import {
  bandwidth, maxDistance, durability, installEase,
  cableCost, singleMode, forOutdoor, coreType,
  bestUse, fiberOpticCables,
} from "../fiber-optic-cable-calc.js";

describe("bandwidth", () => {
  it("single mode os2 highest bandwidth", () => {
    expect(bandwidth("single_mode_os2")).toBeGreaterThan(bandwidth("plastic_optical_pof"));
  });
});

describe("maxDistance", () => {
  it("single mode os2 longest distance", () => {
    expect(maxDistance("single_mode_os2")).toBeGreaterThan(maxDistance("plastic_optical_pof"));
  });
});

describe("durability", () => {
  it("armored outdoor sm most durable", () => {
    expect(durability("armored_outdoor_sm")).toBeGreaterThan(durability("multimode_om3"));
  });
});

describe("installEase", () => {
  it("plastic optical pof easiest install", () => {
    expect(installEase("plastic_optical_pof")).toBeGreaterThan(installEase("armored_outdoor_sm"));
  });
});

describe("cableCost", () => {
  it("armored outdoor sm most expensive", () => {
    expect(cableCost("armored_outdoor_sm")).toBeGreaterThan(cableCost("plastic_optical_pof"));
  });
});

describe("singleMode", () => {
  it("single mode os2 is single mode", () => {
    expect(singleMode("single_mode_os2")).toBe(true);
  });
  it("multimode om3 not single mode", () => {
    expect(singleMode("multimode_om3")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("armored outdoor sm is for outdoor", () => {
    expect(forOutdoor("armored_outdoor_sm")).toBe(true);
  });
  it("single mode os2 not for outdoor", () => {
    expect(forOutdoor("single_mode_os2")).toBe(false);
  });
});

describe("coreType", () => {
  it("plastic optical pof uses 1mm pmma plastic", () => {
    expect(coreType("plastic_optical_pof")).toBe("1mm_pmma_plastic");
  });
});

describe("bestUse", () => {
  it("multimode om4 best for data center 40g link", () => {
    expect(bestUse("multimode_om4")).toBe("data_center_40g_link");
  });
});

describe("fiberOpticCables", () => {
  it("returns 5 types", () => {
    expect(fiberOpticCables()).toHaveLength(5);
  });
});

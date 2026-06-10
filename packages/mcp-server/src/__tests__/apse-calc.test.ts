import { describe, it, expect } from "vitest";
import {
  radiusM, floorAreaM2, wallLength, vaultHeight, windowCount,
  mosaicAreaM2, altarPositionM, acousticFocus, stoneVolumeM3,
  lightIntensity, apseShapes,
} from "../apse-calc.js";

describe("radiusM", () => {
  it("half of nave", () => {
    expect(radiusM(10)).toBe(5);
  });
});

describe("floorAreaM2", () => {
  it("trefoil largest", () => {
    expect(floorAreaM2(5, "trefoil")).toBeGreaterThan(floorAreaM2(5, "polygonal"));
  });
});

describe("wallLength", () => {
  it("trefoil longest", () => {
    expect(wallLength(5, "trefoil")).toBeGreaterThan(wallLength(5, "semicircular"));
  });
});

describe("vaultHeight", () => {
  it("positive height", () => {
    expect(vaultHeight(5)).toBeGreaterThan(0);
  });
});

describe("windowCount", () => {
  it("trefoil most", () => {
    expect(windowCount("trefoil")).toBeGreaterThan(windowCount("rectangular"));
  });
});

describe("mosaicAreaM2", () => {
  it("positive area", () => {
    expect(mosaicAreaM2(15.7, 8, 60)).toBeGreaterThan(0);
  });
});

describe("altarPositionM", () => {
  it("within apse", () => {
    expect(altarPositionM(5)).toBeLessThan(5);
  });
});

describe("acousticFocus", () => {
  it("half radius", () => {
    expect(acousticFocus(5)).toBe(2.5);
  });
});

describe("stoneVolumeM3", () => {
  it("positive volume", () => {
    expect(stoneVolumeM3(15.7, 8, 0.8)).toBeGreaterThan(0);
  });
});

describe("lightIntensity", () => {
  it("positive lux", () => {
    expect(lightIntensity(3, 2)).toBeGreaterThan(0);
  });
});

describe("apseShapes", () => {
  it("returns 5 shapes", () => {
    expect(apseShapes()).toHaveLength(5);
  });
});

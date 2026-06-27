import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, partLoad, noise,
  icCost, oilFree, forLargeScale, compressor,
  bestUse, industrialChillerTypes,
} from "../industrial-chiller-calc.js";

describe("efficiency", () => {
  it("magnetic bearing most efficient", () => {
    expect(efficiency("magnetic_bearing_oil_free")).toBeGreaterThan(efficiency("scroll_compressor_small"));
  });
});

describe("capacity", () => {
  it("centrifugal highest capacity", () => {
    expect(capacity("centrifugal_large_cap")).toBeGreaterThan(capacity("scroll_compressor_small"));
  });
});

describe("partLoad", () => {
  it("magnetic bearing best part load", () => {
    expect(partLoad("magnetic_bearing_oil_free")).toBeGreaterThan(partLoad("scroll_compressor_small"));
  });
});

describe("noise", () => {
  it("magnetic bearing quietest", () => {
    expect(noise("magnetic_bearing_oil_free")).toBeGreaterThan(noise("centrifugal_large_cap"));
  });
});

describe("icCost", () => {
  it("magnetic bearing most expensive", () => {
    expect(icCost("magnetic_bearing_oil_free")).toBeGreaterThan(icCost("scroll_compressor_small"));
  });
});

describe("oilFree", () => {
  it("magnetic bearing is oil free", () => {
    expect(oilFree("magnetic_bearing_oil_free")).toBe(true);
  });
  it("screw compressor not oil free", () => {
    expect(oilFree("screw_compressor_medium")).toBe(false);
  });
});

describe("forLargeScale", () => {
  it("centrifugal for large scale", () => {
    expect(forLargeScale("centrifugal_large_cap")).toBe(true);
  });
  it("scroll not for large scale", () => {
    expect(forLargeScale("scroll_compressor_small")).toBe(false);
  });
});

describe("compressor", () => {
  it("absorption uses lithium bromide", () => {
    expect(compressor("absorption_steam_fired")).toBe("lithium_bromide_absorption_no_compress");
  });
});

describe("bestUse", () => {
  it("magnetic bearing for pharma cleanroom", () => {
    expect(bestUse("magnetic_bearing_oil_free")).toBe("pharma_cleanroom_data_center_oil_free");
  });
});

describe("industrialChillerTypes", () => {
  it("returns 5 types", () => {
    expect(industrialChillerTypes()).toHaveLength(5);
  });
});

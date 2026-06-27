import { describe, it, expect } from "vitest";
import {
  deskCount, deskWidthCm, deskAngleDeg, floorAreaM2,
  windowAreaM2, lightLevelLux, inkWellCount, vellumStorageM3,
  heatingAllowed, annualVellumSheetsConsumed, scriptoriumLightSources,
} from "../scriptorium-calc.js";

describe("deskCount", () => {
  it("30% of monks", () => {
    expect(deskCount(30)).toBe(9);
  });
});

describe("deskWidthCm", () => {
  it("1.5x vellum width", () => {
    expect(deskWidthCm(40)).toBe(60);
  });
});

describe("deskAngleDeg", () => {
  it("writing steeper", () => {
    expect(deskAngleDeg("writing")).toBeGreaterThan(deskAngleDeg("illuminating"));
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(9)).toBeGreaterThan(8);
  });
});

describe("windowAreaM2", () => {
  it("20% of floor area", () => {
    expect(windowAreaM2(40)).toBe(8);
  });
});

describe("lightLevelLux", () => {
  it("skylight brightest", () => {
    expect(lightLevelLux("skylight")).toBeGreaterThan(lightLevelLux("candle_rack"));
  });
});

describe("inkWellCount", () => {
  it("2x desk count", () => {
    expect(inkWellCount(9)).toBe(18);
  });
});

describe("vellumStorageM3", () => {
  it("positive storage", () => {
    expect(vellumStorageM3(9)).toBeGreaterThan(0);
  });
});

describe("heatingAllowed", () => {
  it("always false", () => {
    expect(heatingAllowed()).toBe(false);
  });
});

describe("annualVellumSheetsConsumed", () => {
  it("positive consumption", () => {
    expect(annualVellumSheetsConsumed(9, 250)).toBeGreaterThan(0);
  });
});

describe("scriptoriumLightSources", () => {
  it("returns 5 sources", () => {
    expect(scriptoriumLightSources()).toHaveLength(5);
  });
});

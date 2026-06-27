import { describe, it, expect } from "vitest";
import {
  archArea, figureCount, reliefDepthMm, stoneWeightKg,
  carvingHours, paintCoats, goldLeafSheets, lintelStress,
  restorationHours, reliefDepths,
} from "../tympanum-calc.js";

describe("archArea", () => {
  it("positive m2", () => {
    expect(archArea(4, 2)).toBeGreaterThan(0);
  });
});

describe("figureCount", () => {
  it("positive count", () => {
    expect(figureCount(50000, "medium")).toBeGreaterThan(0);
  });
});

describe("reliefDepthMm", () => {
  it("freestanding deepest", () => {
    expect(reliefDepthMm("freestanding")).toBeGreaterThan(reliefDepthMm("low"));
  });
});

describe("stoneWeightKg", () => {
  it("positive kg", () => {
    expect(stoneWeightKg(10000, 40, 2.7)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("freestanding takes longest", () => {
    expect(carvingHours(5, "freestanding")).toBeGreaterThan(carvingHours(5, "low"));
  });
});

describe("paintCoats", () => {
  it("exterior more coats", () => {
    expect(paintCoats(true)).toBeGreaterThan(paintCoats(false));
  });
});

describe("goldLeafSheets", () => {
  it("positive sheets", () => {
    expect(goldLeafSheets(500)).toBeGreaterThan(0);
  });
});

describe("lintelStress", () => {
  it("positive stress", () => {
    expect(lintelStress(3, 500)).toBeGreaterThan(0);
  });
  it("zero span = 0", () => {
    expect(lintelStress(0, 500)).toBe(0);
  });
});

describe("restorationHours", () => {
  it("positive hours", () => {
    expect(restorationHours(10000, 30)).toBeGreaterThan(0);
  });
});

describe("reliefDepths", () => {
  it("returns 4 depths", () => {
    expect(reliefDepths()).toHaveLength(4);
  });
});

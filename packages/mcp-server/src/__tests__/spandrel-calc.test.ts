import { describe, it, expect } from "vitest";
import {
  areaCm2, panelThicknessCm, weightKg, decorationArea,
  carvingHours, loadTransferKn, crackRisk, ventHoleCount,
  paintCoats, restorationCostPerM2, spandrelDecors,
} from "../spandrel-calc.js";

describe("areaCm2", () => {
  it("positive area", () => {
    expect(areaCm2(200, 100)).toBeGreaterThan(0);
  });
});

describe("panelThicknessCm", () => {
  it("50% of wall", () => {
    expect(panelThicknessCm(40)).toBe(20);
  });
});

describe("weightKg", () => {
  it("positive weight", () => {
    expect(weightKg(5000, 20, 2.5)).toBeGreaterThan(0);
  });
});

describe("decorationArea", () => {
  it("positive area", () => {
    expect(decorationArea(5000, 80)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("sculpted longest", () => {
    expect(carvingHours(5000, "sculpted")).toBeGreaterThan(carvingHours(5000, "painted"));
  });
  it("plain = 0", () => {
    expect(carvingHours(5000, "plain")).toBe(0);
  });
});

describe("loadTransferKn", () => {
  it("positive force", () => {
    expect(loadTransferKn(50, 30)).toBeGreaterThan(0);
  });
});

describe("crackRisk", () => {
  it("positive risk", () => {
    expect(crackRisk(5, 200)).toBeGreaterThan(0);
  });
  it("zero span = 0", () => {
    expect(crackRisk(5, 0)).toBe(0);
  });
});

describe("ventHoleCount", () => {
  it("positive count for large area", () => {
    expect(ventHoleCount(15000)).toBeGreaterThan(0);
  });
});

describe("paintCoats", () => {
  it("exterior more coats", () => {
    expect(paintCoats("painted", true)).toBeGreaterThan(paintCoats("painted", false));
  });
  it("non-painted = 0", () => {
    expect(paintCoats("tracery", true)).toBe(0);
  });
});

describe("restorationCostPerM2", () => {
  it("sculpted most expensive", () => {
    expect(restorationCostPerM2("sculpted")).toBeGreaterThan(restorationCostPerM2("plain"));
  });
});

describe("spandrelDecors", () => {
  it("returns 5 decors", () => {
    expect(spandrelDecors()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  walkwayWidthM, totalPerimeterM, arcadeCount, columnCount,
  floorAreaM2, vaultBayCount, lavatoriumLengthM, garthAreaM2,
  carvingHoursPerBay, restorationCostPerM, cloisterVaults,
} from "../cloister-calc.js";

describe("walkwayWidthM", () => {
  it("20% of garth side", () => {
    expect(walkwayWidthM(20)).toBe(4);
  });
});

describe("totalPerimeterM", () => {
  it("4x garth side", () => {
    expect(totalPerimeterM(20)).toBe(80);
  });
});

describe("arcadeCount", () => {
  it("positive count", () => {
    expect(arcadeCount(20, 200)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(arcadeCount(20, 0)).toBe(0);
  });
});

describe("columnCount", () => {
  it("equals arcade count", () => {
    expect(columnCount(40)).toBe(40);
  });
});

describe("floorAreaM2", () => {
  it("positive area", () => {
    expect(floorAreaM2(20, 4)).toBeGreaterThan(0);
  });
});

describe("vaultBayCount", () => {
  it("positive count", () => {
    expect(vaultBayCount(80, 300)).toBeGreaterThan(0);
  });
  it("zero bay length = 0", () => {
    expect(vaultBayCount(80, 0)).toBe(0);
  });
});

describe("lavatoriumLengthM", () => {
  it("30% of garth side", () => {
    expect(lavatoriumLengthM(20)).toBe(6);
  });
});

describe("garthAreaM2", () => {
  it("side squared", () => {
    expect(garthAreaM2(20)).toBe(400);
  });
});

describe("carvingHoursPerBay", () => {
  it("lierne longest", () => {
    expect(carvingHoursPerBay("lierne")).toBeGreaterThan(carvingHoursPerBay("barrel"));
  });
});

describe("restorationCostPerM", () => {
  it("lierne most expensive", () => {
    expect(restorationCostPerM("lierne", 100)).toBeGreaterThan(restorationCostPerM("barrel", 100));
  });
});

describe("cloisterVaults", () => {
  it("returns 5 vault types", () => {
    expect(cloisterVaults()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  count, taperAngle, innerWidthCm, stoneVolumesCm3,
  totalWeightKg, jointThicknessMm, mortarVolumeMl,
  compressionStressMpa, cuttingTimeHours, centeringRemovalDays, voussoirBonds,
} from "../voussoir-calc.js";

describe("count", () => {
  it("positive count", () => {
    expect(count(180, 20, 100)).toBeGreaterThan(0);
  });
  it("zero width = 0", () => {
    expect(count(180, 0, 100)).toBe(0);
  });
});

describe("taperAngle", () => {
  it("positive angle", () => {
    expect(taperAngle(180, 15)).toBeGreaterThan(0);
  });
  it("zero count = 0", () => {
    expect(taperAngle(180, 0)).toBe(0);
  });
});

describe("innerWidthCm", () => {
  it("less than outer", () => {
    expect(innerWidthCm(20, 40, 12)).toBeLessThan(20);
  });
});

describe("stoneVolumesCm3", () => {
  it("positive volume", () => {
    expect(stoneVolumesCm3(20, 16, 40, 30)).toBeGreaterThan(0);
  });
});

describe("totalWeightKg", () => {
  it("positive weight", () => {
    expect(totalWeightKg(20000, 15, 2.5)).toBeGreaterThan(0);
  });
});

describe("jointThicknessMm", () => {
  it("keyed thinnest", () => {
    expect(jointThicknessMm("keyed")).toBeLessThan(jointThicknessMm("parallel"));
  });
});

describe("mortarVolumeMl", () => {
  it("positive volume", () => {
    expect(mortarVolumeMl(3, 100, 15)).toBeGreaterThan(0);
  });
});

describe("compressionStressMpa", () => {
  it("positive stress", () => {
    expect(compressionStressMpa(50, 800)).toBeGreaterThan(0);
  });
  it("zero area = 0", () => {
    expect(compressionStressMpa(50, 0)).toBe(0);
  });
});

describe("cuttingTimeHours", () => {
  it("positive hours", () => {
    expect(cuttingTimeHours(15, 1.5)).toBeGreaterThan(0);
  });
});

describe("centeringRemovalDays", () => {
  it("positive days", () => {
    expect(centeringRemovalDays(3)).toBeGreaterThan(0);
  });
});

describe("voussoirBonds", () => {
  it("returns 5 bonds", () => {
    expect(voussoirBonds()).toHaveLength(5);
  });
});

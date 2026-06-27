import { describe, it, expect } from "vitest";
import {
  beamProjectionM, hammerPostHeight, archBraceLength, trussCount,
  timberVolumeM3, angelFigureCount, spanCapabilityM, roofWeightKgPerM2,
  carvingHoursPerTruss, structuralCheckInterval, roofTimbers,
} from "../hammerbeam-calc.js";

describe("beamProjectionM", () => {
  it("20% of span", () => {
    expect(beamProjectionM(10)).toBe(2);
  });
});

describe("hammerPostHeight", () => {
  it("35% of span", () => {
    expect(hammerPostHeight(10)).toBe(3.5);
  });
});

describe("archBraceLength", () => {
  it("pythagorean", () => {
    expect(archBraceLength(3, 4)).toBe(5);
  });
});

describe("trussCount", () => {
  it("positive count", () => {
    expect(trussCount(20, 3)).toBeGreaterThan(0);
  });
  it("zero spacing = 0", () => {
    expect(trussCount(20, 0)).toBe(0);
  });
});

describe("timberVolumeM3", () => {
  it("positive volume", () => {
    expect(timberVolumeM3(2, 30, 40, 14)).toBeGreaterThan(0);
  });
});

describe("angelFigureCount", () => {
  it("double truss count", () => {
    expect(angelFigureCount(7)).toBe(14);
  });
});

describe("spanCapabilityM", () => {
  it("oak spans furthest", () => {
    expect(spanCapabilityM("oak")).toBeGreaterThan(spanCapabilityM("pine"));
  });
});

describe("roofWeightKgPerM2", () => {
  it("oak heaviest", () => {
    expect(roofWeightKgPerM2("oak")).toBeGreaterThan(roofWeightKgPerM2("cedar"));
  });
});

describe("carvingHoursPerTruss", () => {
  it("positive hours", () => {
    expect(carvingHoursPerTruss(3)).toBeGreaterThan(0);
  });
});

describe("structuralCheckInterval", () => {
  it("older = more frequent", () => {
    expect(structuralCheckInterval(300)).toBeLessThan(structuralCheckInterval(30));
  });
});

describe("roofTimbers", () => {
  it("returns 5 timbers", () => {
    expect(roofTimbers()).toHaveLength(5);
  });
});

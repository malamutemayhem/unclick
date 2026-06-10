import { describe, it, expect } from "vitest";
import {
  seatWidthCm, ledgeProjectionCm, supportAngle, loadCapacityKg,
  carvingAreaCm2, carvingHours, woodThicknessCm, hingeCount,
  polishCoats, restorationCostPerSeat, carvingSubjects,
} from "../misericord-calc.js";

describe("seatWidthCm", () => {
  it("85% of stall", () => {
    expect(seatWidthCm(60)).toBeCloseTo(51, 0);
  });
});

describe("ledgeProjectionCm", () => {
  it("15% of seat depth", () => {
    expect(ledgeProjectionCm(40)).toBe(6);
  });
});

describe("supportAngle", () => {
  it("positive angle", () => {
    expect(supportAngle(51, 6)).toBeGreaterThan(0);
  });
  it("zero width = 0", () => {
    expect(supportAngle(0, 6)).toBe(0);
  });
});

describe("loadCapacityKg", () => {
  it("positive capacity", () => {
    expect(loadCapacityKg(40, 300)).toBeGreaterThan(0);
  });
});

describe("carvingAreaCm2", () => {
  it("positive area", () => {
    expect(carvingAreaCm2(20, 15)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("human longest", () => {
    expect(carvingHours("human", 210)).toBeGreaterThan(carvingHours("geometric", 210));
  });
});

describe("woodThicknessCm", () => {
  it("2.5x ledge", () => {
    expect(woodThicknessCm(6)).toBe(15);
  });
});

describe("hingeCount", () => {
  it("narrow = 1", () => {
    expect(hingeCount(35)).toBe(1);
  });
  it("wide = 2", () => {
    expect(hingeCount(50)).toBe(2);
  });
});

describe("polishCoats", () => {
  it("high use more coats", () => {
    expect(polishCoats(true)).toBeGreaterThan(polishCoats(false));
  });
});

describe("restorationCostPerSeat", () => {
  it("human most expensive", () => {
    expect(restorationCostPerSeat("human")).toBeGreaterThan(restorationCostPerSeat("geometric"));
  });
});

describe("carvingSubjects", () => {
  it("returns 5 subjects", () => {
    expect(carvingSubjects()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  thicknessMm, soakTimeHours, deharingTimeHours, stretchPercent,
  tensileStrengthMpa, dryingTimeDays, lacingHolesPerCm, translucency,
  costPerSqFt, hideAnimals,
} from "../rawhide-calc.js";

describe("thicknessMm", () => {
  it("buffalo is thickest", () => {
    expect(thicknessMm("buffalo")).toBeGreaterThan(thicknessMm("deer"));
  });
});

describe("soakTimeHours", () => {
  it("buffalo soaks longest", () => {
    expect(soakTimeHours("buffalo")).toBeGreaterThan(soakTimeHours("deer"));
  });
});

describe("deharingTimeHours", () => {
  it("buffalo takes longest to dehair", () => {
    expect(deharingTimeHours("buffalo")).toBeGreaterThan(
      deharingTimeHours("deer")
    );
  });
});

describe("stretchPercent", () => {
  it("deer stretches most", () => {
    expect(stretchPercent("deer")).toBeGreaterThan(stretchPercent("buffalo"));
  });
});

describe("tensileStrengthMpa", () => {
  it("buffalo is strongest", () => {
    expect(tensileStrengthMpa("buffalo")).toBeGreaterThan(
      tensileStrengthMpa("deer")
    );
  });
});

describe("dryingTimeDays", () => {
  it("thicker = longer drying", () => {
    expect(dryingTimeDays(4)).toBeGreaterThan(dryingTimeDays(2));
  });
});

describe("lacingHolesPerCm", () => {
  it("returns 2", () => {
    expect(lacingHolesPerCm()).toBe(2);
  });
});

describe("translucency", () => {
  it("deer is most translucent", () => {
    expect(translucency("deer")).toBeGreaterThan(translucency("buffalo"));
  });
});

describe("costPerSqFt", () => {
  it("deer is most expensive", () => {
    expect(costPerSqFt("deer")).toBeGreaterThan(costPerSqFt("cattle"));
  });
});

describe("hideAnimals", () => {
  it("returns 5 animals", () => {
    expect(hideAnimals()).toHaveLength(5);
  });
});

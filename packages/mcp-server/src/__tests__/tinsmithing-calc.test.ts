import { describe, it, expect } from "vitest";
import {
  thicknessMm, bendRadiusMm, solderType, seamAllowanceMm,
  shearsRequired, weightKgPerM2, corrosionResistance, foodSafe,
  costPerM2, tinGauges,
} from "../tinsmithing-calc.js";

describe("thicknessMm", () => {
  it("plate 20 is thickest", () => {
    expect(thicknessMm("plate_20")).toBeGreaterThan(
      thicknessMm("light_28")
    );
  });
});

describe("bendRadiusMm", () => {
  it("heavier gauge needs larger radius", () => {
    expect(bendRadiusMm("plate_20")).toBeGreaterThan(
      bendRadiusMm("light_28")
    );
  });
});

describe("solderType", () => {
  it("light gauge uses lead free soft solder", () => {
    expect(solderType("light_28")).toBe("lead_free_soft");
  });
});

describe("seamAllowanceMm", () => {
  it("heavier gauge needs larger seam", () => {
    expect(seamAllowanceMm("plate_20")).toBeGreaterThan(
      seamAllowanceMm("light_28")
    );
  });
});

describe("shearsRequired", () => {
  it("plate 20 needs bench shears", () => {
    expect(shearsRequired("plate_20")).toBe("bench_shears");
  });
});

describe("weightKgPerM2", () => {
  it("plate 20 is heaviest", () => {
    expect(weightKgPerM2("plate_20")).toBeGreaterThan(
      weightKgPerM2("light_28")
    );
  });
});

describe("corrosionResistance", () => {
  it("plate 20 resists corrosion best", () => {
    expect(corrosionResistance("plate_20")).toBeGreaterThanOrEqual(
      corrosionResistance("light_28")
    );
  });
});

describe("foodSafe", () => {
  it("returns true", () => {
    expect(foodSafe()).toBe(true);
  });
});

describe("costPerM2", () => {
  it("plate 20 is most expensive", () => {
    expect(costPerM2("plate_20")).toBeGreaterThan(costPerM2("light_28"));
  });
});

describe("tinGauges", () => {
  it("returns 5 gauges", () => {
    expect(tinGauges()).toHaveLength(5);
  });
});

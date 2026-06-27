import { describe, it, expect } from "vitest";
import {
  tinPercent, pouringTempCelsius, resonanceRating,
  sustainSeconds, harmonicPurity, tunable,
  weightKgPerLiter, corrosionResistance, costPerKg, bellAlloys,
} from "../bell-casting-calc.js";

describe("tinPercent", () => {
  it("only bell bronze has tin", () => {
    expect(tinPercent("bell_bronze")).toBe(22);
    expect(tinPercent("brass")).toBe(0);
  });
});

describe("pouringTempCelsius", () => {
  it("steel pours hottest", () => {
    expect(pouringTempCelsius("steel")).toBeGreaterThan(
      pouringTempCelsius("aluminum")
    );
  });
});

describe("resonanceRating", () => {
  it("bell bronze resonates best", () => {
    expect(resonanceRating("bell_bronze")).toBeGreaterThan(
      resonanceRating("brass")
    );
  });
});

describe("sustainSeconds", () => {
  it("bell bronze sustains longest", () => {
    expect(sustainSeconds("bell_bronze")).toBeGreaterThan(
      sustainSeconds("aluminum")
    );
  });
});

describe("harmonicPurity", () => {
  it("bell bronze has purest harmonics", () => {
    expect(harmonicPurity("bell_bronze")).toBeGreaterThan(
      harmonicPurity("iron")
    );
  });
});

describe("tunable", () => {
  it("bell bronze is tunable", () => {
    expect(tunable("bell_bronze")).toBe(true);
  });
  it("iron is not", () => {
    expect(tunable("iron")).toBe(false);
  });
});

describe("weightKgPerLiter", () => {
  it("bell bronze is heaviest", () => {
    expect(weightKgPerLiter("bell_bronze")).toBeGreaterThan(
      weightKgPerLiter("aluminum")
    );
  });
});

describe("corrosionResistance", () => {
  it("bell bronze resists corrosion best", () => {
    expect(corrosionResistance("bell_bronze")).toBeGreaterThan(
      corrosionResistance("iron")
    );
  });
});

describe("costPerKg", () => {
  it("bell bronze is most expensive", () => {
    expect(costPerKg("bell_bronze")).toBeGreaterThan(
      costPerKg("iron")
    );
  });
});

describe("bellAlloys", () => {
  it("returns 5 alloys", () => {
    expect(bellAlloys()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  durability, detailPotential, workability,
  weatherResistance, costPerKg, subtractiveProcess,
  requiresFiring, famousSculptor, typicalScale, sculptureMaterials,
} from "../sculpture-material-calc.js";

describe("durability", () => {
  it("bronze most durable", () => {
    expect(durability("bronze")).toBeGreaterThan(
      durability("clay")
    );
  });
});

describe("detailPotential", () => {
  it("marble has best detail", () => {
    expect(detailPotential("marble")).toBeGreaterThan(
      detailPotential("steel")
    );
  });
});

describe("workability", () => {
  it("clay most workable", () => {
    expect(workability("clay")).toBeGreaterThan(
      workability("steel")
    );
  });
});

describe("weatherResistance", () => {
  it("bronze best weather resistance", () => {
    expect(weatherResistance("bronze")).toBeGreaterThan(
      weatherResistance("clay")
    );
  });
});

describe("costPerKg", () => {
  it("bronze most expensive", () => {
    expect(costPerKg("bronze")).toBeGreaterThan(
      costPerKg("clay")
    );
  });
});

describe("subtractiveProcess", () => {
  it("marble is subtractive", () => {
    expect(subtractiveProcess("marble")).toBe(true);
  });
  it("clay is not", () => {
    expect(subtractiveProcess("clay")).toBe(false);
  });
});

describe("requiresFiring", () => {
  it("clay requires firing", () => {
    expect(requiresFiring("clay")).toBe(true);
  });
  it("marble does not", () => {
    expect(requiresFiring("marble")).toBe(false);
  });
});

describe("famousSculptor", () => {
  it("marble sculptor is michelangelo", () => {
    expect(famousSculptor("marble")).toBe("michelangelo");
  });
});

describe("typicalScale", () => {
  it("steel for large installation", () => {
    expect(typicalScale("steel")).toBe("large_installation");
  });
});

describe("sculptureMaterials", () => {
  it("returns 5 materials", () => {
    expect(sculptureMaterials()).toHaveLength(5);
  });
});

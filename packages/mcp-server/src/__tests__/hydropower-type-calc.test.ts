import { describe, it, expect } from "vitest";
import {
  capacityMw, capacityFactor, environmentalImpact,
  constructionYears, lifespanYears, requiresReservoir,
  oceanBased, bestLocation, storageCapable, hydropowerTypes,
} from "../hydropower-type-calc.js";

describe("capacityMw", () => {
  it("conventional dam has highest capacity", () => {
    expect(capacityMw("conventional_dam")).toBeGreaterThan(
      capacityMw("wave")
    );
  });
});

describe("capacityFactor", () => {
  it("conventional dam has highest capacity factor", () => {
    expect(capacityFactor("conventional_dam")).toBeGreaterThan(
      capacityFactor("wave")
    );
  });
});

describe("environmentalImpact", () => {
  it("conventional dam has highest impact", () => {
    expect(environmentalImpact("conventional_dam")).toBeGreaterThan(
      environmentalImpact("wave")
    );
  });
});

describe("constructionYears", () => {
  it("conventional dam takes longest", () => {
    expect(constructionYears("conventional_dam")).toBeGreaterThan(
      constructionYears("wave")
    );
  });
});

describe("lifespanYears", () => {
  it("conventional dam lasts longest", () => {
    expect(lifespanYears("conventional_dam")).toBeGreaterThan(
      lifespanYears("wave")
    );
  });
});

describe("requiresReservoir", () => {
  it("conventional dam requires reservoir", () => {
    expect(requiresReservoir("conventional_dam")).toBe(true);
  });
  it("run of river does not", () => {
    expect(requiresReservoir("run_of_river")).toBe(false);
  });
});

describe("oceanBased", () => {
  it("tidal is ocean based", () => {
    expect(oceanBased("tidal")).toBe(true);
  });
  it("conventional dam is not", () => {
    expect(oceanBased("conventional_dam")).toBe(false);
  });
});

describe("bestLocation", () => {
  it("wave for open ocean", () => {
    expect(bestLocation("wave")).toBe("open_ocean");
  });
});

describe("storageCapable", () => {
  it("pumped storage is storage capable", () => {
    expect(storageCapable("pumped_storage")).toBe(true);
  });
  it("tidal is not", () => {
    expect(storageCapable("tidal")).toBe(false);
  });
});

describe("hydropowerTypes", () => {
  it("returns 5 types", () => {
    expect(hydropowerTypes()).toHaveLength(5);
  });
});

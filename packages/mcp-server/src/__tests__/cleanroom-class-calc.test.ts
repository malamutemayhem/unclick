import { describe, it, expect } from "vitest";
import {
  particleLimit, airChangesPerHour, constructionCost, gowningRequirement,
  operatingEnergy, requiresLaminarFlow, requiresAirShower, filtrationLevel,
  typicalIndustry, cleanroomClasses,
} from "../cleanroom-class-calc.js";

describe("particleLimit", () => {
  it("iso 1 strictest particle limit", () => {
    expect(particleLimit("iso_1")).toBeGreaterThan(particleLimit("non_classified"));
  });
});

describe("airChangesPerHour", () => {
  it("iso 1 most air changes", () => {
    expect(airChangesPerHour("iso_1")).toBeGreaterThan(airChangesPerHour("iso_8"));
  });
});

describe("constructionCost", () => {
  it("iso 1 most expensive", () => {
    expect(constructionCost("iso_1")).toBeGreaterThan(constructionCost("non_classified"));
  });
});

describe("gowningRequirement", () => {
  it("iso 1 strictest gowning", () => {
    expect(gowningRequirement("iso_1")).toBeGreaterThan(gowningRequirement("iso_8"));
  });
});

describe("operatingEnergy", () => {
  it("iso 1 most energy", () => {
    expect(operatingEnergy("iso_1")).toBeGreaterThan(operatingEnergy("non_classified"));
  });
});

describe("requiresLaminarFlow", () => {
  it("iso 1 requires laminar flow", () => {
    expect(requiresLaminarFlow("iso_1")).toBe(true);
  });
  it("iso 7 does not", () => {
    expect(requiresLaminarFlow("iso_7")).toBe(false);
  });
});

describe("requiresAirShower", () => {
  it("iso 5 requires air shower", () => {
    expect(requiresAirShower("iso_5")).toBe(true);
  });
  it("iso 8 does not", () => {
    expect(requiresAirShower("iso_8")).toBe(false);
  });
});

describe("filtrationLevel", () => {
  it("iso 1 uses ulpa", () => {
    expect(filtrationLevel("iso_1")).toBe("ulpa_99_9995");
  });
});

describe("typicalIndustry", () => {
  it("iso 5 for pharmaceutical sterile", () => {
    expect(typicalIndustry("iso_5")).toBe("pharmaceutical_sterile");
  });
});

describe("cleanroomClasses", () => {
  it("returns 5 classes", () => {
    expect(cleanroomClasses()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  visibilityMeters, durationHours, formationSpeedMinutes,
  densityRating, aviationHazard, diurnalCycle,
  requiresWindCalm, typicalSeason, dissipationMechanism, fogTypes,
} from "../fog-type-calc.js";

describe("visibilityMeters", () => {
  it("advection fog has lowest visibility", () => {
    expect(visibilityMeters("advection")).toBeLessThan(
      visibilityMeters("evaporation")
    );
  });
});

describe("durationHours", () => {
  it("advection fog lasts longest", () => {
    expect(durationHours("advection")).toBeGreaterThan(
      durationHours("evaporation")
    );
  });
});

describe("formationSpeedMinutes", () => {
  it("evaporation fog forms fastest", () => {
    expect(formationSpeedMinutes("evaporation")).toBeLessThan(
      formationSpeedMinutes("upslope")
    );
  });
});

describe("densityRating", () => {
  it("advection fog is densest", () => {
    expect(densityRating("advection")).toBeGreaterThan(
      densityRating("evaporation")
    );
  });
});

describe("aviationHazard", () => {
  it("advection fog is worst for aviation", () => {
    expect(aviationHazard("advection")).toBeGreaterThan(
      aviationHazard("evaporation")
    );
  });
});

describe("diurnalCycle", () => {
  it("radiation fog follows diurnal cycle", () => {
    expect(diurnalCycle("radiation")).toBe(true);
  });
  it("advection fog does not", () => {
    expect(diurnalCycle("advection")).toBe(false);
  });
});

describe("requiresWindCalm", () => {
  it("radiation fog requires calm", () => {
    expect(requiresWindCalm("radiation")).toBe(true);
  });
  it("advection fog does not", () => {
    expect(requiresWindCalm("advection")).toBe(false);
  });
});

describe("typicalSeason", () => {
  it("ice fog in winter", () => {
    expect(typicalSeason("ice")).toBe("winter");
  });
});

describe("dissipationMechanism", () => {
  it("radiation fog dissipates by solar heating", () => {
    expect(dissipationMechanism("radiation")).toBe("solar_heating");
  });
});

describe("fogTypes", () => {
  it("returns 5 types", () => {
    expect(fogTypes()).toHaveLength(5);
  });
});

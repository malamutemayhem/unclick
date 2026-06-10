import { describe, it, expect } from "vitest";
import {
  durationMinutes, spectacularRating, frequencyPerCentury,
  scientificValue, viewingPathWidthKm, safeWithoutFilter,
  coronaVisible, bestObservation, photographyDifficulty, eclipseTypes,
} from "../eclipse-type-calc.js";

describe("durationMinutes", () => {
  it("penumbral lunar lasts longest", () => {
    expect(durationMinutes("penumbral_lunar")).toBeGreaterThan(
      durationMinutes("total_solar")
    );
  });
});

describe("spectacularRating", () => {
  it("total solar is most spectacular", () => {
    expect(spectacularRating("total_solar")).toBeGreaterThan(
      spectacularRating("penumbral_lunar")
    );
  });
});

describe("frequencyPerCentury", () => {
  it("partial solar is most frequent", () => {
    expect(frequencyPerCentury("partial_solar")).toBeGreaterThan(
      frequencyPerCentury("annular_solar")
    );
  });
});

describe("scientificValue", () => {
  it("total solar has highest scientific value", () => {
    expect(scientificValue("total_solar")).toBeGreaterThan(
      scientificValue("penumbral_lunar")
    );
  });
});

describe("viewingPathWidthKm", () => {
  it("total lunar visible from widest area", () => {
    expect(viewingPathWidthKm("total_lunar")).toBeGreaterThan(
      viewingPathWidthKm("total_solar")
    );
  });
});

describe("safeWithoutFilter", () => {
  it("total lunar is safe without filter", () => {
    expect(safeWithoutFilter("total_lunar")).toBe(true);
  });
  it("total solar is not", () => {
    expect(safeWithoutFilter("total_solar")).toBe(false);
  });
});

describe("coronaVisible", () => {
  it("corona visible during total solar", () => {
    expect(coronaVisible("total_solar")).toBe(true);
  });
  it("not visible during partial solar", () => {
    expect(coronaVisible("partial_solar")).toBe(false);
  });
});

describe("bestObservation", () => {
  it("total solar best from path of totality", () => {
    expect(bestObservation("total_solar")).toBe("path_of_totality");
  });
});

describe("photographyDifficulty", () => {
  it("total solar is hardest to photograph", () => {
    expect(photographyDifficulty("total_solar")).toBeGreaterThan(
      photographyDifficulty("total_lunar")
    );
  });
});

describe("eclipseTypes", () => {
  it("returns 5 types", () => {
    expect(eclipseTypes()).toHaveLength(5);
  });
});

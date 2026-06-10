import { describe, it, expect } from "vitest";
import {
  firingTempCelsius, detailResolution, durabilityYears,
  craftDifficulty, colorVibrancy, translucent,
  requiresMetal, bestApplication, collectorsValue, enamelTypes,
} from "../enamel-type-calc.js";

describe("firingTempCelsius", () => {
  it("vitreous fires hottest", () => {
    expect(firingTempCelsius("vitreous")).toBeGreaterThan(
      firingTempCelsius("painted")
    );
  });
});

describe("detailResolution", () => {
  it("painted has finest detail", () => {
    expect(detailResolution("painted")).toBeGreaterThan(
      detailResolution("vitreous")
    );
  });
});

describe("durabilityYears", () => {
  it("cloisonne lasts longest", () => {
    expect(durabilityYears("cloisonne")).toBeGreaterThan(
      durabilityYears("vitreous")
    );
  });
});

describe("craftDifficulty", () => {
  it("plique a jour is hardest", () => {
    expect(craftDifficulty("plique_a_jour")).toBeGreaterThan(
      craftDifficulty("vitreous")
    );
  });
});

describe("colorVibrancy", () => {
  it("plique a jour is most vibrant", () => {
    expect(colorVibrancy("plique_a_jour")).toBeGreaterThan(
      colorVibrancy("vitreous")
    );
  });
});

describe("translucent", () => {
  it("plique a jour is translucent", () => {
    expect(translucent("plique_a_jour")).toBe(true);
  });
  it("cloisonne is not translucent", () => {
    expect(translucent("cloisonne")).toBe(false);
  });
});

describe("requiresMetal", () => {
  it("cloisonne requires metal", () => {
    expect(requiresMetal("cloisonne")).toBe(true);
  });
  it("painted does not", () => {
    expect(requiresMetal("painted")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("cloisonne for jewelry", () => {
    expect(bestApplication("cloisonne")).toBe("jewelry");
  });
});

describe("collectorsValue", () => {
  it("plique a jour most valuable", () => {
    expect(collectorsValue("plique_a_jour")).toBeGreaterThan(
      collectorsValue("vitreous")
    );
  });
});

describe("enamelTypes", () => {
  it("returns 5 types", () => {
    expect(enamelTypes()).toHaveLength(5);
  });
});

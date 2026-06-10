import { describe, it, expect } from "vitest";
import {
  insectsPerKgDye, dyeConcentrationGPerLiter, colorResult, dyeTimeMinutes,
  dyeTempCelsius, lightFastnessRating, washFastnessRating, toxicityRating,
  costPerGram, mordantTypes,
} from "../cochineal-calc.js";

describe("insectsPerKgDye", () => {
  it("returns 70000", () => {
    expect(insectsPerKgDye()).toBe(70000);
  });
});

describe("dyeConcentrationGPerLiter", () => {
  it("iron needs most dye", () => {
    expect(dyeConcentrationGPerLiter("iron")).toBeGreaterThan(
      dyeConcentrationGPerLiter("tin")
    );
  });
});

describe("colorResult", () => {
  it("alum produces crimson", () => {
    expect(colorResult("alum")).toBe("crimson");
  });
  it("iron produces purple", () => {
    expect(colorResult("iron")).toBe("purple");
  });
});

describe("dyeTimeMinutes", () => {
  it("iron takes longest", () => {
    expect(dyeTimeMinutes("iron")).toBeGreaterThan(dyeTimeMinutes("tin"));
  });
});

describe("dyeTempCelsius", () => {
  it("returns 80", () => {
    expect(dyeTempCelsius()).toBe(80);
  });
});

describe("lightFastnessRating", () => {
  it("iron has best light fastness", () => {
    expect(lightFastnessRating("iron")).toBeGreaterThan(
      lightFastnessRating("tin")
    );
  });
});

describe("washFastnessRating", () => {
  it("chrome has best wash fastness", () => {
    expect(washFastnessRating("chrome")).toBeGreaterThan(
      washFastnessRating("tin")
    );
  });
});

describe("toxicityRating", () => {
  it("chrome is most toxic", () => {
    expect(toxicityRating("chrome")).toBeGreaterThan(toxicityRating("alum"));
  });
});

describe("costPerGram", () => {
  it("chrome is most expensive", () => {
    expect(costPerGram("chrome")).toBeGreaterThan(costPerGram("iron"));
  });
});

describe("mordantTypes", () => {
  it("returns 5 types", () => {
    expect(mordantTypes()).toHaveLength(5);
  });
});

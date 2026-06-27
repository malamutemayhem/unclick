import { describe, it, expect } from "vitest";
import {
  speedKmh, beaufortNumber, seaStateHeight,
  structuralDamage, visibilityImpact, sailingFavorable,
  evacuationRequired, typicalWeather, powerGenerationKw, windScales,
} from "../wind-scale-calc.js";

describe("speedKmh", () => {
  it("hurricane is fastest", () => {
    expect(speedKmh("hurricane")).toBeGreaterThan(
      speedKmh("calm")
    );
  });
});

describe("beaufortNumber", () => {
  it("hurricane is force 12", () => {
    expect(beaufortNumber("hurricane")).toBe(12);
  });
});

describe("seaStateHeight", () => {
  it("hurricane creates highest seas", () => {
    expect(seaStateHeight("hurricane")).toBeGreaterThan(
      seaStateHeight("breeze")
    );
  });
});

describe("structuralDamage", () => {
  it("hurricane causes most damage", () => {
    expect(structuralDamage("hurricane")).toBeGreaterThan(
      structuralDamage("gale")
    );
  });
});

describe("visibilityImpact", () => {
  it("hurricane impacts visibility most", () => {
    expect(visibilityImpact("hurricane")).toBeGreaterThan(
      visibilityImpact("calm")
    );
  });
});

describe("sailingFavorable", () => {
  it("breeze is favorable for sailing", () => {
    expect(sailingFavorable("breeze")).toBe(true);
  });
  it("hurricane is not", () => {
    expect(sailingFavorable("hurricane")).toBe(false);
  });
});

describe("evacuationRequired", () => {
  it("hurricane requires evacuation", () => {
    expect(evacuationRequired("hurricane")).toBe(true);
  });
  it("breeze does not", () => {
    expect(evacuationRequired("breeze")).toBe(false);
  });
});

describe("typicalWeather", () => {
  it("calm has clear sky", () => {
    expect(typicalWeather("calm")).toBe("clear_sky");
  });
});

describe("powerGenerationKw", () => {
  it("gale generates most power", () => {
    expect(powerGenerationKw("gale")).toBeGreaterThan(
      powerGenerationKw("calm")
    );
  });
});

describe("windScales", () => {
  it("returns 5 scales", () => {
    expect(windScales()).toHaveLength(5);
  });
});

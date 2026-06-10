import { describe, it, expect } from "vitest";
import {
  capacitanceRange, voltageRating, esrScore,
  temperatureStability, lifespan, polarized,
  energyStorage, commonUse, dielectricMaterial, capacitorTypes,
} from "../capacitor-type-calc.js";

describe("capacitanceRange", () => {
  it("supercapacitor highest capacitance", () => {
    expect(capacitanceRange("supercapacitor")).toBeGreaterThan(
      capacitanceRange("ceramic")
    );
  });
});

describe("voltageRating", () => {
  it("film highest voltage rating", () => {
    expect(voltageRating("film")).toBeGreaterThan(
      voltageRating("supercapacitor")
    );
  });
});

describe("esrScore", () => {
  it("ceramic lowest ESR", () => {
    expect(esrScore("ceramic")).toBeGreaterThan(
      esrScore("electrolytic")
    );
  });
});

describe("temperatureStability", () => {
  it("film most stable", () => {
    expect(temperatureStability("film")).toBeGreaterThan(
      temperatureStability("electrolytic")
    );
  });
});

describe("lifespan", () => {
  it("ceramic longest lifespan", () => {
    expect(lifespan("ceramic")).toBeGreaterThan(
      lifespan("electrolytic")
    );
  });
});

describe("polarized", () => {
  it("electrolytic is polarized", () => {
    expect(polarized("electrolytic")).toBe(true);
  });
  it("ceramic is not", () => {
    expect(polarized("ceramic")).toBe(false);
  });
});

describe("energyStorage", () => {
  it("supercapacitor stores energy", () => {
    expect(energyStorage("supercapacitor")).toBe(true);
  });
  it("ceramic does not", () => {
    expect(energyStorage("ceramic")).toBe(false);
  });
});

describe("commonUse", () => {
  it("ceramic for decoupling", () => {
    expect(commonUse("ceramic")).toBe("decoupling_filtering");
  });
});

describe("dielectricMaterial", () => {
  it("film uses polypropylene", () => {
    expect(dielectricMaterial("film")).toBe("polypropylene");
  });
});

describe("capacitorTypes", () => {
  it("returns 5 types", () => {
    expect(capacitorTypes()).toHaveLength(5);
  });
});

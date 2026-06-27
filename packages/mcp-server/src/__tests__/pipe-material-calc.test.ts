import { describe, it, expect } from "vitest";
import {
  lifespanYears, costPerMeter, corrosionResistance,
  installationEase, pressureRating, recyclable,
  flexibleInstall, bestApplication, joinMethod, pipeMaterials,
} from "../pipe-material-calc.js";

describe("lifespanYears", () => {
  it("cast iron longest lifespan", () => {
    expect(lifespanYears("cast_iron")).toBeGreaterThan(
      lifespanYears("pex")
    );
  });
});

describe("costPerMeter", () => {
  it("copper most expensive", () => {
    expect(costPerMeter("copper")).toBeGreaterThan(
      costPerMeter("pvc")
    );
  });
});

describe("corrosionResistance", () => {
  it("pvc best corrosion resistance", () => {
    expect(corrosionResistance("pvc")).toBeGreaterThan(
      corrosionResistance("galvanized")
    );
  });
});

describe("installationEase", () => {
  it("pex easiest to install", () => {
    expect(installationEase("pex")).toBeGreaterThan(
      installationEase("cast_iron")
    );
  });
});

describe("pressureRating", () => {
  it("cast iron highest pressure rating", () => {
    expect(pressureRating("cast_iron")).toBeGreaterThan(
      pressureRating("pvc")
    );
  });
});

describe("recyclable", () => {
  it("copper is recyclable", () => {
    expect(recyclable("copper")).toBe(true);
  });
  it("pvc is not", () => {
    expect(recyclable("pvc")).toBe(false);
  });
});

describe("flexibleInstall", () => {
  it("pex is flexible", () => {
    expect(flexibleInstall("pex")).toBe(true);
  });
  it("copper is not", () => {
    expect(flexibleInstall("copper")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("pex for residential water", () => {
    expect(bestApplication("pex")).toBe("residential_water");
  });
});

describe("joinMethod", () => {
  it("copper uses soldering", () => {
    expect(joinMethod("copper")).toBe("soldering_brazing");
  });
});

describe("pipeMaterials", () => {
  it("returns 5 materials", () => {
    expect(pipeMaterials()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  rValuePerInch, moistureResistance, fireSafety,
  installEase, soundproofing, airSealant,
  recycledContent, bestLocation, costPerSqFt, insulationTypes,
} from "../insulation-type-calc.js";

describe("rValuePerInch", () => {
  it("spray foam has highest r value", () => {
    expect(rValuePerInch("spray_foam")).toBeGreaterThan(
      rValuePerInch("fiberglass")
    );
  });
});

describe("moistureResistance", () => {
  it("spray foam resists moisture best", () => {
    expect(moistureResistance("spray_foam")).toBeGreaterThan(
      moistureResistance("cellulose")
    );
  });
});

describe("fireSafety", () => {
  it("mineral wool is safest for fire", () => {
    expect(fireSafety("mineral_wool")).toBeGreaterThan(
      fireSafety("spray_foam")
    );
  });
});

describe("installEase", () => {
  it("fiberglass is easiest to install", () => {
    expect(installEase("fiberglass")).toBeGreaterThan(
      installEase("spray_foam")
    );
  });
});

describe("soundproofing", () => {
  it("mineral wool soundproofs best", () => {
    expect(soundproofing("mineral_wool")).toBeGreaterThan(
      soundproofing("rigid_board")
    );
  });
});

describe("airSealant", () => {
  it("spray foam seals air", () => {
    expect(airSealant("spray_foam")).toBe(true);
  });
  it("fiberglass does not", () => {
    expect(airSealant("fiberglass")).toBe(false);
  });
});

describe("recycledContent", () => {
  it("cellulose has recycled content", () => {
    expect(recycledContent("cellulose")).toBe(true);
  });
  it("spray foam does not", () => {
    expect(recycledContent("spray_foam")).toBe(false);
  });
});

describe("bestLocation", () => {
  it("fiberglass for attic", () => {
    expect(bestLocation("fiberglass")).toBe("attic");
  });
});

describe("costPerSqFt", () => {
  it("spray foam costs most", () => {
    expect(costPerSqFt("spray_foam")).toBeGreaterThan(
      costPerSqFt("fiberglass")
    );
  });
});

describe("insulationTypes", () => {
  it("returns 5 types", () => {
    expect(insulationTypes()).toHaveLength(5);
  });
});

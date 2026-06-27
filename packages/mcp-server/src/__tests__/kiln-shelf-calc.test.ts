import { describe, it, expect } from "vitest";
import {
  maxLoadKgPerM2, maxTempCelsius, thicknessMm, kilnWashCoats, postHeightCm,
  shelvesPerFiring, warpResistance, lifespanFirings, costPerShelf, shelfMaterials,
} from "../kiln-shelf-calc.js";

describe("maxLoadKgPerM2", () => {
  it("nitride bonded holds most weight", () => {
    expect(maxLoadKgPerM2("nitride_bonded")).toBeGreaterThan(
      maxLoadKgPerM2("cordierite")
    );
  });
});

describe("maxTempCelsius", () => {
  it("alumina fires hottest", () => {
    expect(maxTempCelsius("alumina")).toBeGreaterThan(maxTempCelsius("cordierite"));
  });
});

describe("thicknessMm", () => {
  it("nitride bonded is thinnest", () => {
    expect(thicknessMm("nitride_bonded")).toBeLessThan(thicknessMm("cordierite"));
  });
});

describe("kilnWashCoats", () => {
  it("returns 3", () => {
    expect(kilnWashCoats()).toBe(3);
  });
});

describe("postHeightCm", () => {
  it("accounts for shelf thickness", () => {
    expect(postHeightCm(10, 16)).toBe(8.4);
  });
});

describe("shelvesPerFiring", () => {
  it("more height = more shelves", () => {
    expect(shelvesPerFiring(60, 10)).toBeGreaterThan(shelvesPerFiring(30, 10));
  });
  it("zero spacing returns 0", () => {
    expect(shelvesPerFiring(60, 0)).toBe(0);
  });
});

describe("warpResistance", () => {
  it("silicon carbide has best resistance", () => {
    expect(warpResistance("silicon_carbide")).toBeGreaterThan(
      warpResistance("cordierite")
    );
  });
});

describe("lifespanFirings", () => {
  it("nitride bonded lasts longest", () => {
    expect(lifespanFirings("nitride_bonded")).toBeGreaterThan(
      lifespanFirings("cordierite")
    );
  });
});

describe("costPerShelf", () => {
  it("nitride bonded is most expensive", () => {
    expect(costPerShelf("nitride_bonded")).toBeGreaterThan(
      costPerShelf("cordierite")
    );
  });
});

describe("shelfMaterials", () => {
  it("returns 5 materials", () => {
    expect(shelfMaterials()).toHaveLength(5);
  });
});

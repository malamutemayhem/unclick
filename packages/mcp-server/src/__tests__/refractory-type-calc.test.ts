import { describe, it, expect } from "vitest";
import {
  tempLimit, strength, thermalShock, abrasion,
  rfCost, basic, forSteel, composition,
  bestUse, refractoryTypes,
} from "../refractory-type-calc.js";

describe("tempLimit", () => {
  it("zirconia highest temp", () => {
    expect(tempLimit("zirconia_zro2_ultra")).toBeGreaterThan(tempLimit("fireclay_alumina_silicate"));
  });
});

describe("strength", () => {
  it("sic strongest", () => {
    expect(strength("silicon_carbide_sic")).toBeGreaterThan(strength("fireclay_alumina_silicate"));
  });
});

describe("thermalShock", () => {
  it("sic best thermal shock", () => {
    expect(thermalShock("silicon_carbide_sic")).toBeGreaterThan(thermalShock("magnesia_basic_mgo"));
  });
});

describe("abrasion", () => {
  it("sic best abrasion resistance", () => {
    expect(abrasion("silicon_carbide_sic")).toBeGreaterThan(abrasion("fireclay_alumina_silicate"));
  });
});

describe("rfCost", () => {
  it("zirconia most expensive", () => {
    expect(rfCost("zirconia_zro2_ultra")).toBeGreaterThan(rfCost("fireclay_alumina_silicate"));
  });
});

describe("basic", () => {
  it("magnesia is basic", () => {
    expect(basic("magnesia_basic_mgo")).toBe(true);
  });
  it("fireclay not basic", () => {
    expect(basic("fireclay_alumina_silicate")).toBe(false);
  });
});

describe("forSteel", () => {
  it("magnesia for steel", () => {
    expect(forSteel("magnesia_basic_mgo")).toBe(true);
  });
  it("fireclay not for steel", () => {
    expect(forSteel("fireclay_alumina_silicate")).toBe(false);
  });
});

describe("composition", () => {
  it("zirconia uses stabilized zro2", () => {
    expect(composition("zirconia_zro2_ultra")).toBe("zirconium_oxide_stabilized");
  });
});

describe("bestUse", () => {
  it("fireclay for general furnace", () => {
    expect(bestUse("fireclay_alumina_silicate")).toBe("general_furnace_backup_lining");
  });
});

describe("refractoryTypes", () => {
  it("returns 5 types", () => {
    expect(refractoryTypes()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  metalContent, extractionDifficulty, globalReservesTonnes,
  crushability, environmentalImpact, magnetic,
  sulfide, extractedMetal, pricePerTonne, oreTypes,
} from "../ore-type-calc.js";

describe("metalContent", () => {
  it("galena has highest metal content", () => {
    expect(metalContent("galena")).toBeGreaterThan(
      metalContent("chalcopyrite")
    );
  });
});

describe("extractionDifficulty", () => {
  it("bauxite is hardest to extract", () => {
    expect(extractionDifficulty("bauxite")).toBeGreaterThan(
      extractionDifficulty("galena")
    );
  });
});

describe("globalReservesTonnes", () => {
  it("hematite has largest reserves", () => {
    expect(globalReservesTonnes("hematite")).toBeGreaterThan(
      globalReservesTonnes("chalcopyrite")
    );
  });
});

describe("crushability", () => {
  it("galena is most crushable", () => {
    expect(crushability("galena")).toBeGreaterThan(
      crushability("cassiterite")
    );
  });
});

describe("environmentalImpact", () => {
  it("galena has highest impact", () => {
    expect(environmentalImpact("galena")).toBeGreaterThan(
      environmentalImpact("hematite")
    );
  });
});

describe("magnetic", () => {
  it("hematite is magnetic", () => {
    expect(magnetic("hematite")).toBe(true);
  });
  it("bauxite is not magnetic", () => {
    expect(magnetic("bauxite")).toBe(false);
  });
});

describe("sulfide", () => {
  it("chalcopyrite is sulfide", () => {
    expect(sulfide("chalcopyrite")).toBe(true);
  });
  it("hematite is not sulfide", () => {
    expect(sulfide("hematite")).toBe(false);
  });
});

describe("extractedMetal", () => {
  it("hematite yields iron", () => {
    expect(extractedMetal("hematite")).toBe("iron");
  });
});

describe("pricePerTonne", () => {
  it("cassiterite costs most", () => {
    expect(pricePerTonne("cassiterite")).toBeGreaterThan(
      pricePerTonne("bauxite")
    );
  });
});

describe("oreTypes", () => {
  it("returns 5 types", () => {
    expect(oreTypes()).toHaveLength(5);
  });
});

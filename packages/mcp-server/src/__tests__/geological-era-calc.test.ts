import { describe, it, expect } from "vitest";
import {
  duration, fossilAbundance, biodiversity, oxygenLevel,
  researchInterest, landPlants, humanPresence, dominantLifeForm,
  massExtinctionEvent, geologicalEras,
} from "../geological-era-calc.js";

describe("duration", () => {
  it("precambrian longest", () => {
    expect(duration("precambrian")).toBeGreaterThan(duration("quaternary"));
  });
});

describe("fossilAbundance", () => {
  it("cenozoic most fossils", () => {
    expect(fossilAbundance("cenozoic")).toBeGreaterThan(fossilAbundance("precambrian"));
  });
});

describe("biodiversity", () => {
  it("cenozoic most diverse", () => {
    expect(biodiversity("cenozoic")).toBeGreaterThan(biodiversity("precambrian"));
  });
});

describe("oxygenLevel", () => {
  it("quaternary highest oxygen", () => {
    expect(oxygenLevel("quaternary")).toBeGreaterThan(oxygenLevel("precambrian"));
  });
});

describe("researchInterest", () => {
  it("mesozoic highest research interest", () => {
    expect(researchInterest("mesozoic")).toBeGreaterThan(researchInterest("precambrian"));
  });
});

describe("landPlants", () => {
  it("paleozoic has land plants", () => {
    expect(landPlants("paleozoic")).toBe(true);
  });
  it("precambrian does not", () => {
    expect(landPlants("precambrian")).toBe(false);
  });
});

describe("humanPresence", () => {
  it("quaternary has humans", () => {
    expect(humanPresence("quaternary")).toBe(true);
  });
  it("cenozoic does not", () => {
    expect(humanPresence("cenozoic")).toBe(false);
  });
});

describe("dominantLifeForm", () => {
  it("mesozoic dominated by dinosaur reptile", () => {
    expect(dominantLifeForm("mesozoic")).toBe("dinosaur_reptile");
  });
});

describe("massExtinctionEvent", () => {
  it("mesozoic cretaceous paleogene", () => {
    expect(massExtinctionEvent("mesozoic")).toBe("cretaceous_paleogene");
  });
});

describe("geologicalEras", () => {
  it("returns 5 eras", () => {
    expect(geologicalEras()).toHaveLength(5);
  });
});

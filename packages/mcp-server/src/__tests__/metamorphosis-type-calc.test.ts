import { describe, it, expect } from "vitest";
import {
  stageCount, bodyRemodeling, ecologicalAdaptation, developmentTime,
  speciesDiversity, hasPupalStage, nymphResemblesAdult, exampleInsect,
  lifeStages, metamorphosisTypes,
} from "../metamorphosis-type-calc.js";

describe("stageCount", () => {
  it("hypermetamorphosis most stages", () => {
    expect(stageCount("hypermetamorphosis")).toBeGreaterThan(stageCount("ametabolous"));
  });
});

describe("bodyRemodeling", () => {
  it("complete metamorphosis most remodeling", () => {
    expect(bodyRemodeling("complete")).toBeGreaterThan(bodyRemodeling("ametabolous"));
  });
});

describe("ecologicalAdaptation", () => {
  it("hypermetamorphosis highest adaptation", () => {
    expect(ecologicalAdaptation("hypermetamorphosis")).toBeGreaterThan(
      ecologicalAdaptation("ametabolous")
    );
  });
});

describe("developmentTime", () => {
  it("hypermetamorphosis longest development", () => {
    expect(developmentTime("hypermetamorphosis")).toBeGreaterThan(
      developmentTime("ametabolous")
    );
  });
});

describe("speciesDiversity", () => {
  it("complete metamorphosis most diverse", () => {
    expect(speciesDiversity("complete")).toBeGreaterThan(speciesDiversity("ametabolous"));
  });
});

describe("hasPupalStage", () => {
  it("complete has pupal stage", () => {
    expect(hasPupalStage("complete")).toBe(true);
  });
  it("incomplete does not", () => {
    expect(hasPupalStage("incomplete")).toBe(false);
  });
});

describe("nymphResemblesAdult", () => {
  it("incomplete nymph resembles adult", () => {
    expect(nymphResemblesAdult("incomplete")).toBe(true);
  });
  it("complete does not", () => {
    expect(nymphResemblesAdult("complete")).toBe(false);
  });
});

describe("exampleInsect", () => {
  it("ametabolous includes silverfish", () => {
    expect(exampleInsect("ametabolous")).toBe("silverfish_springtails");
  });
});

describe("lifeStages", () => {
  it("complete is egg larva pupa adult", () => {
    expect(lifeStages("complete")).toBe("egg_larva_pupa_adult");
  });
});

describe("metamorphosisTypes", () => {
  it("returns 5 types", () => {
    expect(metamorphosisTypes()).toHaveLength(5);
  });
});

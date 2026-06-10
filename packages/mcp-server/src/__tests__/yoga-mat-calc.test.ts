import { describe, it, expect } from "vitest";
import {
  cushionThickness, gripWet, ecoRating, weightScore,
  matCost, latexFree, closedCell, surfaceMaterial,
  bestPractice, yogaMats,
} from "../yoga-mat-calc.js";

describe("cushionThickness", () => {
  it("natural rubber thickest cushion", () => {
    expect(cushionThickness("natural_rubber")).toBeGreaterThan(cushionThickness("travel_thin"));
  });
});

describe("gripWet", () => {
  it("cork surface best wet grip", () => {
    expect(gripWet("cork_surface")).toBeGreaterThan(gripWet("pvc_standard"));
  });
});

describe("ecoRating", () => {
  it("cork surface most eco friendly", () => {
    expect(ecoRating("cork_surface")).toBeGreaterThan(ecoRating("pvc_standard"));
  });
});

describe("weightScore", () => {
  it("travel thin lightest", () => {
    expect(weightScore("travel_thin")).toBeGreaterThan(weightScore("natural_rubber"));
  });
});

describe("matCost", () => {
  it("cork surface most expensive", () => {
    expect(matCost("cork_surface")).toBeGreaterThan(matCost("pvc_standard"));
  });
});

describe("latexFree", () => {
  it("tpe eco is latex free", () => {
    expect(latexFree("tpe_eco")).toBe(true);
  });
  it("natural rubber is not", () => {
    expect(latexFree("natural_rubber")).toBe(false);
  });
});

describe("closedCell", () => {
  it("pvc standard is closed cell", () => {
    expect(closedCell("pvc_standard")).toBe(true);
  });
  it("natural rubber is not", () => {
    expect(closedCell("natural_rubber")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("cork surface uses harvested cork rubber base", () => {
    expect(surfaceMaterial("cork_surface")).toBe("harvested_cork_rubber_base");
  });
});

describe("bestPractice", () => {
  it("travel thin for travel fold pack light", () => {
    expect(bestPractice("travel_thin")).toBe("travel_fold_pack_light");
  });
});

describe("yogaMats", () => {
  it("returns 5 types", () => {
    expect(yogaMats()).toHaveLength(5);
  });
});

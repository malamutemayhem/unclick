import { describe, it, expect } from "vitest";
import {
  preservationQuality, abundanceScore, informationContent,
  formationTimeYears, collectingDifficulty, retainsOriginalMaterial,
  threeDimensional, exampleOrganism, typicalRock, fossilTypes,
} from "../fossil-type-calc.js";

describe("preservationQuality", () => {
  it("body fossils best preserved", () => {
    expect(preservationQuality("body")).toBeGreaterThan(
      preservationQuality("trace")
    );
  });
});

describe("abundanceScore", () => {
  it("trace fossils most abundant", () => {
    expect(abundanceScore("trace")).toBeGreaterThan(
      abundanceScore("petrified")
    );
  });
});

describe("informationContent", () => {
  it("body fossils most informative", () => {
    expect(informationContent("body")).toBeGreaterThan(
      informationContent("mold")
    );
  });
});

describe("formationTimeYears", () => {
  it("petrified takes longest", () => {
    expect(formationTimeYears("petrified")).toBeGreaterThan(
      formationTimeYears("trace")
    );
  });
});

describe("collectingDifficulty", () => {
  it("body fossils hardest to collect", () => {
    expect(collectingDifficulty("body")).toBeGreaterThan(
      collectingDifficulty("trace")
    );
  });
});

describe("retainsOriginalMaterial", () => {
  it("body retains original material", () => {
    expect(retainsOriginalMaterial("body")).toBe(true);
  });
  it("cast does not", () => {
    expect(retainsOriginalMaterial("cast")).toBe(false);
  });
});

describe("threeDimensional", () => {
  it("cast is 3D", () => {
    expect(threeDimensional("cast")).toBe(true);
  });
  it("trace is not", () => {
    expect(threeDimensional("trace")).toBe(false);
  });
});

describe("exampleOrganism", () => {
  it("trace example is dinosaur footprint", () => {
    expect(exampleOrganism("trace")).toBe("dinosaur_footprint");
  });
});

describe("typicalRock", () => {
  it("body fossil in amber", () => {
    expect(typicalRock("body")).toBe("amber");
  });
});

describe("fossilTypes", () => {
  it("returns 5 types", () => {
    expect(fossilTypes()).toHaveLength(5);
  });
});

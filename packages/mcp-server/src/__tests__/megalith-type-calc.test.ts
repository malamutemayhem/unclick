import { describe, it, expect } from "vitest";
import {
  heightMeters, weightTonnes, constructionLabor,
  astronomicalAlignment, preservationState, funerary,
  multiStone, exampleSite, tourismAppeal, megalithTypes,
} from "../megalith-type-calc.js";

describe("heightMeters", () => {
  it("trilithon is tallest", () => {
    expect(heightMeters("trilithon")).toBeGreaterThan(
      heightMeters("dolmen")
    );
  });
});

describe("weightTonnes", () => {
  it("passage tomb is heaviest", () => {
    expect(weightTonnes("passage_tomb")).toBeGreaterThan(
      weightTonnes("menhir")
    );
  });
});

describe("constructionLabor", () => {
  it("passage tomb needs most labor", () => {
    expect(constructionLabor("passage_tomb")).toBeGreaterThan(
      constructionLabor("menhir")
    );
  });
});

describe("astronomicalAlignment", () => {
  it("stone circle has best alignment", () => {
    expect(astronomicalAlignment("stone_circle")).toBeGreaterThan(
      astronomicalAlignment("dolmen")
    );
  });
});

describe("preservationState", () => {
  it("menhir best preserved", () => {
    expect(preservationState("menhir")).toBeGreaterThan(
      preservationState("trilithon")
    );
  });
});

describe("funerary", () => {
  it("dolmen is funerary", () => {
    expect(funerary("dolmen")).toBe(true);
  });
  it("menhir is not", () => {
    expect(funerary("menhir")).toBe(false);
  });
});

describe("multiStone", () => {
  it("stone circle is multi stone", () => {
    expect(multiStone("stone_circle")).toBe(true);
  });
  it("menhir is not", () => {
    expect(multiStone("menhir")).toBe(false);
  });
});

describe("exampleSite", () => {
  it("stone circle example is stonehenge", () => {
    expect(exampleSite("stone_circle")).toBe("stonehenge");
  });
});

describe("tourismAppeal", () => {
  it("stone circle has highest tourism appeal", () => {
    expect(tourismAppeal("stone_circle")).toBeGreaterThan(
      tourismAppeal("menhir")
    );
  });
});

describe("megalithTypes", () => {
  it("returns 5 types", () => {
    expect(megalithTypes()).toHaveLength(5);
  });
});

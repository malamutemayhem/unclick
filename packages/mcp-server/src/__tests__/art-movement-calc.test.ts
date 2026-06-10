import { describe, it, expect } from "vitest";
import {
  yearStarted, technicalSkillRequired, conceptualDepth,
  publicAccessibility, marketValue, representational,
  europeanOrigin, keyArtist, coreIdea, artMovements,
} from "../art-movement-calc.js";

describe("yearStarted", () => {
  it("renaissance started earliest", () => {
    expect(yearStarted("abstract_expressionism")).toBeGreaterThan(
      yearStarted("renaissance")
    );
  });
});

describe("technicalSkillRequired", () => {
  it("renaissance needs most skill", () => {
    expect(technicalSkillRequired("renaissance")).toBeGreaterThan(
      technicalSkillRequired("abstract_expressionism")
    );
  });
});

describe("conceptualDepth", () => {
  it("surrealism most conceptual", () => {
    expect(conceptualDepth("surrealism")).toBeGreaterThan(
      conceptualDepth("impressionism")
    );
  });
});

describe("publicAccessibility", () => {
  it("impressionism most accessible", () => {
    expect(publicAccessibility("impressionism")).toBeGreaterThan(
      publicAccessibility("abstract_expressionism")
    );
  });
});

describe("marketValue", () => {
  it("renaissance highest market value", () => {
    expect(marketValue("renaissance")).toBeGreaterThan(
      marketValue("surrealism")
    );
  });
});

describe("representational", () => {
  it("renaissance is representational", () => {
    expect(representational("renaissance")).toBe(true);
  });
  it("cubism is not", () => {
    expect(representational("cubism")).toBe(false);
  });
});

describe("europeanOrigin", () => {
  it("impressionism is european", () => {
    expect(europeanOrigin("impressionism")).toBe(true);
  });
  it("abstract expressionism is not", () => {
    expect(europeanOrigin("abstract_expressionism")).toBe(false);
  });
});

describe("keyArtist", () => {
  it("cubism key artist is picasso", () => {
    expect(keyArtist("cubism")).toBe("picasso");
  });
});

describe("coreIdea", () => {
  it("surrealism about unconscious mind", () => {
    expect(coreIdea("surrealism")).toBe("unconscious_mind");
  });
});

describe("artMovements", () => {
  it("returns 5 movements", () => {
    expect(artMovements()).toHaveLength(5);
  });
});

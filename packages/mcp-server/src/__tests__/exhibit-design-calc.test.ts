import { describe, it, expect } from "vitest";
import {
  visitorEngagement, educationalDepth, designCost, flexibilityToReinstall,
  accessibilityScore, requiresTechnology, suitableForTraveling, narrativeStyle,
  bestMuseumType, exhibitDesigns,
} from "../exhibit-design-calc.js";

describe("visitorEngagement", () => {
  it("immersive most engaging", () => {
    expect(visitorEngagement("immersive")).toBeGreaterThan(visitorEngagement("object_focused"));
  });
});

describe("educationalDepth", () => {
  it("object focused deepest education", () => {
    expect(educationalDepth("object_focused")).toBeGreaterThan(educationalDepth("immersive"));
  });
});

describe("designCost", () => {
  it("immersive most expensive", () => {
    expect(designCost("immersive")).toBeGreaterThan(designCost("object_focused"));
  });
});

describe("flexibilityToReinstall", () => {
  it("object focused most flexible", () => {
    expect(flexibilityToReinstall("object_focused")).toBeGreaterThan(flexibilityToReinstall("immersive"));
  });
});

describe("accessibilityScore", () => {
  it("interactive most accessible", () => {
    expect(accessibilityScore("interactive")).toBeGreaterThan(accessibilityScore("immersive"));
  });
});

describe("requiresTechnology", () => {
  it("immersive requires technology", () => {
    expect(requiresTechnology("immersive")).toBe(true);
  });
  it("chronological does not", () => {
    expect(requiresTechnology("chronological")).toBe(false);
  });
});

describe("suitableForTraveling", () => {
  it("thematic suitable for traveling", () => {
    expect(suitableForTraveling("thematic")).toBe(true);
  });
  it("immersive is not", () => {
    expect(suitableForTraveling("immersive")).toBe(false);
  });
});

describe("narrativeStyle", () => {
  it("immersive is spatial sensory environment", () => {
    expect(narrativeStyle("immersive")).toBe("spatial_sensory_environment");
  });
});

describe("bestMuseumType", () => {
  it("interactive for children natural history", () => {
    expect(bestMuseumType("interactive")).toBe("children_natural_history");
  });
});

describe("exhibitDesigns", () => {
  it("returns 5 designs", () => {
    expect(exhibitDesigns()).toHaveLength(5);
  });
});

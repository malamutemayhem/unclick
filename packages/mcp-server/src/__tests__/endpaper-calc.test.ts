import { describe, it, expect } from "vitest";
import {
  adhesiveRequired, attachmentStrength, flexibilityRating,
  repairability, materialLayers, decorativeOpportunity,
  timePerBookMinutes, skillLevel, costPerBook, endpaperStyles,
} from "../endpaper-calc.js";

describe("adhesiveRequired", () => {
  it("paste down needs adhesive", () => {
    expect(adhesiveRequired("paste_down")).toBe(true);
  });
  it("sewn on does not", () => {
    expect(adhesiveRequired("sewn_on")).toBe(false);
  });
});

describe("attachmentStrength", () => {
  it("cloth joint is strongest", () => {
    expect(attachmentStrength("cloth_joint")).toBeGreaterThan(
      attachmentStrength("tipped_in")
    );
  });
});

describe("flexibilityRating", () => {
  it("cloth joint is most flexible", () => {
    expect(flexibilityRating("cloth_joint")).toBeGreaterThan(
      flexibilityRating("paste_down")
    );
  });
});

describe("repairability", () => {
  it("tipped in is most repairable", () => {
    expect(repairability("tipped_in")).toBeGreaterThan(
      repairability("cloth_joint")
    );
  });
});

describe("materialLayers", () => {
  it("cloth joint has most layers", () => {
    expect(materialLayers("cloth_joint")).toBeGreaterThan(
      materialLayers("tipped_in")
    );
  });
});

describe("decorativeOpportunity", () => {
  it("decorative fold has most opportunity", () => {
    expect(decorativeOpportunity("decorative_fold")).toBeGreaterThan(
      decorativeOpportunity("cloth_joint")
    );
  });
});

describe("timePerBookMinutes", () => {
  it("cloth joint takes longest", () => {
    expect(timePerBookMinutes("cloth_joint")).toBeGreaterThan(
      timePerBookMinutes("tipped_in")
    );
  });
});

describe("skillLevel", () => {
  it("cloth joint needs most skill", () => {
    expect(skillLevel("cloth_joint")).toBeGreaterThan(
      skillLevel("tipped_in")
    );
  });
});

describe("costPerBook", () => {
  it("cloth joint is most expensive", () => {
    expect(costPerBook("cloth_joint")).toBeGreaterThan(
      costPerBook("tipped_in")
    );
  });
});

describe("endpaperStyles", () => {
  it("returns 5 styles", () => {
    expect(endpaperStyles()).toHaveLength(5);
  });
});

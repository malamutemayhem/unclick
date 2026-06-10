import { describe, it, expect } from "vitest";
import {
  agingMonthsMin, flavorIntensity, vanillinContribution, tanninLevel,
  volumeGallons, charLevel, usesRemaining, oxygenPermeability,
  costEstimate, barrelTypes,
} from "../barrel-aging-calc.js";

describe("agingMonthsMin", () => {
  it("sherry ages longest", () => {
    expect(agingMonthsMin("sherry")).toBeGreaterThan(
      agingMonthsMin("oak_new")
    );
  });
});

describe("flavorIntensity", () => {
  it("new oak has strongest flavor", () => {
    expect(flavorIntensity("oak_new")).toBeGreaterThan(
      flavorIntensity("oak_used")
    );
  });
});

describe("vanillinContribution", () => {
  it("new oak contributes most vanillin", () => {
    expect(vanillinContribution("oak_new")).toBeGreaterThan(
      vanillinContribution("wine")
    );
  });
});

describe("tanninLevel", () => {
  it("new oak has most tannin", () => {
    expect(tanninLevel("oak_new")).toBeGreaterThan(
      tanninLevel("oak_used")
    );
  });
});

describe("volumeGallons", () => {
  it("sherry barrels are largest", () => {
    expect(volumeGallons("sherry")).toBeGreaterThan(
      volumeGallons("bourbon")
    );
  });
});

describe("charLevel", () => {
  it("bourbon has high char", () => {
    expect(charLevel("bourbon")).toBeGreaterThan(charLevel("wine"));
  });
});

describe("usesRemaining", () => {
  it("new oak has most uses", () => {
    expect(usesRemaining("oak_new")).toBeGreaterThan(
      usesRemaining("oak_used")
    );
  });
});

describe("oxygenPermeability", () => {
  it("sherry is most permeable", () => {
    expect(oxygenPermeability("sherry")).toBeGreaterThan(
      oxygenPermeability("oak_new")
    );
  });
});

describe("costEstimate", () => {
  it("sherry is most expensive", () => {
    expect(costEstimate("sherry")).toBeGreaterThan(
      costEstimate("oak_used")
    );
  });
});

describe("barrelTypes", () => {
  it("returns 5 types", () => {
    expect(barrelTypes()).toHaveLength(5);
  });
});

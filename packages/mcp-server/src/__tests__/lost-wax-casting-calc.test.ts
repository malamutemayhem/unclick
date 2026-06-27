import { describe, it, expect } from "vitest";
import {
  pouringTempCelsius, shrinkagePercent, detailResolution,
  burnoutTempCelsius, investmentLayers, chasingRequired,
  patinaPossible, finishingHours, costPerKg, castingMetals,
} from "../lost-wax-casting-calc.js";

describe("pouringTempCelsius", () => {
  it("bronze pours at highest temp", () => {
    expect(pouringTempCelsius("bronze")).toBeGreaterThan(
      pouringTempCelsius("pewter")
    );
  });
});

describe("shrinkagePercent", () => {
  it("silver shrinks most", () => {
    expect(shrinkagePercent("silver")).toBeGreaterThan(
      shrinkagePercent("pewter")
    );
  });
});

describe("detailResolution", () => {
  it("gold has best detail", () => {
    expect(detailResolution("gold")).toBeGreaterThan(
      detailResolution("pewter")
    );
  });
});

describe("burnoutTempCelsius", () => {
  it("bronze has highest burnout", () => {
    expect(burnoutTempCelsius("bronze")).toBeGreaterThan(
      burnoutTempCelsius("pewter")
    );
  });
});

describe("investmentLayers", () => {
  it("gold needs most layers", () => {
    expect(investmentLayers("gold")).toBeGreaterThan(
      investmentLayers("pewter")
    );
  });
});

describe("chasingRequired", () => {
  it("bronze needs chasing", () => {
    expect(chasingRequired("bronze")).toBe(true);
  });
  it("pewter does not", () => {
    expect(chasingRequired("pewter")).toBe(false);
  });
});

describe("patinaPossible", () => {
  it("bronze can patina", () => {
    expect(patinaPossible("bronze")).toBe(true);
  });
  it("silver cannot", () => {
    expect(patinaPossible("silver")).toBe(false);
  });
});

describe("finishingHours", () => {
  it("gold takes longest to finish", () => {
    expect(finishingHours("gold")).toBeGreaterThan(
      finishingHours("pewter")
    );
  });
});

describe("costPerKg", () => {
  it("gold is most expensive", () => {
    expect(costPerKg("gold")).toBeGreaterThan(
      costPerKg("silver")
    );
  });
});

describe("castingMetals", () => {
  it("returns 5 metals", () => {
    expect(castingMetals()).toHaveLength(5);
  });
});

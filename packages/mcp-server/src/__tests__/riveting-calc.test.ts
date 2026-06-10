import { describe, it, expect } from "vitest";
import {
  shankDiameterMm, gripRangeMm, shearStrengthKg, backAccessRequired,
  toolRequired, flushFinish, waterproof, installTimeSeconds,
  costPer100, rivetTypes,
} from "../riveting-calc.js";

describe("shankDiameterMm", () => {
  it("solid has thickest shank", () => {
    expect(shankDiameterMm("solid")).toBeGreaterThan(
      shankDiameterMm("copper_tack")
    );
  });
});

describe("gripRangeMm", () => {
  it("solid has widest grip range", () => {
    expect(gripRangeMm("solid").max).toBeGreaterThan(
      gripRangeMm("copper_tack").max
    );
  });
});

describe("shearStrengthKg", () => {
  it("solid is strongest", () => {
    expect(shearStrengthKg("solid")).toBeGreaterThan(
      shearStrengthKg("copper_tack")
    );
  });
});

describe("backAccessRequired", () => {
  it("solid needs back access", () => {
    expect(backAccessRequired("solid")).toBe(true);
  });
  it("blind does not need back access", () => {
    expect(backAccessRequired("blind")).toBe(false);
  });
});

describe("toolRequired", () => {
  it("blind uses pop rivet gun", () => {
    expect(toolRequired("blind")).toBe("pop_rivet_gun");
  });
});

describe("flushFinish", () => {
  it("solid gives flush finish", () => {
    expect(flushFinish("solid")).toBe(true);
  });
  it("split does not give flush finish", () => {
    expect(flushFinish("split")).toBe(false);
  });
});

describe("waterproof", () => {
  it("solid is waterproof", () => {
    expect(waterproof("solid")).toBe(true);
  });
  it("blind is not waterproof", () => {
    expect(waterproof("blind")).toBe(false);
  });
});

describe("installTimeSeconds", () => {
  it("blind installs fastest", () => {
    expect(installTimeSeconds("blind")).toBeLessThan(
      installTimeSeconds("copper_tack")
    );
  });
});

describe("costPer100", () => {
  it("copper tack is most expensive", () => {
    expect(costPer100("copper_tack")).toBeGreaterThan(
      costPer100("split")
    );
  });
});

describe("rivetTypes", () => {
  it("returns 5 types", () => {
    expect(rivetTypes()).toHaveLength(5);
  });
});

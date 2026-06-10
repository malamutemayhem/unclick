import { describe, it, expect } from "vitest";
import {
  breakingStrengthKn, stretchPercent, uvResistance,
  waterAbsorption, abrasionResistance, floats,
  natural, bestUse, costPerMeter, ropeFibers,
} from "../rope-fiber-calc.js";

describe("breakingStrengthKn", () => {
  it("dyneema is strongest", () => {
    expect(breakingStrengthKn("dyneema")).toBeGreaterThan(
      breakingStrengthKn("cotton")
    );
  });
});

describe("stretchPercent", () => {
  it("nylon stretches most", () => {
    expect(stretchPercent("nylon")).toBeGreaterThan(
      stretchPercent("dyneema")
    );
  });
});

describe("uvResistance", () => {
  it("polyester resists UV best", () => {
    expect(uvResistance("polyester")).toBeGreaterThan(
      uvResistance("cotton")
    );
  });
});

describe("waterAbsorption", () => {
  it("cotton absorbs most water", () => {
    expect(waterAbsorption("cotton")).toBeGreaterThan(
      waterAbsorption("dyneema")
    );
  });
});

describe("abrasionResistance", () => {
  it("polyester resists abrasion best", () => {
    expect(abrasionResistance("polyester")).toBeGreaterThan(
      abrasionResistance("cotton")
    );
  });
});

describe("floats", () => {
  it("dyneema floats", () => {
    expect(floats("dyneema")).toBe(true);
  });
  it("nylon sinks", () => {
    expect(floats("nylon")).toBe(false);
  });
});

describe("natural", () => {
  it("manila is natural", () => {
    expect(natural("manila")).toBe(true);
  });
  it("nylon is not natural", () => {
    expect(natural("nylon")).toBe(false);
  });
});

describe("bestUse", () => {
  it("dyneema best for climbing", () => {
    expect(bestUse("dyneema")).toBe("climbing");
  });
});

describe("costPerMeter", () => {
  it("dyneema costs most", () => {
    expect(costPerMeter("dyneema")).toBeGreaterThan(
      costPerMeter("cotton")
    );
  });
});

describe("ropeFibers", () => {
  it("returns 5 fibers", () => {
    expect(ropeFibers()).toHaveLength(5);
  });
});

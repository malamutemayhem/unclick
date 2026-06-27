import { describe, it, expect } from "vitest";
import {
  maskWeight, fieldOfView, breathability, decorationCost,
  elasticLengthCm, moldDryingHours, paintLayers, glueMl,
  wearComfortHours, maskStyles,
} from "../masquerade-calc.js";

describe("maskWeight", () => {
  it("metal heaviest", () => {
    expect(maskWeight("metal", 200)).toBeGreaterThan(maskWeight("papier_mache", 200));
  });
});

describe("fieldOfView", () => {
  it("colombina widest", () => {
    expect(fieldOfView("colombina")).toBeGreaterThan(fieldOfView("medico"));
  });
});

describe("breathability", () => {
  it("colombina best", () => {
    expect(breathability("colombina")).toBeGreaterThan(breathability("moretta"));
  });
});

describe("decorationCost", () => {
  it("positive cost", () => {
    expect(decorationCost(5, 3, true)).toBeGreaterThan(0);
  });
});

describe("elasticLengthCm", () => {
  it("80% of head circumference", () => {
    expect(elasticLengthCm(60)).toBe(48);
  });
});

describe("moldDryingHours", () => {
  it("4 hours per layer", () => {
    expect(moldDryingHours(5)).toBe(20);
  });
});

describe("paintLayers", () => {
  it("elaborate most layers", () => {
    expect(paintLayers("elaborate")).toBeGreaterThan(paintLayers("simple"));
  });
});

describe("glueMl", () => {
  it("positive ml", () => {
    expect(glueMl(200, 3)).toBeGreaterThan(0);
  });
});

describe("wearComfortHours", () => {
  it("positive hours", () => {
    expect(wearComfortHours(50, 7)).toBeGreaterThan(0);
  });
});

describe("maskStyles", () => {
  it("returns 5 styles", () => {
    expect(maskStyles()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  printEase, strength, heatResistance, layerAdhesion,
  spoolCost, requiresEnclosure, biodegradable, basePolymer,
  bestUseCase, filamentTypes,
} from "../filament-type-calc.js";

describe("printEase", () => {
  it("pla easiest to print", () => {
    expect(printEase("pla")).toBeGreaterThan(printEase("tpu_flexible"));
  });
});

describe("strength", () => {
  it("nylon strongest", () => {
    expect(strength("nylon")).toBeGreaterThan(strength("pla"));
  });
});

describe("heatResistance", () => {
  it("nylon best heat resistance", () => {
    expect(heatResistance("nylon")).toBeGreaterThan(heatResistance("pla"));
  });
});

describe("layerAdhesion", () => {
  it("petg best layer adhesion", () => {
    expect(layerAdhesion("petg")).toBeGreaterThan(layerAdhesion("nylon"));
  });
});

describe("spoolCost", () => {
  it("nylon most expensive", () => {
    expect(spoolCost("nylon")).toBeGreaterThan(spoolCost("pla"));
  });
});

describe("requiresEnclosure", () => {
  it("abs requires enclosure", () => {
    expect(requiresEnclosure("abs")).toBe(true);
  });
  it("pla does not", () => {
    expect(requiresEnclosure("pla")).toBe(false);
  });
});

describe("biodegradable", () => {
  it("pla is biodegradable", () => {
    expect(biodegradable("pla")).toBe(true);
  });
  it("abs is not", () => {
    expect(biodegradable("abs")).toBe(false);
  });
});

describe("basePolymer", () => {
  it("pla uses polylactic acid corn starch", () => {
    expect(basePolymer("pla")).toBe("polylactic_acid_corn_starch");
  });
});

describe("bestUseCase", () => {
  it("tpu flexible for phone case gasket wearable", () => {
    expect(bestUseCase("tpu_flexible")).toBe("phone_case_gasket_wearable");
  });
});

describe("filamentTypes", () => {
  it("returns 5 types", () => {
    expect(filamentTypes()).toHaveLength(5);
  });
});

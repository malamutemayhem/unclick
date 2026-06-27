import { describe, it, expect } from "vitest";
import {
  curlDefinition, heatRecovery, versatility, easeOfUse,
  toolCost, hasClamp, professionalOnly, barrelMaterial,
  bestCurlType, curlingIrons,
} from "../curling-iron-calc.js";

describe("curlDefinition", () => {
  it("marcel best curl definition", () => {
    expect(curlDefinition("marcel")).toBeGreaterThan(curlDefinition("triple_barrel"));
  });
});

describe("heatRecovery", () => {
  it("auto rotating fastest recovery", () => {
    expect(heatRecovery("auto_rotating")).toBeGreaterThan(heatRecovery("marcel"));
  });
});

describe("versatility", () => {
  it("spring clamp most versatile", () => {
    expect(versatility("spring_clamp")).toBeGreaterThan(versatility("triple_barrel"));
  });
});

describe("easeOfUse", () => {
  it("auto rotating easiest to use", () => {
    expect(easeOfUse("auto_rotating")).toBeGreaterThan(easeOfUse("marcel"));
  });
});

describe("toolCost", () => {
  it("auto rotating most expensive", () => {
    expect(toolCost("auto_rotating")).toBeGreaterThan(toolCost("spring_clamp"));
  });
});

describe("hasClamp", () => {
  it("spring clamp has clamp", () => {
    expect(hasClamp("spring_clamp")).toBe(true);
  });
  it("clipless wand does not", () => {
    expect(hasClamp("clipless_wand")).toBe(false);
  });
});

describe("professionalOnly", () => {
  it("marcel is professional only", () => {
    expect(professionalOnly("marcel")).toBe(true);
  });
  it("spring clamp is not", () => {
    expect(professionalOnly("spring_clamp")).toBe(false);
  });
});

describe("barrelMaterial", () => {
  it("marcel uses chrome polished traditional", () => {
    expect(barrelMaterial("marcel")).toBe("chrome_polished_traditional");
  });
});

describe("bestCurlType", () => {
  it("clipless wand for beachy natural wave", () => {
    expect(bestCurlType("clipless_wand")).toBe("beachy_natural_wave");
  });
});

describe("curlingIrons", () => {
  it("returns 5 types", () => {
    expect(curlingIrons()).toHaveLength(5);
  });
});

import { describe, it, expect } from "vitest";
import {
  horsepowerRange, fuelEfficiency, smoothness,
  compactness, soundCharacter, naturallyBalanced,
  lowCenterOfGravity, commonBrand, cylinderCount, engineTypes,
} from "../engine-type-calc.js";

describe("horsepowerRange", () => {
  it("v8 has most power", () => {
    expect(horsepowerRange("v8")).toBeGreaterThan(
      horsepowerRange("inline_four")
    );
  });
});

describe("fuelEfficiency", () => {
  it("inline four is most efficient", () => {
    expect(fuelEfficiency("inline_four")).toBeGreaterThan(
      fuelEfficiency("v8")
    );
  });
});

describe("smoothness", () => {
  it("inline six is smoothest", () => {
    expect(smoothness("inline_six")).toBeGreaterThan(
      smoothness("inline_four")
    );
  });
});

describe("compactness", () => {
  it("inline four is most compact", () => {
    expect(compactness("inline_four")).toBeGreaterThan(
      compactness("v8")
    );
  });
});

describe("soundCharacter", () => {
  it("v8 has best sound", () => {
    expect(soundCharacter("v8")).toBeGreaterThan(
      soundCharacter("inline_four")
    );
  });
});

describe("naturallyBalanced", () => {
  it("inline six is balanced", () => {
    expect(naturallyBalanced("inline_six")).toBe(true);
  });
  it("inline four is not", () => {
    expect(naturallyBalanced("inline_four")).toBe(false);
  });
});

describe("lowCenterOfGravity", () => {
  it("flat four has low center", () => {
    expect(lowCenterOfGravity("flat_four")).toBe(true);
  });
  it("v8 does not", () => {
    expect(lowCenterOfGravity("v8")).toBe(false);
  });
});

describe("commonBrand", () => {
  it("inline six from bmw", () => {
    expect(commonBrand("inline_six")).toBe("bmw");
  });
});

describe("cylinderCount", () => {
  it("v8 has 8 cylinders", () => {
    expect(cylinderCount("v8")).toBe(8);
  });
  it("flat four has 4", () => {
    expect(cylinderCount("flat_four")).toBe(4);
  });
});

describe("engineTypes", () => {
  it("returns 5 types", () => {
    expect(engineTypes()).toHaveLength(5);
  });
});

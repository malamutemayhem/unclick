import { describe, it, expect } from "vitest";
import {
  patternRich, colorDepth, sealTight, repeatConsist,
  fireCost, fermented, sweet, bathBase,
  bestUse, obvaraFires,
} from "../obvara-fire-calc.js";

describe("patternRich", () => {
  it("sugar yeast dark richest pattern", () => {
    expect(patternRich("sugar_yeast_dark")).toBeGreaterThan(patternRich("flour_water_simple"));
  });
});

describe("colorDepth", () => {
  it("sugar yeast dark deepest color", () => {
    expect(colorDepth("sugar_yeast_dark")).toBeGreaterThan(colorDepth("flour_water_simple"));
  });
});

describe("sealTight", () => {
  it("salt brine mineral tightest seal", () => {
    expect(sealTight("salt_brine_mineral")).toBeGreaterThan(sealTight("flour_water_simple"));
  });
});

describe("repeatConsist", () => {
  it("flour water simple most consistent repeat", () => {
    expect(repeatConsist("flour_water_simple")).toBeGreaterThan(repeatConsist("sugar_yeast_dark"));
  });
});

describe("fireCost", () => {
  it("honey yeast golden most expensive", () => {
    expect(fireCost("honey_yeast_golden")).toBeGreaterThan(fireCost("flour_water_simple"));
  });
});

describe("fermented", () => {
  it("beer yeast standard is fermented", () => {
    expect(fermented("beer_yeast_standard")).toBe(true);
  });
  it("flour water simple not fermented", () => {
    expect(fermented("flour_water_simple")).toBe(false);
  });
});

describe("sweet", () => {
  it("sugar yeast dark is sweet", () => {
    expect(sweet("sugar_yeast_dark")).toBe(true);
  });
  it("beer yeast standard not sweet", () => {
    expect(sweet("beer_yeast_standard")).toBe(false);
  });
});

describe("bathBase", () => {
  it("honey yeast golden uses honey yeast warm", () => {
    expect(bathBase("honey_yeast_golden")).toBe("honey_yeast_warm");
  });
});

describe("bestUse", () => {
  it("beer yeast standard best for general obvara pattern", () => {
    expect(bestUse("beer_yeast_standard")).toBe("general_obvara_pattern");
  });
});

describe("obvaraFires", () => {
  it("returns 5 types", () => {
    expect(obvaraFires()).toHaveLength(5);
  });
});

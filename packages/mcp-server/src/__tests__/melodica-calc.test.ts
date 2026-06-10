import { describe, it, expect } from "vitest";
import {
  keyRange, toneWarmth, portability, expressiveness,
  melodicaCost, hasCarryCase, usesFlexTube, reedType,
  bestGenre, melodicas,
} from "../melodica-calc.js";

describe("keyRange", () => {
  it("piano style wooden widest key range", () => {
    expect(keyRange("piano_style_wooden")).toBeGreaterThan(keyRange("soprano_short_range"));
  });
});

describe("toneWarmth", () => {
  it("piano style wooden warmest tone", () => {
    expect(toneWarmth("piano_style_wooden")).toBeGreaterThan(toneWarmth("soprano_short_range"));
  });
});

describe("portability", () => {
  it("soprano short range most portable", () => {
    expect(portability("soprano_short_range")).toBeGreaterThan(portability("piano_style_wooden"));
  });
});

describe("expressiveness", () => {
  it("piano style wooden most expressive", () => {
    expect(expressiveness("piano_style_wooden")).toBeGreaterThan(expressiveness("soprano_short_range"));
  });
});

describe("melodicaCost", () => {
  it("piano style wooden most expensive", () => {
    expect(melodicaCost("piano_style_wooden")).toBeGreaterThan(melodicaCost("soprano_short_range"));
  });
});

describe("hasCarryCase", () => {
  it("alto standard 32key has carry case", () => {
    expect(hasCarryCase("alto_standard_32key")).toBe(true);
  });
  it("piano style wooden does not", () => {
    expect(hasCarryCase("piano_style_wooden")).toBe(false);
  });
});

describe("usesFlexTube", () => {
  it("alto standard 32key uses flex tube", () => {
    expect(usesFlexTube("alto_standard_32key")).toBe(true);
  });
  it("soprano short range does not", () => {
    expect(usesFlexTube("soprano_short_range")).toBe(false);
  });
});

describe("reedType", () => {
  it("piano style wooden uses hand tuned brass reed", () => {
    expect(reedType("piano_style_wooden")).toBe("hand_tuned_brass_reed");
  });
});

describe("bestGenre", () => {
  it("alto standard 32key best for reggae ska pop", () => {
    expect(bestGenre("alto_standard_32key")).toBe("reggae_ska_pop");
  });
});

describe("melodicas", () => {
  it("returns 5 types", () => {
    expect(melodicas()).toHaveLength(5);
  });
});
